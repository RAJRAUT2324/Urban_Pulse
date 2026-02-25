import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000&auto=format&fit=crop",
            title: "Reimagining Pune with AI-Driven Governance",
            description: "Empowering citizens through real-time feedback loops and blockchain-verified structural improvements.",
            cta: "Report Issue",
            accent: "pmc-accent"
        },
        {
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000&auto=format&fit=crop",
            title: "Transparency in Every Transition",
            description: "Track your reports on an immutable ledger. 100% accountability, zero bureaucracy.",
            cta: "Explore Ledger",
            accent: "pmc-saffron"
        },
        {
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000&auto=format&fit=crop",
            title: "Building the Infrastructure of Tomorrow",
            description: "Join thousands of Punekars in co-creating the most responsive city in India.",
            cta: "Punekar Initiatives",
            accent: "pmc-orange"
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[650px] md:h-[850px] overflow-hidden bg-slate-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="absolute inset-0"
                >
                    <img src={slides[current].image} alt="Pune City Slide" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 via-transparent to-slate-900/40" />
                    <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/40 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Slider Content */}
            <div className="absolute inset-0 z-10 flex items-center">
                <div className="gov-container w-full h-full flex items-center">
                    <div className="max-w-3xl">
                        <motion.div
                            key={`content-${current}`}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-white/10 mb-8"
                            >
                                <div className={`w-2 h-2 rounded-full animate-pulse bg-${slides[current].accent}`} />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80">
                                    Official Digital Pulse
                                </span>
                            </motion.div>

                            <h2 className="text-5xl md:text-8xl font-black text-white leading-tight mb-8 drop-shadow-2xl">
                                {slides[current].title.split(' ').map((word, i) => (
                                    <span key={i} className={i % 3 === 0 ? "text-gradient block md:inline" : ""}>
                                        {word}{" "}
                                    </span>
                                ))}
                            </h2>

                            <p className="text-lg md:text-2xl font-medium text-white/70 mb-12 max-w-xl leading-relaxed">
                                {slides[current].description}
                            </p>

                            <div className="flex flex-wrap gap-6 items-center">
                                <Link to="/city-pulse" className="btn-primary flex items-center gap-3 group">
                                    {slides[current].cta}
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button className="btn-secondary glass-effect flex items-center gap-3 border-white/10 text-white/90">
                                    <Play size={18} fill="white" />
                                    Watch Story
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Premium Controls */}
            <div className="absolute bottom-16 right-4 md:right-20 flex items-center gap-8 z-30">
                <div className="flex gap-4">
                    <button
                        onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)}
                        className="w-14 h-14 flex items-center justify-center glass-effect border-white/10 text-white hover:bg-pmc-accent hover:border-pmc-accent transition-all rounded-2xl active:scale-90"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
                        className="w-14 h-14 flex items-center justify-center glass-effect border-white/10 text-white hover:bg-pmc-accent hover:border-pmc-accent transition-all rounded-2xl active:scale-90"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex flex-col gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`transition-all duration-500 rounded-full w-1 ${i === current ? 'h-10 bg-pmc-accent' : 'h-3 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <div className="absolute left-1/2 bottom-10 -translate-x-1/2 flex items-center gap-4 text-white/30">
                <div className="h-px w-20 bg-linear-to-r from-pmc-blue to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black">Explore Pulse</span>
                <div className="w-10 h-px bg-linear-to-l from-transparent to-white/20" />
            </div>
        </section>
    );
};

export default HeroSlider;

