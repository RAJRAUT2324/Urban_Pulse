import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, Building2 } from 'lucide-react';

const CorporationLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'Raj@123') {
            localStorage.setItem('corpAuthenticated', 'true');
            navigate('/corp-portal');
        } else {
            setError('Invalid credentials for Corporation access');
        }
    };

    return (
        <div className="min-h-screen bg-[#0B3C5D] flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pmc-accent/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2E8B8B]/20 rounded-full blur-[120px]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark border border-white/10 p-8 rounded-4xl w-full max-w-md shadow-2xl relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 bg-linear-to-br from-pmc-accent to-[#2E8B8B] rounded-2xl flex items-center justify-center mb-4 shadow-xl border border-white/20">
                        <Building2 size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter">PMC PORTAL</h2>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mt-2">Authorization Required</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-white/50 font-black uppercase tracking-widest ml-1">Access Key</label>
                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-4 focus:ring-pmc-accent/10 focus:border-pmc-accent transition-all placeholder:text-white/20`}
                                placeholder="Enter corporate password"
                                required
                            />
                            <Lock size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-pmc-accent transition-colors" />
                        </div>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-400 text-xs font-bold mt-2 ml-1"
                            >
                                {error}
                            </motion.p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pmc-accent hover:bg-blue-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-pmc-accent/20"
                    >
                        INITIALIZE SESSION <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-white/20">
                    <ShieldCheck size={14} />
                    <span className="text-[9px] uppercase font-bold tracking-widest">End-to-End Encrypted Node</span>
                </div>
            </motion.div>
        </div>
    );
};

export default CorporationLogin;
