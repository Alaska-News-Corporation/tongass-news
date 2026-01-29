import { Card } from '@/components/ui/card';
import { Footprints, Fish, Anchor, Mountain, AlertTriangle } from 'lucide-react';

const OutdoorRecreation = () => {
  const sections = [
    {
      icon: Footprints,
      title: 'Trail Conditions',
      items: [
        { name: 'Perseverance Trail', status: 'Open', condition: 'Icy in spots, traction recommended' },
        { name: 'Rainbird Trail (Ketchikan)', status: 'Open', condition: 'Muddy, boardwalks slippery' },
        { name: 'Indian River Trail (Sitka)', status: 'Open', condition: 'Good condition' },
        { name: 'Mendenhall Glacier Trails', status: 'Open', condition: 'Snow above 1,500 ft' },
      ],
    },
    {
      icon: Fish,
      title: 'Fishing Reports',
      items: [
        { name: 'Auke Bay', status: 'Fair', condition: 'Early king salmon activity reported' },
        { name: 'Gastineau Channel', status: 'Slow', condition: 'Waiting for spring runs' },
        { name: 'Ketchikan Harbor', status: 'Good', condition: 'Blackcod and lingcod active' },
        { name: 'Sitka Sound', status: 'Good', condition: 'Halibut season preparation' },
      ],
    },
    {
      icon: Anchor,
      title: 'Harbor Status',
      items: [
        { name: 'Aurora Harbor (Juneau)', status: 'Normal', condition: 'Guest moorage available' },
        { name: 'Thomas Basin (Ketchikan)', status: 'Normal', condition: 'Fuel dock open 6AM-8PM' },
        { name: 'ANB Harbor (Sitka)', status: 'Normal', condition: 'Winter rates in effect' },
        { name: 'South Harbor (Petersburg)', status: 'Normal', condition: 'Haul-out by appointment' },
      ],
    },
  ];

  const avalancheInfo = {
    danger: 'Considerable',
    level: 3,
    details: 'Natural and human-triggered avalanches likely in steep terrain above 2,500 ft. Avoid avalanche terrain or use extreme caution.',
  };

  return (
    <section className="section-spacing">
      <div className="container-news">
        <h2 className="font-headline text-2xl font-bold mb-6">Outdoor Recreation</h2>

        {/* Avalanche Advisory - RED styling */}
        <Card className="card-news p-4 mb-6 border-destructive/50 bg-destructive/10">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-destructive/20 rounded-lg shrink-0">
              <Mountain className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-destructive">Avalanche Advisory</h3>
                <span className="px-2 py-0.5 text-xs font-medium bg-destructive text-destructive-foreground rounded">
                  Level {avalancheInfo.level}: {avalancheInfo.danger}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{avalancheInfo.details}</p>
            </div>
          </div>
        </Card>

        {/* Recreation Sections */}
        <div className="grid lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Card key={section.title} className="card-news p-4">
              <div className="flex items-center gap-2 mb-4">
                <section.icon className="h-5 w-5 text-glacier" />
                <h3 className="font-headline font-semibold">{section.title}</h3>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.name} className="text-sm">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-medium">{item.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        item.status === 'Good' || item.status === 'Open' || item.status === 'Normal'
                          ? 'bg-glacier/20 text-glacier'
                          : item.status === 'Fair'
                          ? 'bg-amber/20 text-amber'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.condition}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutdoorRecreation;
