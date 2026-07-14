import { useState, useEffect } from "react";
import { ShoppingCart, Star, Zap, Leaf, Sparkles, Cpu, Check, ShieldAlert } from "lucide-react";
import { getAssetUrl } from "./utils";

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
  // ── Standard (16 Unique Designs - Now $9) ──
  { id: "fire-std",      name: "Blaze",    tagline: "Fire Edition",      edition: "standard", price: 9, img: "/fig1.png",         accent: "#E8622A", icon: <Zap size={14} /> },
  { id: "nature-std",    name: "Flora",    tagline: "Nature Edition",    edition: "standard", price: 9, img: "/fig2.png",         accent: "#3D9E55", icon: <Leaf size={14} /> },
  { id: "kawaii-std",    name: "Starla",   tagline: "Kawaii Edition",    edition: "standard", price: 9, img: "/fig3.png",         accent: "#D44F99", icon: <Sparkles size={14} /> },
  { id: "cyber-std",     name: "Nexus",    tagline: "Cyber Edition",     edition: "standard", price: 9, img: "/fig4.png",         accent: "#2A6ECC", icon: <Cpu size={14} /> },
  { id: "aqua-std",      name: "Marina",   tagline: "Aqua Edition",      edition: "standard", price: 9, img: "/fig5.png",         accent: "#2ACCC0", icon: <Sparkles size={14} /> },
  { id: "space-std",     name: "Cosmo",    tagline: "Space Edition",     edition: "standard", price: 9, img: "/fig6.png",         accent: "#762ACC", icon: <Cpu size={14} /> },
  { id: "goth-std",      name: "Vesper",   tagline: "Goth Edition",      edition: "standard", price: 9, img: "/fig7.png",         accent: "#9E3D60", icon: <Sparkles size={14} /> },
  { id: "dessert-std",   name: "Candy",    tagline: "Dessert Edition",   edition: "standard", price: 9, img: "/fig8.png",         accent: "#D44FB2", icon: <Leaf size={14} /> },
  { id: "steampunk-std", name: "Gearbox",  tagline: "Steampunk Edition", edition: "standard", price: 9, img: "/fig9.png",         accent: "#CC8E2A", icon: <Cpu size={14} /> },
  { id: "magic-std",     name: "Mystic",   tagline: "Magic Edition",     edition: "standard", price: 9, img: "/fig10.png",        accent: "#4A8EE8", icon: <Sparkles size={14} /> },
  { id: "nebula-std",    name: "Gwen",     tagline: "Nebula Edition",    edition: "standard", price: 9, img: "/fig11.png",        accent: "#BC2ACC", icon: <Sparkles size={14} /> },
  { id: "acid-std",      name: "Jolt",     tagline: "Acid Edition",      edition: "standard", price: 9, img: "/fig12.png",        accent: "#3DCC2A", icon: <Zap size={14} /> },
  { id: "cyberia-std",   name: "Cyberia",  tagline: "Neon Edition",      edition: "standard", price: 9, img: "/fig13.png",        accent: "#CC2AB5", icon: <Cpu size={14} /> },
  { id: "lolita-std",    name: "Lola",     tagline: "Lolita Edition",    edition: "standard", price: 9, img: "/fig14.png",        accent: "#8B2ACC", icon: <Sparkles size={14} /> },
  { id: "forest-std",    name: "Sylvan",   tagline: "Woodland Edition",  edition: "standard", price: 9, img: "/fig15.png",        accent: "#2ACC55", icon: <Leaf size={14} /> },
  { id: "emerald-std",   name: "Emerald",  tagline: "Emerald Edition",   edition: "standard", price: 9, img: "/fig16.png",        accent: "#2ACCA5", icon: <Zap size={14} /> },
  // ── Gold (Now $49) ──
  { id: "fire-gold",   name: "Blaze",   tagline: "Gold Edition",    edition: "gold",     price: 49, img: "/fig1_gold.png",   accent: "#F5A623", icon: <Zap size={14} /> },
  { id: "nature-gold", name: "Flora",   tagline: "Gold Edition",    edition: "gold",     price: 49, img: "/fig2_gold.png",   accent: "#F5A623", icon: <Leaf size={14} /> },
  { id: "kawaii-gold", name: "Starla",  tagline: "Gold Edition",    edition: "gold",     price: 49, img: "/fig3_gold.png",   accent: "#F5A623", icon: <Sparkles size={14} /> },
  { id: "cyber-gold",  name: "Nexus",   tagline: "Gold Edition",    edition: "gold",     price: 49, img: "/fig4_gold.png",   accent: "#F5A623", icon: <Cpu size={14} /> },
  // ── Silver (Now $39) ──
  { id: "fire-silver",   name: "Blaze",  tagline: "Silver Edition",  edition: "silver", price: 39, img: "/fig1_silver.png",  accent: "#9BB3C8", icon: <Zap size={14} /> },
  { id: "nature-silver", name: "Flora",  tagline: "Silver Edition",  edition: "silver", price: 39, img: "/fig2_silver.png",  accent: "#9BB3C8", icon: <Leaf size={14} /> },
  { id: "kawaii-silver", name: "Starla", tagline: "Silver Edition",  edition: "silver", price: 39, img: "/fig3_silver.png",  accent: "#9BB3C8", icon: <Sparkles size={14} /> },
  { id: "cyber-silver",  name: "Nexus",  tagline: "Silver Edition",  edition: "silver", price: 39, img: "/fig4_silver.png",  accent: "#9BB3C8", icon: <Cpu size={14} /> },
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

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
}) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart(product);
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
          src={getAssetUrl(product.img)}
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

