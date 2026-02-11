'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { CAR_DATA } from '@/data/carData';

interface ZondaExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
    // --- Animation Transforms ---

    // Hero: 0% -> 33%
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    // Design: 33% -> 66%
    const designOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.6, 0.66], [0, 1, 1, 0]);
    const designX = useTransform(scrollYProgress, [0.3, 0.4], [-50, 0]);

    // Engine: 66% -> 100%
    const engineOpacity = useTransform(scrollYProgress, [0.66, 0.75, 1], [0, 1, 1]);
    const engineY = useTransform(scrollYProgress, [0.66, 0.75], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center max-w-7xl mx-auto px-6 h-screen">

            {/* PHASE 1: HERO */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
                <h1 className="text-8xl md:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-orbitron drop-shadow-2xl">
                    {CAR_DATA.hero.title}
                </h1>
                <p className="mt-4 text-3xl md:text-4xl text-pagani-gold font-rajdhani tracking-widest font-bold">
                    {CAR_DATA.hero.price}
                </p>
                <motion.button
                    className="mt-12 px-8 py-3 bg-transparent border border-pagani-gold text-pagani-gold text-lg uppercase tracking-[0.2em] hover:bg-pagani-gold hover:text-black transition-all duration-300 pointer-events-auto clip-path-slant"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {CAR_DATA.hero.cta}
                </motion.button>
            </motion.div>

            {/* PHASE 2: DESIGN */}
            <motion.div
                style={{ opacity: designOpacity, x: designX }}
                className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 max-w-xl"
            >
                <div className="w-24 h-1 bg-pagani-gold mb-6" />
                <h2 className="text-6xl md:text-7xl font-bold uppercase tracking-wide text-white font-orbitron mb-4">
                    {CAR_DATA.design.title}
                </h2>
                <h3 className="text-2xl text-pagani-gold uppercase tracking-widest mb-6 font-rajdhani">
                    {CAR_DATA.design.subtitle}
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed font-rajdhani border-l-2 border-white/20 pl-6">
                    {CAR_DATA.design.description}
                </p>
            </motion.div>

            {/* PHASE 3: ENGINE */}
            <motion.div
                style={{ opacity: engineOpacity, y: engineY }}
                className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 text-right pointer-events-auto"
            >
                <h2 className="text-6xl md:text-7xl font-bold uppercase tracking-wide text-white font-orbitron mb-12">
                    {CAR_DATA.engine.title}
                </h2>
                <div className="space-y-6">
                    {CAR_DATA.engine.specs.map((spec, index) => (
                        <div key={index} className="flex items-center justify-end gap-6 group">
                            <span className="text-pagani-gold text-lg uppercase tracking-widest font-bold group-hover:text-white transition-colors">
                                {spec.label}
                            </span>
                            <span className="text-4xl md:text-5xl font-orbitron font-medium text-white border-b border-white/20 pb-1 w-48 text-right">
                                {spec.value}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* PROGRESS BAR */}
            <motion.div className="absolute bottom-10 left-6 right-6 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-pagani-gold shadow-[0_0_10px_#D4AF37]"
                    style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                />
            </motion.div>

            <style jsx>{`
        .clip-path-slant {
          clip-path: polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%);
        }
      `}</style>
        </div>
    );
}
