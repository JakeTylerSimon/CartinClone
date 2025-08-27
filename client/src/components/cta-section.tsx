import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Download } from "lucide-react";

export function CTASection() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="download" className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={sectionRef} className="scroll-fade">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="Florida sunshine landscape" 
            className="w-full h-64 object-cover rounded-2xl mb-12 shadow-2xl"
            data-testid="img-florida-landscape"
          />
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6" data-testid="text-cta-title">
            Ready to Explore Florida's Courses?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto" data-testid="text-cta-description">
            Join thousands of golf cart enthusiasts who are already navigating and gaming with Cartin across Florida's beautiful golf courses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary-foreground/90 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              data-testid="button-download-cta"
            >
              <Download className="w-5 h-5" />
              <span>Download Now</span>
            </button>
            <button 
              className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-foreground hover:text-primary transition-all duration-300"
              data-testid="button-learn-more"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
