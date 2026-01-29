import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-tongass.jpg';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const HeroSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const featuredStory = {
    title: "Mendenhall Glacier Retreat Reveals New Hiking Routes",
    excerpt: "As the Mendenhall Glacier continues its historic retreat, local guides are discovering pristine trails and wildlife corridors previously hidden beneath centuries of ice.",
    date: "January 29, 2026",
    content: `The Mendenhall Glacier, one of Southeast Alaska's most iconic natural landmarks, has retreated more than two miles since 1958, and the pace of change has accelerated dramatically in recent years. What was once solid ice is now revealing a landscape untouched for millennia—ancient forests emerging from beneath the glacier's edge, pristine alpine meadows, and newly formed lakes fed by glacial meltwater.

Local hiking guides and naturalists have been quick to explore these newly accessible areas, documenting trails that wind through terrain that has been frozen for thousands of years. "It's like walking into a world that hasn't seen sunlight since before the first humans arrived in Alaska," says Sarah Chen, a veteran guide with Juneau Adventure Tours. "We're finding old growth stumps, preserved vegetation, and rock formations that tell stories of this landscape's ancient past."

The retreat has created several new hiking opportunities for visitors and residents alike. The West Glacier Trail, once a short path to an overlook, now extends an additional 1.5 miles through newly exposed terrain. Rangers have been working to establish safe routes and protect fragile ecosystems that are just beginning to recover.

Wildlife has also responded to the changing landscape. Black bears have been spotted foraging in areas that were solid ice just a decade ago, while mountain goats have established new territories on the exposed rock faces. The newly formed ponds and streams have become important habitat for salmon and other fish species, creating new ecosystems in real-time.

The transformation isn't without its challenges. Unstable terrain, falling ice, and unpredictable weather conditions make some areas dangerous to explore. The Tongass National Forest Service has implemented new safety protocols and requires permits for off-trail exploration in the glacier zone.

"We want people to experience this incredible natural phenomenon, but safety has to come first," explains Forest Service spokesperson Mark Anderson. "The glacier is still actively retreating, and conditions can change rapidly."

For those interested in witnessing this remarkable transformation, guided tours are available year-round, with summer months offering the best conditions for extended hikes into the newly revealed terrain.`,
  };

  return (
    <>
      <section className="relative min-h-[60vh] flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Tongass National Forest"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Featured Story */}
        <div className="relative z-10 flex-1 flex items-end pb-10">
          <div className="container-news">
            <div className="max-w-3xl">
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-4 drop-shadow-lg">
                {featuredStory.title}
              </h1>
              <p className="text-lg text-white/90 mb-4 max-w-2xl drop-shadow-md">
                {featuredStory.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-white/80 drop-shadow mb-4">
                <span>Tongass News</span>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{featuredStory.date}</span>
              </div>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                Read Full Story
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Animated wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Expanded Article Dialog */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl leading-tight">
              {featuredStory.title}
            </DialogTitle>
            <div className="flex items-center gap-3 text-sm text-muted-foreground pt-2">
              <span>Tongass News</span>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>{featuredStory.date}</span>
            </div>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {featuredStory.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
