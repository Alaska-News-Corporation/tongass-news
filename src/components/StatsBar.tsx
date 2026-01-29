import { useState, useEffect } from 'react';
import { Users, Clock } from 'lucide-react';

const StatsBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [readerCount, setReaderCount] = useState(247);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate reader count fluctuation
    const readerTimer = setInterval(() => {
      setReaderCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(readerTimer);
    };
  }, []);

  const formatAlaskaTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      timeZone: 'America/Anchorage',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="stats-bar py-2">
      <div className="container-news flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-primary" />
          <span className="font-medium text-foreground">{formatAlaskaTime(currentTime)}</span>
          <span className="text-muted-foreground">AKST</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          <Users className="h-3 w-3 text-primary" />
          <span className="font-medium text-foreground">{readerCount.toLocaleString()}</span>
          <span className="text-muted-foreground">readers online</span>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
