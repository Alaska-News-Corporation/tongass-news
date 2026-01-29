import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
        .limit(50);
      
      if (error) throw error;
      return data as NewsArticle[];
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const fallbackArticles: NewsArticle[] = [
    // Wildlife - 5 articles
    { id: 'w1', title: 'Humpback Whales Return Early to Icy Strait', excerpt: 'Marine biologists report humpback arrivals 2 weeks ahead of schedule in Icy Strait.', content: 'The early arrival of humpback whales to Icy Strait has marine biologists excited for the 2026 season. Point Adolphus, known as one of the world\'s premier whale watching locations, is already seeing significant activity. Researchers have identified several returning whales from previous seasons, including "Sasha," a female first documented in 2018. Tour operators report exceptional conditions for viewing, with calm seas and clear skies expected through the week. The Glacier Bay National Park research team has deployed additional monitoring equipment to track feeding patterns during this early arrival period.', category: 'Wildlife', image_url: null, published_at: new Date().toISOString() },
    { id: 'w2', title: 'Bald Eagle Count Shows Record Numbers', excerpt: 'Chilkat Valley census reveals highest population in 15 years.', content: 'The annual bald eagle census in the Chilkat Valley near Haines has documented over 2,400 eagles, the highest count since 2011. The concentration, attracted by late-running chum salmon in the Chilkat River, creates one of the largest gatherings of bald eagles in North America. Wildlife officials credit improved salmon runs and habitat conservation efforts for the surge in numbers.', category: 'Wildlife', image_url: null, published_at: new Date(Date.now() - 43200000).toISOString() },
    { id: 'w3', title: 'Black Bear Activity Increases Near Juneau Trails', excerpt: 'Wildlife officials urge caution on popular hiking routes.', content: 'Alaska Department of Fish and Game has issued an advisory for increased black bear activity on trails around Juneau, including the popular Perseverance Trail and Mount Roberts tramway area. Bears are actively foraging to build fat reserves before denning. Hikers should carry bear spray, make noise, and travel in groups. Several trail cameras have documented bears with cubs in the area.', category: 'Wildlife', image_url: null, published_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 'w4', title: 'Sea Otter Population Expands in Frederick Sound', excerpt: 'Marine mammals establish new territories in waters not seen for generations.', content: 'Sea otters have been observed in increasing numbers throughout Frederick Sound and the Stephens Passage area, marking a significant expansion of their range in Southeast Alaska. While the population recovery is celebrated by conservationists, it has created some tension with commercial shellfish harvesters concerned about competition for crab and sea urchin resources.', category: 'Wildlife', image_url: null, published_at: new Date(Date.now() - 129600000).toISOString() },
    { id: 'w5', title: 'Steller Sea Lion Rookery Thriving on Benjamin Island', excerpt: 'Population survey shows healthy numbers at historic breeding site.', content: 'Annual surveys of the Steller sea lion rookery on Benjamin Island near Juneau show a stable and growing population. Researchers counted over 400 sea lions during the peak breeding season, including healthy numbers of pups. The rookery, one of several in Southeast Alaska, is closely monitored as an indicator of marine ecosystem health.', category: 'Wildlife', image_url: null, published_at: new Date(Date.now() - 172800000).toISOString() },

    // Maritime - 5 articles
    { id: 'm1', title: 'Ferry Columbia Returns to Service After Repairs', excerpt: 'Alaska Marine Highway flagship vessel completes month-long maintenance in Ketchikan.', content: 'The M/V Columbia, the largest vessel in the Alaska Marine Highway System fleet, has returned to regular service following extensive maintenance at the Ketchikan shipyard. The work included hull repairs, propulsion system upgrades, and passenger cabin improvements. The Columbia will resume its regular Bellingham-to-Juneau route with enhanced reliability expected for the busy summer season.', category: 'Maritime', image_url: null, published_at: new Date().toISOString() },
    { id: 'm2', title: 'New Fast Ferry Service Proposed for Lynn Canal', excerpt: 'DOT studying high-speed vessel options between Juneau and Haines.', content: 'The Alaska Department of Transportation is conducting a feasibility study for high-speed ferry service in Lynn Canal, potentially cutting travel time between Juneau and Haines to under 90 minutes. The proposal comes as communities seek alternatives to the inconsistent road connection. Public meetings are scheduled for next month in affected communities.', category: 'Maritime', image_url: null, published_at: new Date(Date.now() - 64800000).toISOString() },
    { id: 'm3', title: 'Cruise Ship Season Opens with First Arrival', excerpt: 'Norwegian Bliss kicks off 2026 visitor season in Ketchikan.', content: 'The 2026 cruise ship season has officially begun with the arrival of the Norwegian Bliss in Ketchikan. Port officials expect over 1.3 million cruise visitors to Southeast Alaska this year, with peak season running from May through September. Local businesses have prepared for the influx with new tours, expanded retail, and enhanced visitor services.', category: 'Maritime', image_url: null, published_at: new Date(Date.now() - 108000000).toISOString() },
    { id: 'm4', title: 'Harbor Dredging Project Completed in Petersburg', excerpt: 'South Harbor now accessible to deeper-draft vessels year-round.', content: 'The U.S. Army Corps of Engineers has completed dredging operations in Petersburg\'s South Harbor, restoring full navigation depth after years of sediment accumulation. The project ensures fishing vessels and other commercial traffic can access the harbor regardless of tide conditions, supporting Petersburg\'s vital fishing industry.', category: 'Maritime', image_url: null, published_at: new Date(Date.now() - 151200000).toISOString() },
    { id: 'm5', title: 'Coast Guard Rescues Fishing Vessel Crew Near Sitka', excerpt: 'All four crew members safe after engine failure in rough seas.', content: 'The U.S. Coast Guard Air Station Sitka completed a successful rescue of four crew members from the fishing vessel Northern Promise after the vessel experienced engine failure in deteriorating weather conditions. The helicopter crew hoisted all four individuals to safety and transported them to Sitka. The vessel was later towed to port by a Good Samaritan vessel.', category: 'Maritime', image_url: null, published_at: new Date(Date.now() - 194400000).toISOString() },

    // Community - 5 articles
    { id: 'c1', title: 'Celebration 2026 Preparations Underway in Juneau', excerpt: 'Biennial Tlingit, Haida and Tsimshian gathering expected to draw thousands.', content: 'Preparations are accelerating for Celebration 2026, the biennial gathering of Tlingit, Haida and Tsimshian peoples in Juneau. Sealaska Heritage Institute expects over 5,000 dancers and participants from throughout Alaska, British Columbia and the Lower 48. The four-day event features traditional dance, regalia, language workshops, and cultural demonstrations. Housing and transportation are already at premium as the June event approaches.', category: 'Community', image_url: null, published_at: new Date().toISOString() },
    { id: 'c2', title: 'New Totem Pole Raising Ceremony Set for Ketchikan', excerpt: 'Master carver Nathan Jackson\'s latest work to be unveiled at Totem Heritage Center.', content: 'Ketchikan\'s Totem Heritage Center will host a traditional raising ceremony for a new 40-foot totem pole carved by master artist Nathan Jackson. The pole, commissioned to honor the region\'s fishing heritage, took two years to complete and features traditional Tlingit designs. The public is invited to participate in the ceremony and celebration.', category: 'Community', image_url: null, published_at: new Date(Date.now() - 43200000).toISOString() },
    { id: 'c3', title: 'Wrangell Garnet Festival Returns This Weekend', excerpt: 'Annual celebration highlights unique gem found only at Garnet Ledge.', content: 'The Wrangell Garnet Festival returns this weekend with gem collecting trips, jewelry workshops, and educational programs about the unique garnet deposits at Garnet Ledge. The site, traditionally controlled by the Boy Scouts and owned by the Presbyterian Church, offers one of the few locations in the world where garnets can be collected by the public.', category: 'Community', image_url: null, published_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 'c4', title: 'Sitka Fine Arts Camp Announces Summer Session', excerpt: 'World-class artists to teach workshops in historic campus setting.', content: 'Sitka Fine Arts Camp has announced its 2026 summer session lineup, featuring workshops in visual arts, music, dance, and literary arts. The program, housed in the historic Sheldon Jackson campus, attracts students and instructors from around the world. Scholarship opportunities are available for Alaska residents.', category: 'Community', image_url: null, published_at: new Date(Date.now() - 129600000).toISOString() },
    { id: 'c5', title: 'Haines Brewery Wins National Recognition', excerpt: 'Local craft beer named best in category at American Brewing Awards.', content: 'Haines Brewing Company has earned national recognition with a gold medal at the American Brewing Awards for its Spruce Tip Ale. The brewery, one of Alaska\'s oldest craft beer producers, uses locally harvested Sitka spruce tips in the seasonal recipe. Owner Paul Wheeler credits the unique Southeast Alaska ingredients for the beer\'s distinctive flavor.', category: 'Community', image_url: null, published_at: new Date(Date.now() - 172800000).toISOString() },

    // Fishing - 4 articles
    { id: 'f1', title: 'King Salmon Season Opens with Strong Predictions', excerpt: 'Biologists forecast above-average returns for Taku and Stikine Rivers.', content: 'Alaska Department of Fish and Game has released its 2026 king salmon forecast, predicting above-average returns for the Taku and Stikine River systems. Early test fishing shows healthy fish condition and timing consistent with predictions. Commercial trollers and charter operators are optimistic about the coming season, while managers emphasize the continued need for conservation measures.', category: 'Fishing', image_url: null, published_at: new Date().toISOString() },
    { id: 'f2', title: 'Halibut Quota Increase Approved for Region 2C', excerpt: 'International Pacific Halibut Commission raises catch limit 8%.', content: 'The International Pacific Halibut Commission has approved an 8% increase in the catch limit for Southeast Alaska\'s Region 2C. The decision, based on updated stock assessments, is welcome news for commercial and charter operators who have faced tight quotas in recent years. The change takes effect with the March 15 season opening.', category: 'Fishing', image_url: null, published_at: new Date(Date.now() - 64800000).toISOString() },
    { id: 'f3', title: 'Herring Spawning Begins in Sitka Sound', excerpt: 'Annual phenomenon attracts predators and signals spring\'s arrival.', content: 'The annual herring spawn in Sitka Sound has begun, turning the water milky white with eggs and milt. The event draws massive congregations of whales, sea lions, and seabirds, while also supporting the traditional harvest of herring eggs on kelp by Tlingit families. Wildlife viewers are advised to respect subsistence activities during this culturally significant time.', category: 'Fishing', image_url: null, published_at: new Date(Date.now() - 108000000).toISOString() },
    { id: 'f4', title: 'Petersburg Shrimp Fleet Reports Excellent Catches', excerpt: 'Early season harvest exceeds expectations despite weather challenges.', content: 'Petersburg\'s commercial shrimp fleet has returned from early season fishing with catches exceeding expectations. Despite challenging weather in Frederick Sound, boats reported full holds and high-quality product. The shrimp, prized for their sweet flavor, will be processed locally and shipped to markets throughout the Pacific Northwest.', category: 'Fishing', image_url: null, published_at: new Date(Date.now() - 151200000).toISOString() },

    // Weather - 3 articles
    { id: 'we1', title: 'Atmospheric River Event Expected This Week', excerpt: 'Forecasters predict heavy rain and elevated avalanche danger.', content: 'The National Weather Service has issued watches for a significant atmospheric river event expected to affect Southeast Alaska Thursday through Saturday. Rainfall totals of 4-8 inches are possible in many areas, with higher amounts in the mountains. The Alaska Avalanche Center warns of rapidly increasing avalanche danger as warm, wet conditions destabilize the snowpack.', category: 'Weather', image_url: null, published_at: new Date().toISOString() },
    { id: 'we2', title: 'Warmer Than Average Spring Predicted', excerpt: 'Climate Prediction Center forecasts above-normal temperatures through May.', content: 'The NOAA Climate Prediction Center\'s seasonal outlook indicates above-normal temperatures for Southeast Alaska through May. The warmer conditions may accelerate snowmelt and affect glacier viewing conditions earlier than typical. However, precipitation is expected to remain near normal levels.', category: 'Weather', image_url: null, published_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 'we3', title: 'Juneau Records Driest January in 30 Years', excerpt: 'Unusual dry spell breaks long-term precipitation records.', content: 'Juneau has recorded its driest January since 1994, with only 2.3 inches of precipitation at the National Weather Service office. The unusual dry spell, driven by persistent high pressure, has resulted in excellent winter recreation conditions but raised concerns about summer water availability and fire risk in the Tongass.', category: 'Weather', image_url: null, published_at: new Date(Date.now() - 172800000).toISOString() },

    // Outdoor/Recreation - 4 articles
    { id: 'o1', title: 'Eaglecrest Extends Season Through April', excerpt: 'Late-season snow allows bonus weeks of spring skiing.', content: 'Eaglecrest Ski Area will extend its season through mid-April following a late-season snowstorm that dropped 24 inches of fresh powder on the slopes above Juneau. Weekend operations will continue, with the mountain offering discounted lift tickets for the bonus period. Spring skiing conditions with corn snow and longer days are expected.', category: 'Recreation', image_url: null, published_at: new Date().toISOString() },
    { id: 'o2', title: 'West Glacier Trail Reopens After Winter Closure', excerpt: 'Popular Mendenhall Glacier route accessible as snow clears.', content: 'The West Glacier Trail at Mendenhall Glacier has reopened following winter closure. The U.S. Forest Service notes that while lower sections are clear, hikers should expect residual snow and ice on upper portions. The trail offers dramatic views of the retreating glacier and newly exposed terrain.', category: 'Recreation', image_url: null, published_at: new Date(Date.now() - 43200000).toISOString() },
    { id: 'o3', title: 'Kayak Season Opens with Safety Reminders', excerpt: 'Cold water paddling requires proper gear and preparation.', content: 'As kayaking season begins in Southeast Alaska, the U.S. Coast Guard and local paddling clubs are emphasizing cold water safety. Water temperatures remain in the low 40s Fahrenheit, making immersion survival times extremely short without proper protection. Experts recommend dry suits, float plans, and local knowledge before venturing out.', category: 'Recreation', image_url: null, published_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 'o4', title: 'New Forest Service Cabins Available for Summer Reservations', excerpt: 'Tongass adds three remote recreation cabins to reservation system.', content: 'The U.S. Forest Service has added three new public use cabins to the Tongass National Forest recreation system. The cabins, located in Prince of Wales Island, Admiralty Island, and the Juneau Ranger District, offer remote wilderness experiences accessible by floatplane or boat. Reservations open March 1 at recreation.gov.', category: 'Recreation', image_url: null, published_at: new Date(Date.now() - 129600000).toISOString() },
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

  // Define category order
  const categoryOrder = ['Wildlife', 'Maritime', 'Community', 'Fishing', 'Weather', 'Recreation', 'Science', 'Outdoor', 'Economy', 'Local'];
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
        <h2 className="font-headline text-xl font-bold mb-4">Latest News</h2>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="card-news p-3 animate-pulse">
                <div className="h-3 bg-muted rounded w-16 mb-2" />
                <div className="h-4 bg-muted rounded mb-1" />
                <div className="h-3 bg-muted rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
