import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Map from "@assets/App_Map.jpg";
import Location from "@assets/App_Location.jpg";
import Waffle from "@assets/App_Waffle.jpg";
import Scavenger from "@assets/App_Scavenger.jpg";

export function ScreenshotsSection() {
  const sectionRef = useScrollAnimation();
  const carouselRef = useScrollAnimation();

  const screenshots = [
    {
      src: Map,
      alt: "Course map screenshot",
    },
    {
      src: Location,
      alt: "Location tracking screenshot",
    },
    {
      src: Waffle,
      alt: "Navigation interface screenshot",
    },
    {
      src: Scavenger,
      alt: "Scavenger hunt game screenshot",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16 scroll-fade">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-screenshots-title">
            See Cartin' in <span className="text-primary">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-screenshots-description">
            Experience the beautiful interface designed specifically for LSV navigation.
          </p>
        </div>

        {/* Screenshots Carousel */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto space-x-6 pb-6 scroll-fade" 
          style={{ animationDelay: '0.3s' }}
          data-testid="carousel-screenshots"
        >
          {screenshots.map((screenshot, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-72 bg-card rounded-2xl p-4 shadow-lg"
              data-testid={`screenshot-${index}`}
            >
              <img 
                src={screenshot.src}
                alt={screenshot.alt}
                className="w-full h-auto rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
