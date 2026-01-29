import { Card } from '@/components/ui/card';
import { Waves, ArrowUp, ArrowDown } from 'lucide-react';

const TideChart = () => {
  const today = new Date();
  const tides = [
    { time: '2:14 AM', height: 14.8, type: 'High' },
    { time: '8:47 AM', height: 1.2, type: 'Low' },
    { time: '2:52 PM', height: 15.6, type: 'High' },
    { time: '9:18 PM', height: 0.8, type: 'Low' },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="section-spacing bg-navy-medium">
      <div className="container-news">
        <div className="flex items-center gap-3 mb-6">
          <Waves className="h-6 w-6 text-glacier" />
          <div>
            <h2 className="font-headline text-2xl font-bold">Tide Schedule</h2>
            <p className="text-sm text-muted-foreground">Juneau • Gastineau Channel</p>
          </div>
        </div>

        <Card className="card-news p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">{formatDate(today)}</span>
            <span className="text-xs text-glacier">All times AKST</span>
          </div>

          {/* Visual tide curve */}
          <div className="relative h-24 mb-6">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="50" x2="400" y2="50" stroke="hsl(var(--border))" strokeDasharray="4" />
              
              {/* Tide curve */}
              <path
                d="M 0,20 Q 50,20 100,80 Q 150,80 200,15 Q 250,15 300,85 Q 350,85 400,25"
                fill="none"
                stroke="hsl(var(--glacier))"
                strokeWidth="2"
              />
              <path
                d="M 0,20 Q 50,20 100,80 Q 150,80 200,15 Q 250,15 300,85 Q 350,85 400,25 L 400,100 L 0,100 Z"
                fill="url(#tideGradient)"
                opacity="0.3"
              />
              
              <defs>
                <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--glacier))" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Time markers */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
              <span>12AM</span>
              <span>6AM</span>
              <span>12PM</span>
              <span>6PM</span>
              <span>12AM</span>
            </div>
          </div>

          {/* Tide times */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {tides.map((tide, index) => (
              <div
                key={index}
                className={`text-center p-3 rounded-lg ${
                  tide.type === 'High' ? 'bg-glacier/10' : 'bg-secondary/50'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {tide.type === 'High' ? (
                    <ArrowUp className="h-3 w-3 text-glacier" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className={`text-xs font-medium ${
                    tide.type === 'High' ? 'text-glacier' : 'text-muted-foreground'
                  }`}>
                    {tide.type}
                  </span>
                </div>
                <p className="font-semibold">{tide.time}</p>
                <p className="text-sm text-muted-foreground">{tide.height} ft</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TideChart;
