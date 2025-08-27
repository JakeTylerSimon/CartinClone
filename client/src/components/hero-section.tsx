import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function HeroSection() {
  const heroRef = useScrollAnimation();

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 scroll-fade"
    >
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <svg className="w-12 h-12 text-accent opacity-30" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="8" r="3" fill="white" />
        </svg>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <svg className="w-10 h-10 text-primary-foreground opacity-20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" fill="white" />
        </svg>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <svg className="w-16 h-16 text-accent opacity-25" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L13.5 7.5L19 9L13.5 10.5L12 16L10.5 10.5L5 9L10.5 7.5Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight" data-testid="text-hero-title">
            Navigate Your Golf Cart
            <span className="block text-accent">Like Never Before</span>
          </h1>
          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto" data-testid="text-hero-description">
            Experience the ultimate golf cart navigation app with exciting games like Scavenger Hunt and Poker Run. Built for sunny communities across the United States.
          </p>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a 
            href="#" 
            className="transition-transform hover:scale-105 bg-black text-white px-8 py-3 rounded-lg flex items-center space-x-3 font-semibold"
            data-testid="link-app-store"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs">Download on the</div>
              <div className="text-sm font-bold">App Store</div>
            </div>
          </a>
          <a 
            href="#" 
            className="transition-transform hover:scale-105 bg-black text-white px-8 py-3 rounded-lg flex items-center space-x-3 font-semibold"
            data-testid="link-google-play"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs">Get it on</div>
              <div className="text-sm font-bold">Google Play</div>
            </div>
          </a>
        </div>

        {/* Hero Image */}
        <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <img 
            src="@assets/Cartin_webcover_1_1756318637741.avif" 
            alt="Cartin app interface on mobile devices" 
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full h-auto"
            data-testid="img-hero-golf-course"
          />
        </div>
      </div>
    </section>
  );
}
