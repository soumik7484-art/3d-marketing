import { ShoppingBag, X, Plus, Minus, Trash2, ShieldCheck } from "lucide-react";
import { getAssetUrl } from "./utils";

export interface CartItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  img: string;
  accent: string;
  edition: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingLimit = 30;
  const needsMoreForFreeShipping = Math.max(0, freeShippingLimit - subtotal);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 1000,
          transition: "opacity 300ms ease",
        }}
      />

      {/* Drawer Panel */}
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "420px",
          background: "rgba(10, 10, 15, 0.95)",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.6)",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', sans-serif",
          color: "white",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={20} className="text-cyan-400" />
            <h2 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.01em" }}>
              Your Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 200ms, color 200ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Alert Banner */}
        <div
          style={{
            background: subtotal >= freeShippingLimit ? "rgba(74, 222, 128, 0.1)" : "rgba(245, 166, 35, 0.08)",
            padding: "12px 24px",
            fontSize: "12px",
            fontWeight: 600,
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            textAlign: "center",
            color: subtotal >= freeShippingLimit ? "#4ade80" : "#f5a623",
          }}
        >
          {subtotal >= freeShippingLimit ? (
            "🎉 Congrats! You qualified for FREE shipping!"
          ) : (
            `Add $${needsMoreForFreeShipping.toFixed(2)} more for FREE shipping!`
          )}
        </div>

        {/* Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255, 255, 255, 0.4)",
                gap: "16px",
              }}
            >
              <ShoppingBag size={48} strokeWidth={1.5} />
              <p style={{ fontSize: "14px", fontWeight: 500 }}>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Thumb */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{
                    position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                    width: "40px", height: "15px", filter: "blur(4px)",
                    background: `radial-gradient(ellipse, ${item.accent}66 0%, transparent 70%)`,
                  }} />
                  <img
                    src={getAssetUrl(item.img)}
                    alt={item.name}
                    style={{
                      height: "70px",
                      width: "auto",
                      objectFit: "contain",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h4 style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>
                        {item.name}
                      </h4>
                      <span style={{ fontSize: "15px", fontWeight: 800, color: "white" }}>
                        ${item.price * item.quantity}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: item.edition === "gold" ? "#F5C842" : item.edition === "silver" ? "#C0D8EA" : item.edition === "legendary" ? "#00f0ff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {item.edition.toUpperCase()} EDITION
                    </span>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", background: "rgba(0,0,0,0.2)" }}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={{
                          background: "none", border: "none", color: "white", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center"
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: "13px", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={{
                          background: "none", border: "none", color: "white", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center"
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemove(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "rgba(255, 255, 255, 0.35)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: "4px",
                        transition: "color 150ms",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.35)"}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>Subtotal</span>
              <span style={{ fontSize: "16px", fontWeight: 700 }}>${subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>Shipping</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: subtotal >= freeShippingLimit ? "#4ade80" : "white" }}>
                {subtotal >= freeShippingLimit ? "FREE" : "$4.99"}
              </span>
            </div>

            <button
              onClick={onCheckout}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #00f0ff, #0099ff)",
                color: "#0a0a0f",
                border: "none",
                fontWeight: 800,
                fontSize: "14px",
                letterSpacing: "0.06em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 6px 20px rgba(0, 240, 255, 0.3)",
                transition: "transform 150ms, box-shadow 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 240, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 240, 255, 0.3)";
              }}
            >
              PROCEED TO SECURE CHECKOUT
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "16px", color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
              <ShieldCheck size={14} className="text-cyan-400" /> Secure SSL Encrypted checkout
            </div>
          </div>
        )}
      </div>
    </>
  );
}
