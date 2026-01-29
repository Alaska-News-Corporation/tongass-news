import tongassLogo from '@/assets/tongass-news-logo.png';
import { Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const regionalNews = [
    { name: 'Chugach News', url: 'https://chugachnews.com' },
    { name: 'Anchorage Chronicle', url: 'https://anchoragechronicle.com' },
    { name: 'Kenai News', url: 'https://kenainews.com' },
  ];

  return (
    <footer className="bg-navy-deep border-t border-border py-10">
      <div className="container-news">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          {/* Logo and description side by side */}
          <div className="flex items-center gap-6 flex-1">
            <img
              src={tongassLogo}
              alt="Tongass News"
              className="h-14 w-auto shrink-0"
            />
            <p className="text-sm text-muted-foreground max-w-md">
              Tongass News serves Southeast Alaska's Inside Passage communities including 
              Juneau, Ketchikan, Sitka, Wrangell, Petersburg, Haines, and Skagway. 
              Part of the Alaska News Corporation network.
            </p>
          </div>

          {/* Regional News Links */}
          <div>
            <h4 className="font-headline font-semibold mb-3">Regional News</h4>
            <ul className="space-y-2">
              {regionalNews.map((site) => (
                <li key={site.name}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-glacier transition-colors"
                  >
                    {site.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-headline font-semibold mb-3">Contact</h4>
            <a
              href="mailto:support@alaskanewscorporation.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-glacier transition-colors"
            >
              <Mail className="h-4 w-4" />
              support@alaskanewscorporation.com
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Tongass News. An Alaska News Corporation publication.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
