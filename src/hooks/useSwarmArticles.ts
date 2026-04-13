// src/hooks/useSwarmArticles.ts
//
// Connects to the shared Alaska News Network Supabase project where the
// LLM writing swarm publishes articles for this site.
//
// Required env vars (Vercel / Netlify / .env.local):
//   VITE_NEWS_SUPABASE_URL      — shared Supabase project URL
//   VITE_NEWS_SUPABASE_ANON_KEY — public/anon key (read-only via RLS)
//
// Usage:
//   const { articles, loading } = useSwarmArticles('tongass-news')
//   const { article, loading } = useSwarmArticle('tongass-news', slug)

import {{ useState, useEffect }} from 'react'
import {{ createClient }} from '@supabase/supabase-js'

const NEWS_URL = import.meta.env.VITE_NEWS_SUPABASE_URL as string | undefined
const NEWS_KEY = import.meta.env.VITE_NEWS_SUPABASE_ANON_KEY as string | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newsClient = NEWS_URL && NEWS_KEY ? createClient(NEWS_URL, NEWS_KEY) : null

export interface SwarmArticle {{
  id: string
  site_slug: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  author: string
  published_at: string
  category: string | null
  tags: string[]
  image_url: string | null
  featured: boolean
  status: string
  meta_title: string | null
  meta_description: string | null
  swarm_model: string | null
  created_at: string
  updated_at: string
}}

export interface UseSwarmArticlesOptions {{
  featured?: boolean
  category?: string
  limit?: number
}}

/** Fetch published swarm articles for this site. Returns [] when unconfigured. */
export function useSwarmArticles(
  siteSlug: string,
  options: UseSwarmArticlesOptions = {{}}
) {{
  const [articles, setArticles]   = useState<SwarmArticle[]>([])
  const [loading, setLoading]     = useState(!!newsClient)
  const [error, setError]         = useState<string | null>(null)
  const isConfigured              = !!newsClient

  useEffect(() => {{
    if (!newsClient) return

    let cancelled = false

    const run = async () => {{
      setLoading(true)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let q: any = newsClient
        .from('news_articles')
        .select('*')
        .eq('site_slug', siteSlug)
        .eq('status', 'published')
        .order('published_at', {{ ascending: false }})

      if (options.featured !== undefined) q = q.eq('featured', options.featured)
      if (options.category)               q = q.eq('category', options.category)
      if (options.limit)                  q = q.limit(options.limit)

      const {{ data, error: err }} = await q
      if (!cancelled) {{
        if (err) setError(err.message)
        else     setArticles(data ?? [])
        setLoading(false)
      }}
    }}

    run()

    // Live updates via Supabase Realtime
    const channel = newsClient
      .channel(`swarm_news_${{siteSlug}}`)
      .on('postgres_changes', {{
        event: '*', schema: 'public', table: 'news_articles',
        filter: `site_slug=eq.${{siteSlug}}`,
      }}, () => run())
      .subscribe()

    return () => {{
      cancelled = true
      newsClient?.removeChannel(channel)
    }}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }}, [siteSlug, options.featured, options.category, options.limit])

  return {{ articles, loading, error, isConfigured }}
}}

/** Fetch a single swarm article by slug. */
export function useSwarmArticle(siteSlug: string, slug: string) {{
  const [article, setArticle] = useState<SwarmArticle | null>(null)
  const [loading, setLoading] = useState(!!newsClient)
  const [error, setError]     = useState<string | null>(null)
  const isConfigured          = !!newsClient

  useEffect(() => {{
    if (!newsClient || !slug) {{ setLoading(false); return }}

    let cancelled = false

    const run = async () => {{
      setLoading(true)
      const {{ data, error: err }} = await newsClient!
        .from('news_articles')
        .select('*')
        .eq('site_slug', siteSlug)
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()

      if (!cancelled) {{
        if (err) setError(err.message)
        else     setArticle(data)
        setLoading(false)
      }}
    }}

    run()
    return () => {{ cancelled = true }}
  }}, [siteSlug, slug])

  return {{ article, loading, error, isConfigured }}
}}
