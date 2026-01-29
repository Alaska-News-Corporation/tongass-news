import { Anchor, Trees, Users, Microscope, Mountain, TrendingUp } from 'lucide-react';
import NewsCard from '@/components/NewsCard';

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
    Wildlife: <Trees className="h-5 w-5" />,
    Maritime: <Anchor className="h-5 w-5" />,
    Community: <Users className="h-5 w-5" />,
    Science: <Microscope className="h-5 w-5" />,
    Outdoor: <Mountain className="h-5 w-5" />,
    Economy: <TrendingUp className="h-5 w-5" />,
  };
  return icons[category] || <Trees className="h-5 w-5" />;
};

const getCategoryDescription = (category: string) => {
  const descriptions: Record<string, string> = {
    Wildlife: 'Wildlife & Nature',
    Maritime: 'Maritime & Fishing',
    Community: 'Community & Culture',
    Science: 'Science & Research',
    Outdoor: 'Outdoor Recreation',
    Economy: 'Economy & Business',
  };
  return descriptions[category] || category;
};

const NewsCategorySection = ({ category, articles, expandedId, onToggleExpand }: NewsCategorySectionProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4 text-muted-foreground">
        {getCategoryIcon(category)}
        <h3 className="font-headline text-lg font-semibold text-foreground">
          {getCategoryDescription(category)}
        </h3>
        <div className="flex-1 h-px bg-border ml-2" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            isExpanded={expandedId === article.id}
            onToggleExpand={() => onToggleExpand(article.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsCategorySection;
