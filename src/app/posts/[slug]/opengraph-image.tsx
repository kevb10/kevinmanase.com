import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const alt = "Kevin Manase";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  const title = post?.title ?? "Kevin Manase";
  const description = post?.description ?? "Engineering thoughts and notes on building software.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "60px 80px",
        }}
      >
        {/* Top section with title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: "#fafafa",
              lineHeight: 1.2,
              maxWidth: "90%",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: "80%",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom section with author */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#71717a",
            }}
          >
            kevinmanase.com
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#52525b",
            }}
          >
            Kevin Manase
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
