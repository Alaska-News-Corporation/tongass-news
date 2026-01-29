import { ExternalLink } from 'lucide-react';
import adGoldNews from '@/assets/ad-gold-news.jpg';
import adMining from '@/assets/ad-mining.jpg';
import adChronicle from '@/assets/ad-chronicle.jpg';
import adListings from '@/assets/ad-listings.jpg';
import adConsulting from '@/assets/ad-consulting.jpg';
import adBoats from '@/assets/ad-boats.jpg';

interface AdBannerProps {
  variant: 'fires' | 'consulting' | 'boats' | 'chronicle' | 'gold' | 'mining' | 'listings';
  href: string;
}

const adContent = {
  fires: {
    title: 'Alaska Fires',
    subtitle: 'Real-time fire monitoring & safety resources',
    cta: 'Stay Informed',
    icon: '🔥',
    image: null,
    bgClass: 'bg-gradient-to-r from-red-950 via-red-900 to-red-950',
    textClass: 'text-red-100',
    subtitleClass: 'text-red-200/70',
    ctaClass: 'text-red-200 hover:text-white',
  },
  consulting: {
    title: 'Alaska Consulting Group',
    subtitle: 'Expert business solutions for the Last Frontier',
    cta: 'Learn More',
    icon: null,
    image: adConsulting,
    bgClass: 'bg-gradient-to-r from-neutral-900 via-zinc-800 to-neutral-900',
    textClass: 'text-zinc-100',
    subtitleClass: 'text-zinc-400',
    ctaClass: 'text-zinc-300 hover:text-white',
  },
  boats: {
    title: 'Alaskan Boats',
    subtitle: 'Your source for quality marine vessels',
    cta: 'Browse Listings',
    icon: null,
    image: adBoats,
    bgClass: 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900',
    textClass: 'text-slate-100',
    subtitleClass: 'text-slate-300/80',
    ctaClass: 'text-slate-200 hover:text-white',
  },
  chronicle: {
    title: 'The Anchorage Chronicle',
    subtitle: '"In a world of national headlines and distant concerns, we chose to focus on what matters most: the stories of our neighbors, our communities, and our home"',
    cta: 'Read Now',
    icon: null,
    image: adChronicle,
    bgClass: 'bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800',
    textClass: 'text-stone-100',
    subtitleClass: 'text-stone-300/80',
    ctaClass: 'text-stone-200 hover:text-white',
  },
  gold: {
    title: 'Alaska Gold News',
    subtitle: 'Premium coverage of Alaska\'s mining industry',
    cta: 'Explore',
    icon: null,
    image: adGoldNews,
    bgClass: 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950',
    textClass: 'text-amber-100',
    subtitleClass: 'text-amber-200/70',
    ctaClass: 'text-amber-300 hover:text-amber-100',
  },
  mining: {
    title: 'Alaska Mining Equipment',
    subtitle: 'Industrial equipment for extreme conditions',
    cta: 'View Catalog',
    icon: null,
    image: adMining,
    bgClass: 'bg-gradient-to-r from-zinc-900 via-neutral-800 to-zinc-900',
    textClass: 'text-zinc-100',
    subtitleClass: 'text-zinc-400',
    ctaClass: 'text-zinc-300 hover:text-white',
  },
  listings: {
    title: 'Alaska Listings',
    subtitle: 'FREE 60-day listings during beta!',
    cta: 'List Now',
    icon: null,
    image: adListings,
    bgClass: 'bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900',
    textClass: 'text-cyan-100',
    subtitleClass: 'text-cyan-200/70',
    ctaClass: 'text-cyan-300 hover:text-white',
  },
};

const AdBanner = ({ variant, href }: AdBannerProps) => {
  const content = adContent[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-full ${content.bgClass} group transition-all duration-300 hover:brightness-110`}
    >
      <div className="container-news h-16 sm:h-20 flex items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left side: Logo/Icon + Text */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Logo or Icon */}
          {content.image ? (
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-white/10 shadow-lg">
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : content.icon ? (
            <span className="text-2xl sm:text-3xl shrink-0">{content.icon}</span>
          ) : null}
          
          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-headline font-bold text-sm sm:text-base ${content.textClass} truncate`}>
              {content.title}
            </h3>
            <p className={`hidden sm:block text-xs ${content.subtitleClass} line-clamp-1 max-w-md`}>
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Right side: CTA */}
        <span className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium ${content.ctaClass} transition-colors shrink-0`}>
          {content.cta}
          <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
};

export default AdBanner;
