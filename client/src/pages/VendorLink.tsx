// src/pages/VendorLink.tsx
import React, { useEffect, useMemo, useState, useCallback } from "react";

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = () => /Android/.test(navigator.userAgent);

const IOS_APP_ID = "6737774016";
const PLAIN_IOS_STORE_URL = `itms-apps://itunes.apple.com/app/id${IOS_APP_ID}`;
// const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=YOUR_PKG";

const APP_SCHEME = "cartin://";
const API_BASE = "/redirect";

function buildAppUrl(vendorId: string | null, vendorReferral?: string | null) {
  const base = `${APP_SCHEME}rental`;
  const q = new URLSearchParams();
  if (vendorReferral) q.set("vendorReferral", vendorReferral);
  else if (vendorId) q.set("vendorId", vendorId);
  const qs = q.toString();
  return qs ? `${base}?${qs}` : base;
}

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

  // attempt to open the app
  window.location.href = appUrl;

  // fallback to the store if we stayed on the page
  setTimeout(() => {
    if (!cancelled) window.location.href = storeUrl;
  }, 1200);
}

export default function VendorLink() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const vendorId = params.get("vendorId");

  const [storeUrlWithToken, setStoreUrlWithToken] = useState<string | null>(
    null
  );
  const [referralToken, setReferralToken] = useState<string | null>(null);

  // Try to mint a referral token server-side (JSON mode)
  useEffect(() => {
    let mounted = true;
    if (!vendorId) return;

    // Hit the same endpoint with format=json
    const url = `${API_BASE}?vendorId=${encodeURIComponent(
      vendorId
    )}&format=json`;
    fetch(url, { credentials: "include" })
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        const data = await r.json();
        if (!mounted) return;
        if (data?.success && data?.vendorReferral && data?.storeUrl) {
          setReferralToken(String(data.vendorReferral));
          setStoreUrlWithToken(String(data.storeUrl));
        }
      })
      .catch(() => {
        // swallow; we’ll use plain store url fallback
      });
    return () => {
      mounted = false;
    };
  }, [vendorId]);

  const appUrl = useMemo(
    () => buildAppUrl(vendorId, referralToken),
    [vendorId, referralToken]
  );

  useEffect(() => {
    if (!isIOS()) return;
    const t = setTimeout(() => {
      window.location.href = appUrl;
    }, 250);
    return () => clearTimeout(t);
  }, [appUrl]);

  const handleOpen = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const fallbackStore = storeUrlWithToken ?? PLAIN_IOS_STORE_URL;
      if (isIOS()) openAppOrStore(appUrl, fallbackStore);
      // else if (isAndroid()) openAppOrStore(appUrl, ANDROID_STORE_URL);
      else window.location.href = appUrl;
    },
    [appUrl, storeUrlWithToken]
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
      {vendorId ? (
        <p>
          Vendor ID: <b>{vendorId}</b>
        </p>
      ) : (
        <p style={{ color: "crimson" }}>Missing vendorId.</p>
      )}
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

      <div style={{ marginTop: 12, opacity: 0.7 }}>
        <a
          href={storeUrlWithToken ?? PLAIN_IOS_STORE_URL}
          style={{ color: "blue" }}
        >
          Get the app on the App Store
        </a>
      </div>
    </div>
  );
}