export default function ShopSection({
  onAddToCart,
}: {
  onAddToCart: (product: any) => void;
}) {
  const [filter, setFilter] = useState<Edition | "all">("all");
  const [legendaryAdded, setLegendaryAdded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = filter === "all" ? DOLLS : DOLLS.filter(d => d.edition === filter);

  const FILTERS: { key: Edition | "all"; label: string }[] = [
    { key: "all",      label: "All Editions" },
    { key: "standard", label: "Standard · $9" },
    { key: "gold",     label: "✦ Gold · $49" },
    { key: "silver",   label: "◈ Silver · $39" },
  ];

  const handleAddLegendary = () => {
    setLegendaryAdded(true);
    onAddToCart({
      id: "aura-legendary",
      name: "AURA DIAMOND",
      tagline: "Legendary Edition",
      edition: "legendary",
      price: 149,
      img: "/fig_legendary.png",
      accent: "#00f0ff",
    });
    setTimeout(() => setLegendaryAdded(false), 1800);
  };

  return (
    <section style={{
      background: "linear-gradient(180deg, #0a0a0f 0%, #0f0f1e 40%, #0a0a0f 100%)",
      padding: "80px 0 100px",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Sparkle keyframe styles injected directly */}
      <style>{`
        @keyframes cyanPulse {
          0%, 100% { filter: drop-shadow(0 0 25px rgba(0, 240, 255, 0.45)) drop-shadow(0 0 50px rgba(0, 240, 255, 0.2)); }
          50% { filter: drop-shadow(0 0 45px rgba(0, 240, 255, 0.75)) drop-shadow(0 0 75px rgba(0, 240, 255, 0.4)); }
        }
        @keyframes sparkleFade {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 0.95; transform: scale(1.1) rotate(180deg); }
        }
        @keyframes shimmerBg {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      {/* ─── A. Legendary Rare Spotlight Section (First View after Hero) ─── */}
      <div style={{
        maxWidth: "1180px",
        margin: "0 auto 100px",
        padding: "0 24px",
      }}>
        {/* Section divider label */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", justifyContent: "center" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.3))" }} />
          <span style={{
            fontSize: "12px", fontWeight: 700, color: "#00f0ff", letterSpacing: "0.25em",
            textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px"
          }}>
            <Sparkles size={14} className="text-cyan-400" /> ULTRA RARE LEGENDARY EDITION
          </span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(270deg, transparent, rgba(0,240,255,0.3))" }} />
        </div>

        {/* Spotlight Card */}
        <div style={{
          background: "radial-gradient(circle at top left, #0d2535 0%, #08121a 100%)",
          borderRadius: "32px",
          border: "2px solid rgba(0, 240, 255, 0.25)",
          boxShadow: "0 30px 90px rgba(0,240,255,0.08), inset 0 0 40px rgba(0,240,255,0.05)",
          padding: isMobile ? "28px 20px" : "48px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
          gap: isMobile ? "24px" : "48px",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Shimmer background rotation */}
          <div style={{
            position: "absolute", top: "50%", left: "30%",
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 65%)",
            animation: "shimmerBg 12s linear infinite",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Left: Giant Glittering Cyan Diamond Doll Image */}
          <div style={{
            position: "relative",
            display: "flex", justifyContent: "center", alignItems: "center",
            height: "360px",
            zIndex: 1,
          }}>
            {/* Holographic backdrop glow */}
            <div style={{
              position: "absolute", width: "240px", height: "240px",
              background: "radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
              zIndex: 0,
            }} />

            {/* Glittering Sparkles (CSS Stars fading/pulsating around the doll) */}
            <div style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }}>
              {/* Star 1 */}
              <div style={{
                position: "absolute", top: "20%", left: "25%",
                color: "#00f0ff", animation: "sparkleFade 3s ease-in-out infinite",
              }}><Sparkles size={16} /></div>
              {/* Star 2 */}
              <div style={{
                position: "absolute", top: "70%", left: "15%",
                color: "#00f0ff", animation: "sparkleFade 4s ease-in-out infinite 1s",
              }}><Sparkles size={20} /></div>
              {/* Star 3 */}
              <div style={{
                position: "absolute", top: "45%", right: "20%",
                color: "#00f0ff", animation: "sparkleFade 2.5s ease-in-out infinite 0.5s",
              }}><Sparkles size={18} /></div>
              {/* Star 4 */}
              <div style={{
                position: "absolute", bottom: "15%", right: "30%",
                color: "#00f0ff", animation: "sparkleFade 3.5s ease-in-out infinite 1.5s",
              }}><Sparkles size={14} /></div>
              {/* Star 5 */}
              <div style={{
                position: "absolute", top: "15%", right: "40%",
                color: "#00f0ff", animation: "sparkleFade 4.5s ease-in-out infinite 2s",
              }}><Sparkles size={22} /></div>
            </div>

            {/* Cyan Doll Image with active pulse glow */}
            <img
              src={getAssetUrl("/fig_legendary.png")}
              alt="AURA Cyan Diamond Figurine"
              style={{
                height: isMobile ? "220px" : "330px",
                width: "auto",
                objectFit: "contain",
                display: "block",
                position: "relative",
                zIndex: 1,
                animation: "cyanPulse 4s ease-in-out infinite",
              }}
            />
          </div>

            {/* Info & Description */}
            <div style={{ textAlign: isMobile ? "center" : "left" }}>
              <span style={{
                background: "rgba(0, 240, 255, 0.1)",
                color: "#00f0ff",
                fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em",
                padding: "6px 14px", borderRadius: "30px",
                border: "1.5px solid rgba(0, 240, 255, 0.25)",
                display: "inline-flex", alignItems: "center", gap: "6px",
                marginBottom: "20px",
              }}>
                <Star size={12} fill="#00f0ff" /> 1 OF 100 PIECES
              </span>

              <h1 style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: isMobile ? "42px" : "clamp(38px, 6vw, 68px)",
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}>
                AURA DIAMOND
              </h1>

              <p style={{
                fontSize: "12px", color: "rgba(0, 240, 255, 0.7)", letterSpacing: "0.15em",
                textTransform: "uppercase", fontWeight: 700, marginBottom: "20px"
              }}>
                ULTRA RARE CYAN DIAMOND EDITION
              </p>

              <p style={{
                fontSize: "14px", color: "rgba(255,255,255,0.65)",
                lineHeight: 1.6, marginBottom: "24px",
              }}>
                Crafted from high-gloss translucent cyan diamond polymer that refracts studio light. 
                Features embedded metallic glitter diamonds and a self-luminous micro-core.
              </p>

              {/* Stars & Rating */}
              <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="#00f0ff" color="#00f0ff" />
                ))}
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginLeft: "8px" }}>
                  Legendary Rating (5.0)
                </span>
              </div>
            {/* Price & Cart CTA */}
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : "center",
              gap: isMobile ? "18px" : "24px",
            }}>
              <div style={{ textAlign: isMobile ? "center" : "left" }}>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "4px" }}>
                  PRICE
                </span>
                <span style={{
                  fontSize: "36px", fontWeight: 900, color: "#00f0ff", letterSpacing: "-0.02em"
                }}>
                  $149
                </span>
              </div>

              <button
                onClick={handleAddLegendary}
                style={{
                  flex: isMobile ? "none" : 1,
                  width: "100%",
                  height: "56px",
                  borderRadius: "16px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  fontSize: "14px", fontWeight: 800, letterSpacing: "0.08em",
                  transition: "all 200ms ease",
                  background: legendaryAdded
                    ? "rgba(74,222,128,0.2)"
                    : "linear-gradient(135deg, #00f0ff, #0099ff)",
                  color: legendaryAdded ? "#4ade80" : "#0a0a0f",
                  boxShadow: legendaryAdded
                    ? "0 0 30px rgba(74,222,128,0.3)"
                    : "0 8px 30px rgba(0, 240, 255, 0.35)",
                }}
              >
                {legendaryAdded ? <><Check size={16} /> ADDED!</> : <><ShoppingCart size={16} /> ADD LEGENDARY TO CART</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── B. Standard & Premium Catalog (Scroll Down) ─── */}
      
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
          Hand-crafted 3D figurines in Standard ($9), Gold ($49), and Silver ($39) editions.
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
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
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
