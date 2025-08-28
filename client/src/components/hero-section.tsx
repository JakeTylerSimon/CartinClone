import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import bannerImage from "@assets/Cartin_webcover_1_1756318637741.avif";
import React from "react";

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = () => /Android/.test(navigator.userAgent);

// iOS store links (use both direct scheme + https as fallback)
const IOS_APP_ID = "6737774016";
const IOS_STORE_DIRECT = `itms-apps://itunes.apple.com/app/id${IOS_APP_ID}`;
const IOS_STORE_HTTP = `https://apps.apple.com/app/id${IOS_APP_ID}`;

// Android (fill in when live)
// const ANDROID_PKG = "com.your.package"; // TODO: replace when you publish
// const PLAY_DIRECT = `market://details?id=${ANDROID_PKG}`;
// const PLAY_HTTP = `https://play.google.com/store/apps/details?id=${ANDROID_PKG}`;

function openAppStore(e: React.MouseEvent) {
  e.preventDefault();
  if (isIOS()) {
    // try the fast lane
    window.location.href = IOS_STORE_DIRECT;
    // if the scheme is blocked, fall back to https
    setTimeout(() => (window.location.href = IOS_STORE_HTTP), 250);
  } else {
    // desktop/others
    window.location.href = IOS_STORE_HTTP;
  }
}

// function openPlayStore(e: React.MouseEvent) {
//   e.preventDefault();
//   if (isAndroid()) {
//     window.location.href = PLAY_DIRECT;
//     setTimeout(() => (window.location.href = PLAY_HTTP), 250);
//   } else {
//     window.location.href = PLAY_HTTP;
//   }
// }

export function HeroSection() {
  const heroRef = useScrollAnimation();

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 scroll-fade"
    >
      <div className="absolute inset-0 hero-gradient"></div>

      {/* …floating SVGs omitted for brevity… */}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            Navigate Your Golf Cart
            <span className="block text-accent">Like Never Before</span>
          </h1>
          <p
            className="text-xl sm:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto"
            data-testid="text-hero-description"
          >
            Experience the ultimate golf cart navigation app with exciting games
            like Scavenger Hunt and Poker Run. Built for sunny communities
            across the United States.
          </p>
        </div>

        {/* App Store Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {/* iOS */}
          <a
            href={IOS_STORE_HTTP} // good for bots/SEO
            onClick={openAppStore} // fast, safe open for humans
            className="transition-transform hover:scale-105 bg-black text-white px-8 py-3 rounded-lg flex items-center space-x-3 font-semibold"
            data-testid="link-app-store"
            rel="noopener"
            aria-label="Download on the App Store"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-xs">Download on the</div>
              <div className="text-sm font-bold">App Store</div>
            </div>
          </a>

          {/* Android (enable when live) */}
          {/* <a
            href={PLAY_HTTP}
            onClick={openPlayStore}
            className="transition-transform hover:scale-105 bg-black text-white px-8 py-3 rounded-lg flex items-center space-x-3 font-semibold"
            data-testid="link-google-play"
            rel="noopener"
            aria-label="Get it on Google Play"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            <div className="text-left">
              <div className="text-xs">Get it on</div>
              <div className="text-sm font-bold">Google Play</div>
            </div>
          </a> */}
        </div>

        <div className="animate-scale-in" style={{ animationDelay: "0.6s" }}>
          <img
            src={bannerImage}
            alt="Cartin app interface on mobile devices"
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full h-auto"
            data-testid="img-hero-golf-course"
          />
        </div>
      </div>
    </section>
  );
}
