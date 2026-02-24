import React from 'react';
import { Search, Globe, Accessibility, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';


const TripleHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navItems = ['The Corporation', 'Online Services', 'Departments', 'City Pulse', 'Policies', 'Login', 'Contact Us'];


    return (
        <header className="w-full font-heading bg-white">
            {/* 1. TOP UTILITY BAR - Hidden on extra small mobile */}
            <div className="bg-gray-100 border-b border-gray-200 py-1 px-4 md:px-20 hidden sm:block">
                <div className="flex justify-between items-center text-[10px] md:text-[11px] font-bold text-gray-600 uppercase tracking-widest">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1 hover:text-pmc-blue cursor-pointer transition-colors">
                            <Accessibility size={12} /> <span className="hidden sm:inline">Screen Reader Access</span>
                        </div>
                        <div className="hidden md:flex items-center gap-1 cursor-pointer">
                            <span className="hover:bg-gray-200 px-1 rounded transition-colors">A-</span>
                            <span className="bg-pmc-blue text-white px-1 rounded">A</span>
                            <span className="hover:bg-gray-200 px-1 rounded transition-colors">A+</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-pmc-blue cursor-pointer">English</span>
                            <span className="hover:text-pmc-blue cursor-pointer">मराठी</span>
                        </div>
                        <div className="flex items-center border-l border-gray-300 pl-6 gap-3">
                            <Facebook size={12} className="hover:text-pmc-blue cursor-pointer" />
                            <Twitter size={12} className="hover:text-pmc-blue cursor-pointer" />
                            <Instagram size={12} className="hover:text-pmc-blue cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN LOGO HEADER */}
            <div className="bg-white py-4 px-4 md:px-20 border-b border-pmc-border relative z-50">
                <div className="flex justify-between items-center">
                    {/* Logo Group */}
                    <div className="flex items-center gap-3 md:gap-5">
                        <div className="w-12 h-12 md:w-20 md:h-20 bg-pmc-blue rounded-full shadow-lg flex items-center justify-center border-2 border-pmc-saffron shrink-0">
                            <span className="text-white text-xl md:text-3xl font-black italic">UP</span>
                        </div>
                        <div>
                            <h1 className="text-lg md:text-3xl font-black text-pmc-blue leading-none tracking-tighter">
                                UrbanPulse
                            </h1>
                            <p className="text-[8px] md:text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-[0.2em] md:tracking-[0.4em]">
                                Digital Governance Board
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-12">
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="bg-pmc-blue/5 p-2 rounded-full text-pmc-blue">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Helpline</p>
                                <p className="text-sm font-black text-pmc-blue tracking-tight">1800 103 0222</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center bg-gray-50 rounded-full border border-gray-200 px-4 py-2 hover:border-pmc-blue transition-all w-48 md:w-64 group">
                            <input
                                type="text"
                                placeholder="Search Services..."
                                className="bg-transparent border-none text-[10px] md:text-xs focus:ring-0 w-full font-bold text-gray-600 outline-none"
                            />
                            <Search size={16} className="text-gray-400 group-hover:text-pmc-blue transition-colors" />
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-pmc-blue hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. NAVIGATION BAR - Desktop */}
            <nav className="header-nav shadow-lg hidden lg:block">
                <div className="px-20 flex overflow-x-auto scrollbar-none">
                    {navItems.map((item, i) => (
                        <Link
                            key={i}
                            to={item === 'Login' ? '/login' : '#'}
                            className={`px-6 py-4 text-[13px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-4 border-transparent hover:border-pmc-saffron hover:bg-white/5 ${i === 1 ? 'bg-white/10' : ''}`}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </nav>


            {/* 4. MOBILE MENU DRAWER */}
            <div className={`lg:hidden fixed inset-0 z-40 bg-pmc-blue text-white transition-all duration-500 overflow-y-auto ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                <div className="pt-32 pb-10 px-6 space-y-2">
                    {navItems.map((item, i) => (
                        <Link
                            key={i}
                            to={item === 'Login' ? '/login' : '#'}
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full text-left block py-4 px-6 border-b border-white/10 text-lg font-black uppercase tracking-[0.2em] hover:bg-white/5 active:bg-pmc-saffron transition-colors"
                        >
                            {item}
                        </Link>
                    ))}

                    <div className="pt-8 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl">
                            <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-2">Language</p>
                            <div className="flex gap-4 font-black">
                                <span className="text-pmc-saffron">EN</span>
                                <span>मराठी</span>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl">
                            <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-2">Theme</p>
                            <div className="flex gap-4 font-black">Light</div>
                        </div>
                    </div>
                    <div className="pt-8">
                        <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-4">Helpline</p>
                        <p className="text-2xl font-black">1800 103 0222</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TripleHeader;
