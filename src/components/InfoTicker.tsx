import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Fish, Calendar, Ship, Thermometer } from 'lucide-react';

interface TickerMessage {
  id: string;
  label: string;
  message: string;
}

const InfoTicker = () => {
  const { data: messages = [] } = useQuery({
    queryKey: ['ticker_messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ticker_messages')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as TickerMessage[];
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const fallbackMessages: TickerMessage[] = [
    { id: '1', label: 'FISHING', message: 'King salmon run expected to peak mid-February in Auke Bay' },
    { id: '2', label: 'FERRY', message: 'MV Columbia departing Juneau for Ketchikan at 6:00 AM Thursday' },
    { id: '3', label: 'EVENTS', message: 'Juneau Jazz & Classics Festival tickets on sale now' },
    { id: '4', label: 'HARBOR', message: 'Aurora Harbor guest moorage available, contact harbormaster' },
    { id: '5', label: 'WEATHER', message: 'Rain expected through weekend, accumulation 2-4 inches' },
  ];

  const displayMessages = messages.length > 0 ? messages : fallbackMessages;

  const getLabelIcon = (label: string) => {
    switch (label.toUpperCase()) {
      case 'FISHING':
        return <Fish className="h-3 w-3" />;
      case 'EVENTS':
        return <Calendar className="h-3 w-3" />;
      case 'FERRY':
      case 'HARBOR':
        return <Ship className="h-3 w-3" />;
      default:
        return <Thermometer className="h-3 w-3" />;
    }
  };

  return (
    <div className="bg-secondary/30 border-y border-border/30 overflow-hidden py-2.5">
      <div className="relative">
        <div className="flex animate-ticker-fast whitespace-nowrap">
          {[...displayMessages, ...displayMessages].map((msg, index) => (
            <div
              key={`${msg.id}-${index}`}
              className="flex items-center gap-2 px-6 text-sm"
            >
              <span className="flex items-center gap-1.5 font-semibold text-glacier uppercase text-xs tracking-wide">
                {getLabelIcon(msg.label)}
                {msg.label}
              </span>
              <span className="text-foreground/80">{msg.message}</span>
              <span className="mx-4 text-muted-foreground/40">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoTicker;
