import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Clock, User } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  published_at: string;
}

const LatestNews = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['news_articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(8);
      
      if (error) throw error;
      return data as NewsArticle[];
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const fallbackArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Whale Watching Season Off to Strong Start in Icy Strait',
      excerpt: 'Tour operators report increased humpback whale sightings near Point Adolphus as early migrants arrive.',
      content: 'Local whale watching companies are reporting an encouraging start to the 2026 season, with multiple humpback whales spotted in Icy Strait over the past week. The early arrivals suggest a potentially strong year for Southeast Alaska\'s marine wildlife tourism industry.',
      category: 'Wildlife',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Ferry System Announces Summer Schedule Changes',
      excerpt: 'Alaska Marine Highway updates routes to better serve Inside Passage communities.',
      content: 'The Alaska Marine Highway System has released its summer 2026 schedule, featuring enhanced service to smaller communities and new direct routes between major ports.',
      category: 'Transportation',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Ketchikan Arts Council Unveils New Totem Pole Project',
      excerpt: 'Master carvers collaborate on cultural heritage preservation initiative.',
      content: 'A new collaborative project brings together Tlingit and Haida master carvers to create a series of totem poles celebrating the region\'s rich cultural heritage.',
      category: 'Culture',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Petersburg Shrimp Boats Return with Record Haul',
      excerpt: 'Local fleet reports exceptional catches despite challenging weather conditions.',
      content: 'Petersburg\'s shrimp fleet has returned from its winter season with some of the best catches in recent memory, providing a boost to the local economy.',
      category: 'Fishing',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Sitka Sound Science Center Expands Research Programs',
      excerpt: 'New funding enables expanded marine research and community education initiatives.',
      content: 'The Sitka Sound Science Center has received significant new funding to expand its marine research programs and community outreach efforts.',
      category: 'Science',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Juneau Assembly Approves Downtown Improvement Plan',
      excerpt: 'Multi-year initiative aims to enhance pedestrian areas and waterfront access.',
      content: 'The Juneau Assembly has given final approval to a comprehensive downtown improvement plan that will enhance pedestrian areas and improve access to the waterfront.',
      category: 'Local',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '7',
      title: 'Haines Bald Eagle Count Shows Encouraging Numbers',
      excerpt: 'Annual survey indicates healthy population in the Chilkat Valley.',
      content: 'The annual bald eagle count in the Chilkat Valley near Haines shows encouraging numbers, with observers tallying over 2,000 eagles during the peak migration period.',
      category: 'Wildlife',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '8',
      title: 'Wrangell Celebrates Historic Cannery Restoration',
      excerpt: 'Community effort preserves important piece of maritime heritage.',
      content: 'Wrangell residents gathered to celebrate the completion of a major restoration project at the historic Shakes Island cannery, preserving an important piece of the community\'s maritime heritage.',
      category: 'History',
      image_url: null,
      published_at: new Date().toISOString(),
    },
  ];

  const displayArticles = articles.length > 0 ? articles : fallbackArticles;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Wildlife: 'bg-glacier/20 text-glacier',
      Transportation: 'bg-amber/20 text-amber',
      Culture: 'bg-coral/20 text-coral',
      Fishing: 'bg-info/20 text-info',
      Science: 'bg-glacier/20 text-glacier',
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

  return (
    <section className="section-spacing">
      <div className="container-news">
        <h2 className="font-headline text-2xl font-bold mb-6">Latest News</h2>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="card-news p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-16 mb-3" />
                <div className="h-5 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayArticles.map((article) => (
              <Card key={article.id} className="card-news overflow-hidden">
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
                  
                  {expandedId === article.id && (
                    <div className="text-sm text-foreground/80 mb-3 animate-fade-in">
                      {article.content}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                    <button
                      onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                      className="flex items-center gap-1 text-xs text-glacier hover:text-glacier-glow transition-colors"
                    >
                      {expandedId === article.id ? (
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
