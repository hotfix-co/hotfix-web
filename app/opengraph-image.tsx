import { ImageResponse } from "next/og";

export const alt = "HOTFIX d.o.o. — AI and software consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0d253d 0%, #10233a 60%, #1a1a2e 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background: "#f97316",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            hotfix-doo.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "92px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-2.4px",
              color: "#ffffff",
            }}
          >
            HOTFIX d.o.o.
          </div>
          <div
            style={{
              fontSize: "44px",
              fontWeight: 300,
              lineHeight: 1.18,
              letterSpacing: "-0.8px",
              color: "rgba(255,255,255,0.85)",
              maxWidth: "960px",
            }}
          >
            AI & software consulting. Claude Code workflows,
            architecture, modernization, reliable delivery.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {[
            "AI consulting",
            "Claude Code",
            "Architecture",
            "Modernization",
            "Custom software",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(249,115,22,0.6)",
                color: "#fb923c",
                fontSize: "22px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
