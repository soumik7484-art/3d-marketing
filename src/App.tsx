import { useRef, useState } from "react";
import ToonHubHero from "./ToonHubHero";
import ShopSection from "./ShopSection";
import CartDrawer, { CartItem } from "./CartDrawer";
import { ShoppingBag } from "lucide-react";

export default function App() {
  const shopRef = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (product: {
    id: string;
    name: string;
    tagline: string;
    price: number;
    img: string;
    accent: string;
    edition: string;
  }) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // Open cart drawer on add for immediate visual feedback
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert("🚀 Checkout Simulated! Thank you for ordering from TOONHUB!");
    setCart([]);
    setCartOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", position: "relative" }}>
      {/* Universal Floating Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 900,
          background: "rgba(10, 10, 15, 0.75)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          transition: "transform 200ms ease, border-color 200ms",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
        }}
      >
        <ShoppingBag size={22} className="text-cyan-400" />
        {totalItems > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              background: "#00f0ff",
              color: "#0a0a0f",
              fontSize: "11px",
              fontWeight: 800,
              minWidth: "20px",
              height: "20px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 6px",
              boxShadow: "0 0 12px rgba(0, 240, 255, 0.6)",
            }}
          >
            {totalItems}
          </span>
        )}
      </button>

      {/* Hero Section */}
      <ToonHubHero onBuyNow={scrollToShop} />

      {/* Shop Section */}
      <div ref={shopRef}>
        <ShopSection onAddToCart={handleAddToCart} />
      </div>

      {/* Cart Drawer Panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
