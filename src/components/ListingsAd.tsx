// src/components/ListingsAd.tsx
// Cross-promotional ads linking to the Alaska listings network
// Shows listing network ads relevant to this site's region
// Usage: <ListingsAd siteSlug="kenai-news" />

import { ExternalLink } from 'lucide-react'

interface ListingsSite {
  domain: string
  name: string
  tagline: string
  cta: string
}

const LISTINGS_BY_SITE: Record<string, ListingsSite[]> = {
  'anchorage-chronicle': [
    { domain: 'anchoragelistings.com',    name: 'Anchorage Listings',    tagline: "Anchorage's #1 classifieds — jobs, housing, services & more.",         cta: 'Browse Listings'    },
    { domain: 'aklistings.com',           name: 'AK Listings',           tagline: 'Statewide Alaska classified ads — buy, sell, trade anything.',            cta: 'Post a Free Ad'     },
  ],
  'kenai-news': [
    { domain: 'kenailistings.com',        name: 'Kenai Listings',        tagline: 'Kenai Peninsula classifieds — local deals you won\'t find anywhere else.', cta: 'Browse Listings'    },
    { domain: 'kenaihomesales.com',       name: 'Kenai Home Sales',      tagline: 'Kenai Peninsula real estate — homes, land & commercial properties.',       cta: 'View Homes'         },
    { domain: 'kenaiautosales.com',       name: 'Kenai Auto Sales',      tagline: 'Used cars, trucks & boats on the Kenai Peninsula.',                        cta: 'Find Your Vehicle'  },
    { domain: 'kenaipeninsularentals.com',name: 'Peninsula Rentals',     tagline: 'Rentals across the Kenai Peninsula — long-term & vacation.',               cta: 'Find a Rental'      },
  ],
  'tongass-news': [
    { domain: 'tongasslistings.com',      name: 'Tongass Listings',      tagline: 'Southeast Alaska classifieds — Juneau, Ketchikan, Sitka & beyond.',        cta: 'Browse Listings'    },
    { domain: 'bblistings.com',           name: 'Bristol Bay Listings',  tagline: 'Commercial fishing gear, boats & services in Bristol Bay.',                cta: 'Post a Listing'     },
  ],
  'alcan-news': [
    { domain: 'alcanlistings.com',        name: 'ALCAN Listings',        tagline: 'Interior Alaska & Highway corridor classifieds.',                          cta: 'Browse Listings'    },
  ],
  'chugach-news': [
    { domain: 'chugachlistings.com',      name: 'Chugach Listings',      tagline: 'Valdez, Cordova & Chugach region classifieds.',                            cta: 'Browse Listings'    },
    { domain: 'prudhoelistings.com',      name: 'Prudhoe Bay Listings',  tagline: 'North Slope & oilfield equipment, housing & services.',                   cta: 'Browse Listings'    },
  ],
  'alaska-gold-news': [
    { domain: 'alaskaminingequipment.com',name: 'Alaska Mining Equipment','tagline': 'Buy & sell mining equipment — gold pans to excavators.',               cta: 'Browse Equipment'   },
    { domain: 'alaskaguidelistings.com',  name: 'Alaska Guide Listings', tagline: 'Find licensed Alaska hunting & fishing guides.',                           cta: 'Find a Guide'       },
    { domain: 'alaskanboats.com',         name: 'Alaskan Boats',         tagline: "Alaska's marine marketplace — commercial & recreational.",                 cta: 'View Boats'         },
  ],
  'alaska-fires': [
    { domain: 'alaskaguidelistings.com',  name: 'Alaska Guide Listings', tagline: 'Licensed hunting, fishing & wilderness guides across Alaska.',             cta: 'Find a Guide'       },
    { domain: 'aklistings.com',           name: 'AK Listings',           tagline: 'Statewide Alaska classifieds — equipment, land, services.',                cta: 'Browse All'         },
  ],
  'alaska-newspage': [
    { domain: 'aklistings.com',           name: 'AK Listings',           tagline: "Alaska's statewide classifieds marketplace.",                              cta: 'Browse Listings'    },
    { domain: 'anchoragelistings.com',    name: 'Anchorage Listings',    tagline: 'Anchorage area jobs, housing & services.',                                 cta: 'Browse Anchorage'   },
  ],
  'alaska-news-corporation': [
    { domain: 'aklistings.com',           name: 'AK Listings',           tagline: "Alaska's statewide classifieds marketplace.",                              cta: 'Browse Listings'    },
    { domain: 'alaskaguidelistings.com',  name: 'Alaska Guide Listings', tagline: 'Find licensed guides across all of Alaska.',                               cta: 'Find a Guide'       },
  ],
}

interface Props {
  siteSlug: string
  /** Show 1 ad (featured) or 2 ads (sidebar stack). Default: 'stack'. */
  layout?: 'featured' | 'stack'
  /** Accent color for CTA buttons. Default: #2563eb */
  accentColor?: string
}

export default function ListingsAd({ siteSlug, layout = 'stack', accentColor = '#2563eb' }: Props) {
  const ads = LISTINGS_BY_SITE[siteSlug] ?? LISTINGS_BY_SITE['alaska-newspage']
  const displayed = layout === 'featured' ? [ads[0]] : ads.slice(0, 2)

  if (displayed.length === 0) return null

  return (
    <div className="space-y-3">
      <p className="text-gray-600 text-xs uppercase tracking-wider font-semibold px-0.5">
        Alaska Classifieds Network
      </p>
      {displayed.map(ad => (
        <a
          key={ad.domain}
          href={`https://${ad.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01] group"
          style={{
            borderColor: `${accentColor}30`,
            background: 'rgba(0,0,0,0.35)',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p
                className="font-bold text-sm mb-1 group-hover:underline"
                style={{ color: accentColor }}
              >
                {ad.name}
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">{ad.tagline}</p>
            </div>
            <ExternalLink className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
          </div>
          <div className="mt-3">
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-lg transition-colors"
              style={{ background: `${accentColor}20`, color: accentColor }}
            >
              {ad.cta} →
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
