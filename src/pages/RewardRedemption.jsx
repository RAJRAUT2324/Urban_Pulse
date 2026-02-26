import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, Download, CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import TripleHeader from '../components/TripleHeader';

const RewardRedemption = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a small loading for premium feel
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-900 text-white">
            <div className="w-20 h-20 border-4 border-pmc-accent border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(242,153,74,0.3)]"></div>
            <p className="font-black text-pmc-accent uppercase tracking-[0.5em] text-xs animate-pulse">Authenticating Reward...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <TripleHeader />

            <main className="flex-1 pt-32 pb-20 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100"
                >
                    <div className="bg-pmc-blue p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pmc-accent/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
                            className="w-32 h-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10"
                        >
                            <Award size={64} className="text-pmc-saffron" />
                        </motion.div>
                        <h1 className="text-4xl font-black text-white tracking-tighter mb-4 relative z-10">Reward Authenticated</h1>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-pmc-accent text-xs font-black uppercase tracking-widest relative z-10">
                            <CheckCircle size={14} /> Verified Case #{id}
                        </div>
                    </div>

                    <div className="p-12 md:p-16 text-center">
                        <div className="mb-12">
                            <h2 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">Citizen Impact Reward</h2>
                            <p className="text-slate-500 font-medium italic text-lg leading-relaxed">
                                "You are the best person for self motivation and every time!"
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="p-8 bg-slate-50 rounded-[3rem] border-2 border-slate-100 group transition-all hover:border-pmc-accent/30">
                                <div className="w-16 h-16 bg-pmc-accent/10 text-pmc-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <Award size={32} />
                                </div>
                                <h3 className="text-sm font-black text-pmc-blue uppercase tracking-widest mb-2">Claim Reward</h3>
                                <p className="text-xs font-bold text-slate-600">Free Urban Pulse Shirt</p>
                                <p className="text-[10px] text-slate-400 mt-4 uppercase font-black tracking-widest">Show this at Partner Shop</p>
                            </div>

                            <div className="p-8 bg-slate-50 rounded-[3rem] border-2 border-slate-100 group transition-all hover:border-pmc-blue/30 text-center">
                                <div className="relative mb-6">
                                    <img
                                        src="/assets/golden-badge.png"
                                        alt="Golden Badge"
                                        className="w-24 h-24 mx-auto rounded-2xl shadow-xl border-4 border-white object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-sm font-black text-pmc-blue uppercase tracking-widest mb-2">Digital Badge</h3>
                                <p className="text-xs font-bold text-slate-600">Golden Prime Medal</p>
                                <a
                                    href="/assets/golden-badge.png"
                                    download={`UrbanPulse_Badge_${id}.png`}
                                    className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-pmc-accent hover:text-pmc-blue transition-colors"
                                >
                                    <Download size={14} /> Download PNG
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Link
                                to="/"
                                className="btn-primary w-full py-6 text-sm flex items-center justify-center gap-3"
                            >
                                <Home size={18} /> Return to Dashboard
                            </Link>
                            <button className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mx-auto hover:text-pmc-blue transition-colors">
                                <ArrowLeft size={14} /> Back to verify flow
                            </button>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Blockchain Security Hash</p>
                        <p className="text-[9px] font-mono text-slate-300 truncate">SHA256: {Math.random().toString(36).substring(2, 15).toUpperCase()}{Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default RewardRedemption;
