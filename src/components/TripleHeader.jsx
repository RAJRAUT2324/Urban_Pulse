import React, { useState, useEffect } from 'react';
import { Search, Globe, Accessibility, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TripleHeader = ({ isFixed = true }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navItems = [
        { name: 'The Corporation', path: '/corp-login' },
        { name: 'Urban Nervous System', path: '/corp-login' },
        { name: 'Online Services', path: '#' },
        { name: 'City Pulse', path: '/city-pulse' },
        { name: 'Portal Login', path: '/login' },
        { name: 'Contact', path: '#' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${isFixed ? 'fixed top-0 left-0 w-full' : 'relative'} z-100 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
            <div className="gov-container">
                <nav className={`transition-all duration-500 rounded-4xl border overflow-hidden ${isScrolled ? 'glass-effect border-white/40 shadow-2xl' : 'bg-white border-transparent shadow-lg'}`}>

                    {/* Top Decorative Line */}
                    <div className="h-1.5 w-full bg-linear-to-r from-pmc-blue via-pmc-accent to-pmc-saffron opacity-80" />

                    <div className="px-6 md:px-10 py-4 flex justify-between items-center">
                        {/* Logo Group */}
                        <Link to="/" className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-pmc-blue rounded-2xl shadow-xl flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
                                <span className="text-white text-2xl font-black italic relative z-10">UP</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-2xl font-black text-pmc-blue tracking-tighter leading-none flex items-center gap-1 group-hover:text-pmc-accent transition-colors">
                                    Urban<span className="text-pmc-accent">Pulse</span>
                                </h1>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.3em]">
                                    Digital Smart Board
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navItems.map((item, i) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`px-5 py-2.5 rounded-xl text-[13px] font-bold tracking-tight transition-all duration-300 hover:bg-pmc-blue/5 ${item.name === 'Portal Login' ? 'btn-primary ml-4' : 'text-slate-600 hover:text-pmc-blue'}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile & Utility Actions */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center bg-slate-100/50 rounded-2xl border border-slate-200 px-4 py-2 hover:border-pmc-accent/30 transition-all w-48 group">
                                <Search size={16} className="text-slate-400 group-focus-within:text-pmc-accent transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Quick Search..."
                                    className="bg-transparent border-none text-[12px] focus:ring-0 w-full font-semibold text-slate-600 outline-none ml-2"
                                />
                            </div>

                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden w-11 h-11 flex items-center justify-center bg-slate-100 rounded-2xl text-pmc-blue hover:bg-pmc-blue/5 transition-all active:scale-90"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Premium Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden absolute top-24 left-0 w-full px-6 z-100"
                    >
                        <div className="glass-dark border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
                            <div className="space-y-4">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-2xl font-black text-white hover:text-pmc-accent transition-colors tracking-tight"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/10 flex flex-col gap-6">
                                <div className="flex gap-10">
                                    <div>
                                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Language</p>
                                        <div className="flex gap-4 font-black text-sm">
                                            <span className="text-pmc-accent">English</span>
                                            <span className="text-white/60">Marathi</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Helpline</p>
                                        <p className="text-lg font-black text-white">1800 103 0222</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default TripleHeader;

