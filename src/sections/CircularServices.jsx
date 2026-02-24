import React from 'react';
import { motion } from 'framer-motion';

const CircularServices = () => {
    const lhsMenu = [
        { name: "तक्रार निवारण", icon: "https://webadmin.pmc.gov.in/sites/default/files/2025-12/pmcgrievence-control.png", label: "Grievance Redressal" },
        { name: "रुग्णालये", icon: "https://webadmin.pmc.gov.in/sites/default/files/2024-12/Frame%201000009336.png", label: "Hospitals" },
        { name: "कचरा व्यवस्थापन", icon: "https://webadmin.pmc.gov.in/sites/default/files/2025-12/pmcGarbageCollection.png", label: "Garbage Collection" },
        { name: "नाट्यगृह आणि आर्ट गॅलरी", icon: "https://webadmin.pmc.gov.in/sites/default/files/2024-12/Entertainment.png", label: "Theater & Art" },
        { name: "स्मशानभूमी", icon: "https://webadmin.pmc.gov.in/sites/default/files/2024-12/Frame%201000009341.png", label: "Crematoriums" }
    ];

    const rhsMenu = [
        { name: "ऑनलाईन सेवा", icon: "https://webadmin.pmc.gov.in/sites/default/files/2025-03/pmc-online-services.png", label: "Online Services" },
        { name: "मिळकत कर आकारणी", icon: "https://webadmin.pmc.gov.in/sites/default/files/2025-12/Property20tax.png", label: "Property Tax" },
        { name: "सार्वजनिक वाहतूक", icon: "https://webadmin.pmc.gov.in/sites/default/files/2026-02/Transport-1.png", label: "Public Transport" },
        { name: "सेवाभरती", icon: "https://webadmin.pmc.gov.in/sites/default/files/2025-12/recruitment.png", label: "Recruitment" },
        { name: "उद्याने", icon: "https://webadmin.pmc.gov.in/sites/default/files/2025-12/Frame%20201000009339.png", label: "Gardens" }
    ];

    return (
        <section className="relative py-40 bg-slate-50 overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pmc-accent/5 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pmc-saffron/5 rounded-full blur-[120px] translate-y-1/2" />

            <div className="gov-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-pmc-accent">Citizens First</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-pmc-blue mb-6 tracking-tighter">
                        UrbanPulse <span className="text-gradient">सेवा आपल्यासाठी</span>
                    </h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                        Access official Pune Municipal Corporation services through our ultra-responsive AI-integrated portal.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32">
                    {/* Left Menu */}
                    <div className="w-full lg:w-1/3">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-6 lg:items-end">
                            {lhsMenu.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group w-full max-w-sm"
                                >
                                    <a href="#" className="flex lg:flex-row-reverse items-center gap-4 lg:gap-6 premium-card p-4 hover:border-pmc-accent/30 glass-effect">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-pmc-blue group-hover:scale-110 transition-all duration-500 shrink-0">
                                            <img src={item.icon} alt={item.label} className="w-7 h-7 object-contain group-hover:invert transition-all" />
                                        </div>
                                        <div className="flex flex-col lg:items-end text-left lg:text-right overflow-hidden">
                                            <span className="text-slate-900 font-black text-lg group-hover:text-pmc-accent transition-colors truncate w-full">{item.name}</span>
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{item.label}</span>
                                        </div>
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Central Interactive Core */}
                    <div className="relative flex items-center justify-center py-20">
                        {/* Recursive Orbits */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                            className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-dashed border-pmc-accent/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                            className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-dashed border-pmc-saffron/10 rounded-full"
                        />

                        {/* Central Pulse Hub */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-56 h-56 md:w-80 md:h-80 rounded-[3.5rem] bg-white shadow-2xl flex flex-col items-center justify-center p-8 border border-white relative z-20 group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-pmc-accent/5 to-transparent rounded-[3.5rem]" />
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-pmc-blue rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden shadow-xl shadow-blue-500/20">
                                <span className="text-white text-3xl md:text-5xl font-black italic relative z-10">UP</span>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                    className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/30 to-white/0"
                                />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-pmc-blue tracking-tighter text-center leading-none">
                                URBAN<span className="text-pmc-accent">PULSE</span>
                            </h3>
                            <div className="h-1 w-8 bg-pmc-saffron mt-4 mb-2 rounded-full" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center max-w-[140px]">
                                Municipal E-Hub
                            </p>
                        </motion.div>

                        {/* Floating Micro-particles */}
                        {[0, 72, 144, 216, 288].map((deg, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.2, 0.5, 0.2],
                                    x: [Math.cos(deg) * 200, Math.cos(deg) * 220, Math.cos(deg) * 200],
                                    y: [Math.sin(deg) * 200, Math.sin(deg) * 220, Math.sin(deg) * 200]
                                }}
                                transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
                                className="absolute w-2 h-2 bg-pmc-accent rounded-full blur-[1px]"
                            />
                        ))}
                    </div>

                    {/* Right Menu */}
                    <div className="w-full lg:w-1/3">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-6 lg:items-start">
                            {rhsMenu.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group w-full max-w-sm"
                                >
                                    <a href="#" className="flex items-center gap-4 lg:gap-6 premium-card p-4 hover:border-pmc-accent/30 glass-effect">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-pmc-saffron group-hover:scale-110 transition-all duration-500 shrink-0">
                                            <img src={item.icon} alt={item.label} className="w-7 h-7 object-contain group-hover:invert transition-all" />
                                        </div>
                                        <div className="flex flex-col text-left overflow-hidden">
                                            <span className="text-slate-900 font-black text-lg group-hover:text-pmc-accent transition-colors truncate w-full">{item.name}</span>
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{item.label}</span>
                                        </div>
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CircularServices;

