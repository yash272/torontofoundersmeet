import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const alt = `${site.name} — Founder workshops in Toronto`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0D0B11",
        padding: "65px 75px",
        color: "#F5F1FC",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>{site.name}</span>
        <span>TORONTO · AFTER HOURS</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 100,
          fontWeight: 700,
          letterSpacing: "-6px",
          lineHeight: 1,
        }}
      >
        <span>Startup lessons.</span>
        <span style={{ color: "#AF91FF" }}>Toronto nights.</span>
      </div>
      <div style={{ display: "flex", fontSize: 20 }}>
        Founder workshops in Toronto bars. 45 minutes, then drinks.
      </div>
    </div>,
    size,
  );
}
