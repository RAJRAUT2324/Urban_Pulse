import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Local People');
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const url = isRegister ? 'http://localhost:5000/api/users' : 'http://localhost:5000/api/users/login';
            const payload = isRegister ? { name, email, password, role } : { email, password, role };

            const { data } = await axios.post(url, payload, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/city-pulse'); // Redirect to city-pulse instead of profile for better flow
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-pmc-blue">
            {/* Background Aesthetic */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-pmc-blue via-pmc-blue to-black opacity-90" />
                <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-pmc-accent/20 rounded-full blur-[120px]" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-pmc-saffron/10 rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 w-full max-w-xl px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-dark border border-white/10 p-10 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <ShieldCheck size={120} />
                    </div>

                    <div className="mb-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pmc-accent/20 border border-pmc-accent/30 mb-6"
                        >
                            <Sparkles size={14} className="text-pmc-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pmc-accent">Secure Portal</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
                            {isRegister ? 'Join ' : 'Welcome to '}
                            <span className="text-gradient">UrbanPulse</span>
                        </h1>
                        <p className="text-white/40 font-medium text-sm tracking-tight">
                            {isRegister ? 'Join the community-driven smart governance network' : 'Access your decentralized city management dashboard'}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={submitHandler}>
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest text-center py-4 rounded-2xl"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            {isRegister && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-pmc-accent transition-colors" size={20} />
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 text-white rounded-3xl py-5 pl-14 pr-6 focus:ring-4 focus:ring-pmc-accent/20 focus:border-pmc-accent outline-none transition-all placeholder:text-white/10 font-bold"
                                            placeholder="Ex: Rajesh Deshmukh"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-pmc-accent transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 text-white rounded-3xl py-5 pl-14 pr-6 focus:ring-4 focus:ring-pmc-accent/20 focus:border-pmc-accent outline-none transition-all placeholder:text-white/10 font-bold"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-pmc-accent transition-colors" size={20} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full bg-white/5 border border-white/10 text-white rounded-3xl py-5 pl-14 pr-6 focus:ring-4 focus:ring-pmc-accent/20 focus:border-pmc-accent outline-none transition-all placeholder:text-white/10 font-bold"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Portal Access Role</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 text-white rounded-3xl py-5 px-6 focus:ring-4 focus:ring-pmc-accent/20 focus:border-pmc-accent outline-none transition-all font-bold appearance-none cursor-pointer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="Local People" className="bg-pmc-blue">Citizen / Local Inhabitant</option>
                                    <option value="Worker" className="bg-pmc-blue">Field Investigator</option>
                                    <option value="Department" className="bg-pmc-blue">Administrative Hub</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-6 mt-6 bg-pmc-accent text-white rounded-3xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-pmc-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            {isRegister ? 'Register Account' : 'Initialize Session'}
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-colors pb-1 border-b border-white/10 hover:border-pmc-accent"
                        >
                            {isRegister ? 'Already verified? Sign in' : "New to the pulse? Create account"}
                        </button>
                    </div>
                </motion.div>

                <p className="text-center mt-12 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                    Powered by Pune Municipal Corporation & Blockchain Hub
                </p>
            </main>
        </div>
    );
};

export default LoginPage;

