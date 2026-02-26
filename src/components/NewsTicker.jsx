import React from 'react';

const NewsTicker = () => {
    const alerts = [
        "Citizen: Verified the water leak at Sham Chowk and got my free UrbanPulse Shirt! Best app ever.",
        "Impact Leader: Collected 5 badges and just downloaded my Golden Prime Medal. Feeling like a city hero!",
        "Quick Reward: Scanned my QR code at the local shop and got my free glasses in 2 minutes. Thank you PMC!",
        "Community: My report on Gadge Nagar street lights was resolved and I got my first reward coupon instantly.",
        "Verified: Just claimed my 100% discount T-Shirt reward for improving our city infrastructure!",
        "Milestone: Reached 10 reports! The Golden Prime badge looks amazing on my profile."
    ];

    return (
        <div className="marquee-container text-[10px] md:text-[12px] font-bold">
            <div className="flex animate-marquee shrink-0 items-center">
                {alerts.map((alert, i) => (
                    <div key={i} className="flex items-center mx-12">
                        <span className="w-2 h-2 bg-pmc-saffron rounded-full mr-3 shadow-[0_0_8px_white]"></span>
                        {alert}
                    </div>
                ))}
                {/* Duplicate for infinite loop */}
                {alerts.map((alert, i) => (
                    <div key={`dup-${i}`} className="flex items-center mx-12">
                        <span className="w-2 h-2 bg-pmc-saffron rounded-full mr-3 shadow-[0_0_8px_white]"></span>
                        {alert}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsTicker;
