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

### ✦ 3D Character Figurine Carousel — Marketing Hero Section ✦

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

**TOONHUB** is a full-viewport, animated 3D character figurine carousel built as a premium marketing hero section. Four vibrant figurines rotate through **center / left / right / back** roles, each with their own depth-based blur, scale, and opacity — all crossfading simultaneously over a matching background color.

> Designed to be a **drop-in hero section** for any 3D toy, collectible, or character brand.

<br/>

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 **Dynamic Background** | Each figurine has its own color palette; background crossfades smoothly on navigate |
| 🌀 **Depth Carousel** | 4-slot ring: center (hero) · left · right · back — each with unique scale, blur & opacity |
| ⚡ **650ms Crossfade** | All properties (position, scale, blur, opacity, background) animate with `cubic-bezier(0.4,0,0.2,1)` |
| 📱 **Fully Responsive** | Mobile-first breakpoints at 640px — sizes, positions and text all adapt |
| ⌨️ **Keyboard Navigation** | `←` / `→` arrow keys navigate the carousel |
| 🖼️ **Image Preloading** | All 4 images preloaded on mount via `new Image()` for zero-flash transitions |
| 🌾 **Grain Overlay** | SVG `fractalNoise` texture adds a tactile, premium print feel |
| 🔠 **Dual Typography** | **Anton** (display ghost text + discover link) · **Inter** (UI labels + body text) |
| 🔒 **Animation Lock** | `isAnimating` guard prevents double-firing during 650ms transition window |

<br/>

## 🖥️ Preview

<div align="center">

### Figurine 1 — Coral `#F4845F`
> Orange-coral hero · left/right side characters at 28% height · back character blurred

### Figurine 2 — Sage `#6BBF7A`
> Green hero · same carousel depth rules apply

### Figurine 3 — Rose `#E882B4`
> Pink hero

### Figurine 4 — Sky `#6EB5FF`
> Blue hero

</div>

<br/>

## 🗂️ Project Structure

```
zeolite/
├── index.html                  # Google Fonts (Anton + Inter) + TSX entry
├── vite.config.ts              # Vite + @vitejs/plugin-react
├── tsconfig.json               # TypeScript config
├── postcss.config.js           # @tailwindcss/postcss (Tailwind v4)
├── tailwind.config.js          # Tailwind content paths
└── src/
    ├── main.tsx                # React root
    ├── index.css               # @import "tailwindcss" + global resets
    └── ToonHubHero.tsx         # ← The entire hero component
```

<br/>

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

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

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
# Output goes to /dist
```

<br/>

## 🎨 Design System

### Color Palette

| Slot | Background | Panel |
|------|-----------|-------|
| 🟠 Figurine 1 | `#F4845F` | `#F79B7F` |
| 🟢 Figurine 2 | `#6BBF7A` | `#85CC92` |
| 🩷 Figurine 3 | `#E882B4` | `#ED9DC4` |
| 🔵 Figurine 4 | `#6EB5FF` | `#8DC4FF` |

### Typography

```
Display  →  Anton       (ghost "3D SHAPE" text + "DISCOVER IT" CTA)
UI       →  Inter 400/500/600/700  (labels, body, buttons)
```

### Carousel Role Geometry (Desktop)

| Role | Scale | Blur | Left | Height | Z |
|------|-------|------|------|--------|---|
| **center** | `1.68×` | `0px` | `50%` | `92%` | 20 |
| **left** | `1×` | `2px` | `30%` | `28%` | 10 |
| **right** | `1×` | `2px` | `70%` | `28%` | 10 |
| **back** | `1×` | `4px` | `50%` | `22%` | 5 |

<br/>

## 🛠️ Tech Stack

```
React 19          UI framework
TypeScript 5      Type safety
Vite 8            Build tool + HMR dev server
Tailwind CSS v4   Utility-first styling (zero-config)
Lucide React      ArrowLeft / ArrowRight icons
```

<br/>

## 📐 Component Architecture

```
ToonHubHero.tsx
│
├── State
│   ├── activeIndex   (0–3)      — which figurine is center
│   ├── isAnimating   (bool)     — animation lock for 650ms
│   └── isMobile      (bool)     — < 640px breakpoint
│
├── Effects
│   ├── Preload all 4 images on mount
│   ├── Resize listener → isMobile
│   └── Keyboard listener → navigate()
│
├── navigate(direction)          — bumps activeIndex, locks for 650ms
│
├── getRoleForIndex(i)           — center | left | right | back
├── getRoleStyle(role)           — returns full CSSProperties per role
│
└── Render Layers (z-index stack)
    ├── z-50  Grain overlay (SVG fractalNoise)
    ├── z-60  Brand label "TOONHUB"
    ├── z-3   Carousel (4 figures, role-based positioning)
    ├── z-2   Ghost text "3D SHAPE"
    └── z-60  Bottom UI (title + nav buttons + discover link)
```

<br/>

## 📄 License

MIT © 2025 [soumik7484-art](https://github.com/soumik7484-art)

---

<div align="center">

**Built with ❤️ using React + TypeScript + Vite + Tailwind CSS v4**

⭐ Star this repo if you found it useful!

</div>
