import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import HeroCity from '../components/HeroCity';

const SmartCityPulse = () => {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="gov-container">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <div className="inline-block px-4 py-1.5 bg-pmc-blue/5 text-pmc-blue text-[11px] font-black rounded-full mb-8 uppercase tracking-[0.3em] border border-pmc-blue/10">
                            Technology Showcase
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-pmc-blue mb-8 leading-tight tracking-tighter">
                            Digital Twin & <br />
                            <span className="text-gradient">Real-Time City Pulse</span>
                        </h2>
                        <p className="text-slate-500 text-lg mb-12 leading-relaxed font-medium">
                            UrbanPulse uses advanced neural networks to map every grievance node across the city.
                            Our "Digital Twin" technology allows municipal commissioners to visualize systemic issues
                            before they escalate into city-wide crises.
                        </p>

                        <div className="space-y-8">
                            {[
                                { title: "Neural Response Mapping", desc: "Visualize grievance categories in a real-time 3D dashboard." },
                                { title: "Predictive Analytics", desc: "AI predicts potential waste & water management failures." },
                                { title: "Resolution Traceability", desc: "Every point in the grid is a blockchain-verified status." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="w-10 h-10 rounded-2xl bg-pmc-blue text-white flex items-center justify-center shrink-0 font-black text-xs shadow-lg group-hover:bg-pmc-accent transition-colors">{i + 1}</div>
                                    <div>
                                        <h4 className="font-black text-pmc-blue text-lg tracking-tight mb-1">{item.title}</h4>
                                        <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 w-full h-[500px] md:h-[650px] bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl border-x border-t border-white/10"
                    >
                        <Canvas camera={{ position: [0, 10, 20], fov: 45 }}>
                            <Suspense fallback={null}>
                                <HeroCity />
                            </Suspense>
                        </Canvas>
                        {/* Overlay Controls */}
                        <div className="absolute top-6 right-6 flex flex-col gap-2">
                            <button className="bg-white/10 backdrop-blur-md p-2 rounded-lg text-white border border-white/20 hover:bg-white/20">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Live Pulse</span>
                            </button>
                            <button className="bg-pmc-blue p-2 rounded-lg text-white shadow-lg">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Toggle GIS</span>
                            </button>
                        </div>
                        <div className="absolute bottom-6 left-6 text-white/50 text-[10px] uppercase font-bold tracking-[0.3em]">
                            Pune Urban Digital Twin v2.0
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SmartCityPulse;
