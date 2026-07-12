import { useRef } from "react";
import ToonHubHero from "./ToonHubHero";
import ShopSection from "./ShopSection";

export default function App() {
  const shopRef = useRef<HTMLDivElement>(null);

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <ToonHubHero onBuyNow={scrollToShop} />
      <div ref={shopRef}>
        <ShopSection />
      </div>
    </div>
  );
}
