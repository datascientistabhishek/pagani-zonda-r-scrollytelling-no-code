'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ZondaScrollCanvas from '@/components/ZondaScrollCanvas';
import ZondaExperience from '@/components/ZondaExperience';
import { CAR_DATA } from '@/data/carData';

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress of the 600vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-pagani-black min-h-screen text-white selection:bg-pagani-gold selection:text-black">
      <Navbar />

      {/* SCROLL SEQUENCE (Locked for 600vh) */}
      <section ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Layer 0: The Image Sequence */}
          <ZondaScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={CAR_DATA.assets.totalFrames}
            imageFolderPath={CAR_DATA.assets.sequencePath}
          />

          {/* Layer 1: The HUD Experience */}
          <ZondaExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* REST OF SITE (Scrolls naturally after sequence) */}
      <div className="relative z-20 bg-pagani-black border-t border-white/10">

        {/* Dummy Content to demonstrate scrolling past */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-orbitron mb-8 text-pagani-gold">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-8 border border-white/10 hover:border-pagani-gold/50 transition-colors bg-white/5">
                <h3 className="text-xl font-bold mb-4 font-orbitron">Feature {i}</h3>
                <p className="text-gray-400 font-rajdhani">
                  Precision engineering meets artistic expression. Every component is crafted from the finest materials.
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer className="py-12 border-t border-white/10 text-center text-gray-500 font-rajdhani">
          <p>© 2024 Pagani Automobili. All rights reserved.</p>
        </footer>

      </div>
    </main>
  );
}
