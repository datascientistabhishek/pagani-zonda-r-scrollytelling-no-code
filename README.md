# Pagani Zonda R Scrollytelling Showcase
Demo Link of deployed project -> https://flourishing-cajeta-1ebaa0.netlify.app/ ```
A premium, interactive web experience showcasing the legendary Pagani Zonda R. This project features a high-performance **scrollytelling** mechanic where a 3D car rotation is synchronized with the user's scroll depth, accompanied by a dynamic HUD overlay.

## 🏎️ Features

-   **Scroll-Controlled Animation**: Frame-by-frame image sequence rendering using HTML5 Canvas for maximum performance.
-   **Synchronized HUD**: Text and UI elements transition seamlessly (Hero -> Design -> Engine) based on scroll progress.
-   **Premium Aesthetics**: Custom "Pagani" theme using Tailwind v4, Orbitron/Rajdhani fonts, and glassmorphism.
-   **Responsive Design**: Optimized for different screen sizes with high-DPI (Retina) support.
-   **Static Export**: Pre-configured for easy deployment to Netlify or Vercel.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14+](https://nextjs.org/) (App Router, TypeScript)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using `@theme` variables)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/) (useScroll, useTransform)
-   **Rendering**: HTML5 Canvas + `clsx` / `tailwind-merge`

## 🚀 Getting Started

### Prerequisites
-   Node.js 18+ installed

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/datascientistabhishek/pagani-zonda-r-scrollytelling-no-code.git
    cd pagani-zonda-r-scrollytelling-no-code/pagani
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```bash
pagani/
├── app/
│   ├── globals.css       # Tailwind v4 theme & global styles
│   ├── layout.tsx        # Font configuration (Orbitron & Rajdhani)
│   └── page.tsx          # Master Scroll Orchestrator (600vh height)
├── components/
│   ├── Navbar.tsx        # Fixed glassmorphism navigation
│   ├── ZondaScrollCanvas.tsx # The core canvas component handling the image sequence
│   └── ZondaExperience.tsx   # The HUD overlay managing text transitions
├── data/
│   └── carData.ts        # Static content for key features
└── public/
    └── images/zonda-sequence/ # 181 frames of the car rotation
```

## 📦 Deployment

### Netlify (Static Export)
1.  Run the build command to generate a static `out` folder:
    ```bash
    npm run build
    ```
2.  Drag and drop the `out` folder to [Netlify Drop](https://app.netlify.com/drop).
3.  **Alternative (CLI)**:
    ```bash
    npx netlify-cli deploy --prod --dir=out
    ```

### Vercel
1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel deploy` from the project root.

## 🎨 Credits

-   **Design Inspiration**: Awwwards scrollytelling sites & Pagani Automobili branding.
-   **Fonts**: Orbitron & Rajdhani (Google Fonts).

---

*Built with ❤️ for speed enthusiasts.*
