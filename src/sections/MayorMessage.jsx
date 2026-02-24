import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const MayorMessage = () => {
    const leaders = [
        {
            name: "Hon. Murlidhar Mohol",
            title: "Guardian Minister, Pune",
            img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
            msg: "UrbanPulse represents our commitment to a transparent and responsive Pune. We are building a city that listens to its citizens."
        },
        {
            name: "Hon. Vikram Kumar",
            title: "Municipal Commissioner",
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
            msg: "Integration of AI and Blockchain in grievance redressal is a milestone for PMC. We aim for 100% digital resolution."
        }
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="gov-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {leaders.map((leader, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card p-10 flex flex-col md:flex-row items-center md:items-start gap-10 bg-slate-50/50"
                        >
                            <div className="shrink-0 relative">
                                <div className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative group">
                                    <img src={leader.img} alt={leader.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                    <div className="absolute inset-0 bg-pmc-blue/10 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-pmc-accent rounded-2xl flex items-center justify-center text-white shadow-xl">
                                    <Quote size={20} fill="currentColor" />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="w-10 h-1 bg-pmc-saffron mb-6 rounded-full" />
                                <h3 className="text-2xl md:text-3xl font-black text-pmc-blue mb-2 tracking-tighter">{leader.name}</h3>
                                <p className="text-[10px] font-black text-pmc-accent uppercase tracking-[0.3em] mb-8">{leader.title}</p>

                                <div className="relative">
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed relative z-10 italic">
                                        "{leader.msg}"
                                    </p>
                                    <h3 className="absolute -bottom-10 -right-4 text-[120px] font-black text-slate-100 z-0 pointer-events-none select-none">
                                        <Quote size={80} fill="currentColor" />
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
                <h2 className="text-[20vw] font-black text-pmc-blue whitespace-nowrap -mb-10 leading-none">LEADERSHIP</h2>
            </div>
        </section>
    );
};

export default MayorMessage;

