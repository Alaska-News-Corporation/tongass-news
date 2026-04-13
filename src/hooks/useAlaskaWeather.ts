// src/hooks/useAlaskaWeather.ts
//
// Cached Alaska weather from NWS via Trinity's weather service.
// Updated every hour server-side — no direct browser API calls.
// Returns current conditions + 7-day forecast + next-12-hour hourly.
//
// Usage:
//   const { weather, current, forecast, hourly, loading } = useAlaskaWeather('tongass-news')

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const NEWS_URL = import.meta.env.VITE_NEWS_SUPABASE_URL as string | undefined
const NEWS_KEY = import.meta.env.VITE_NEWS_SUPABASE_ANON_KEY as string | undefined
const newsClient = NEWS_URL && NEWS_KEY ? createClient(NEWS_URL, NEWS_KEY) : null

export interface WeatherPeriod {{
  name: string | null
  temp: number | null
  unit: string
  isDaytime: boolean
  shortForecast: string | null
  windSpeed: string | null
  windDir: string | null
  precip: number | null
}}

export interface HourlyPeriod {{
  time: string | null
  temp: number | null
  shortForecast: string | null
  windSpeed: string | null
  windDir: string | null
  precip: number | null
}}

export interface AlaskaWeather {{
  site_slug: string
  location_name: string
  lat: number
  lon: number
  current_temp_f: number | null
  current_summary: string | null
  wind_speed: string | null
  wind_direction: string | null
  humidity: number | null
  forecast_json: WeatherPeriod[]
  hourly_json: HourlyPeriod[]
  alerts_count: number
  nws_zone: string | null
  updated_at: string
}}

/** Fetch cached NWS weather for this site's primary location. */
export function useAlaskaWeather(siteSlug: string) {{
  const [weather, setWeather] = useState<AlaskaWeather | null>(null)
  const [loading, setLoading] = useState(!!newsClient)
  const [error, setError]     = useState<string | null>(null)
  const isConfigured          = !!newsClient

  useEffect(() => {{
    if (!newsClient) return

    let cancelled = false

    const run = async () => {{
      setLoading(true)
      const {{ data, error: err }} = await newsClient!
        .from('alaska_weather')
        .select('*')
        .eq('site_slug', siteSlug)
        .maybeSingle()

      if (!cancelled) {{
        if (err) setError(err.message)
        else     setWeather(data)
        setLoading(false)
      }}
    }}

    run()

    // Real-time: weather refreshes hourly
    const channel = newsClient
      .channel(`alaska_weather_${{siteSlug}}`)
      .on('postgres_changes', {{
        event: 'UPDATE', schema: 'public', table: 'alaska_weather',
        filter: `site_slug=eq.${{siteSlug}}`,
      }}, (payload) => {{
        if (!cancelled) setWeather(payload.new as AlaskaWeather)
      }})
      .subscribe()

    return () => {{
      cancelled = true
      newsClient?.removeChannel(channel)
    }}
  }}, [siteSlug])

  const current  = weather ? {{
    temp:    weather.current_temp_f,
    summary: weather.current_summary,
    wind:    weather.wind_speed,
    windDir: weather.wind_direction,
  }} : null

  const forecast = (weather?.forecast_json ?? []) as WeatherPeriod[]
  const hourly   = (weather?.hourly_json   ?? []) as HourlyPeriod[]

  return {{ weather, current, forecast, hourly, loading, error, isConfigured }}
}}
