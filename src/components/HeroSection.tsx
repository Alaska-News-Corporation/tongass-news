import heroImage from '@/assets/hero-tongass.jpg';

const HeroSection = () => {
  const featuredStory = {
    title: "Mendenhall Glacier Retreat Reveals New Hiking Routes",
    excerpt: "As the Mendenhall Glacier continues its historic retreat, local guides are discovering pristine trails and wildlife corridors previously hidden beneath centuries of ice.",
    date: "January 29, 2026",
  };

  return (
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
            <div className="flex items-center gap-4 text-sm text-white/80 drop-shadow">
              <span>Tongass News</span>
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
