import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, Users } from 'lucide-react';

const Gamification = () => {
    const stats = [
        { label: "Community Rep", value: "Level 24", icon: <TrendingUp className="text-neon-green" /> },
        { label: "Resolutions", value: "1,280+", icon: <CheckCircle className="text-neon-green" /> },
        { label: "Civic Credits", value: "45,000", icon: <Star className="text-neon-green" /> },
        { label: "Active Heroes", value: "890", icon: <Users className="text-neon-green" /> }
    ];

    const badges = [
        { name: "First Responder", locked: false },
        { name: "Pothole Hero", locked: false },
        { name: "Water Savior", locked: true },
        { name: "Green Guard", locked: false },
        { name: "Logic Master", locked: true },
        { name: "City Legend", locked: true },
    ];

    return (
        <section className="py-24 bg-navy">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-5xl font-black mb-6 leading-tight">
                            Earn Your Place in the <br />
                            <span className="text-neon-green italic">Citizen Pantheon</span>
                        </h2>
                        <p className="text-white/50 text-lg mb-10 leading-relaxed">
                            UrbanPulse rewards your contributions. Earn Civic Credits for every
                            verified report, which can be redeemed for local tax rebates, transit
                            passes, and exclusive governance badges.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((s, i) => (
                                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        {s.icon}
                                        <span className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</span>
                                    </div>
                                    <div className="text-2xl font-bold">{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full grid grid-cols-3 gap-4">
                        {badges.map((badge, i) => (
                            <motion.div
                                key={i}
                                whileHover={badge.locked ? {} : { scale: 1.05, rotate: 2 }}
                                className={`aspect-square flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${badge.locked
                                        ? 'bg-white/5 border-white/5 grayscale opacity-30 shadow-none'
                                        : 'bg-neon-green/5 border-neon-green/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${badge.locked ? 'bg-white/10' : 'bg-neon-green/20'
                                    }`}>
                                    <Trophy size={20} className={badge.locked ? 'text-white/40' : 'text-neon-green'} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-center">{badge.name}</span>
                                {!badge.locked && (
                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neon-green animate-ping"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Helper for icon check
const CheckCircle = ({ className, size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export default Gamification;
