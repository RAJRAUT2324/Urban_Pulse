import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import CityPulseHeatmap from '../components/CityPulseHeatmap';

const SmartCityPulse = () => {
    const [grievances, setGrievances] = useState([]);

    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const { data } = await axios.get('/api/grievances');
                setGrievances(data);
            } catch (error) {
                console.error("Error fetching grievances for landing map:", error);
            }
        };
        fetchGrievances();
    }, []);

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
                            Asha Engine & <br />
                            <span className="text-gradient">Real-Time City Pulse</span>
                        </h2>
                        <p className="text-slate-500 text-lg mb-12 leading-relaxed font-medium">
                            UrbanPulse uses the Asha Neural Engine to map every grievance node across the city in real-time.
                            Our interactive intensity mapping allows for rapid response and predictive maintenance
                            of municipal infrastructure.
                        </p>

                        <div className="space-y-8">
                            {[
                                { title: "Neural Response Mapping", desc: "Visualize grievance categories in a real-time geo-spatial dashboard." },
                                { title: "Predictive Analytics", desc: "AI predicts potential waste & water management failures before they happen." },
                                { title: "Resolution Traceability", desc: "Every node in the pulse is a blockchain-verified grievance ticket." }
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
                        className="lg:w-1/2 w-full h-[500px] md:h-[650px] rounded-[3rem] overflow-hidden relative shadow-2xl border border-slate-200 bg-slate-50"
                    >
                        <CityPulseHeatmap data={grievances} height="100%" />

                        {/* Overlay Metadata */}
                        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
                            <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white border border-white/10 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-pmc-accent animate-pulse" />
                                <span className="text-[9px] font-extrabold uppercase tracking-widest">Live Pulse Feed</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SmartCityPulse;
