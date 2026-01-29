import heroImage from '@/assets/hero-tongass.jpg';
import tongassLogo from '@/assets/tongass-news-logo.png';

const HeroSection = () => {
  const featuredStory = {
    title: "Mendenhall Glacier Retreat Reveals New Hiking Routes",
    excerpt: "As the Mendenhall Glacier continues its historic retreat, local guides are discovering pristine trails and wildlife corridors previously hidden beneath centuries of ice.",
    category: "Environment",
    author: "Sarah Chen",
    date: "January 29, 2026",
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tongass National Forest"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Logo */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="container-news">
          <img
            src={tongassLogo}
            alt="Tongass News"
            className="h-16 sm:h-20 md:h-24 w-auto mx-auto"
          />
          <p className="text-center text-muted-foreground text-sm mt-2">
            Serving Southeast Alaska's Inside Passage
          </p>
        </div>
      </div>

      {/* Featured Story */}
      <div className="relative z-10 flex-1 flex items-end pb-10">
        <div className="container-news">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-glacier text-primary-foreground rounded mb-4">
              {featuredStory.category}
            </span>
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">
              {featuredStory.title}
            </h1>
            <p className="text-lg text-foreground/80 mb-4 max-w-2xl">
              {featuredStory.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By {featuredStory.author}</span>
              <span>•</span>
              <span>{featuredStory.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
