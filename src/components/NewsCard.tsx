import { ChevronDown, ChevronUp } from 'lucide-react';

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
  compact?: boolean;
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
    Weather: 'bg-info/20 text-info',
    Recreation: 'bg-glacier/20 text-glacier',
  };
  return colors[category] || 'bg-muted text-muted-foreground';
};

const NewsCard = ({ article, isExpanded, onToggleExpand, compact = false }: NewsCardProps) => {
  if (compact) {
    return (
      <div 
        className="group cursor-pointer py-2 border-b border-border/50 last:border-0 hover:bg-muted/30 px-2 -mx-2 rounded transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-xs font-medium leading-tight line-clamp-2 group-hover:text-glacier transition-colors">
            {article.title}
          </h4>
          {isExpanded ? (
            <ChevronUp className="h-3 w-3 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
          )}
        </div>
        {isExpanded && (
          <div className="mt-2 text-xs text-muted-foreground animate-fade-in">
            <p className="mb-2">{article.excerpt}</p>
            <p className="text-foreground/80">{article.content}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="card-news p-3 cursor-pointer hover:border-primary/50 transition-all"
      onClick={onToggleExpand}
    >
      <span className={`inline-block px-1.5 py-0.5 text-[10px] font-medium rounded mb-1.5 ${getCategoryColor(article.category)}`}>
        {article.category}
      </span>
      <h3 className="font-headline font-semibold text-xs leading-tight mb-1 line-clamp-2">
        {article.title}
      </h3>
      {!isExpanded && (
        <p className="text-[10px] text-muted-foreground line-clamp-1">
          {article.excerpt}
        </p>
      )}
      {isExpanded && (
        <div className="text-xs text-foreground/80 mt-2 animate-fade-in">
          <p className="mb-2 text-muted-foreground">{article.excerpt}</p>
          <p>{article.content}</p>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
