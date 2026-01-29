import { Cloud, Thermometer, Wind, Droplets } from 'lucide-react';

const WeatherStrip = () => {
  const locations = [
    { name: 'Juneau', temp: 38, condition: 'Overcast', wind: 12, humidity: 78 },
    { name: 'Ketchikan', temp: 42, condition: 'Rainy', wind: 8, humidity: 92 },
    { name: 'Sitka', temp: 40, condition: 'Cloudy', wind: 15, humidity: 85 },
    { name: 'Petersburg', temp: 36, condition: 'Foggy', wind: 5, humidity: 95 },
  ];

  return (
    <div className="weather-strip py-2">
      <div className="container-news">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-4 sm:gap-6">
          {locations.map((loc) => (
            <div key={loc.name} className="flex items-center gap-3 text-xs whitespace-nowrap shrink-0">
              <span className="font-medium text-foreground">{loc.name}</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Thermometer className="h-3 w-3 text-glacier" />
                <span>{loc.temp}°F</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Cloud className="h-3 w-3" />
                <span>{loc.condition}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-muted-foreground">
                <Wind className="h-3 w-3" />
                <span>{loc.wind} mph</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherStrip;
