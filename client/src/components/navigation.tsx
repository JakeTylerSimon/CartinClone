import { MobileMenu } from "@/components/ui/mobile-menu";
import React from "react";

export function Navigation() {
  const onHome =
    typeof window !== "undefined" && window.location.pathname === "/";

  const handleNavigate = (section: string, e?: React.MouseEvent) => {
    const id = section.startsWith("#") ? section.slice(1) : section; // "features"
    if (onHome) {
      // smooth scroll on the home page
      e?.preventDefault?.();
      const el = document.querySelector(`#${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // jump to home with hash (works from /privacy, etc.)
      window.location.href = `/#${id}`;
    }
  };

  // Helper to render links as anchors for proper URL/hovers,
  // but intercept clicks for smooth-scroll when already on "/".
  const NavLink = ({
    to,
    children,
    testId,
  }: {
    to: string; // '#features'
    children: React.ReactNode;
    testId?: string;
  }) => (
    <a
      href={`/${to}`} // -> "/#features"
      onClick={(e) => handleNavigate(to, e)}
      className="text-foreground hover:text-primary transition-colors"
      data-testid={testId}
    >
      {children}
    </a>
  );

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
            <span
              className="text-2xl font-bold text-primary nav-name-header"
              data-testid="text-logo"
            >
              Cartin'
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="#features" testId="nav-features-desktop">
              Features
            </NavLink>
            <NavLink to="#games" testId="nav-games-desktop">
              Games
            </NavLink>
            <NavLink to="#download" testId="nav-download-desktop">
              Download
            </NavLink>
            <NavLink to="#contact" testId="nav-contact-desktop">
              Contact
            </NavLink>

            {/* Direct route link works from anywhere */}
            <a
              href="/privacy"
              className="text-foreground hover:text-primary transition-colors"
              data-testid="nav-privacy-desktop"
            >
              Privacy Policy
            </a>
          </div>

          {/* Mobile Menu */}
          {/* Pass the same handler so menu items also work cross-route */}
          <MobileMenu onNavigate={(hash) => handleNavigate(hash)} />
        </div>
      </div>
    </nav>
  );
}
