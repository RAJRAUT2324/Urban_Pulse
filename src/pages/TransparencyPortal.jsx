import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, BarChart3, Globe, Zap, AlertCircle } from 'lucide-react';
import CorporateDecisions from '../components/CorporateDecisions';
import DecisionOfTheWeek from '../components/DecisionOfTheWeek';
import TransparencyScore from '../components/TransparencyScore';
import PublicGrievanceFeed from '../components/PublicGrievanceFeed';
import TripleHeader from '../components/TripleHeader';
import Footer from '../components/Footer';

const TransparencyPortal = () => {
    return (
        <div className="min-h-screen bg-pmc-bg">
            <TripleHeader isFixed={true} />

            <main className="pt-32 pb-20">
                <div className="gov-container px-6">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pmc-blue/5 border border-pmc-blue/10 mb-6">
                            <ShieldCheck size={14} className="text-pmc-blue" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-pmc-blue">Middleware Transparency Layer</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-pmc-blue mb-6">
                            Transparency <span className="text-pmc-accent">Portal</span>
                        </h1>
                        <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
                            A neutral interface between citizens and the corporation. Access real-time data, corporate decisions, and accountability metrics directly from the municipal nervous system.
                        </p>
                    </motion.div>

                    <div className="max-w-7xl mx-auto px-6 pb-32">
                        {/* Real-Time Transparency Metrics (Accountable Math) */}
                        <div className="mb-20">
                            <TransparencyScore />
                        </div>

                        {/* Decision of the Week Highlight (Public Proof) */}
                        <div className="mb-20">
                            <DecisionOfTheWeek />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Left Column: Live Accountability Feed (4 cols) */}
                            <div className="lg:col-span-4">
                                <PublicGrievanceFeed />
                            </div>

                            {/* Right Column: Major Decisions & News (8 cols) */}
                            <div className="lg:col-span-8 space-y-12">
                                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                                    <h3 className="text-2xl font-black text-pmc-blue tracking-tight uppercase mb-8 flex items-center gap-3">
                                        <FileText className="text-pmc-accent" />
                                        Departmental Resolutions
                                    </h3>
                                    <CorporateDecisions />
                                </div>

                                {/* Municipal Identity Sections */}
                                <div className="bg-linear-to-br from-pmc-blue to-pmc-accent rounded-4xl p-8 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                        <ShieldCheck size={200} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Our Commitment</h3>
                                    <p className="text-sm font-bold text-white/80 leading-relaxed mb-8">
                                        "Transparency is not just sharing data; it's ensuring every citizen understands how decisions are made for the city's future."
                                    </p>
                                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md transition-all">
                                        View Accountability Charter
                                    </button>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-4xl p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <AlertCircle size={20} className="text-pmc-accent" />
                                        <h4 className="font-black text-lg tracking-tight uppercase">Platform Integrity</h4>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                                        All decisions shown here are immutable and synced from the Pune Municipal Audit Trail.
                                    </p>
                                    <div className="space-y-4">
                                        {['Data Privacy', 'Neutral Mediation', 'Fair Representation'].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-[11px] font-black text-slate-600 uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 rounded-full bg-pmc-accent" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TransparencyPortal;
