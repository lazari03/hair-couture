import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0f10",
          color: "#ffffff",
          fontSize: 72,
          fontWeight: 300,
          fontFamily: "Arial, sans-serif",
          letterSpacing: "-0.08em",
        }}
      >
        HC
      </div>
    ),
    size,
  );
}
