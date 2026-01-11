import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Download } from "lucide-react";
import React from "react";
import QRCartin from "../../../attached_assets/qr-cartin.jpeg";
import PhoneImage from "../../../attached_assets/phone-cartin.png";

const IOS_APP_ID = "6737774016";
const IOS_STORE_DIRECT = `itms-apps://itunes.apple.com/app/id${IOS_APP_ID}`;
const IOS_STORE_HTTP = `https://apps.apple.com/app/id${IOS_APP_ID}`;

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

function openAppStore(e: React.MouseEvent) {
  e.preventDefault();
  if (isIOS()) {
    window.location.href = IOS_STORE_DIRECT;
    setTimeout(() => (window.location.href = IOS_STORE_HTTP), 250);
  } else {
    window.location.href = IOS_STORE_HTTP;
  }
}

export function CTASection() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      id="download"
      className="py-20 bg-gradient-to-r from-primary to-secondary"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="scroll-fade bg-primary-foreground rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Left: Phone mockup */}
            <div className="flex justify-center">
              <img
                src={PhoneImage}
                alt="Cartin app preview showing navigation and route guidance"
                className="w-full max-w-sm object-contain"
              />
            </div>

            {/* Right: QR + Text */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Scan to download the app
              </h2>

              <p className="text-lg text-muted-foreground mb-6">
                Use your phone camera to scan the QR code or download directly
                from the App Store.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* QR Code */}
                <img
                  src={QRCartin}
                  alt="QR code linking to the Cartin app on the App Store"
                  className="w-40 h-40 object-contain"
                />

                {/* App Store button */}
                <a
                  href={IOS_STORE_HTTP}
                  onClick={openAppStore}
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                  aria-label="Download Cartin from the App Store"
                >
                  <Download className="w-5 h-5" aria-hidden="true" />
                  Download on the App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
