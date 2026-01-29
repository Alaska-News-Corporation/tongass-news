import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
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

interface NewsCardProps {
  article: NewsArticle;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Wildlife: 'bg-glacier/20 text-glacier',
    Maritime: 'bg-info/20 text-info',
    Community: 'bg-muted text-muted-foreground',
    Science: 'bg-glacier/20 text-glacier',
    Outdoor: 'bg-glacier/20 text-glacier',
    Economy: 'bg-gold/20 text-gold',
    Transportation: 'bg-amber/20 text-amber',
    Culture: 'bg-destructive/20 text-destructive',
    Fishing: 'bg-info/20 text-info',
    Local: 'bg-muted text-muted-foreground',
    History: 'bg-gold/20 text-gold',
    Environment: 'bg-glacier/20 text-glacier',
  };
  return colors[category] || 'bg-muted text-muted-foreground';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const NewsCard = ({ article, isExpanded, onToggleExpand }: NewsCardProps) => {
  return (
    <Card className="card-news overflow-hidden">
      <div className="p-4">
        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded mb-2 ${getCategoryColor(article.category)}`}>
          {article.category}
        </span>
        <h3 className="font-headline font-semibold text-sm leading-tight mb-2">
          {article.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        
        {isExpanded && (
          <div className="text-sm text-foreground/80 mb-3 animate-fade-in">
            {article.content}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Tongass News</span>
            <span>•</span>
            <Clock className="h-3 w-3" />
            <span>{formatDate(article.published_at)}</span>
          </div>
          <button
            onClick={onToggleExpand}
            className="flex items-center gap-1 text-xs text-glacier hover:text-glacier-glow transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Less</span>
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span>More</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
