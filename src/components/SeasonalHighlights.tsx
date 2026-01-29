import { Sun } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SeasonalHighlights = () => {
  // Mock data - would connect to weather API
  const daylightData = {
    sunrise: '8:47 AM',
    sunset: '4:28 PM',
    dayLength: '7h 41m',
    changeFromYesterday: '+2m',
  };

  return (
    <section className="py-4">
      <div className="container-news">
        {/* Compact Daylight Tracker */}
        <Card className="card-news p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber/20 rounded-lg">
              <Sun className="h-4 w-4 text-amber" />
            </div>
            <h3 className="font-headline text-base font-semibold">Daylight Tracker</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sunrise</span>
              <span className="font-medium">{daylightData.sunrise}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sunset</span>
              <span className="font-medium">{daylightData.sunset}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-glacier">{daylightData.dayLength}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Change</span>
              <span className="text-glacier">{daylightData.changeFromYesterday}</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SeasonalHighlights;
