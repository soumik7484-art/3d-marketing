import { useState } from "react";
import { ShoppingCart, Star, Zap, Leaf, Sparkles, Cpu, Check } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Edition = "standard" | "gold" | "silver";

interface Product {
  id: string;
  name: string;
  tagline: string;
  edition: Edition;
  price: number;
  img: string;
  accent: string;       // card accent color
  icon: React.ReactNode;
}

// ─── Product Data ─────────────────────────────────────────────────────────────

const DOLLS: Product[] = [
  // ── Standard ──
  { id: "fire-std",    name: "Blaze",   tagline: "Fire Edition",    edition: "standard", price: 10, img: "/fig1.png",        accent: "#E8622A", icon: <Zap size={14} /> },
  { id: "nature-std",  name: "Flora",   tagline: "Nature Edition",  edition: "standard", price: 10, img: "/fig2.png",        accent: "#3D9E55", icon: <Leaf size={14} /> },
  { id: "kawaii-std",  name: "Starla",  tagline: "Kawaii Edition",  edition: "standard", price: 10, img: "/fig3.png",        accent: "#D44F99", icon: <Sparkles size={14} /> },
  { id: "cyber-std",   name: "Nexus",   tagline: "Cyber Edition",   edition: "standard", price: 10, img: "/fig4.png",        accent: "#2A6ECC", icon: <Cpu size={14} /> },
  // ── Gold ──
  { id: "fire-gold",   name: "Blaze",   tagline: "Gold Edition",    edition: "gold",     price: 50, img: "/fig1_gold.png",   accent: "#F5A623", icon: <Zap size={14} /> },
  { id: "nature-gold", name: "Flora",   tagline: "Gold Edition",    edition: "gold",     price: 50, img: "/fig2_gold.png",   accent: "#F5A623", icon: <Leaf size={14} /> },
  { id: "kawaii-gold", name: "Starla",  tagline: "Gold Edition",    edition: "gold",     price: 50, img: "/fig3_gold.png",   accent: "#F5A623", icon: <Sparkles size={14} /> },
  { id: "cyber-gold",  name: "Nexus",   tagline: "Gold Edition",    edition: "gold",     price: 50, img: "/fig4_gold.png",   accent: "#F5A623", icon: <Cpu size={14} /> },
  // ── Silver ──
  { id: "fire-silver",   name: "Blaze",  tagline: "Silver Edition",  edition: "silver", price: 50, img: "/fig1_silver.png",  accent: "#9BB3C8", icon: <Zap size={14} /> },
  { id: "nature-silver", name: "Flora",  tagline: "Silver Edition",  edition: "silver", price: 50, img: "/fig2_silver.png",  accent: "#9BB3C8", icon: <Leaf size={14} /> },
  { id: "kawaii-silver", name: "Starla", tagline: "Silver Edition",  edition: "silver", price: 50, img: "/fig3_silver.png",  accent: "#9BB3C8", icon: <Sparkles size={14} /> },
  { id: "cyber-silver",  name: "Nexus",  tagline: "Silver Edition",  edition: "silver", price: 50, img: "/fig4_silver.png",  accent: "#9BB3C8", icon: <Cpu size={14} /> },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EDITION_LABEL: Record<Edition, string> = {
  standard: "STANDARD",
  gold: "✦ GOLD",
  silver: "◈ SILVER",
};

const EDITION_GRADIENT: Record<Edition, string> = {
  standard: "linear-gradient(135deg, #2a2a3a, #1a1a28)",
  gold: "linear-gradient(135deg, #2a2200, #1a1400)",
  silver: "linear-gradient(135deg, #161e28, #0d131c)",
};

const EDITION_BADGE_BG: Record<Edition, string> = {
  standard: "rgba(255,255,255,0.08)",
  gold: "rgba(245,166,35,0.18)",
  silver: "rgba(155,179,200,0.18)",
};

const EDITION_BADGE_COLOR: Record<Edition, string> = {
  standard: "rgba(255,255,255,0.6)",
  gold: "#F5C842",
  silver: "#C0D8EA",
};

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const isGold   = product.edition === "gold";
  const isSilver = product.edition === "silver";
  const isPremium = isGold || isSilver;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: EDITION_GRADIENT[product.edition],
        borderRadius: "20px",
        border: isPremium
          ? `1.5px solid ${isGold ? "rgba(245,200,66,0.35)" : "rgba(192,216,234,0.3)"}`
          : "1.5px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 300ms ease, box-shadow 300ms ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${product.accent}33`
          : "0 4px 24px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      {/* Premium shimmer overlay */}
      {isPremium && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: isGold
            ? "linear-gradient(135deg, rgba(245,200,66,0.05) 0%, transparent 60%)"
            : "linear-gradient(135deg, rgba(192,216,234,0.06) 0%, transparent 60%)",
          borderRadius: "20px",
        }} />
      )}

      {/* Edition badge */}
      <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 2 }}>
        <span style={{
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
          padding: "4px 10px", borderRadius: "20px",
          background: EDITION_BADGE_BG[product.edition],
          color: EDITION_BADGE_COLOR[product.edition],
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          {product.icon} {EDITION_LABEL[product.edition]}
        </span>
      </div>

      {/* Doll image */}
      <div style={{
        position: "relative", zIndex: 1,
        height: "240px", display: "flex", alignItems: "flex-end", justifyContent: "center",
        padding: "12px 0 0",
      }}>
        {/* Glow under the doll */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "120px", height: "40px",
          background: `radial-gradient(ellipse, ${product.accent}55 0%, transparent 70%)`,
          filter: "blur(8px)",
        }} />
        <img
          src={product.img}
          alt={`${product.name} ${product.edition}`}
          draggable={false}
          style={{
            height: "210px", width: "auto",
            objectFit: "contain", objectPosition: "bottom center",
            display: "block", position: "relative", zIndex: 1,
            filter: isPremium
              ? isGold
                ? "drop-shadow(0 0 18px rgba(245,200,66,0.5))"
                : "drop-shadow(0 0 18px rgba(192,216,234,0.45))"
              : `drop-shadow(0 0 14px ${product.accent}55)`,
            transition: "transform 300ms ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: "16px 20px 20px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "4px" }}>
          <h3 style={{
            fontSize: "20px", fontWeight: 700, color: "white", letterSpacing: "-0.01em",
          }}>
            {product.name}
          </h3>
          <span style={{
            fontSize: "22px", fontWeight: 800,
            color: isGold ? "#F5C842" : isSilver ? "#C0D8EA" : "white",
            letterSpacing: "-0.02em",
          }}>
            ${product.price}
          </span>
        </div>

        <p style={{
          fontSize: "12px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em",
          textTransform: "uppercase", marginBottom: "16px",
        }}>
          {product.tagline}
        </p>

        {/* Stars for premium */}
        {isPremium && (
          <div style={{ display: "flex", gap: "2px", marginBottom: "14px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i} size={11} fill={isGold ? "#F5C842" : "#C0D8EA"}
                color={isGold ? "#F5C842" : "#C0D8EA"}
              />
            ))}
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginLeft: "6px" }}>
              Limited Edition
            </span>
          </div>
        )}

        {/* Add to cart button */}
        <button
          onClick={handleAdd}
          style={{
            width: "100%",
            height: "44px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em",
            transition: "all 200ms ease",
            background: added
              ? "rgba(74,222,128,0.2)"
              : isGold
                ? "linear-gradient(135deg, #F5C842, #D4A017)"
                : isSilver
                  ? "linear-gradient(135deg, #C0D8EA, #8AA8BF)"
                  : `linear-gradient(135deg, ${product.accent}, ${product.accent}cc)`,
            color: added ? "#4ade80" : (isGold || isSilver) ? "#0a0a0f" : "white",
            boxShadow: added
              ? "0 0 20px rgba(74,222,128,0.25)"
              : isGold
                ? "0 4px 16px rgba(245,200,66,0.3)"
                : isSilver
                  ? "0 4px 16px rgba(192,216,234,0.2)"
                  : `0 4px 16px ${product.accent}40`,
          }}
        >
          {added ? <><Check size={15} /> ADDED!</> : <><ShoppingCart size={15} /> ADD TO CART</>}
        </button>
      </div>
    </div>
  );
}

