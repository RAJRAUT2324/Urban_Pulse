import React from 'react';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const menuItems = [
        { name: 'Corporation', hasChild: true },
        { name: 'Services', hasChild: true },
        { name: 'Departments', hasChild: true },
        { name: 'About Pune', hasChild: false },
        { name: 'News & Events', hasChild: false },
        { name: 'Login', hasChild: false, path: '/login' },
        { name: 'Contact', hasChild: false },
    ];


    return (
        <nav className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-100">
            <div className="px-4 md:px-20 py-4 flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-pmc-blue rounded-full flex items-center justify-center p-2">
                        {/* Placeholder for UrbanPulse Logo */}
                        <span className="text-white font-black text-3xl italic">UP</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-pmc-blue tracking-tighter leading-none">
                            URBAN<span className="text-pmc-orange">PULSE</span>
                        </h1>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mt-1">
                            Smart Governance Portal
                        </p>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1">
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path || '#'}
                            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-pmc-blue flex items-center gap-1 transition-colors"
                        >
                            {item.name}
                            {item.hasChild && <ChevronDown size={14} className="opacity-50" />}
                        </Link>
                    ))}

                    <div className="ml-4 pl-4 border-l border-gray-200">
                        <button className="p-2 text-pmc-blue hover:bg-pmc-blue/5 rounded-full transition-colors">
                            <Search size={20} />
                        </button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="lg:hidden p-2 text-pmc-blue">
                    <Menu size={28} />
                </button>
            </div>

            {/* Blue Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-pmc-blue via-pmc-orange to-pmc-blue"></div>
        </nav>
    );
};

export default Navbar;
