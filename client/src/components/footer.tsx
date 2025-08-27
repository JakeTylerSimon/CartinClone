import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  const handleNavigate = (section: string) => {
    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <svg
                className="w-8 h-8 text-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
                data-testid="footer-logo-icon"
              >
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
              <span className="text-2xl font-bold text-primary" data-testid="text-footer-logo">Cartin</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md" data-testid="text-footer-description">
              Navigate your golf cart with precision and play exciting games on Florida's most beautiful golf courses.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="text-quick-links-title">Quick Links</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>
                <button 
                  onClick={() => handleNavigate('#features')}
                  className="hover:text-primary transition-colors text-left"
                  data-testid="nav-footer-features"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('#games')}
                  className="hover:text-primary transition-colors text-left"
                  data-testid="nav-footer-games"
                >
                  Games
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('#download')}
                  className="hover:text-primary transition-colors text-left"
                  data-testid="nav-footer-download"
                >
                  Download
                </button>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-primary transition-colors"
                  data-testid="link-footer-support"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4" data-testid="text-contact-title">Contact</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center" data-testid="contact-location">
                <MapPin className="mr-2 text-primary w-4 h-4" />
                Florida, USA
              </li>
              <li className="flex items-center" data-testid="contact-email">
                <Mail className="mr-2 text-primary w-4 h-4" />
                hello@cartin.app
              </li>
              <li className="flex items-center" data-testid="contact-phone">
                <Phone className="mr-2 text-primary w-4 h-4" />
                (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60" data-testid="text-copyright">
            © 2024 Cartin. All rights reserved. Built for Florida's golf cart enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}
