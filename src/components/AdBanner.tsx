import { ExternalLink } from 'lucide-react';

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
  },
  consulting: {
    title: 'Alaska Consulting Group',
    subtitle: 'Expert business solutions for the Last Frontier',
    cta: 'Learn More',
    icon: '📊',
  },
  boats: {
    title: 'Alaskan Boats',
    subtitle: 'Your source for quality marine vessels',
    cta: 'Browse Listings',
    icon: '⛵',
  },
  chronicle: {
    title: 'Anchorage Chronicle',
    subtitle: '"In a world of national headlines and distant concerns, we chose to focus on what matters most: the stories of our neighbors, our communities, and our home"',
    cta: 'Read Now',
    icon: '📰',
  },
  gold: {
    title: 'Alaska Gold News',
    subtitle: 'Premium coverage of Alaska\'s mining industry',
    cta: 'Explore',
    icon: '⛏️',
  },
  mining: {
    title: 'Alaska Mining Equipment',
    subtitle: 'Industrial equipment for extreme conditions',
    cta: 'View Catalog',
    icon: '🔧',
  },
  listings: {
    title: 'Alaska Listings',
    subtitle: 'FREE 60-day listings during beta!',
    cta: 'List Now',
    icon: '🏠',
  },
};

const AdBanner = ({ variant, href }: AdBannerProps) => {
  const content = adContent[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`ad-banner ad-${variant} group`}
    >
      <span className="text-lg">{content.icon}</span>
      <span className="font-semibold">{content.title}</span>
      <span className="hidden sm:inline text-xs opacity-80 max-w-md truncate">
        {content.subtitle}
      </span>
      <span className="flex items-center gap-1 text-xs font-medium opacity-90 group-hover:opacity-100 ml-auto">
        {content.cta}
        <ExternalLink className="h-3 w-3" />
      </span>
    </a>
  );
};

export default AdBanner;
