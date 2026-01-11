import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Map from "@assets/App_Map.jpg";
import Location from "@assets/App_Location.jpg";
import Waffle from "@assets/App_Waffle.jpg";
import Scavenger from "@assets/App_Scavenger.jpg";
import carousel1 from "@assets/Carousel1.png";
import carousel2 from "@assets/Carousel2.png";
import carousel3 from "@assets/Carousel3.png";
import carousel4 from "@assets/Carousel4.png";
import carousel5 from "@assets/Carousel5.png";

export function ScreenshotsSection() {
  const sectionRef = useScrollAnimation();
  const carouselRef = useScrollAnimation();

  const screenshots = [
    {
      src: carousel1,
      alt: "Course map screenshot",
    },
    {
      src: carousel2,
      alt: "Location tracking screenshot",
    },
    {
      src: carousel3,
      alt: "Navigation interface screenshot",
    },
    {
      src: carousel4,
      alt: "Screenshot showing the scavenger hunt game interface with checkpoints on the map",
    },
    {
      src: carousel5,
      alt: "Screenshot showing the scavenger hunt game interface with checkpoints on the map",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16 scroll-fade">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            data-testid="text-screenshots-title"
          >
            See Cartin' in <span className="text-primary">Action</span>
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            data-testid="text-screenshots-description"
          >
            Experience the beautiful interface designed specifically for LSV
            navigation.
          </p>
        </div>

        {/* Screenshots Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto space-x-6 pb-6 scroll-fade"
          style={{ animationDelay: "0.3s" }}
          data-testid="carousel-screenshots"
        >
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 rounded-2xl overflow-hidden"
              data-testid={`screenshot-${index}`}
            >
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                className="w-full h-auto object-contain bg-background"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
