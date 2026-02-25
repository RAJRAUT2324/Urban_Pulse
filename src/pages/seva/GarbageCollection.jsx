import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Truck, Recycle, Map, Calendar, AlertCircle, ChevronRight } from 'lucide-react';

const GarbageCollection = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="gov-container py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-green-500">Zero Waste Flux</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-pmc-blue tracking-tighter mb-6">
                        कचरा व्यवस्थापन <span className="text-gradient">Garbage</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
                        Monitor live collection vehicles and access smart waste segregation guides for a cleaner urban footprint.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-10">
                        {/* Live Tracking Map Placeholder */}
                        <div className="relative group overflow-hidden h-96 rounded-[3rem] bg-slate-200 shadow-2xl border border-white">
                            <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                                <div className="text-center">
                                    <Map size={48} className="text-slate-400 mx-auto mb-4 animate-bounce" />
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Spatial Telemetry Active</p>
                                </div>
                            </div>
                            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl max-w-xs">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                        <Truck size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-pmc-blue text-sm">Vehicle V-9281</p>
                                        <p className="text-[10px] font-bold text-green-600 uppercase">Sector 4 Scan In Progress</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div animate={{ width: '75%' }} className="h-full bg-green-500" />
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase text-right">ETA: 12m 40s</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="premium-card p-10 hover:border-pmc-blue/30 cursor-pointer transition-all">
                                <Recycle className="text-pmc-blue mb-6" size={32} />
                                <h4 className="text-xl font-black text-pmc-blue mb-3">Segregation Flux</h4>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed">Learn how to bifurcate Dry, Wet, and Sanitary waste for AI-optimized processing.</p>
                                <button className="mt-6 flex items-center gap-2 text-pmc-blue font-black text-xs uppercase tracking-widest group">View Guide <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></button>
                            </div>
                            <div className="premium-card p-10 hover:border-pmc-blue/30 cursor-pointer transition-all">
                                <Calendar className="text-green-500 mb-6" size={32} />
                                <h4 className="text-xl font-black text-pmc-blue mb-3">Bulk Pick Schedule</h4>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed">Plan major waste disposals through our scheduled cluster collection protocol.</p>
                                <button className="mt-6 flex items-center gap-2 text-pmc-blue font-black text-xs uppercase tracking-widest group">Book Slot <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                            <h4 className="text-xl font-black text-pmc-blue mb-6">Regional Metrics</h4>
                            <div className="space-y-6">
                                {[
                                    { ward: 'Ward 4/A', load: '94%', status: 'NOMINAL' },
                                    { ward: 'Ward 2/C', load: '102%', status: 'HIGH' },
                                    { ward: 'Central ward', load: '45%', status: 'SYNC' }
                                ].map((m, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.ward}</span>
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded ${m.status === 'HIGH' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>{m.status}</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                            <div className={`h-full ${m.status === 'HIGH' ? 'bg-red-400' : 'bg-green-400'}`} style={{ width: m.load }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                            <h4 className="text-xl font-black mb-4 flex items-center gap-3"><AlertCircle size={20} className="text-pmc-orange" /> Silent Alert</h4>
                            <p className="text-sm opacity-60 leading-relaxed mb-6 font-medium italic">
                                "Unauthorized dumping detected in Sector 12 via satellite telemetry. Clean-up node dispatched."
                            </p>
                            <button className="w-full py-4 bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest">View Feed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GarbageCollection;
