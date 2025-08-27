import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { GamesSection } from "@/components/games-section";
import { ScreenshotsSection } from "@/components/screenshots-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Parallax effect for hero section
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroGradient = document.querySelector('.hero-gradient') as HTMLElement;
      if (heroGradient) {
        heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      
      {/* Orange Divider Pattern */}
      <div className="py-8">
        {Array.from({ length: 5 }, (_, index) => (
          <div 
            key={index}
            className={`orange-divider my-2 mx-4 ${
              index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
            }`}
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          />
        ))}
      </div>
      
      <FeaturesSection />
      <GamesSection />
      <ScreenshotsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
