import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, History, Calculator, ShieldCheck, Landmark, Receipt, ArrowRight } from 'lucide-react';
import DeptServices from '../../components/DeptServices';

const PropertyTax = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="gov-container py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-pmc-blue">Fiscal Node</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-pmc-blue tracking-tighter mb-6">
                        मिळकत कर <span className="text-gradient">Property Tax</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
                        Assess, calculate, and pay your municipal dues through our secure fiscal gateway with instant receipt generation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-12">
                            <div className="w-full md:w-1/2">
                                <h3 className="text-2xl font-black text-pmc-blue mb-6 tracking-tight flex items-center gap-3"><Calculator size={24} /> Tax Flux</h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Property ID / Node</label>
                                        <input type="text" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-bold" placeholder="E_00129381" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sector</label>
                                            <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-bold appearance-none">
                                                <option>Kothrud</option>
                                                <option>Aundh</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Usage</label>
                                            <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-bold appearance-none">
                                                <option>Residential</option>
                                                <option>Commercial</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button className="w-full py-4 bg-pmc-saffron text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-pmc-saffron/20">Analyze Due</button>
                                </div>
                            </div>
                            <div className="w-px h-64 bg-slate-100 hidden md:block" />
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <Receipt className="text-pmc-blue mb-4 mx-auto md:ml-0" size={32} />
                                <h2 className="text-4xl font-black text-pmc-blue mb-2 italic">₹ 0.00</h2>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-8">Pending Settlement</p>
                                <button disabled className="px-8 py-4 bg-slate-100 text-slate-400 rounded-xl font-black uppercase text-xs tracking-widest">Authorize Payment</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="premium-card p-10 group cursor-pointer hover:bg-pmc-blue transition-all duration-500">
                                <History className="text-pmc-accent group-hover:text-white mb-6" size={32} />
                                <h4 className="text-xl font-black text-pmc-blue group-hover:text-white mb-4">Node History</h4>
                                <p className="text-sm text-slate-400 group-hover:text-white/60 mb-8 leading-relaxed">Trace all historical settlements and generated receipts for your property ID.</p>
                                <button className="flex items-center gap-3 text-xs font-black text-pmc-blue group-hover:text-white uppercase tracking-widest">Access Ledger <ArrowRight size={16} /></button>
                            </div>
                            <div className="premium-card p-10 group cursor-pointer hover:bg-pmc-accent transition-all duration-500">
                                <Landmark className="text-pmc-blue group-hover:text-white mb-6" size={32} />
                                <h4 className="text-xl font-black text-pmc-blue group-hover:text-white mb-4">Grievance Hub</h4>
                                <p className="text-sm text-slate-400 group-hover:text-white/60 mb-8 leading-relaxed">Dispute inaccurate assessments via the property settlement tribunal.</p>
                                <button className="flex items-center gap-3 text-xs font-black text-pmc-blue group-hover:text-white uppercase tracking-widest">Raise Protocol <ArrowRight size={16} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={100} />
                            </div>
                            <h4 className="text-xl font-black mb-8 italic">Fiscal Integrity</h4>
                            <div className="space-y-6 relative z-10">
                                <p className="text-xs text-white/40 leading-relaxed font-medium">UrbanPulse uses SHA-256 equivalent hashing to secure your transactions. All payments are verified via the Municipal Reserve Node.</p>
                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[10px] font-black uppercase text-white/20">Security Scan</span>
                                        <span className="text-[10px] font-black text-green-400">100% SECURE</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                            <DeptServices category="utility" />
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-pmc-blue mb-6">
                                <CreditCard size={32} />
                            </div>
                            <h4 className="text-lg font-black text-pmc-blue mb-4">Auto-Settle</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Automate your urban dues</p>
                            <button className="w-full py-4 bg-pmc-blue text-white rounded-2xl font-black uppercase text-xs tracking-widest">Initialize Node</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyTax;
