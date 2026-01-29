import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Clock } from 'lucide-react';

const CommunityCalendar = () => {
  const events = [
    {
      title: 'Juneau Jazz & Classics Festival',
      date: 'Feb 1-8',
      location: 'Various Venues, Juneau',
      type: 'Music',
    },
    {
      title: 'Whalefest Sitka',
      date: 'Feb 15-17',
      location: 'Harrigan Centennial Hall, Sitka',
      type: 'Festival',
    },
    {
      title: 'Ketchikan Winter Arts Faire',
      date: 'Feb 8',
      location: 'Ted Ferry Civic Center, Ketchikan',
      type: 'Arts',
    },
    {
      title: 'Petersburg Canned Salmon Classic',
      date: 'Feb 22',
      location: 'Petersburg Harbor',
      type: 'Sports',
    },
    {
      title: 'Southeast Alaska Native Artists Market',
      date: 'Feb 14-16',
      location: 'Centennial Hall, Juneau',
      type: 'Market',
    },
    {
      title: 'Haines Bald Eagle Festival Planning Meeting',
      date: 'Feb 5',
      location: 'Haines Library',
      type: 'Community',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Music':
        return 'bg-glacier/20 text-glacier';
      case 'Festival':
        return 'bg-coral/20 text-coral';
      case 'Arts':
        return 'bg-amber/20 text-amber';
      case 'Sports':
        return 'bg-info/20 text-info';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section className="section-spacing bg-navy-medium">
      <div className="container-news">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-6 w-6 text-glacier" />
          <h2 className="font-headline text-2xl font-bold">Community Calendar</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <Card key={index} className="card-news p-4">
              <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded mb-2 ${getTypeColor(event.type)}`}>
                {event.type}
              </span>
              <h3 className="font-headline font-semibold mb-2">{event.title}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>{event.location}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityCalendar;
