import StatsBar from '@/components/StatsBar';
import AlertTicker from '@/components/AlertTicker';
import WeatherStrip from '@/components/WeatherStrip';
import HeroSection from '@/components/HeroSection';
import QuoteCarousel from '@/components/QuoteCarousel';
import SeasonalHighlights from '@/components/SeasonalHighlights';
import AdBanner from '@/components/AdBanner';
import InfoTicker from '@/components/InfoTicker';
import WeatherSection from '@/components/WeatherSection';
import TideChart from '@/components/TideChart';
import OutdoorRecreation from '@/components/OutdoorRecreation';
import CommunityCalendar from '@/components/CommunityCalendar';
import LatestNews from '@/components/LatestNews';
import LocalSpotlight from '@/components/LocalSpotlight';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Area */}
      <StatsBar />
      <AlertTicker />
      <WeatherStrip />
      
      {/* Hero */}
      <HeroSection />
      
      {/* Latest News - moved under hero */}
      <LatestNews />
      
      {/* Regional Weather */}
      <WeatherSection />
      
      {/* Quote Section */}
      <QuoteCarousel />
      
      {/* Ad: Alaska Fires */}
      <AdBanner variant="fires" href="https://alaskafires.com" />
      
      {/* Info Ticker */}
      <InfoTicker />
      
      {/* Tide Chart */}
      <TideChart />
      
      {/* Daylight Tracker - moved under tide */}
      <SeasonalHighlights />
      
      {/* Ad: Consulting */}
      <AdBanner variant="consulting" href="https://alaskaconsultinggroup.com" />
      
      {/* Outdoor Recreation */}
      <OutdoorRecreation />
      
      {/* Ad: Boats */}
      <AdBanner variant="boats" href="https://alaskanboats.com" />
      
      {/* Community Calendar */}
      <CommunityCalendar />
      
      {/* Ad: Anchorage Chronicle */}
      <AdBanner variant="chronicle" href="https://anchoragechronicle.com" />
      
      {/* Ad: Gold News */}
      <AdBanner variant="gold" href="https://alaskagoldnews.com" />
      
      {/* Local Spotlight */}
      <LocalSpotlight />
      
      {/* Ad: Mining */}
      <AdBanner variant="mining" href="https://alaskaminingequipment.com" />
      
      {/* Ad: Listings */}
      <AdBanner variant="listings" href="https://alaskalistings.com" />
      
      {/* Footer */}
      <Footer />
      
      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
};

export default Index;
