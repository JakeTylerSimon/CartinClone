// src/pages/VendorLink.tsx
import React, { useEffect, useMemo, useState, useCallback } from "react";

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = () => /Android/.test(navigator.userAgent);

// --- Constants ---
const IOS_APP_ID = "6737774016";
const PLAIN_IOS_STORE_URL = `itms-apps://itunes.apple.com/app/id${IOS_APP_ID}`;
// const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=YOUR_PKG";

// Use your custom scheme (works whether installed via UL or not)
const APP_SCHEME = "cartin://";

// IMPORTANT: If your site domain is separate from your API Gateway origin,
// either set up a reverse proxy so "/redirect" points at the gateway,
// or change this to the absolute API URL and ensure CORS is enabled server-side.
const API_BASE = "/redirect";

// Build the deep link that your app handles.
function buildAppUrl(vendorId: string | null, vendorReferral?: string | null) {
  const base = `${APP_SCHEME}rental`;
  const q = new URLSearchParams();
  if (vendorReferral) q.set("vendorReferral", vendorReferral);
  else if (vendorId) q.set("vendorId", vendorId);
  const qs = q.toString();
  return qs ? `${base}?${qs}` : base;
}

// Try to open the app; if we remain visible after some time, go to the Store.
function openAppOrStore(appUrl: string, storeUrl: string) {
  let cancelled = false;
  const onVis = () => {
    if (document.visibilityState === "hidden") {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onVis);
    }
  };
  document.addEventListener("visibilitychange", onVis, { once: true });
  window.addEventListener("pagehide", onVis, { once: true });

  // Attempt to open the app
  window.location.href = appUrl;

  // Fallback: if page is still visible after ~1.2s, assume app didn't open
  setTimeout(() => {
    if (!cancelled) window.location.href = storeUrl;
  }, 1200);
}

export default function VendorLink() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const vendorId = params.get("vendorId");
  // Optional: signed token param if you adopt the hardening step later
  const signedToken = params.get("t");

  const [referralToken, setReferralToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!(vendorId || signedToken));
  const [error, setError] = useState<string | null>(null);

  // Mint a referral token server-side (JSON mode).
  // If you switch to signed tokens, call `/redirect?t=...&format=json`
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function run() {
      if (!vendorId && !signedToken) return;

      setLoading(true);
      setError(null);
      try {
        const qp = new URLSearchParams();
        if (signedToken) qp.set("t", signedToken);
        else if (vendorId) qp.set("vendorId", vendorId);
        qp.set("format", "json");

        const url = `${API_BASE}?${qp.toString()}`;
        const r = await fetch(url, {
          credentials: "include",
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();

        if (!mounted) return;
        if (data?.success && data?.vendorReferral) {
          setReferralToken(String(data.vendorReferral));
        } else {
          // Not fatal: we can still deep link with vendorId fallback
          setReferralToken(null);
        }
      } catch (e: any) {
        if (!mounted) return;
        // Swallow for UX, but keep a light message for debugging
        setError("We couldn't pre-register your referral, continuing...");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [vendorId, signedToken]);

  const appUrl = useMemo(
    () => buildAppUrl(vendorId, referralToken),
    [vendorId, referralToken]
  );

  // Gentle auto-attempt on iOS so users don’t have to tap
  useEffect(() => {
    if (!isIOS()) return;
    // Small delay lets the fetch above resolve first on fast networks
    const t = setTimeout(() => {
      window.location.href = appUrl;
    }, 250);
    return () => clearTimeout(t);
  }, [appUrl]);

  const handleOpen = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const fallbackStore = PLAIN_IOS_STORE_URL; // No token needed here
      if (isIOS()) openAppOrStore(appUrl, fallbackStore);
      // else if (isAndroid()) openAppOrStore(appUrl, ANDROID_STORE_URL);
      else window.location.href = appUrl;
    },
    [appUrl]
  );

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
      <h1>Opening Cartin — Vendor Link…</h1>

      {(vendorId || signedToken) ? (
        <p style={{ marginTop: 8 }}>
          {vendorId && (
            <>
              Vendor ID: <b>{vendorId}</b>
            </>
          )}
          {signedToken && !vendorId && (
            <>
              Vendor token detected
            </>
          )}
        </p>
      ) : (
        <p style={{ color: "crimson" }}>
          Missing vendor parameters.
        </p>
      )}

      {loading && (
        <p style={{ marginTop: 8, opacity: 0.7 }}>
          Preparing your referral…
        </p>
      )}
      {error && (
        <p style={{ marginTop: 8, color: "#b45309" }}>
          {error}
        </p>
      )}

      <p style={{ marginTop: 12 }}>
        If nothing happens, tap the button below.
      </p>

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

      <div style={{ marginTop: 12, opacity: 0.7 }}>
        <a href={PLAIN_IOS_STORE_URL} style={{ color: "blue" }}>
          Get the app on the App Store
        </a>
      </div>
    </div>
  );
}
