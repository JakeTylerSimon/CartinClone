import React, { useMemo } from "react";

const IOS_STORE_URL = "https://apps.apple.com/app/id6737774016";
// const ANDROID_STORE_URL =
//   "https://play.google.com/store/apps/details?id=com.your.android.package"; // if/when you have it

export default function HuntLink() {
  const params = new URLSearchParams(window.location.search);

  // This is the *universal link* itself (works as a "retry open" button too)
  const universalLink = useMemo(() => {
    const qs = params.toString();
    return `https://cartin.app/hunt${qs ? `?${qs}` : ""}`;
  }, [params]);

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
      <p>If nothing happens, try the buttons below.</p>

      {/* Retry Universal Link (opens app if installed, otherwise stays on web) */}
      <div style={{ marginTop: 16 }}>
        <a
          href={universalLink}
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

      {/* Direct App Store / Play Store links */}
      <div style={{ marginTop: 12 }}>
        <a href={IOS_STORE_URL}>Get Cartin’ on the App Store</a>
      </div>
      {/* <div style={{ marginTop: 8 }}>
        <a href={ANDROID_STORE_URL}>Get it on Google Play</a>
      </div> */}
    </div>
  );
}
