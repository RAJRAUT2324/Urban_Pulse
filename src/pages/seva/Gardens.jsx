import React from 'react';
import { motion } from 'framer-motion';
import { Trees, CloudSun, MapPin, Wind, Thermometer, Droplets, ArrowRight } from 'lucide-react';

const Gardens = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="gov-container py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-green-500">Eco Node</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-pmc-blue tracking-tighter mb-6">
                        उद्याने <span className="text-gradient">Gardens</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
                        Explore the lungs of the city. Access real-time AQI metrics and facility guides for 210+ municipal parks.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { name: 'Empress Garden', location: 'Kavade Mala', aqi: '42', status: 'Optimal', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop' },
                            { name: 'Osho Teerth Park', location: 'Koregaon Park', aqi: '28', status: 'Excellent', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop' },
                            { name: 'Saras Baug', location: 'Sadashiv Peth', aqi: '58', status: 'Good', img: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=800&auto=format&fit=crop' },
                            { name: 'Pu La Deshpande Garden', location: 'Sinhagad Road', aqi: '35', status: 'Optimal', img: 'https://images.unsplash.com/photo-1558449028-s4507d307997?q=80&w=800&auto=format&fit=crop' }
                        ].map((park, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white cursor-pointer"
                            >
                                <img src={park.img} alt={park.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-black italic tracking-tight">{park.name}</h3>
                                        <span className="px-2 py-1 bg-green-500 rounded-lg text-[8px] font-black uppercase tracking-widest">{park.status}</span>
                                    </div>
                                    <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-white/60">
                                        <span className="flex items-center gap-1.5"><MapPin size={12} /> {park.location}</span>
                                        <span className="flex items-center gap-1.5"><Wind size={12} /> AQI: {park.aqi}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                            <h4 className="text-xl font-black text-pmc-blue mb-8 italic flex items-center gap-3">
                                <CloudSun size={24} className="text-pmc-orange" /> Eco Pulse
                            </h4>
                            <div className="space-y-8">
                                {[
                                    { label: 'Temperature', val: '28°C', icon: <Thermometer size={18} /> },
                                    { label: 'Humidity', val: '62%', icon: <Droplets size={18} /> },
                                    { label: 'Avg AQI', val: '41', icon: <Wind size={18} /> }
                                ].map((s, i) => (
                                    <div key={i} className="flex justify-between items-center group cursor-default">
                                        <div className="flex items-center gap-4 text-slate-300 group-hover:text-pmc-blue transition-colors">
                                            {s.icon}
                                            <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                                        </div>
                                        <span className="text-lg font-black text-pmc-blue">{s.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-pmc-blue p-10 rounded-[3rem] text-white shadow-2xl">
                            <h4 className="text-2xl font-black mb-4 italic tracking-tight">Garden Nodes</h4>
                            <p className="text-sm font-medium opacity-60 mb-8 leading-relaxed">Book municipal garden spaces for institutional photography or ecological tours via our digital protocol.</p>
                            <button className="w-full py-4 bg-pmc-accent text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-2 group">
                                Start Protocol <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gardens;
