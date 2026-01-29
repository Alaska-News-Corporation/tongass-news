import { Card } from '@/components/ui/card';
import { Star, Award, Heart } from 'lucide-react';

const LocalSpotlight = () => {
  const spotlights = [
    {
      type: 'Business',
      icon: Star,
      title: 'Silverbow Bakery Celebrates 50 Years',
      description: 'The beloved Juneau institution marks half a century of serving sourdough bread and community spirit.',
      location: 'Juneau',
    },
    {
      type: 'Hero',
      icon: Award,
      title: 'Coast Guard Crew Rescues Stranded Kayakers',
      description: 'Station Juneau team braves rough seas to save three paddlers near Admiralty Island.',
      location: 'Admiralty Island',
    },
    {
      type: 'Milestone',
      icon: Heart,
      title: 'Sitka Community Garden Expands',
      description: 'Volunteer effort adds 20 new plots, bringing fresh produce to more families.',
      location: 'Sitka',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Business':
        return 'text-amber';
      case 'Hero':
        return 'text-destructive';
      case 'Milestone':
        return 'text-glacier';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <section className="section-spacing">
      <div className="container-news">
        <h2 className="font-headline text-2xl font-bold mb-6">Local Spotlight</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {spotlights.map((item, index) => (
            <Card key={index} className="card-news p-5">
              <div className="flex items-center gap-2 mb-3">
                <item.icon className={`h-5 w-5 ${getTypeColor(item.type)}`} />
                <span className={`text-xs font-medium uppercase tracking-wide ${getTypeColor(item.type)}`}>
                  {item.type}
                </span>
              </div>
              <h3 className="font-headline font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
              <span className="text-xs text-glacier">{item.location}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalSpotlight;
