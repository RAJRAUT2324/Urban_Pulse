import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Map, Clock, Navigation, Zap, CreditCard, ArrowRight, Activity } from 'lucide-react';

const PublicTransport = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="gov-container py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-pmc-accent">Transit Flux</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-pmc-blue tracking-tighter mb-6">
                        सार्वजनिक वाहतूक <span className="text-gradient">Transport</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
                        Navigate the city's pulse with live PMPML/Metro tracking and smart card management.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-10">
                        {/* Live Transit Map Mockup */}
                        <div className="relative h-[450px] rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl border border-white group">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} className="w-[600px] h-[600px] border border-white/5 rounded-full" />
                                <div className="text-center relative z-10">
                                    <Navigation size={48} className="text-pmc-accent mx-auto mb-4 animate-pulse" />
                                    <p className="text-xs font-black uppercase tracking-[0.5em] text-white/20">Transit Telemetry Locked</p>
                                </div>
                            </div>

                            {/* Floating Bus Indicators */}
                            <div className="absolute top-1/4 left-1/3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-3">
                                <Bus size={18} className="text-pmc-accent" />
                                <div>
                                    <p className="text-[10px] font-black text-white">ROUTE 204</p>
                                    <p className="text-[8px] font-bold text-green-400">ON TIME</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="premium-card p-10 group hover:border-pmc-accent/30 cursor-pointer">
                                <CreditCard className="text-pmc-accent mb-6" size={32} />
                                <h4 className="text-xl font-black text-pmc-blue mb-4">Smart Pulse Card</h4>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">Recharge and manage your unified transit node for seamless city access.</p>
                                <button className="flex items-center gap-3 text-xs font-black text-pmc-blue uppercase tracking-widest">Recharge Node <ArrowRight size={16} /></button>
                            </div>
                            <div className="premium-card p-10 group hover:border-pmc-accent/30 cursor-pointer">
                                <Map className="text-pmc-blue mb-6" size={32} />
                                <h4 className="text-xl font-black text-pmc-blue mb-4">Route Architect</h4>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">Plan your journey using the city's optimal multimodal pathway generator.</p>
                                <button className="flex items-center gap-3 text-xs font-black text-pmc-blue uppercase tracking-widest">Plan Flow <ArrowRight size={16} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-pmc-blue mb-8">
                                <Clock size={32} />
                            </div>
                            <h4 className="text-2xl font-black text-pmc-blue mb-4 italic tracking-tight">Active Delays</h4>
                            <div className="w-full space-y-6 mt-4">
                                {[
                                    { route: 'Kothrud - PMC', delay: '+12m', status: 'CONGESTION' },
                                    { route: 'Baner - Hinj', delay: '+5m', status: 'HEAVY' },
                                    { route: 'Station - Corp', delay: '0m', status: 'SYNC' }
                                ].map((d, i) => (
                                    <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50">
                                        <div className="text-left">
                                            <p className="text-[10px] font-black text-pmc-blue uppercase">{d.route}</p>
                                            <p className="text-[8px] font-bold text-slate-300">{d.status}</p>
                                        </div>
                                        <span className={`text-sm font-black ${d.delay === '0m' ? 'text-green-500' : 'text-red-500'}`}>{d.delay}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-pmc-blue to-pmc-accent p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                            <Zap className="absolute top-10 right-10 opacity-20" size={80} />
                            <h4 className="text-xl font-black mb-4">EV Bus Nodes</h4>
                            <p className="text-xs font-medium opacity-80 mb-8 leading-relaxed">The city is now 45% powered by green transit nodes. Sync your next ride to an EV node to earn pulse credits.</p>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-white/20 p-4 rounded-xl backdrop-blur-md">
                                <Activity size={16} /> Green Flow Active
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicTransport;
