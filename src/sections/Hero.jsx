import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import HeroCity from '../components/HeroCity';

const Hero = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 10, 20], fov: 45 }}>
                    <Suspense fallback={null}>
                        <HeroCity />
                    </Suspense>
                </Canvas>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/60 to-navy"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl mx-auto"
                >
                    <motion.div variants={item} className="inline-block mb-6 px-4 py-1 rounded-full border border-neon-green/30 bg-neon-green/5">
                        <span className="text-neon-green text-sm font-medium tracking-widest uppercase">
                            Smart Urban Governance
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="text-6xl md:text-8xl font-black mb-6 leading-tight"
                    >
                        The <span className="text-neon-green italic">Nervous System</span> <br />
                        of Your City
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        UrbanPulse synchronizes municipal response with real-time AI analytics,
                        transforming citizen grievances into structural improvements.
                    </motion.p>

                    <motion.div variants={item} className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="px-8 py-4 bg-neon-green text-navy font-bold rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:scale-105 transition-transform">
                            Report an Issue
                        </button>
                        <button className="px-8 py-4 glass border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                            Explore Neural Map
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-neon-green to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
