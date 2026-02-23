import React from 'react';
import Hero from '../sections/Hero';
import HowItWorks from '../sections/HowItWorks';
import UrbanNervousSystem from '../sections/UrbanNervousSystem';
import Gamification from '../sections/Gamification';
import AshaAgent from '../components/AshaAgent';

const LandingPage = () => {
    return (
        <main className="min-h-screen bg-navy overflow-hidden">
            {/* Navigation Placeholder */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-navy to-transparent">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-neon-green flex items-center justify-center">
                        <span className="text-navy font-black text-xl">U</span>
                    </div>
                    <span className="text-xl font-bold tracking-tighter">UrbanPulse</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold">
                    <a href="#" className="hover:text-neon-green transition-colors">Our Vision</a>
                    <a href="#" className="hover:text-neon-green transition-colors">Neural Network</a>
                    <a href="#" className="hover:text-neon-green transition-colors">Civic Hub</a>
                    <button className="px-4 py-2 border border-neon-green/30 rounded-lg hover:bg-neon-green/10 transition-colors">
                        Connect Wallet
                    </button>
                </div>
            </nav>

            <Hero />
            <HowItWorks />
            <UrbanNervousSystem />
            <Gamification />

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 text-center">
                <div className="container mx-auto px-6">
                    <div className="text-neon-green font-black text-4xl mb-6">UrbanPulse</div>
                    <p className="text-white/30 max-w-sm mx-auto mb-10">
                        Building the resilient future of urban living, one packet of data at a time.
                    </p>
                    <div className="flex justify-center gap-6 mb-10">
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-neon-green/20 transition-colors pointer-events-auto cursor-pointer">
                            <span className="text-xs">TW</span>
                        </div>
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-neon-green/20 transition-colors pointer-events-auto cursor-pointer">
                            <span className="text-xs">IG</span>
                        </div>
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-neon-green/20 transition-colors pointer-events-auto cursor-pointer">
                            <span className="text-xs">LN</span>
                        </div>
                    </div>
                    <div className="text-[10px] text-white/20 uppercase tracking-[0.4em]">
                        &copy; 2026 UrbanPulse Systems. All Rights Reserved.
                    </div>
                </div>
            </footer>

            <AshaAgent />
        </main>
    );
};

export default LandingPage;
