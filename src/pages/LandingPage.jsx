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

                {/* Formal Reference Footer (As per screenshot 2) */}
                <Footer />
            </div>

            {/* Floating PMC Digital Assistant */}
            <AshaAgent />
        </main>
    );
};

export default LandingPage;
