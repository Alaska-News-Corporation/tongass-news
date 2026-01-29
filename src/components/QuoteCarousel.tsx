import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "In Southeast Alaska, the forest and the sea are not two separate worlds - they are one living, breathing ecosystem.",
    author: "John Muir",
    title: "Naturalist & Explorer"
  },
  {
    text: "The Tongass is not just trees. It's the salmon, the bears, the eagles, and the people who have called this place home for thousands of years.",
    author: "Richard Carstensen",
    title: "Local Naturalist"
  },
  {
    text: "When the tide goes out, the table is set. This coast provides for those who know how to listen.",
    author: "Tlingit Proverb",
    title: "Traditional Wisdom"
  },
  {
    text: "Living in Southeast Alaska means accepting that nature is in charge, and finding joy in the wildness of it all.",
    author: "Maria Stein",
    title: "Juneau Resident"
  },
];

const QuoteCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const quote = quotes[currentIndex];

  return (
    <section className="section-spacing bg-navy-medium">
      <div className="container-news">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="h-8 w-8 text-glacier mx-auto mb-4 opacity-60" />
          <blockquote className="font-headline text-xl sm:text-2xl md:text-3xl italic text-foreground leading-relaxed mb-6">
            "{quote.text}"
          </blockquote>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{quote.author}</span>
            <span className="mx-2">—</span>
            <span>{quote.title}</span>
          </div>
          
          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-6 bg-glacier' 
                    : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteCarousel;
