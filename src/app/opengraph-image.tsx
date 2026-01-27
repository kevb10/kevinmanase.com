import { ImageResponse } from "next/og";

export const alt = "Kevin Manase";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#09090b",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              color: "#fafafa",
              letterSpacing: "-0.02em",
            }}
          >
            Kevin Manase
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            Engineering thoughts, system design, and notes on building software.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            fontSize: 24,
            color: "#52525b",
          }}
        >
          kevinmanase.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
