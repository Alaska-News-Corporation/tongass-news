// src/hooks/useAlaskaAlerts.ts
//
// Real-time Alaska alerts: NWS weather warnings, USGS earthquakes, fire incidents.
// Updated hourly by the Trinity alerts service (alaska-alerts-weather.py).
// Connects to the same shared Supabase project as useSwarmArticles.
//
// Usage:
//   const { alerts, extreme, loading } = useAlaskaAlerts('tongass-news')

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const NEWS_URL = import.meta.env.VITE_NEWS_SUPABASE_URL as string | undefined
const NEWS_KEY = import.meta.env.VITE_NEWS_SUPABASE_ANON_KEY as string | undefined
const newsClient = NEWS_URL && NEWS_KEY ? createClient(NEWS_URL, NEWS_KEY) : null

export type AlertSeverity = 'extreme' | 'severe' | 'moderate' | 'minor' | 'unknown'
export type AlertType     = 'weather' | 'earthquake' | 'fire' | 'tsunami'

export interface AlaskaAlert {{
  id: string
  source: string
  alert_type: AlertType
  severity: AlertSeverity
  urgency: string
  title: string
  headline: string | null
  description: string | null
  instruction: string | null
  region: string | null
  area_desc: string | null
  site_slugs: string[]
  is_active: boolean
  expires_at: string | null
  magnitude: number | null
  location: string | null
  url: string | null
  created_at: string
  updated_at: string
}}

/** Severity ordering for sorting (extreme first). */
const SEVERITY_ORDER: Record<AlertSeverity, number> = {{
  extreme: 0, severe: 1, moderate: 2, minor: 3, unknown: 4,
}}

/**
 * Fetch active Alaska alerts for this site.
 * Returns alerts relevant to this site (site_slugs includes this slug or is empty = all sites).
 */
export function useAlaskaAlerts(siteSlug: string) {{
  const [alerts, setAlerts]   = useState<AlaskaAlert[]>([])
  const [loading, setLoading] = useState(!!newsClient)
  const [error, setError]     = useState<string | null>(null)
  const isConfigured          = !!newsClient

  useEffect(() => {{
    if (!newsClient) return

    let cancelled = false

    const run = async () => {{
      setLoading(true)
      // Fetch alerts that are either global (empty site_slugs) or targeted at this site
      const {{ data, error: err }} = await newsClient!
        .from('alaska_alerts')
        .select('*')
        .eq('is_active', true)
        .or(`site_slugs.eq.{{}},site_slugs.cs.{{"${{siteSlug}}"}}`)
        .order('severity', {{ ascending: true }})
        .order('created_at', {{ ascending: false }})
        .limit(20)

      if (!cancelled) {{
        if (err) setError(err.message)
        else setAlerts(
          (data ?? []).sort((a, b) =>
            SEVERITY_ORDER[a.severity as AlertSeverity] - SEVERITY_ORDER[b.severity as AlertSeverity]
          )
        )
        setLoading(false)
      }}
    }}

    run()

    // Real-time: get new alerts the moment they're written
    const channel = newsClient
      .channel(`alaska_alerts_${{siteSlug}}`)
      .on('postgres_changes', {{
        event: '*', schema: 'public', table: 'alaska_alerts',
      }}, () => run())
      .subscribe()

    return () => {{
      cancelled = true
      newsClient?.removeChannel(channel)
    }}
  }}, [siteSlug])

  const extreme  = alerts.filter(a => a.severity === 'extreme')
  const severe   = alerts.filter(a => a.severity === 'severe')
  const hasUrgent = extreme.length > 0 || severe.length > 0

  return {{ alerts, extreme, severe, hasUrgent, loading, error, isConfigured }}
}}
