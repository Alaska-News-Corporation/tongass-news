import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface Alert {
  id: string;
  message: string;
  severity: string;
}

const AlertTicker = () => {
  const { data: alerts = [] } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Alert[];
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  // Fallback alerts if database is empty
  const fallbackAlerts: Alert[] = [
    { id: '1', message: 'Marine weather advisory in effect for Stephens Passage through Thursday', severity: 'warning' },
    { id: '2', message: 'Ferry service to Sitka operating on modified schedule due to vessel maintenance', severity: 'info' },
    { id: '3', message: 'High avalanche danger in alpine terrain above 2,500 feet', severity: 'critical' },
  ];

  const displayAlerts = alerts.length > 0 ? alerts : fallbackAlerts;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-3 w-3" />;
      case 'warning':
        return <AlertTriangle className="h-3 w-3" />;
      default:
        return <Info className="h-3 w-3" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-destructive';
      case 'warning':
        return 'text-amber';
      default:
        return 'text-glacier';
    }
  };

  if (displayAlerts.length === 0) return null;

  return (
    <div className="bg-secondary border-b border-border/30 overflow-hidden py-2">
      <div className="relative">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...displayAlerts, ...displayAlerts].map((alert, index) => (
            <div
              key={`${alert.id}-${index}`}
              className={`flex items-center gap-2 px-8 text-sm ${getSeverityClass(alert.severity)}`}
            >
              {getSeverityIcon(alert.severity)}
              <span className="font-medium uppercase text-xs tracking-wide">
                {alert.severity === 'critical' ? 'ALERT' : alert.severity === 'warning' ? 'ADVISORY' : 'INFO'}
              </span>
              <span className="text-foreground">{alert.message}</span>
              <span className="mx-4 text-muted-foreground">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertTicker;
