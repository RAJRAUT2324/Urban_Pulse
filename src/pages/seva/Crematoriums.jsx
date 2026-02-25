import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, MapPin, Phone, Info, ShieldCheck, Clock } from 'lucide-react';

const Crematoriums = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="gov-container py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Dignity Sync</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-pmc-blue tracking-tighter mb-6">
                        स्मशानभूमी <span className="text-gradient">Crematoriums</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
                        Access dignified end-of-life services with real-time status updates across 40+ municipal facilities.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-6">
                        {[
                            { name: 'Vaikunth Shamshanbhumi', type: 'Electric / Gas / Wood', location: 'Navi Peth', status: 'Available', wait: '20m' },
                            { name: 'Kailas Shamshanbhumi', type: 'Electric / Wood', location: 'Kalyani Nagar', status: 'Maintenance', wait: 'N/A' },
                            { name: 'Amardham Crematorium', type: 'Gas / Wood', location: 'Hadapsar', status: 'Available', wait: '10m' }
                        ].map((facility, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.01 }}
                                className="bg-white p-8 rounded-4xl border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${facility.status === 'Available' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                                        <Activity size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-pmc-blue italic">{facility.name}</h3>
                                        <div className="flex gap-4 mt-2">
                                            <span className="text-[10px] font-black uppercase text-slate-400 opacity-60 flex items-center gap-1"><MapPin size={10} /> {facility.location}</span>
                                            <span className="text-[10px] font-black uppercase text-slate-400 opacity-60 flex items-center gap-1"><Info size={10} /> {facility.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-xs font-black uppercase tracking-widest mb-1 ${facility.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{facility.status}</p>
                                    <p className="text-[10px] font-bold text-slate-300">Wait: {facility.wait}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 italic">
                            <h4 className="text-lg font-black text-pmc-blue mb-6 border-b border-slate-50 pb-4">Protocol Help</h4>
                            <div className="space-y-4">
                                <p className="text-sm font-medium flex items-center gap-3 text-slate-500"><Clock size={16} /> 24/7 Digital Booking</p>
                                <p className="text-sm font-medium flex items-center gap-3 text-slate-500"><Phone size={16} /> Central Helpline: 108</p>
                                <p className="text-sm font-medium flex items-center gap-3 text-slate-500"><ShieldCheck size={16} /> Digital Certificate Issue</p>
                            </div>
                        </div>

                        <div className="bg-pmc-blue p-8 rounded-[2.5rem] text-white">
                            <h4 className="text-xl font-black mb-4">Urgent Dispatch</h4>
                            <p className="text-xs opacity-70 mb-8 leading-relaxed">Need ambulance sync? Our neural grid can connect you to the nearest health node in under 60 seconds.</p>
                            <button className="w-full py-4 bg-pmc-accent rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">Contact CNS Hub</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Crematoriums;
