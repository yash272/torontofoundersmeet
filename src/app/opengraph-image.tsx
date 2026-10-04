import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const alt = `${site.name} — Better rooms. Toronto.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#F3F0E8",
        padding: "65px 75px",
        color: "#111111",
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
          letterSpacing: "-6px",
          lineHeight: 1,
        }}
      >
        <span>Good people.</span>
        <span>Useful lessons.</span>
        <span style={{ color: "#B62D23" }}>Better rooms.</span>
      </div>
      <div style={{ display: "flex", fontSize: 20 }}>
        One lesson. 45 minutes. Then drinks. ↗
      </div>
    </div>,
    size,
  );
}
