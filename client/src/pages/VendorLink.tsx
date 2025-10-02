// src/pages/VendorLink.tsx
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

const IOS_APP_ID = "6737774016";
const PLAIN_IOS_STORE_URL = `itms-apps://itunes.apple.com/app/id${IOS_APP_ID}`;
const APP_SCHEME = "cartin://";
const API_BASE = "/redirect"; // Vite proxy locally; Vercel rewrite in prod
const MAX_WAIT_MS = 2500;

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
  const noauto = params.get("noauto") === "1";
  const debugParam = params.get("debug") === "1";
  const DEV = import.meta.env.DEV || debugParam; // enable logs/UI only in dev or ?debug=1

  const [referralToken, setReferralToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!(vendorId || signedToken));
  const [error, setError] = useState<string | null>(null);
  const [gateReady, setGateReady] = useState(false);

  const log = DEV ? console.log.bind(console) : () => {};

  // Avoid StrictMode double fetch clobbering
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    (async () => {
      if (!vendorId && !signedToken) return;

      if (hasFetchedRef.current) {
        log("[VendorLink] skip duplicate fetch (StrictMode)");
        return;
      }
      hasFetchedRef.current = true;

      setLoading(true);
      setError(null);

      try {
        const qp = new URLSearchParams();
        if (signedToken) qp.set("t", signedToken);
        else if (vendorId) qp.set("vendorId", vendorId);
        qp.set("format", "json");
        if (DEV) qp.set("_", String(Date.now())); // cache-buster only in dev

        const url = `${API_BASE}?${qp.toString()}`;
        log("[VendorLink] fetch", url);

        const r = await fetch(url, { signal: controller.signal });
        log("[VendorLink] status", r.status);

        // Read as text first to aid debugging; then parse
        const text = await r.text();
        if (!r.ok) {
          if (DEV) log("[VendorLink] non-OK body:", text);
          throw new Error(`HTTP ${r.status}`);
        }
        const data = JSON.parse(text);
        if (DEV) (window as any).__lastResp = data;
        log("[VendorLink] parsed JSON:", data);

        if (!alive) return;

        if (data && data.success && data.vendorReferral) {
          const token = String(data.vendorReferral);
          log("[VendorLink] setting referralToken ->", token);
          setReferralToken(token);
        }
        // If not present, leave token as-is so vendorId fallback still works
      } catch (e) {
        log("[VendorLink] fetch error", e);
        if (!alive) return;
        setError("We couldn't pre-register your referral, continuing…");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      controller.abort();
    };
  }, [vendorId, signedToken, DEV, log]);

  const appUrl = useMemo(
    () => buildAppUrl(vendorId, referralToken),
    [vendorId, referralToken]
  );

  // Gate the auto-open: wait until token or timeout
  useEffect(() => {
    if (!isIOS()) return;
    let cancelled = false;

    (async () => {
      await waitUntil(() => !!referralToken || !loading, MAX_WAIT_MS);
      if (!cancelled) setGateReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [loading, referralToken]);

  // Auto-open (iOS only). You can keep this; users still have the button as a fallback.
  useEffect(() => {
    if (!isIOS() || !gateReady || noauto) return;
    const t = setTimeout(() => {
      log("[VendorLink] AUTO OPEN", { appUrl, vendorId, referralToken });
      // May be ignored if Safari doesn’t treat as user gesture; the button remains.
      window.location.replace(appUrl);
    }, 120);
    return () => clearTimeout(t);
  }, [gateReady, appUrl, noauto, vendorId, referralToken, log]);

  // Button: on iOS, let the native anchor do the scheme open (don’t preventDefault)
  const handleOpen = useCallback(
    async (e: React.MouseEvent) => {
      if (isIOS()) return; // let the <a href="cartin://..."> open natively
      e.preventDefault();
      if (loading && !referralToken) {
        await waitUntil(() => !!referralToken || !loading, MAX_WAIT_MS);
      }
      window.location.href = appUrl;
    },
    [loading, referralToken, appUrl]
  );

  const buttonDisabled = loading && !gateReady;
  const showPreparing = loading && !gateReady;

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "70vh", padding: 24, textAlign: "center" }}>
      <h1>Opening Cartin — Vendor Link…</h1>

      {(!vendorId && !signedToken) && (
        <p style={{ color: "crimson" }}>Missing vendor parameters.</p>
      )}

      {DEV && (
        <>
          <div style={{ marginTop: 16, fontFamily: "monospace", fontSize: 12, opacity: 0.8 }}>
            <div>vendorId: {String(vendorId)}</div>
            <div>referralToken: {String(referralToken)}</div>
            <div>loading: {String(loading)} / gateReady: {String(gateReady)}</div>
            <div>appUrl: {appUrl}</div>
          </div>
          <pre style={{ maxWidth: 800, textAlign: "left", fontSize: 12, opacity: 0.7 }}>
            lastResponse: {JSON.stringify((window as any).__lastResp, null, 2)}
          </pre>
        </>
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
