import React from 'react';
import NewsTicker from '../components/NewsTicker';
import TripleHeader from '../components/TripleHeader';
import HeroSlider from '../sections/HeroSlider';
import CircularServices from '../sections/CircularServices';
import AppBanner from '../sections/AppBanner';
import LatestUpdates from '../sections/LatestUpdates';
import UrbanPulseForCitizen from '../sections/UrbanPulseForCitizen';
import MayorMessage from '../sections/MayorMessage';
import WeeklyPoll from '../components/WeeklyPoll';
import SmartCityPulse from '../sections/SmartCityPulse';
import Footer from '../components/Footer';
import AshaAgent from '../components/AshaAgent';
import { AlertCircle, ShieldAlert, UserX } from 'lucide-react';

const LandingPage = () => {
    return (
        <main className="min-h-screen bg-white font-sans text-pmc-text overflow-x-hidden">
            {/* Scroll to Top Hidden Element */}
            <div id="top" className="absolute top-0"></div>

            {/* Official PMC-style Header System */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                {/* <NewsTicker /> */}
                <TripleHeader isFixed={false} />
            </header>

            {/* Main Content Area */}
            {/* 
        Spacing to account for Triple Header + News Ticker:
        News Ticker: ~30px
        Triple Header (dynamic): ~110px
        Total Header: ~140px
      */}
            <div className="pt-[140px] md:pt-[150px]">
                {/* Full-width Hero Banner Slider */}
                <HeroSlider />

                {/* NEW: Circular Service Menu (As requested with Marathi labels) */}
                <CircularServices />

                {/* NEW: App Download and CSR Banners (As per screenshot 1) */}
                <AppBanner />

                {/* NEW: Standalone Latest Updates Section (Moved from slider side) */}
                <LatestUpdates />

                {/* NEW: Zoom-on-hover Citizen Initiative Section (Mirroring PMC for Punekar) */}
                <UrbanPulseForCitizen />

                {/* Leadership Message Section */}
                <MayorMessage />

                {/* NEW: Weekly Civic Decision Poll */}
                <WeeklyPoll />

                {/* Technology Showcase (Digital Twin) - Matches UrbanPulse topic */}
                <SmartCityPulse />

                {/* NEW: Emergency Action Buttons Section (Isolated) */}
                <div className="bg-red-50 py-12 border-t border-red-100">
                    <div className="gov-container px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-2">
                                <h4 className="text-xl font-black text-red-600 uppercase tracking-tight flex items-center gap-3">
                                    <AlertCircle size={24} />
                                    Critical Assistance & Safety
                                </h4>
                                <p className="text-sm font-bold text-red-400">Direct escalation channels for urgent municipal grievances and safety reports.</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { label: 'Women Emergency', icon: <ShieldAlert size={18} />, type: 'Women Emergency', color: 'bg-red-600' },
                                    { label: 'Misconduct / Corruption', icon: <UserX size={18} />, type: 'Employee Misconduct', color: 'bg-slate-800' },
                                    { label: 'Officer Inaction', icon: <AlertCircle size={18} />, type: 'Officer Not Taking Action', color: 'bg-pmc-blue' }
                                ].map((btn, i) => (
                                    <button
                                        key={i}
                                        onClick={() => window.location.href = `/emergency-portal?type=${encodeURIComponent(btn.type)}`}
                                        className={`flex items-center gap-3 px-6 py-4 ${btn.color} text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-red-900/10`}
                                    >
                                        {btn.icon}
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formal Reference Footer (As per screenshot 2) */}
                <Footer />
            </div>

            {/* Floating PMC Digital Assistant */}
            <AshaAgent />
        </main>
    );
};

export default LandingPage;
