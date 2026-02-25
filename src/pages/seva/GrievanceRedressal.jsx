import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Send, Clock, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

const GrievanceRedressal = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="gov-container py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-pmc-accent">Resolution Protocol</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-pmc-blue tracking-tighter mb-6">
                        तक्रार निवारण <span className="text-gradient">Grievance</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
                        Voice your concerns directly to the UrbanPulse Brain. Our AI-driven system ensures 100% traceabilty and rapid resolution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                        <h2 className="text-3xl font-black text-pmc-blue mb-10 tracking-tight">Submit Protocol</h2>
                        <form className="space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Channel Type</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-pmc-accent transition-all appearance-none">
                                        <option>Public Health</option>
                                        <option>Roads & Lights</option>
                                        <option>Water Supply</option>
                                        <option>Illegal Construction</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Neural Priority</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-pmc-accent transition-all appearance-none">
                                        <option>Standard</option>
                                        <option>Urgent</option>
                                        <option>Emergency</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Detail Narrative</label>
                                <textarea rows="4" className="w-full bg-slate-50 border border-slate-100 p-6 rounded-3xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-pmc-accent transition-all resize-none" placeholder="Describe the issue with spatial context..."></textarea>
                            </div>
                            <button className="w-full py-5 bg-pmc-blue text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-pmc-blue/30 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">
                                <Send size={18} /> Broadcast Grievance
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <ShieldAlert size={120} />
                            </div>
                            <h4 className="text-xl font-black mb-8 tracking-tight uppercase">Real-time Pulse</h4>
                            <div className="space-y-8">
                                {[
                                    { label: 'Active Influx', val: '2,481', icon: <MessageSquare size={16} /> },
                                    { label: 'Resolved Delta', val: '98.2%', icon: <CheckCircle2 size={16} /> },
                                    { label: 'Mean Resolution', val: '4.2h', icon: <Clock size={16} /> }
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center group cursor-default">
                                        <div className="flex items-center gap-4 text-white/40 group-hover:text-pmc-accent transition-colors">
                                            {stat.icon}
                                            <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                                        </div>
                                        <span className="text-xl font-black tracking-tighter">{stat.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="premium-card p-10 glass-effect border-pmc-accent/20">
                            <h4 className="text-xl font-black text-pmc-blue mb-4">Track Existing Node</h4>
                            <p className="text-sm text-slate-400 font-medium mb-6">Enter your 12-digit Protocol ID to scan settlement status.</p>
                            <div className="flex gap-4">
                                <input type="text" className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-bold" placeholder="protocol_id" />
                                <button className="w-12 h-12 bg-pmc-accent text-white rounded-xl flex items-center justify-center shadow-lg"><ArrowRight size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrievanceRedressal;
