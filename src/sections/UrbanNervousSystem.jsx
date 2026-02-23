import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Globe, Zap } from 'lucide-react';

const UrbanNervousSystem = () => {
    const features = [
        {
            title: "AI Root-Cause",
            desc: "Identifies systemic failures before they become crises using pattern recognition.",
            icon: <Brain className="text-neon-green" />
        },
        {
            title: "Neural Routing",
            desc: "Connects grievances to the exact department node in milliseconds.",
            icon: <Zap className="text-neon-green" />
        },
        {
            title: "City Pulse Metric",
            desc: "Real-time happiness and efficiency index for urban zones.",
            icon: <Activity className="text-neon-green" />
        },
        {
            title: "Global Sync",
            desc: "Blockchain-backed audit logs for every municipal action.",
            icon: <Globe className="text-neon-green" />
        }
    ];

    return (
        <section className="py-24 bg-navy relative overflow-hidden">
            {/* Background Data-lines Animation */}
            <div className="absolute inset-0 z-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 1000 1000">
                    <motion.path
                        d="M0,500 Q250,200 500,500 T1000,500"
                        stroke="#22c55e"
                        strokeWidth="2"
                        fill="none"
                        animate={{ pathLength: [0, 1], pathOffset: [0, 1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                        d="M0,300 Q250,600 500,300 T1000,300"
                        stroke="#22c55e"
                        strokeWidth="1"
                        fill="none"
                        animate={{ pathLength: [0, 1], pathOffset: [1, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">Urban Nervous System</h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        We don't just fix problems; we analyze the underlying civic fabric
                        to prevent them from recurring.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="glass p-8 border-white/5 hover:border-neon-green/30 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-neon-green/20 transition-colors">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UrbanNervousSystem;
