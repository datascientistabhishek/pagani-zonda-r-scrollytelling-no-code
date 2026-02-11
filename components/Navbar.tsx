'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-500 ${isScrolled ? 'bg-pagani-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="flex items-center gap-4">
                <Link href="/" className="text-2xl font-bold tracking-widest text-white uppercase font-orbitron">
                    PAGANI
                </Link>
            </div>

            <button className="px-6 py-2 text-sm font-bold tracking-widest text-black uppercase transition-all duration-300 bg-white border border-white hover:bg-pagani-gold hover:border-pagani-gold hover:text-black clip-path-slant">
                INQUIRE
            </button>

            <style jsx>{`
        .clip-path-slant {
          clip-path: polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%);
        }
      `}</style>
        </motion.nav>
    );
}
