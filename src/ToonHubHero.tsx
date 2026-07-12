import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAssetUrl } from "./utils";

// ─── Data ────────────────────────────────────────────────────────────────────

interface ImageData {
  src: string;
  bg: string;
  panel: string;
}

const IMAGES: ImageData[] = [
  {
    // 🔥 Fire character — warm amber-orange
    src: "/fig1.png",
    bg: "#E8622A",
    panel: "#F2834D",
  },
  {
    // 🌿 Nature character — deep sage green
    src: "/fig2.png",
    bg: "#3D9E55",
    panel: "#5AB96E",
  },
  {
    // 🌸 Kawaii character — vivid bubblegum pink
    src: "/fig3.png",
    bg: "#D44F99",
    panel: "#E070B2",
  },
  {
    // ⚡ Cyber character — deep electric blue
    src: "/fig4.png",
    bg: "#2A6ECC",
    panel: "#4A8EE8",
  },
];

// ─── Grain SVG data URI ───────────────────────────────────────────────────────

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

// ─── Role types ───────────────────────────────────────────────────────────────

type Role = "center" | "left" | "right" | "back";

// ─── Component ────────────────────────────────────────────────────────────────

interface ToonHubHeroProps {
  onBuyNow?: () => void;
}

export default function ToonHubHero({ onBuyNow }: ToonHubHeroProps = {}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Set mobile on client side only
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Preload all images on mount
  useEffect(() => {
    IMAGES.forEach(({ src }) => {
      const img = new Image();
      img.src = getAssetUrl(src);
    });
  }, []);

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        direction === "next" ? (prev + 1) % 4 : (prev + 3) % 4
      );
      setTimeout(() => setIsAnimating(false), 650);
    },
    [isAnimating]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  // Derive role for each index
  const getRoleForIndex = (index: number): Role => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex + 3) % 4) return "left";
    if (index === (activeIndex + 1) % 4) return "right";
    return "back";
  };

  // Per-role style
  const getRoleStyle = (role: Role): React.CSSProperties => {
    const transition =
      "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)";

    switch (role) {
      case "center":
        return {
          // No scale — let height drive the size so legs aren't clipped
          transform: "translateX(-50%)",
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
          left: "50%",
          height: isMobile ? "78%" : "88%",
          bottom: isMobile ? "2%" : "2%",
          transition,
          willChange: "transform, filter, opacity",
        };
      case "left":
        return {
          transform: "translateX(-50%)",
          filter: "blur(2px)",
          opacity: 0.75,
          zIndex: 10,
          left: isMobile ? "12%" : "22%",
          height: isMobile ? "44%" : "52%",
          bottom: isMobile ? "2%" : "2%",
          transition,
          willChange: "transform, filter, opacity",
        };
      case "right":
        return {
          transform: "translateX(-50%)",
          filter: "blur(2px)",
          opacity: 0.75,
          zIndex: 10,
          left: isMobile ? "88%" : "78%",
          height: isMobile ? "44%" : "52%",
          bottom: isMobile ? "2%" : "2%",
          transition,
          willChange: "transform, filter, opacity",
        };
      case "back":
        return {
          transform: "translateX(-50%)",
          filter: "blur(5px)",
          opacity: 0.55,
          zIndex: 5,
          left: "50%",
          height: isMobile ? "30%" : "36%",
          bottom: isMobile ? "2%" : "2%",
          transition,
          willChange: "transform, filter, opacity",
        };
    }
  };

  const activeBg = IMAGES[activeIndex]?.bg ?? "#F4845F";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: activeBg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── 1. Grain overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 50,
          backgroundImage: GRAIN_SVG,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          opacity: 0.4,
        }}
      />

      {/* ── 2. Giant ghost text "3D SHAPE" ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "18%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(90px, 28vw, 380px)",
            fontWeight: 900,
            color: "white",
            opacity: 1,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          3D SHAPE
        </span>
      </div>

      {/* ── 3. Top-left brand label ── */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          left: isMobile ? "1rem" : "2rem",
          zIndex: 60,
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "white",
            opacity: 0.9,
            letterSpacing: "0.18em",
          }}
        >
          TOONHUB
        </span>
      </div>

      {/* ── 4. Carousel ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, isolation: "isolate" }}>
        {IMAGES.map((img, index) => {
          const role = getRoleForIndex(index);
          const roleStyle = getRoleStyle(role);
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                ...roleStyle,
              }}
            >
              <img
                src={getAssetUrl(img.src)}
                alt={`TOONHUB figurine ${index + 1}`}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  display: "block",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── 5. Bottom-left: text + nav buttons ── */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "1.5rem" : "5rem",
          left: isMobile ? "1rem" : "6rem",
          zIndex: 60,
          maxWidth: "320px",
        }}
      >
        {/* Title */}
        <p
          style={{
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: isMobile ? "0.5rem" : "0.75rem",
            fontSize: isMobile ? "1rem" : "22px",
            color: "white",
            opacity: 0.95,
          }}
        >
          TOONHUB FIGURINES
        </p>

        {/* Description — hidden on mobile */}
        {!isMobile && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "white",
              opacity: 0.85,
              lineHeight: 1.6,
              marginBottom: "1.25rem",
            }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>
        )}

        {/* Nav buttons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => navigate(dir)}
              aria-label={dir === "prev" ? "Previous figurine" : "Next figurine"}
              style={{
                width: isMobile ? "3rem" : "4rem",
                height: isMobile ? "3rem" : "4rem",
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: "2px solid rgba(255,255,255,0.9)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 150ms ease, background-color 150ms ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.transform = "scale(1.08)";
                btn.style.backgroundColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.transform = "scale(1)";
                btn.style.backgroundColor = "transparent";
              }}
            >
              {dir === "prev" ? (
                <ArrowLeft size={26} strokeWidth={2.25} />
              ) : (
                <ArrowRight size={26} strokeWidth={2.25} />
              )}
            </button>
          ))}
        </div>

        {/* BUY NOW button */}
        <button
          onClick={onBuyNow}
          style={{
            marginTop: isMobile ? "0.75rem" : "1rem",
            padding: isMobile ? "10px 24px" : "13px 32px",
            borderRadius: "999px",
            background: "white",
            color: "#0a0a0f",
            border: "none",
            fontSize: isMobile ? "12px" : "14px",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "transform 150ms ease, box-shadow 150ms ease",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.transform = "scale(1.05)";
            b.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.transform = "scale(1)";
            b.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
          }}
        >
          🛒 BUY NOW
        </button>
      </div>

      {/* ── 6. Bottom-right "DISCOVER IT" link ── */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "1.5rem" : "5rem",
          right: isMobile ? "1rem" : "2.5rem",
          zIndex: 60,
        }}
      >
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.35rem" : "0.6rem",
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(20px, 4vw, 56px)",
            fontWeight: 400,
            color: "white",
            opacity: 0.95,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 200ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "0.95";
          }}
        >
          DISCOVER IT
          <ArrowRight
            style={{
              width: isMobile ? "1.25rem" : "2rem",
              height: isMobile ? "1.25rem" : "2rem",
            }}
            strokeWidth={2.25}
          />
        </a>
      </div>
    </div>
  );
}
