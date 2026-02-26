import React, { useState, useEffect } from 'react';
import TripleHeader from '../components/TripleHeader';
import SubmitReport from '../components/SubmitReport';
import CitizenDashboard from '../components/CitizenDashboard';
import { Activity, LayoutDashboard, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CityPulse = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        console.log("CityPulse component mounted");
    }, []);

    const stats = [
        { label: 'Resolved Today', value: '124', icon: <TrendingUp size={20} />, color: 'pmc-accent' },
        { label: 'Pending Verification', value: '42', icon: <Activity size={20} />, color: 'pmc-orange' },
        { label: 'Verified Nodes', value: '1.2k', icon: <LayoutDashboard size={20} />, color: 'pmc-blue' },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50">
            <TripleHeader />

            <div className="relative pt-[180px] pb-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-pmc-blue overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-pmc-blue via-pmc-blue to-black opacity-90" />
                    <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-pmc-accent/20 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-pmc-saffron/10 rounded-full blur-[100px]" />
                </div>

                <div className="gov-container relative z-10 text-white">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark border-white/10 mb-8"
                        >
                            <div className="w-2 h-2 rounded-full bg-pmc-accent animate-pulse" />
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/80">Live Governance Network</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none"
                        >
                            City<span className="text-gradient">Pulse</span> <br />
                            <span className="text-4xl md:text-6xl text-white/90">Transparency Ledger</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl font-medium max-w-2xl text-white/60 leading-relaxed mb-12"
                        >
                            Experience the 'Trust & Truth' Accountability Layer. Our blockchain-audit system ensures every complaint is handled with total transparency and verified by citizens like you.
                        </motion.p>

                        <div className="flex flex-wrap gap-4">
                            <button className="btn-primary flex items-center gap-3">
                                Explore Data API <ChevronRight size={18} />
                            </button>
                            <button className="px-8 py-4 rounded-2xl glass-dark border-white/10 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                                Security Audit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="gov-container -mt-16 pb-32 relative z-20">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            key={idx}
                            className="premium-card p-8 flex items-center gap-8 bg-white"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-${stat.color}/10 text-${stat.color} shadow-xl shadow-${stat.color}/10`}>
                                {stat.icon}
                            </div>
                            <div>
                                <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</h4>
                                <p className="text-3xl font-black text-pmc-blue tracking-tight">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tabs Control */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div className="flex gap-2 p-1.5 bg-slate-200/50 rounded-2xl border border-slate-200">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-500 ${activeTab === 'dashboard' ? 'bg-white text-pmc-blue shadow-xl' : 'text-slate-500 hover:text-pmc-blue'}`}
                        >
                            Citizen Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('submit')}
                            className={`px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-500 ${activeTab === 'submit' ? 'bg-white text-pmc-blue shadow-xl' : 'text-slate-500 hover:text-pmc-blue'}`}
                        >
                            New Report
                        </button>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                        <Activity size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">System Status: <span className="text-green-600">Optimal</span></span>
                    </div>
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {activeTab === 'dashboard' ? <CitizenDashboard /> : <SubmitReport />}
                </motion.div>
            </main>
        </div>
    );
};
;

export default CityPulse;
