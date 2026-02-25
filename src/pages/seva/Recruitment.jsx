import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, FileCheck, Search, ArrowRight, Star, TrendingUp } from 'lucide-react';

const Recruitment = () => {
    const jobs = [
        { title: 'Senior Urban Architect', dept: 'Town Planning', type: 'Full-time', status: 'URGENT', salary: '₹ 1.2L - 1.8L' },
        { title: 'Neural Systems Engineer', dept: 'Smart City Cell', type: 'Contract', status: 'NEW', salary: '₹ 1.5L - 2.2L' },
        { title: 'Public Health Officer', dept: 'Health Dept', type: 'Full-time', status: 'ACTIVE', salary: '₹ 80K - 1.1L' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="gov-container py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-slate-200 mb-6">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-pmc-blue">Talent Acquisition</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-pmc-blue tracking-tighter mb-6">
                        सेवाभरती <span className="text-gradient">Recruitment</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
                        Join the mission to build the future of Pune. Access municipal career nodes and track your applications in real-time.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex gap-4 mb-10">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input type="text" className="w-full bg-white border border-slate-100 p-5 pl-12 rounded-2xl text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-pmc-blue transition-all" placeholder="Search roles (e.g. Engineer, Planner)..." />
                            </div>
                            <button className="px-8 py-5 bg-pmc-blue text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">Scan Market</button>
                        </div>

                        {jobs.map((job, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:border-pmc-blue/20 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-black text-pmc-blue tracking-tight group-hover:text-pmc-accent transition-colors">{job.title}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest ${job.status === 'URGENT' ? 'bg-red-100 text-red-500' : 'bg-pmc-blue/10 text-pmc-blue'}`}>{job.status}</span>
                                    </div>
                                    <div className="flex gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><Users size={12} /> {job.dept}</span>
                                        <span className="flex items-center gap-1.5"><Briefcase size={12} /> {job.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 w-full md:w-auto justify-between">
                                    <span className="text-sm font-black text-slate-900">{job.salary}</span>
                                    <button className="flex items-center gap-2 text-pmc-blue font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                                        Apply Node <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                            <h4 className="text-xl font-black text-pmc-blue mb-8 italic flex items-center gap-3">
                                <TrendingUp size={22} className="text-pmc-orange" /> Hiring Metrics
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { label: 'Active Openings', val: '42' },
                                    { label: 'Applications (24h)', val: '1,280' },
                                    { label: 'Shortlist Rate', val: '5.2%' }
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                        <span className="text-sm font-black text-slate-900">{stat.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative group">
                            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <FileCheck size={180} />
                            </div>
                            <h4 className="text-2xl font-black mb-6 italic decoration-pmc-accent underline underline-offset-8">Status Scan</h4>
                            <p className="text-sm font-medium opacity-60 mb-8 leading-relaxed">Enter your 10-digit application token to trace your candidate node status.</p>
                            <div className="flex gap-4 relative z-10">
                                <input type="text" className="flex-1 bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold" placeholder="APL_2831" />
                                <button className="w-12 h-12 bg-pmc-accent text-white rounded-xl flex items-center justify-center shadow-lg"><ArrowRight size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recruitment;
