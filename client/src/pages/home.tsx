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
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroGradient = document.querySelector(
        ".hero-gradient"
      ) as HTMLElement;

      if (heroGradient) {
        heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip link for keyboard & screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-background text-foreground px-4 py-2 rounded-md shadow"
      >
        Skip to main content
      </a>

      {/* Header landmark */}
      <header>
        <Navigation />
        <HeroSection />
      </header>

      {/* Main content landmark */}
      <main id="main-content">
        <div
          className="trial-banner"
          role="region"
          aria-label="Free trial promotion"
        >
          <div className="trial-banner-text">Download a Free Trial today!</div>
        </div>

        <FeaturesSection />
        <GamesSection />
        <ScreenshotsSection />
        <CTASection />
      </main>

      {/* Footer landmark */}
      <Footer />
    </div>
  );
}
