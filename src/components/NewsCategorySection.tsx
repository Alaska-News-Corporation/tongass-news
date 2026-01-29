import { Anchor, Trees, Users, Microscope, Mountain, TrendingUp, Fish, CloudRain, MapPin, Compass } from 'lucide-react';
import NewsCard from '@/components/NewsCard';
import { Card } from '@/components/ui/card';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  published_at: string;
}

interface NewsCategorySectionProps {
  category: string;
  articles: NewsArticle[];
  expandedId: string | null;
  onToggleExpand: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ReactNode> = {
    Wildlife: <Trees className="h-4 w-4" />,
    Maritime: <Anchor className="h-4 w-4" />,
    Community: <Users className="h-4 w-4" />,
    Science: <Microscope className="h-4 w-4" />,
    Outdoor: <Mountain className="h-4 w-4" />,
    Economy: <TrendingUp className="h-4 w-4" />,
    Fishing: <Fish className="h-4 w-4" />,
    Weather: <CloudRain className="h-4 w-4" />,
    Local: <MapPin className="h-4 w-4" />,
    Recreation: <Compass className="h-4 w-4" />,
  };
  return icons[category] || <Trees className="h-4 w-4" />;
};

const getCategoryDescription = (category: string) => {
  const descriptions: Record<string, string> = {
    Wildlife: 'Wildlife',
    Maritime: 'Maritime',
    Community: 'Community',
    Science: 'Science',
    Outdoor: 'Outdoor',
    Economy: 'Business',
    Fishing: 'Fishing',
    Weather: 'Weather',
    Local: 'Local',
    Recreation: 'Recreation',
  };
  return descriptions[category] || category;
};

const NewsCategorySection = ({ category, articles, expandedId, onToggleExpand }: NewsCategorySectionProps) => {
  // Show first article as featured, rest as compact list
  const featuredArticle = articles[0];
  const listArticles = articles.slice(1);

  return (
    <Card className="card-news overflow-hidden">
      {/* Category Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 border-b border-border/50">
        <span className="text-glacier">{getCategoryIcon(category)}</span>
        <h3 className="font-headline text-sm font-semibold">
          {getCategoryDescription(category)}
        </h3>
        <span className="text-xs text-muted-foreground ml-auto">{articles.length} stories</span>
      </div>

      <div className="p-3">
        {/* Featured article */}
        {featuredArticle && (
          <NewsCard
            article={featuredArticle}
            isExpanded={expandedId === featuredArticle.id}
            onToggleExpand={() => onToggleExpand(featuredArticle.id)}
          />
        )}

        {/* Compact list for remaining articles */}
        {listArticles.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            {listArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                isExpanded={expandedId === article.id}
                onToggleExpand={() => onToggleExpand(article.id)}
                compact
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default NewsCategorySection;
