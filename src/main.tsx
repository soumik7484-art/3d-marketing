import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ToonHubHero from "./ToonHubHero";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToonHubHero />
  </StrictMode>
);
