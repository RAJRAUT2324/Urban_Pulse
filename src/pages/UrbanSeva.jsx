import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Hospital, MessageSquare, Trash2, Music, Heart,
    Globe, Landmark, Bus, Briefcase, Trees, ArrowRight
} from 'lucide-react';

const UrbanSeva = () => {
    const services = [
        { title: 'Hospitals', marathi: 'रुग्णालये', icon: <Hospital size={28} />, color: 'blue', path: '/urban-seva/hospitals' },
        { title: 'Grievance', marathi: 'तक्रार निवारण', icon: <MessageSquare size={28} />, color: 'pmc-accent', path: '/urban-seva/grievance' },
        { title: 'Garbage', marathi: 'कचरा व्यवस्थापन', icon: <Trash2 size={28} />, color: 'green', path: '/urban-seva/garbage' },
        { title: 'Theater & Art', marathi: 'नाट्यगृह आणि आर्ट', icon: <Music size={28} />, color: 'purple', path: '/urban-seva/theater-art' },
        { title: 'Crematoriums', marathi: 'स्मशानभूमी', icon: <Heart size={28} />, color: 'red', path: '/urban-seva/crematoriums' },
        { title: 'Online Services', marathi: 'ऑनलाईन सेवा', icon: <Globe size={28} />, color: 'pmc-blue', path: '/urban-seva/online-services' },
        { title: 'Property Tax', marathi: 'मिळकत कर', icon: <Landmark size={28} />, color: 'orange', path: '/urban-seva/property-tax' },
        { title: 'Transport', marathi: 'सार्वजनिक वाहतूक', icon: <Bus size={28} />, color: 'indigo', path: '/urban-seva/transport' },
        { title: 'Recruitment', marathi: 'सेवाभरती', icon: <Briefcase size={28} />, color: 'amber', path: '/urban-seva/recruitment' },
        { title: 'Gardens', marathi: 'उद्याने', icon: <Trees size={28} />, color: 'emerald', path: '/urban-seva/gardens' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="gov-container py-20 pb-40">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-pmc-blue">Unified Service Grid</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-pmc-blue tracking-tighter mb-8">
                        UrbanPulse <span className="text-gradient">Seva Hub</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto text-xl leading-relaxed">
                        Access all municipal services through a high-definition digital interface integrated with the UrbanPulse Brain.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {services.map((seva, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                to={seva.path}
                                className="premium-card p-10 flex flex-col items-center text-center group hover:border-pmc-blue/30 hover:shadow-2xl hover:shadow-pmc-blue/10 transition-all aspect-square justify-center relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-${seva.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:shadow-xl transition-all relative z-10">
                                    <div className="text-pmc-blue group-hover:scale-110 transition-transform duration-500">
                                        {seva.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-pmc-blue tracking-tight mb-2 relative z-10">{seva.title}</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">{seva.marathi}</p>
                                <div className="mt-8 flex items-center gap-2 text-pmc-blue opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-[10px] font-black uppercase tracking-[0.2em] relative z-10">
                                    Access Portal <ArrowRight size={14} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UrbanSeva;
