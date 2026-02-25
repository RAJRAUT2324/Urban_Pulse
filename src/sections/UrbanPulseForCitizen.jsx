import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bus, Trees, Hospital, Trash2, BookOpen, Music, ChevronRight } from 'lucide-react';

const UrbanPulseForCitizen = () => {
    const initiatives = [
        {
            title: "Public Transportation",
            desc: "PMPML Bus services, Metro updates, and last-mile connectivity.",
            img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
            icon: <Bus size={22} />,
            link: "/urban-seva/transport"
        },
        {
            title: "Parks & Gardens",
            desc: "Explore 200+ municipal parks and botanical gardens in the city.",
            img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop",
            icon: <Trees size={22} />,
            link: "/urban-seva/gardens"
        },
        {
            title: "Health & Hospitals",
            desc: "Access details of municipal clinics and multi-speciality hospitals.",
            img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
            icon: <Hospital size={22} />,
            link: "/urban-seva/hospitals"
        },
        {
            title: "Garbage Collection",
            desc: "SWaCH door-to-door collection schedules and composting info.",
            img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop",
            icon: <Trash2 size={22} />,
            link: "/urban-seva/garbage"
        },
        {
            title: "UrbanPulse Libraries",
            desc: "Digital and physical library catalogs across 15 administrative zones.",
            img: "https://images.unsplash.com/photo-1507842217351-5188813738cf?q=80&w=800&auto=format&fit=crop",
            icon: <BookOpen size={22} />,
            link: "/urban-seva/online-services"
        },
        {
            title: "Cultural Theaters",
            desc: "Booking and schedules for city-owned theaters and art galleries.",
            img: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=800&auto=format&fit=crop",
            icon: <Music size={22} />,
            link: "/urban-seva/theater-art"
        }
    ];

    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden">
            <div className="gov-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10"
                >
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-8">
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-pmc-blue">Life in Pune</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-pmc-blue tracking-tighter leading-tight">
                            UrbanPulse <span className="text-gradient">for Citizens</span>
                        </h2>
                    </div>
                    <Link to="/urban-seva" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white shadow-xl shadow-slate-200/50 text-pmc-blue font-black uppercase text-xs tracking-widest hover:bg-pmc-blue hover:text-white transition-all duration-500 group">
                        Full City Index
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {initiatives.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link to={item.link} className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/40 block">
                                <motion.img
                                    src={item.img}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent group-hover:via-slate-900/60 transition-all duration-700" />

                                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                                    <div className="flex items-center gap-5 translate-y-20 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                        <div className="w-14 h-14 glass-effect rounded-2xl flex items-center justify-center text-white border-white/20 group-hover:bg-pmc-accent group-hover:border-pmc-accent transition-all duration-500 shadow-xl">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-3xl font-black tracking-tighter">{item.title}</h3>
                                    </div>
                                    <p className="text-base font-medium text-white/70 leading-relaxed mt-6 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-10 group-hover:translate-y-0 delay-100">
                                        {item.desc}
                                    </p>
                                    <div className="flex items-center gap-3 text-pmc-accent font-black text-[11px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                                        View Digital Services <ArrowRight size={14} />
                                    </div>
                                </div>

                                <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl glass-effect flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                                    <ArrowRight size={20} className="-rotate-45" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UrbanPulseForCitizen;

