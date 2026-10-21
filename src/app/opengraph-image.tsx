import { ImageResponse } from "next/og";
import { profile, heroStats } from "@/data/portfolio";

export const alt = `${profile.name}, Java Backend Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: 120,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(233,185,73,0.20), rgba(8,9,11,0) 65%)",
            display: "flex",
          }}
        />

        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              border: "1px solid #333944",
              background: "#0e1014",
              color: "#e9b949",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            NS
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
              color: "#a3a7b0",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#34d399",
                display: "flex",
              }}
            />
            {profile.availabilityNote}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              color: "#e9b949",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Java Backend · Distributed Systems
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#f0eee9",
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            Nikhil Sai Nambula
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              color: "#a3a7b0",
              lineHeight: 1.4,
              maxWidth: 900,
              display: "flex",
            }}
          >
            Java and Spring Boot microservices at scale. 2M+ users,
            50K+ daily requests, 40% less database load.
          </div>
        </div>

        {/* stat row */}
        <div
          style={{
            display: "flex",
            gap: 56,
            borderTop: "1px solid #22262e",
            paddingTop: 32,
          }}
        >
          {heroStats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: "#e9b949" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 20, color: "#6f747f" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
