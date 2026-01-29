import { Card } from '@/components/ui/card';
import { Cloud, Droplets, Wind, Thermometer, Eye } from 'lucide-react';

const WeatherSection = () => {
  const conditions = [
    {
      location: 'Juneau',
      temp: 38,
      feels: 32,
      condition: 'Overcast',
      wind: { speed: 12, direction: 'SE' },
      humidity: 78,
      visibility: 8,
      high: 42,
      low: 34,
    },
    {
      location: 'Ketchikan',
      temp: 42,
      feels: 38,
      condition: 'Rainy',
      wind: { speed: 8, direction: 'S' },
      humidity: 92,
      visibility: 5,
      high: 45,
      low: 38,
    },
    {
      location: 'Sitka',
      temp: 40,
      feels: 34,
      condition: 'Cloudy',
      wind: { speed: 15, direction: 'SW' },
      humidity: 85,
      visibility: 10,
      high: 44,
      low: 36,
    },
    {
      location: 'Petersburg',
      temp: 36,
      feels: 30,
      condition: 'Foggy',
      wind: { speed: 5, direction: 'E' },
      humidity: 95,
      visibility: 2,
      high: 40,
      low: 32,
    },
  ];

  return (
    <section className="section-spacing">
      <div className="container-news">
        <h2 className="font-headline text-2xl font-bold mb-6">Regional Weather</h2>
        
        {/* Windy Radar Embed */}
        <div className="rounded-lg overflow-hidden border border-border mb-6">
          <iframe
            title="Alaska Weather Radar"
            width="100%"
            height="400"
            src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=°F&metricWind=mph&zoom=4&overlay=radar&product=radar&level=surface&lat=63.5&lon=-152&detailLat=58.3&detailLon=-134.4&detail=true&message=true"
            frameBorder="0"
            className="w-full"
          />
        </div>

        {/* Detailed conditions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {conditions.map((loc) => (
            <Card key={loc.location} className="card-news p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-headline font-semibold text-lg">{loc.location}</h3>
                  <p className="text-sm text-muted-foreground">{loc.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-glacier">{loc.temp}°</p>
                  <p className="text-xs text-muted-foreground">
                    H: {loc.high}° L: {loc.low}°
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="h-3 w-3" />
                    Feels like
                  </span>
                  <span>{loc.feels}°F</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Wind className="h-3 w-3" />
                    Wind
                  </span>
                  <span>{loc.wind.speed} mph {loc.wind.direction}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Droplets className="h-3 w-3" />
                    Humidity
                  </span>
                  <span>{loc.humidity}%</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-3 w-3" />
                    Visibility
                  </span>
                  <span>{loc.visibility} mi</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
