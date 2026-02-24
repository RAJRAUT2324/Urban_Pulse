import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Shield, Globe, MessageSquare, ChevronRight, Download } from 'lucide-react';

const AppBanner = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="gov-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                    {/* UrbanPulse Care App Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="premium-card p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group bg-slate-50/50"
                    >
                        <div className="relative z-10 w-full md:w-1/2">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-pmc-blue rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
                                    <span className="text-white text-2xl font-black italic relative z-10">UP</span>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-pmc-blue tracking-tighter leading-none">UrbanPulse <span className="text-pmc-accent">Care</span></h4>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Citizen Experience App</p>
                                </div>
                            </div>

                            <p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed">
                                आत्ताच UrbanPulse Care App डाउनलोड करा आणि आपल्या समस्या सोडवा.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <a href="#" className="hover:scale-105 transition-transform active:scale-95">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-10" />
                                </a>
                                <a href="#" className="hover:scale-105 transition-transform active:scale-95">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
                                </a>
                            </div>

                            <div className="flex items-center gap-4 text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Smartphone size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">v2.4.0</span>
                                </div>
                                <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                <div className="flex items-center gap-2">
                                    <Shield size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 relative">
                            <motion.div
                                whileHover={{ rotate: 0, scale: 1.05 }}
                                className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transform rotate-6 transition-all duration-500"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop"
                                    alt="App Screenshot"
                                    className="rounded-4xl w-full"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-pmc-blue/20 to-transparent pointer-events-none" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Partnership / CSR Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="premium-card p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group bg-slate-900"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-pmc-accent/10 rounded-full blur-[100px] -mr-40 -mt-40" />

                        <div className="relative z-10 w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pmc-accent/10 border border-pmc-accent/20 mb-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-pmc-accent">Impact Together</span>
                            </div>
                            <h4 className="text-3xl font-black text-white leading-tight mb-6">
                                <span className="text-gradient">प्रगतशील शहरासाठी</span> <br />
                                चला एकत्र येऊया !
                            </h4>

                            <p className="text-slate-400 font-medium text-base mb-10 leading-relaxed">
                                Partner with us for sustainable urban development through our CSR initiatives.
                            </p>

                            <button className="btn-primary w-full md:w-auto flex items-center justify-center gap-3">
                                Join PMC Pulse CSR
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        <div className="w-full md:w-1/2 flex justify-center items-center relative z-10">
                            <div className="w-56 h-56 md:w-64 md:h-64 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop"
                                    alt="CSR Activity"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-pmc-blue/40 group-hover:bg-transparent transition-colors" />
                                <div className="premium-card bg-white rounded-4xl p-10 md:p-14 flex flex-col items-center justify-center text-center group border border-slate-100 transition-opacity">
                                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                                        <MessageSquare size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AppBanner;