// ─── Shop Section ─────────────────────────────────────────────────────────────

export default function ShopSection() {
  const [filter, setFilter] = useState<Edition | "all">("all");

  const filtered = filter === "all" ? DOLLS : DOLLS.filter(d => d.edition === filter);

  const FILTERS: { key: Edition | "all"; label: string }[] = [
    { key: "all",      label: "All Editions" },
    { key: "standard", label: "Standard · $10" },
    { key: "gold",     label: "✦ Gold · $50" },
    { key: "silver",   label: "◈ Silver · $50" },
  ];

  return (
    <section style={{
      background: "linear-gradient(180deg, #0a0a0f 0%, #0f0f1e 40%, #0a0a0f 100%)",
      padding: "80px 0 100px",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "56px", padding: "0 24px" }}>
        {/* Eyebrow */}
        <p style={{
          fontSize: "12px", fontWeight: 600, letterSpacing: "0.22em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
          marginBottom: "16px",
        }}>
          TOONHUB COLLECTION 2025
        </p>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: "clamp(42px, 8vw, 96px)",
          fontWeight: 400,
          color: "white",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}>
          COLLECT THEM ALL
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: "16px", color: "rgba(255,255,255,0.45)",
          maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.6,
        }}>
          Hand-crafted 3D figurines in Standard, Gold, and Silver collector editions.
          Each piece is numbered and shipped in premium packaging.
        </p>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "10px 22px", borderRadius: "999px",
                border: filter === f.key ? "none" : "1.5px solid rgba(255,255,255,0.12)",
                background: filter === f.key
                  ? f.key === "gold"    ? "linear-gradient(135deg, #F5C842, #D4A017)"
                  : f.key === "silver"  ? "linear-gradient(135deg, #C0D8EA, #8AA8BF)"
                  : f.key === "standard"? "rgba(255,255,255,0.95)"
                  :                       "white"
                  : "transparent",
                color: filter === f.key
                  ? f.key === "all" || f.key === "standard" ? "#0a0a0f" : "#0a0a0f"
                  : "rgba(255,255,255,0.55)",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
                transition: "all 200ms ease",
                letterSpacing: "0.02em",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
      }}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ── Bottom note ── */}
      <p style={{
        textAlign: "center", marginTop: "60px",
        fontSize: "13px", color: "rgba(255,255,255,0.2)",
        letterSpacing: "0.04em",
      }}>
        Free worldwide shipping on orders over $30 · Ships in premium collector box
      </p>
    </section>
  );
}
