// src/pages/VendorLink.tsx
import React, { useEffect, useMemo, useState, useCallback } from "react";

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
// const isAndroid = () => /Android/.test(navigator.userAgent);

const IOS_APP_ID = "6737774016";
const PLAIN_IOS_STORE_URL = `itms-apps://itunes.apple.com/app/id${IOS_APP_ID}`;
// const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=YOUR_PKG";

const APP_SCHEME = "cartin://";
const API_BASE = "/redirect";

// How long we’ll wait for the referral before proceeding anyway
const MAX_WAIT_MS = 900;

// Small helper to wait until a condition is true (or timeout)
function waitUntil(cond: () => boolean, timeoutMs: number): Promise<void> {
  if (cond()) return Promise.resolve();
  const start = Date.now();
  return new Promise((resolve) => {
    const tick = () => {
      if (cond() || Date.now() - start >= timeoutMs) return resolve();
      requestAnimationFrame(tick);
    };
    tick();
  });
}

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

  window.location.href = appUrl;

  setTimeout(() => {
    if (!cancelled) window.location.href = storeUrl;
  }, 1200);
}

export default function VendorLink() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const vendorId = params.get("vendorId");
  const signedToken = params.get("t");

  const [referralToken, setReferralToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!(vendorId || signedToken));
  const [error, setError] = useState<string | null>(null);
  const [gateReady, setGateReady] = useState(false); // when true, we’re allowed to attempt open

  // Mint the referral token server-side
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    (async () => {
      if (!vendorId && !signedToken) return;

      setLoading(true);
      setError(null);
      try {
        const qp = new URLSearchParams();
        if (signedToken) qp.set("t", signedToken);
        else if (vendorId) qp.set("vendorId", vendorId);
        qp.set("format", "json");

        const r = await fetch(`${API_BASE}?${qp.toString()}`, {
          credentials: "include",
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (!mounted) return;

        if (data?.success && data?.vendorReferral) {
          setReferralToken(String(data.vendorReferral));
        } else {
          setReferralToken(null);
        }
      } catch (e: any) {
        if (!mounted) return;
        setError("We couldn't pre-register your referral, continuing…");
        setReferralToken(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [vendorId, signedToken]);

  const appUrl = useMemo(
    () => buildAppUrl(vendorId, referralToken),
    [vendorId, referralToken]
  );

  // Gate the auto-open: wait for referral OR max wait
  useEffect(() => {
    if (!isIOS()) return; // no auto-open on desktop/Android by default
    let cancelled = false;

    (async () => {
      // Wait until either we have a referral OR loading finishes OR timeout elapses
      await waitUntil(() => !!referralToken || !loading, MAX_WAIT_MS);
      if (!cancelled) setGateReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [loading, referralToken]);

  // Auto-open once the gate is ready (on iOS only)
  useEffect(() => {
    if (!isIOS() || !gateReady) return;
    // tiny delay so the UI text can update once
    const t = setTimeout(() => {
      openAppOrStore(appUrl, PLAIN_IOS_STORE_URL);
    }, 100);
    return () => clearTimeout(t);
  }, [gateReady, appUrl]);

  // Button click: also wait for the same gate if user taps fast
  const handleOpen = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      // If a user taps quickly, wait a beat for referral or timeout
      if (loading && !referralToken) {
        await waitUntil(() => !!referralToken || !loading, MAX_WAIT_MS);
      }
      if (isIOS()) openAppOrStore(appUrl, PLAIN_IOS_STORE_URL);
      // else if (isAndroid()) openAppOrStore(appUrl, ANDROID_STORE_URL);
      else window.location.href = appUrl;
    },
    [loading, referralToken, appUrl]
  );

  const buttonDisabled = loading && !gateReady; // avoid opening before token unless timeout triggered
  const showPreparing = loading && !gateReady;

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

      {(!vendorId && !signedToken) && (
        <p style={{ color: "crimson" }}>Missing vendor parameters.</p>
      )}

      {showPreparing && (
        <p style={{ marginTop: 8, opacity: 0.75 }}>
          Preparing your referral…
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              marginLeft: 8,
              borderRadius: "50%",
              border: "2px solid #333",
              borderTopColor: "transparent",
              animation: "spin 0.9s linear infinite",
              verticalAlign: "-2px",
            }}
          />
          <style>
            {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
          </style>
        </p>
      )}

      {error && !showPreparing && (
        <p style={{ marginTop: 8, color: "#b45309" }}>{error}</p>
      )}

      <p style={{ marginTop: 12 }}>
        If nothing happens, tap the button below.
      </p>

      <div style={{ marginTop: 16 }}>
        <a
          href={appUrl}
          onClick={handleOpen}
          aria-disabled={buttonDisabled}
          style={{
            padding: "12px 20px",
            border: "2px solid #111",
            borderRadius: 999,
            textDecoration: "none",
            opacity: buttonDisabled ? 0.5 : 1,
            pointerEvents: buttonDisabled ? "none" : "auto",
            cursor: buttonDisabled ? "not-allowed" : "pointer",
          }}
        >
          {buttonDisabled ? "Preparing…" : "Open in App"}
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
