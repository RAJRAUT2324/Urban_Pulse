import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldAlert, Zap, CheckCircle2 } from 'lucide-react';

const CityPulseHeatmap = ({ data = [], height = "400px" }) => {
    // Normalized points for an abstract grid
    // In a real map, we'd use Leaflet or Google Maps. 
    // Here we create a stylized "Neural City Grid" visualization.

    return (
        <div className="relative bg-slate-950 rounded-[2.5rem] border border-white/10 overflow-hidden group shadow-2xl" style={{ height }}>
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)', backgroundSize: '30px 30px' }} />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80%] h-[80%] border-2 border-white/5 rounded-full border-dashed animate-[spin_60s_linear_infinity]" />
                <div className="absolute w-[60%] h-[60%] border border-white/5 rounded-full border-dashed animate-[spin_40s_linear_reverse_infinity]" />
            </div>

            {/* Heat Points */}
            <div className="absolute inset-0 p-12">
                <div className="relative w-full h-full">
                    {data.map((point, i) => {
                        // Mock mapping from lat/lng to component coords (since we have an abstract map)
                        const left = ((point.lng % 1) * 1000) % 100;
                        const top = ((point.lat % 1) * 1000) % 100;

                        const colorMap = {
                            red: 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]',
                            orange: 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]',
                            yellow: 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)]',
                            green: 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]'
                        };

                        const color = point.intensity || 'green';

                        return (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.05, type: 'spring' }}
                                className="absolute cursor-help group/point"
                                style={{ left: `${left}%`, top: `${top}%` }}
                            >
                                <div className={`w-3 h-3 rounded-full ${colorMap[color]} animate-pulse`} />

                                {/* Tooltip */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-[10px] font-black text-white whitespace-nowrap opacity-0 group-hover/point:opacity-100 transition-all scale-75 group-hover/point:scale-100 pointer-events-none z-50 shadow-2xl">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${colorMap[color]}`} />
                                        <span>STRESS INDEX: {point.weight}</span>
                                    </div>
                                    <p className="text-slate-400 mt-1 uppercase tracking-widest">{point.status}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="absolute top-8 left-8 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">CRISIS</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                    <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">STRESS</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">RESILIENT</span>
                </div>
            </div>

            {/* Header info */}
            <div className="absolute top-8 right-8 text-right">
                <h4 className="text-white font-black text-xl tracking-tighter uppercase mb-1">City Pulse Intelligence</h4>
                <p className="text-pmc-accent text-[10px] font-black uppercase tracking-[0.2em]">Real-time Geo-Neural Flux</p>
            </div>

            {/* Bottom Scanline */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-pmc-accent/50 to-transparent animate-[pulse_2s_infinite]" />
        </div>
    );
};

export default CityPulseHeatmap;
