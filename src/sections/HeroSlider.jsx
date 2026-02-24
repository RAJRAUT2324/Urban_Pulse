import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const HeroSlider = () => {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1590483736622-39da8af75620?q=80&w=2000&auto=format&fit=crop",
            title: "स्वच्छ पुणे, सुंदर पुणे",
            subtitle: "Clean Pune, Beautiful Pune Initiative",
            cta: "Participate Now"
        },
        {
            image: "https://images.unsplash.com/photo-1517089534706-3d5efebb2442?q=80&w=2000&auto=format&fit=crop",
            title: "Digital Grievance System",
            subtitle: "Real-time AI monitoring for your civic issues.",
            cta: "Report Issue"
        },
        {
            image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop",
            title: "24x7 Water Supply Project",
            subtitle: "Upgrading infrastructure for a smarter city.",
            cta: "Read More"
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[450px] md:h-[600px] overflow-hidden bg-gray-200">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img src={slides[current].image} alt="Slide" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-pmc-blue/70 via-pmc-blue/30 to-pmc-blue/10"></div>
                </motion.div>
            </AnimatePresence>

            {/* Slider Content */}
            <div className="absolute inset-0 z-10 flex items-center px-4 md:px-20">
                <div className="max-w-4xl text-left">
                    <motion.div
                        key={`t-${current}`}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-3xl md:text-7xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
                            {slides[current].title}
                        </h2>
                        <p className="text-sm md:text-2xl font-bold text-white/90 mb-6 md:mb-10 max-w-2xl drop-shadow-lg leading-relaxed">
                            {slides[current].subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="btn-pmc-saffron px-6 md:px-10 py-3 md:py-4 text-xs md:text-sm scale-100 md:scale-110">
                                {slides[current].cta}
                            </button>
                            <Link
                                to="/login"
                                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-6 md:px-10 py-3 md:py-4 rounded font-black uppercase text-[10px] md:text-sm hover:bg-white/20 transition-all flex items-center justify-center"
                            >
                                Login to Portal
                            </Link>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-10 right-4 md:right-20 flex gap-4 z-30">
                <button
                    onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 hover:bg-pmc-saffron text-white transition-all rounded-full border border-white/30 backdrop-blur"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 hover:bg-pmc-saffron text-white transition-all rounded-full border border-white/30 backdrop-blur"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-300 rounded-full h-2 ${i === current ? 'w-8 md:w-10 bg-pmc-saffron' : 'w-2 bg-white/50'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
