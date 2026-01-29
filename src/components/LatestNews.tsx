import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import NewsCard from '@/components/NewsCard';
import NewsCategorySection from '@/components/NewsCategorySection';

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
        .limit(24);
      
      if (error) throw error;
      return data as NewsArticle[];
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const fallbackArticles: NewsArticle[] = [
    // Wildlife Section
    {
      id: '1',
      title: 'Whale Watching Season Off to Strong Start in Icy Strait',
      excerpt: 'Tour operators report increased humpback whale sightings near Point Adolphus as early migrants arrive.',
      content: 'Local whale watching companies are reporting an encouraging start to the 2026 season, with multiple humpback whales spotted in Icy Strait over the past week. The early arrivals suggest a potentially strong year for Southeast Alaska\'s marine wildlife tourism industry. Researchers have identified several returning whales from previous seasons, indicating strong site fidelity in the population.',
      category: 'Wildlife',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Haines Bald Eagle Count Shows Encouraging Numbers',
      excerpt: 'Annual survey indicates healthy population in the Chilkat Valley.',
      content: 'The annual bald eagle count in the Chilkat Valley near Haines shows encouraging numbers, with observers tallying over 2,000 eagles during the peak migration period. The congregation, one of the largest in the world, draws visitors from across the globe to witness the spectacular gathering.',
      category: 'Wildlife',
      image_url: null,
      published_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      title: 'Sea Otter Population Expands into New Territory',
      excerpt: 'Marine mammals spotted in areas not seen for decades.',
      content: 'Sea otters have been observed establishing new territories in areas of Southeast Alaska where they haven\'t been seen for generations. Wildlife biologists say the expansion is a positive sign for the species\' recovery, though it has created some tension with shellfish harvesters in affected areas.',
      category: 'Wildlife',
      image_url: null,
      published_at: new Date(Date.now() - 172800000).toISOString(),
    },
    // Maritime Section
    {
      id: '4',
      title: 'Ferry System Announces Summer Schedule Changes',
      excerpt: 'Alaska Marine Highway updates routes to better serve Inside Passage communities.',
      content: 'The Alaska Marine Highway System has released its summer 2026 schedule, featuring enhanced service to smaller communities and new direct routes between major ports. The changes come after extensive community input and aim to improve reliability and convenience for residents and visitors alike.',
      category: 'Maritime',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Petersburg Shrimp Boats Return with Record Haul',
      excerpt: 'Local fleet reports exceptional catches despite challenging weather conditions.',
      content: 'Petersburg\'s shrimp fleet has returned from its winter season with some of the best catches in recent memory, providing a boost to the local economy. Fishermen credit favorable ocean conditions and sustainable management practices for the strong harvest.',
      category: 'Maritime',
      image_url: null,
      published_at: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: '6',
      title: 'New Cruise Ship Regulations Take Effect',
      excerpt: 'Environmental protections strengthen for Inside Passage waters.',
      content: 'New regulations governing cruise ship operations in Southeast Alaska waters have gone into effect, implementing stricter emission standards and wastewater treatment requirements. The rules aim to protect the region\'s pristine marine environment while maintaining the vital tourism industry.',
      category: 'Maritime',
      image_url: null,
      published_at: new Date(Date.now() - 129600000).toISOString(),
    },
    // Community Section
    {
      id: '7',
      title: 'Ketchikan Arts Council Unveils New Totem Pole Project',
      excerpt: 'Master carvers collaborate on cultural heritage preservation initiative.',
      content: 'A new collaborative project brings together Tlingit and Haida master carvers to create a series of totem poles celebrating the region\'s rich cultural heritage. The multi-year initiative includes apprenticeship opportunities for young Native artists learning traditional carving techniques.',
      category: 'Community',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '8',
      title: 'Juneau Assembly Approves Downtown Improvement Plan',
      excerpt: 'Multi-year initiative aims to enhance pedestrian areas and waterfront access.',
      content: 'The Juneau Assembly has given final approval to a comprehensive downtown improvement plan that will enhance pedestrian areas and improve access to the waterfront. The project includes new public spaces, improved sidewalks, and better integration between the cruise ship docks and downtown businesses.',
      category: 'Community',
      image_url: null,
      published_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '9',
      title: 'Wrangell Celebrates Historic Cannery Restoration',
      excerpt: 'Community effort preserves important piece of maritime heritage.',
      content: 'Wrangell residents gathered to celebrate the completion of a major restoration project at the historic Shakes Island cannery, preserving an important piece of the community\'s maritime heritage. The facility will serve as a museum and cultural center.',
      category: 'Community',
      image_url: null,
      published_at: new Date(Date.now() - 172800000).toISOString(),
    },
    // Science Section
    {
      id: '10',
      title: 'Sitka Sound Science Center Expands Research Programs',
      excerpt: 'New funding enables expanded marine research and community education initiatives.',
      content: 'The Sitka Sound Science Center has received significant new funding to expand its marine research programs and community outreach efforts. The expansion includes new laboratory facilities and an enhanced citizen science program engaging local students in real-world research.',
      category: 'Science',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '11',
      title: 'Climate Study Tracks Glacier Changes Across Region',
      excerpt: 'Researchers document accelerating ice loss in Tongass watersheds.',
      content: 'A comprehensive new study has documented the rate of glacier retreat across Southeast Alaska, finding that many glaciers have lost significant mass in recent decades. The research provides critical data for understanding climate change impacts on regional hydrology and ecosystems.',
      category: 'Science',
      image_url: null,
      published_at: new Date(Date.now() - 64800000).toISOString(),
    },
    {
      id: '12',
      title: 'Marine Biologists Track Salmon Migration Patterns',
      excerpt: 'New tagging technology reveals surprising fish behavior.',
      content: 'Using advanced satellite tracking technology, researchers are gaining new insights into how salmon navigate the complex waterways of Southeast Alaska. The findings could help improve fishery management and conservation efforts.',
      category: 'Science',
      image_url: null,
      published_at: new Date(Date.now() - 151200000).toISOString(),
    },
    // Outdoor Section
    {
      id: '13',
      title: 'New Trail System Opens in Tongass National Forest',
      excerpt: 'Miles of new hiking opportunities available for all skill levels.',
      content: 'The U.S. Forest Service has officially opened a new trail system in the Tongass National Forest, providing miles of new hiking opportunities ranging from easy interpretive walks to challenging backcountry routes. The trails showcase old-growth temperate rainforest and stunning coastal views.',
      category: 'Outdoor',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '14',
      title: 'Spring Skiing Conditions Excellent at Eaglecrest',
      excerpt: 'Late season snowfall extends ski season into April.',
      content: 'Eaglecrest Ski Area is reporting excellent spring skiing conditions following a late-season snowfall that has blanketed the slopes with fresh powder. The ski area has extended its season through mid-April to take advantage of the favorable conditions.',
      category: 'Outdoor',
      image_url: null,
      published_at: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: '15',
      title: 'Kayaking Season Begins with Safety Reminders',
      excerpt: 'Cold water conditions require proper preparation and equipment.',
      content: 'As kayaking season begins in Southeast Alaska, safety officials are reminding paddlers about the importance of proper preparation and equipment. Cold water conditions can be deadly, and experts recommend dry suits, float plans, and local knowledge before venturing out.',
      category: 'Outdoor',
      image_url: null,
      published_at: new Date(Date.now() - 108000000).toISOString(),
    },
    // Economy Section
    {
      id: '16',
      title: 'Tourism Bookings Surge for Summer Season',
      excerpt: 'Early indicators point to record visitor numbers.',
      content: 'Advance bookings for Southeast Alaska tourism are running well ahead of previous years, with hotels, tour operators, and cruise lines reporting strong demand. Industry officials predict the region could see record visitor numbers this summer.',
      category: 'Economy',
      image_url: null,
      published_at: new Date().toISOString(),
    },
    {
      id: '17',
      title: 'Local Business Incubator Launches New Program',
      excerpt: 'Initiative aims to support entrepreneurs in rural communities.',
      content: 'A new business incubator program is launching across Southeast Alaska, providing mentorship, resources, and funding opportunities for entrepreneurs in rural communities. The initiative focuses on sustainable businesses that leverage the region\'s unique assets.',
      category: 'Economy',
      image_url: null,
      published_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '18',
      title: 'Commercial Fishing Season Outlook Released',
      excerpt: 'Mixed predictions for various species in coming months.',
      content: 'State fishery managers have released their seasonal outlook for commercial fishing in Southeast Alaska, with predictions varying by species. Salmon returns are expected to be strong in some systems but below average in others, while halibut quotas have been adjusted based on recent stock assessments.',
      category: 'Economy',
      image_url: null,
      published_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

  const displayArticles = articles.length > 0 ? articles : fallbackArticles;

  // Group articles by category
  const groupedArticles = displayArticles.reduce((acc, article) => {
    const category = article.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, NewsArticle[]>);

  // Define category order and colors
  const categoryOrder = ['Wildlife', 'Maritime', 'Community', 'Science', 'Outdoor', 'Economy'];
  const sortedCategories = Object.keys(groupedArticles).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <section className="section-spacing">
      <div className="container-news">
        <h2 className="font-headline text-2xl font-bold mb-6">Latest News</h2>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="card-news p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-16 mb-3" />
                <div className="h-5 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {sortedCategories.map((category) => (
              <NewsCategorySection
                key={category}
                category={category}
                articles={groupedArticles[category]}
                expandedId={expandedId}
                onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
