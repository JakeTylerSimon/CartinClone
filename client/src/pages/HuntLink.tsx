// src/pages/HuntLink.tsx
import React, { useEffect, useMemo } from "react";

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = () => /Android/.test(navigator.userAgent);

const IOS_APP_ID = "6737774016";
const IOS_STORE_URL = `itms-apps://itunes.apple.com/app/id${IOS_APP_ID}`;
// const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=YOUR_PKG";

const APP_SCHEME = "cartin://";

function buildAppUrl(params: URLSearchParams) {
  const base = `${APP_SCHEME}hunt`;
  const q = new URLSearchParams();
  const gameId = params.get("gameId");
  const custom = params.get("custom");
  const items = params.get("items");
  if (gameId) q.set("gameId", gameId);
  if (custom === "true") q.set("custom", "true");
  if (items) q.set("items", items);
  const qs = q.toString();
  return qs ? `${base}?${qs}` : base;
}

function openAppOrStore(appUrl: string, storeUrl: string) {
  // If the page hides, the app likely opened; cancel fallback.
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    document.removeEventListener("visibilitychange", onVis);
    window.removeEventListener("pagehide", onVis);
  };
  const onVis = () => {
    if (document.visibilityState === "hidden") cancel();
  };
  document.addEventListener("visibilitychange", onVis, { once: true });
  window.addEventListener("pagehide", onVis, { once: true });

  // Trigger the app open (user gesture recommended).
  window.location.href = appUrl;

  // Fallback to the store if nothing happened.
  setTimeout(() => {
    if (!cancelled) {
      window.location.href = storeUrl;
    }
  }, 1200);
}

export default function HuntLink() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const appUrl = useMemo(() => buildAppUrl(params), [params]);

  // Optional: small auto-attempt on iOS so users with the app jump immediately.
  useEffect(() => {
    if (!isIOS()) return;
    const t = setTimeout(() => {
      // Do NOT fall back automatically here — only on button click.
      // Auto-fallback can yank users before the app finishes opening.
      window.location.href = appUrl;
    }, 250);
    return () => clearTimeout(t);
  }, [appUrl]);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isIOS()) openAppOrStore(appUrl, IOS_STORE_URL);
    // else if (isAndroid()) openAppOrStore(appUrl, ANDROID_STORE_URL);
    else window.location.href = appUrl; // desktop: do nothing special
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "70vh",
        padding: 24,
        textAlign: "center",
      }}
    >
      <h1>Opening Cartin…</h1>
      <p>If nothing happens, tap the button below.</p>

      <div style={{ marginTop: 16 }}>
        <a
          href={appUrl}
          onClick={handleOpen}
          style={{
            padding: "12px 20px",
            border: "2px solid #111",
            borderRadius: 999,
            textDecoration: "none",
          }}
        >
          Open in App
        </a>
      </div>

      {/* Optional: explicit store link as a backup */}
      <div style={{ marginTop: 12, opacity: 0.7 }}>
        <a href={IOS_STORE_URL} style={{ color: "blue" }}>
          Get the app on the App Store
        </a>
      </div>
    </div>
  );
}
