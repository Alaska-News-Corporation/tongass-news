import { Sun, Moon, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SeasonalHighlights = () => {
  // Mock data - would connect to weather API
  const daylightData = {
    sunrise: '8:47 AM',
    sunset: '4:28 PM',
    dayLength: '7h 41m',
    changeFromYesterday: '+2m',
  };

  const auroraForecast = {
    level: 'Moderate',
    kpIndex: 3,
    bestViewing: '11 PM - 3 AM',
    cloudCover: 60,
  };

  return (
    <section className="section-spacing">
      <div className="container-news">
        <h2 className="font-headline text-2xl font-bold mb-6 text-center">Seasonal Highlights</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Daylight Tracker */}
          <Card className="card-news p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber/20 rounded-lg">
                <Sun className="h-5 w-5 text-amber" />
              </div>
              <h3 className="font-headline text-lg font-semibold">Daylight Tracker</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Sunrise</span>
                <span className="font-medium">{daylightData.sunrise}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Sunset</span>
                <span className="font-medium">{daylightData.sunset}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Daylight</span>
                <span className="font-bold text-glacier">{daylightData.dayLength}</span>
              </div>
              <div className="text-xs text-glacier text-right">
                {daylightData.changeFromYesterday} from yesterday
              </div>
            </div>
            
            {/* Visual daylight bar */}
            <div className="mt-4 h-3 bg-navy-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber/50 via-amber to-amber/50 rounded-full"
                style={{ width: '32%', marginLeft: '34%' }}
              />
            </div>
          </Card>

          {/* Aurora Forecast */}
          <Card className="card-news p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-glacier/20 rounded-lg">
                <Sparkles className="h-5 w-5 text-glacier" />
              </div>
              <h3 className="font-headline text-lg font-semibold">Aurora Forecast</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Activity Level</span>
                <span className="font-medium text-glacier">{auroraForecast.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Kp Index</span>
                <span className="font-medium">{auroraForecast.kpIndex}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Best Viewing</span>
                <span className="font-medium">{auroraForecast.bestViewing}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cloud Cover</span>
                <span className="font-medium">{auroraForecast.cloudCover}%</span>
              </div>
            </div>
            
            {/* Kp Index bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Low</span>
                <span>Storm</span>
              </div>
              <div className="h-2 bg-navy-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-glacier-muted to-glacier-glow rounded-full transition-all"
                  style={{ width: `${(auroraForecast.kpIndex / 9) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SeasonalHighlights;
