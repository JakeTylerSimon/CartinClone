import { MobileMenu } from "@/components/ui/mobile-menu";

export function Navigation() {
  const handleNavigate = (section: string) => {
    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
              data-testid="logo-icon"
            >
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <circle cx="12" cy="12" r="3" fill="white" />
            </svg>
            <span className="text-2xl font-bold text-primary" data-testid="text-logo">Cartin</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigate('#features')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-features-desktop"
            >
              Features
            </button>
            <button
              onClick={() => handleNavigate('#games')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-games-desktop"
            >
              Games
            </button>
            <button
              onClick={() => handleNavigate('#download')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-download-desktop"
            >
              Download
            </button>
            <button
              onClick={() => handleNavigate('#contact')}
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-contact-desktop"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu */}
          <MobileMenu onNavigate={handleNavigate} />
        </div>
      </div>
    </nav>
  );
}
