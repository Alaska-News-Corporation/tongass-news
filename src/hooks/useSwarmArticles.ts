// src/hooks/useSwarmArticles.ts
//
// Connects to the shared Alaska News Network Supabase project.
// The LLM writing swarm publishes:
//   - Regional articles  → site_slug = this site's slug
//   - Statewide articles → site_slug = 'anchorage-chronicle', is_statewide = true
//
// For non-Chronicle sites, this hook fetches a 50/50 blend:
//   50% own regional content + 50% statewide from Anchorage Chronicle
// For the Anchorage Chronicle itself: all own articles (statewide + local).
//
// Required env vars (Vercel / Netlify / .env.local):
//   VITE_NEWS_SUPABASE_URL      — shared Supabase project URL
//   VITE_NEWS_SUPABASE_ANON_KEY — public/anon key (read-only via RLS)
//
// Usage:
//   const {{ articles, loading }} = useSwarmArticles('tongass-news')
//   const {{ article, loading }} = useSwarmArticle('tongass-news', slug)

import {{ useState, useEffect }} from 'react'
import {{ createClient }} from '@supabase/supabase-js'

const NEWS_URL = import.meta.env.VITE_NEWS_SUPABASE_URL as string | undefined
const NEWS_KEY = import.meta.env.VITE_NEWS_SUPABASE_ANON_KEY as string | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newsClient = NEWS_URL && NEWS_KEY ? createClient(NEWS_URL, NEWS_KEY) : null

/** Anchorage Chronicle is the statewide hub — its statewide articles syndicate to all regional sites. */
const STATEWIDE_HUB = 'anchorage-chronicle'

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
  is_statewide: boolean
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
  /** Total article limit. Non-Chronicle sites get ~half own + ~half statewide. Default 20. */
  limit?: number
}}

/**
 * Fetch published swarm articles for this site.
 *
 * Non-Chronicle sites get a 50/50 blend of own regional content and
 * statewide articles from Anchorage Chronicle, sorted by date.
 * Returns [] gracefully when Supabase is not configured.
 */
export function useSwarmArticles(
  siteSlug: string,
  options: UseSwarmArticlesOptions = {{}}
) {{
  const [articles, setArticles] = useState<SwarmArticle[]>([])
  const [loading, setLoading]   = useState(!!newsClient)
  const [error, setError]       = useState<string | null>(null)
  const isConfigured            = !!newsClient
  const isHub                   = siteSlug === STATEWIDE_HUB
  const totalLimit              = options.limit ?? 20
  const halfLimit               = Math.ceil(totalLimit / 2)

  useEffect(() => {{
    if (!newsClient) return

    let cancelled = false

    const run = async () => {{
      setLoading(true)

      if (isHub) {{
        // Chronicle: show all own articles (statewide + local Anchorage)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let q: any = newsClient!
          .from('news_articles')
          .select('*')
          .eq('site_slug', STATEWIDE_HUB)
          .eq('status', 'published')
          .order('published_at', {{ ascending: false }})
        if (options.category) q = q.eq('category', options.category)
        if (options.featured !== undefined) q = q.eq('featured', options.featured)
        q = q.limit(totalLimit)

        const {{ data, error: err }} = await q
        if (!cancelled) {{
          if (err) setError(err.message)
          else     setArticles(data ?? [])
          setLoading(false)
        }}
      }} else {{
        // Regional sites: 50% own content + 50% statewide Chronicle articles
        const [ownResult, statewideResult] = await Promise.all([
          // Own regional articles
          newsClient!
            .from('news_articles')
            .select('*')
            .eq('site_slug', siteSlug)
            .eq('status', 'published')
            .order('published_at', {{ ascending: false }})
            .limit(halfLimit),
          // Statewide from Anchorage Chronicle
          newsClient!
            .from('news_articles')
            .select('*')
            .eq('site_slug', STATEWIDE_HUB)
            .eq('is_statewide', true)
            .eq('status', 'published')
            .order('published_at', {{ ascending: false }})
            .limit(halfLimit),
        ])

        if (!cancelled) {{
          if (ownResult.error)       setError(ownResult.error.message)
          if (statewideResult.error) setError(statewideResult.error.message)

          // Merge and sort by date — natural 50/50 interleaved feed
          const merged = [
            ...(ownResult.data ?? []),
            ...(statewideResult.data ?? []),
          ].sort((a, b) =>
            new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
          )
          setArticles(merged.slice(0, totalLimit))
          setLoading(false)
        }}
      }}
    }}

    run()

    // Live updates via Supabase Realtime — listen to own site + statewide
    const channels = [
      newsClient
        .channel(`swarm_own_${{siteSlug}}`)
        .on('postgres_changes', {{
          event: '*', schema: 'public', table: 'news_articles',
          filter: `site_slug=eq.${{siteSlug}}`,
        }}, () => run())
        .subscribe(),
      // Also listen for new statewide Chronicle articles (non-hub sites)
      ...(isHub ? [] : [
        newsClient
          .channel(`swarm_statewide_${{siteSlug}}`)
          .on('postgres_changes', {{
            event: '*', schema: 'public', table: 'news_articles',
            filter: `site_slug=eq.${{STATEWIDE_HUB}}`,
          }}, () => run())
          .subscribe(),
      ]),
    ]

    return () => {{
      cancelled = true
      channels.forEach(ch => newsClient?.removeChannel(ch))
    }}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }}, [siteSlug, isHub, totalLimit, halfLimit, options.featured, options.category])

  return {{ articles, loading, error, isConfigured }}
}}

/** Fetch a single swarm article by slug (checks own site first, then statewide Chronicle). */
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

      // Try own site first
      const {{ data: own, error: ownErr }} = await newsClient!
        .from('news_articles')
        .select('*')
        .eq('site_slug', siteSlug)
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()

      if (own) {{
        if (!cancelled) {{ setArticle(own); setLoading(false) }}
        return
      }}

      // Fallback: check statewide Chronicle articles (article may have come via syndication)
      const {{ data: sw, error: swErr }} = await newsClient!
        .from('news_articles')
        .select('*')
        .eq('site_slug', STATEWIDE_HUB)
        .eq('slug', slug)
        .eq('is_statewide', true)
        .eq('status', 'published')
        .maybeSingle()

      if (!cancelled) {{
        if (ownErr || swErr) setError((ownErr ?? swErr)!.message)
        setArticle(sw ?? null)
        setLoading(false)
      }}
    }}

    run()
    return () => {{ cancelled = true }}
  }}, [siteSlug, slug])

  return {{ article, loading, error, isConfigured }}
}}
