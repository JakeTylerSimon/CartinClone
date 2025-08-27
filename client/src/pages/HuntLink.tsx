import React, { useEffect, useMemo, useState } from "react";

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = () => /Android/.test(navigator.userAgent);

const APP_SCHEME = "cartin://";
const IOS_STORE_URL = "https://apps.apple.com/app/idYOUR_APP_ID"; // TODO: set
const ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=YOUR_PKG"; // TODO: set

export default function HuntLink() {
  const [opened, setOpened] = useState(false);
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const gameId = params.get("gameId") || "";
  const customMode = params.get("custom") === "true";
  const items = params.get("items"); // percent-encoded JSON when custom

  const appUrl = useMemo(() => {
    const base = `${APP_SCHEME}hunt`;
    const q = new URLSearchParams();
    if (gameId) q.set("gameId", gameId);
    if (customMode) q.set("custom", "true");
    if (items) q.set("items", items);
    const qs = q.toString();
    return qs ? `${base}?${qs}` : base;
  }, [gameId, customMode, items]);

  useEffect(() => {
    // Give the page a tick for iOS, then try to open the app
    const t = setTimeout(() => {
      setOpened(true);
      window.location.href = appUrl;
    }, 200);

    // After a short delay, send to the store if the app didn't open
    const fallback = setTimeout(() => {
      if (isIOS()) window.location.href = IOS_STORE_URL;
      else if (isAndroid()) window.location.href = ANDROID_STORE_URL;
      // else stay on this page (desktop)
    }, 1600);

    return () => {
      clearTimeout(t);
      clearTimeout(fallback);
    };
  }, [appUrl]);

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
      {!gameId && (
        <p style={{ marginTop: 12, opacity: 0.7 }}>Missing gameId.</p>
      )}
    </div>
  );
}
