import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { MapPin, Flag, RotateCcw } from "lucide-react";

export function FeaturesSection() {
  const sectionRef = useScrollAnimation();
  const feature1Ref = useScrollAnimation();
  const feature2Ref = useScrollAnimation();
  const feature3Ref = useScrollAnimation();

  return (
    <section id="features" className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16 scroll-fade">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="text-features-title">
            Navigate with <span className="text-primary">Precision</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" data-testid="text-features-description">
            Designed specifically for golf carts and low-speed vehicles, Cartin' provides accurate navigation tailored to everyday streets and communities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1: GPS Navigation */}
          <div 
            ref={feature1Ref}
            className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-fade transform hover:-translate-y-2"
            data-testid="card-feature-gps"
          >
            <div className="text-primary text-4xl mb-6">
              <MapPin className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid="text-feature-gps-title">GPS Navigation</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-feature-gps-description">
              Precise GPS navigation optimized for legal low speed vehicle routes. Explore your area or a new one live never before.
            </p>
          </div>

          {/* Feature 2: Games Integration */}
          <div 
            ref={feature2Ref}
            className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-fade transform hover:-translate-y-2"
            style={{ animationDelay: '0.2s' }}
            data-testid="card-feature-games"
          >
            <div className="text-primary text-4xl mb-6">
              <Flag className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid="text-feature-course-title">Game Integration</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-feature-course-description">
              Seamlessly integrates games into navigation experience, providing an easy-to-use and fun experience.
            </p>
          </div>

          {/* Feature 3: Real-time Updates */}
          <div 
            ref={feature3Ref}
            className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-fade transform hover:-translate-y-2"
            style={{ animationDelay: '0.4s' }}
            data-testid="card-feature-updates"
          >
            <div className="text-primary text-4xl mb-6">
              <RotateCcw className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4" data-testid="text-feature-updates-title">Real-time Updates</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-feature-updates-description">
              Get real-time updates on weather, and optimal routes for your golf cart journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
