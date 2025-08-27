import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface MobileMenuProps {
  onNavigate?: (section: string) => void;
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (section: string) => {
    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    onNavigate?.(section);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          <button
            onClick={() => handleNavigate('#features')}
            className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
            data-testid="nav-features"
          >
            Features
          </button>
          <button
            onClick={() => handleNavigate('#games')}
            className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
            data-testid="nav-games"
          >
            Games
          </button>
          <button
            onClick={() => handleNavigate('#download')}
            className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
            data-testid="nav-download"
          >
            Download
          </button>
          <button
            onClick={() => handleNavigate('#contact')}
            className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
            data-testid="nav-contact"
          >
            Contact
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
