<div align="center">

<br/>

```
████████╗ ██████╗  ██████╗ ███╗   ██╗██╗  ██╗██╗   ██╗██████╗ 
╚══██╔══╝██╔═══██╗██╔═══██╗████╗  ██║██║  ██║██║   ██║██╔══██╗
   ██║   ██║   ██║██║   ██║██╔██╗ ██║███████║██║   ██║██████╔╝
   ██║   ██║   ██║██║   ██║██║╚██╗██║██╔══██║██║   ██║██╔══██╗
   ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║  ██║╚██████╔╝██████╔╝
   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
```

### ✦ 3D Character Figurine Carousel — Marketing Hero & E-Commerce Storefront ✦

🔗 **Live Demo:** [https://soumik7484-art.github.io/3d-marketing/](https://soumik7484-art.github.io/3d-marketing/)

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_React-icons-F56565?style=for-the-badge)

<br/>

</div>

---

## 🎠 Overview

**TOONHUB** is a full-viewport, animated 3D character figurine carousel built as a premium marketing hero section, seamlessly integrated with a fully functional shopping cart and product catalog. 

- **Hero Slide:** Four vibrant figurines rotate through **center (hero) / left / right / back** roles, each with their own depth-based blur, scale, and opacity — all crossfading simultaneously over matching background colors.
- **E-Commerce Shop:** A collection of 21 unique doll variants categorized in Standard, Gold, Silver, and Legendary editions with interactive cart operations, live subtotal tracking, and quantity modifiers.

---

## 💎 Collection Catalog

Discover the entire **TOONHUB 2025 Figurine lineup**:

### 👑 1. Legendary Rare Edition ($149)
A fully translucent, sparkling cyan crystal magic pharaoh figurine, rendered with deep pulse glows and a shimmering star glitter overlay.

*   💎 **Aura Diamond** — Translucent cyan diamond polymer, featuring light refraction, self-luminous microcore, and floating glitter.

---

### ✦ 2. Gold Collector Edition ($49)
Luxury collector edition figurines with a polished, highly reflective gold-plated metallic coating.

*   🔥 **Blaze Gold** — Golden Fire Edition
*   🌿 **Flora Gold** — Golden Nature Edition
*   🌸 **Starla Gold** — Golden Kawaii Edition
*   ⚡ **Nexus Gold** — Golden Cyber Edition

---

### ◈ 3. Silver Collector Edition ($39)
Luxury collector edition figurines with a chrome silver plated metallic coating.

*   🔥 **Blaze Silver** — Chrome Silver Fire Edition
*   🌿 **Flora Silver** — Chrome Silver Nature Edition
*   🌸 **Starla Silver** — Chrome Silver Kawaii Edition
*   ⚡ **Nexus Silver** — Chrome Silver Cyber Edition

---

### 🎨 4. Standard Editions ($9)
The flagship line of 16 fully unique, hand-crafted 3D figurine designs.

| Figurine | Name | Theme & Description |
|---|---|---|
| 🔥 | **Blaze** | Spiky flame hair, flame hoodie (Fire) |
| 🌿 | **Flora** | Curly leafy hair with flowers, forest attire (Nature) |
| 🌸 | **Starla** | Twin pigtail buns, pink hoodie dress (Kawaii) |
| ⚡ | **Nexus** | Spiky blue hair, cyber jacket, peace sign (Cyber) |
| 🌊 | **Marina** | Soft blue wavy splash hair, ocean hoodie, holding starfish (Aqua) |
| 🌌 | **Cosmo** | Deep purple star-speckled hair, astronaut suit (Space) |
| 🦇 | **Vesper** | Jet black hair with purple highlights, dark bat wings (Goth) |
| 🍦 | **Candy** | Pastel pink and mint swirl soft-serve hair, sprinkles dress (Dessert) |
| ⚙️ | **Gearbox** | Copper hair, leather vest, brass goggles, pocket watch (Steampunk) |
| 🔮 | **Mystic** | Pale blue hair with a wizard hat, starry robe, crystal ball (Magic) |
| 🌠 | **Gwen** | Violet/nebula hair, star clips (Nebula) |
| 🔋 | **Jolt** | Spiky yellow-green hair, electric vest (Acid) |
| 📟 | **Cyberia** | Neon magenta/yellow hair, high-tech reflective visor (Neon) |
| 🎀 | **Lola** | Twin drills with black bows, black frilly lace dress (Lolita) |
| 🪵 | **Sylvan** | Green moss hair, tiny mushrooms, leafy cape (Woodland) |
| 🏺 | **Emerald** | Gold and turquoise pharaoh headdress, white tunic (Emerald) |

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 **Dynamic Background** | Each figurine has its own color palette; background crossfades smoothly on navigate |
| 🌀 **Depth Carousel** | 4-slot ring: center (hero) · left · right · back — each with unique scale, blur & opacity |
| ⚡ **650ms Crossfade** | All properties animate with `cubic-bezier(0.4,0,0.2,1)` for smooth transition |
| 🛒 **Interactive Cart** | Floating bag badge, slide-out drawer, quantity modifiers, free-shipping tracker, simulated checkout |
| 💫 **Glitter FX** | CSS-keyframes (`sparkleFade`) overlaying rotating, fading stars around the legendary Cyan Diamond doll |
| 📱 **Responsive Design** | Edge-aligned arrow controls and centered text overlays optimized for mobile screens |
| 🔒 **Animation Lock** | Prevents double-firing commands during active transition windows |

---

## 🗂️ Project Structure

```
zeolite/
├── index.html                  # Fonts + viewport setup
├── vite.config.ts              # Config + base deployment subpath
├── package.json                # Dependencies + build scripts
└── src/
    ├── main.tsx                # Entry point
    ├── App.tsx                 # Root component + global cart state
    ├── CartDrawer.tsx          # Sliding checkout drawer panel
    ├── ToonHubHero.tsx         # Responsive 3D figurine carousel hero
    ├── ShopSection.tsx         # Ultra-rare spotlight + product catalog
    ├── utils.ts                # getAssetUrl asset resolver
    └── index.css               # Tailwind directives + resets
```

---

## 🚀 Getting Started

### Prerequisites

*   **Node.js** ≥ 18
*   **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/soumik7484-art/3d-marketing.git
cd 3d-marketing

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open **http://localhost:5174/3d-marketing/** in your browser.

---

## 🎨 Design System

### Carousel Role Geometry (Desktop)

| Role | Scale | Blur | Left | Height | Z |
|---|---|---|---|---|---|
| **center** | `1.68×` | `0px` | `50%` | `88%` | 20 |
| **left** | `1×` | `2px` | `22%` | `52%` | 10 |
| **right** | `1×` | `2px` | `78%` | `52%` | 10 |
| **back** | `1×` | `4px` | `50%` | `36%` | 5 |

---

## 📄 License

MIT © 2025 [soumik7484-art](https://github.com/soumik7484-art)

---

<div align="center">

**Built with ❤️ using React + TypeScript + Vite + Tailwind CSS v4**

⭐ Star this repo if you found it useful!

</div>
