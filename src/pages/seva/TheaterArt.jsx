import React from 'react';
import { motion } from 'framer-motion';
import { Music, Calendar, Ticket, MapPin, Users, Heart, Star } from 'lucide-react';

const TheaterArt = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white pt-20">
            <div className="gov-container py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pmc-accent">Cultural Nexus</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic">
                        नाट्यगृह आणि <span className="text-gradient">Art</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-2xl mx-auto text-xl leading-relaxed">
                        Experience the soul of the city through high-definition cultural events and art exhibitions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: "Dramanubhav Festival", type: "THREATER", date: "AUG 12 - 15", img: "https://images.unsplash.com/photo-1503095396549-8071f901cd30?q=80&w=800&auto=format&fit=crop" },
                                { title: "Urban Pulse Art Exhibit", type: "GALLERY", date: "DAILY 10 AM", img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop" }
                            ].map((event, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="relative group h-[500px] rounded-[3rem] overflow-hidden border border-white/10"
                                >
                                    <img src={event.img} alt={event.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-[0.2em]">{event.type}</span>
                                            <div className="flex gap-1 text-pmc-accent"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                                        </div>
                                        <h3 className="text-3xl font-black mb-4 tracking-tight leading-none italic">{event.title}</h3>
                                        <div className="flex items-center gap-6 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Calendar size={14} /> {event.date}</span>
                                            <span className="flex items-center gap-2"><MapPin size={14} /> Balgandharva</span>
                                        </div>
                                        <button className="mt-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3">
                                            <Ticket size={18} /> Reserve Nodes
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem]">
                            <h4 className="text-xl font-black mb-8 italic tracking-tight">Active Arenas</h4>
                            <div className="space-y-8">
                                {[
                                    { name: 'Balgandharva Rangmandir', occupancy: '92%', status: 'SOLD OUT' },
                                    { name: 'Ganesh Kala Krida', occupancy: '45%', status: 'AVAILABLE' },
                                    { name: 'Raja Ravi Varma Gallery', occupancy: '10%', status: 'SYNC' }
                                ].map((venue, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-bold group-hover:text-pmc-accent transition-colors">{venue.name}</span>
                                            <span className="text-[9px] font-black text-white/20 tracking-widest">{venue.status}</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-pmc-accent" style={{ width: venue.occupancy }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="premium-card bg-pmc-accent text-white p-10 border-none shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                                <Users size={30} />
                            </div>
                            <h4 className="text-2xl font-black mb-4 italic tracking-tight underline decoration-white/30">Artist Registration</h4>
                            <p className="text-sm font-medium opacity-80 mb-8 leading-relaxed">Digitally onboard your cultural profile and access municipal subsidies for the upcoming season.</p>
                            <button className="w-full py-4 bg-white text-pmc-accent rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">Apply Node</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheaterArt;
