import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Download, LayoutDashboard, Database, Key, Box } from 'lucide-react';

const OnlineServices = () => {
    const services = [
        { title: 'Birth Certificate', desc: 'Secure digital ledger issuance.', icon: <FileText size={24} />, status: 'ACTIVE' },
        { title: 'Marriage Registration', desc: 'Neural node verification.', icon: <FileText size={24} />, status: 'ACTIVE' },
        { title: 'Death Certificate', desc: 'Accelerated settlement protocol.', icon: <FileText size={24} />, status: 'ACTIVE' },
        { title: 'Vendor Licensing', desc: 'B2C commerce permissions.', icon: <Key size={24} />, status: 'SYNC' },
        { title: 'Building Permissions', desc: 'Spatial CAD scan approval.', icon: <Box size={24} />, status: 'MAINTENANCE' },
        { title: 'Property Mutation', desc: 'Asset hash transfer protocol.', icon: <Database size={24} />, status: 'ACTIVE' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-20">
            <div className="gov-container py-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pmc-accent/10 border border-pmc-accent/20 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pmc-accent">Paperless Governance</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 lowercase">
                        online.<span className="text-gradient">seva</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-2xl text-xl leading-relaxed">
                        Access the city's OS. A fully decentralized interface for document verification and municipal permissions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] group hover:bg-white/10 transition-all cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-pmc-accent group-hover:text-white transition-all text-pmc-accent">
                                    {item.icon}
                                </div>
                                <span className={`px-3 py-1 bg-white/5 rounded text-[8px] font-black tracking-widest ${item.status === 'ACTIVE' ? 'text-green-400' : item.status === 'SYNC' ? 'text-orange-400' : 'text-red-400'}`}>
                                    {item.status}
                                </span>
                            </div>
                            <h3 className="text-2xl font-black mb-3 tracking-tight">{item.title}</h3>
                            <p className="text-white/30 text-sm font-medium mb-8 leading-relaxed">{item.desc}</p>
                            <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-pmc-accent opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                Launch App <Download size={14} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 p-12 bg-linear-to-r from-pmc-blue/40 to-pmc-accent/40 rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex w-20 h-20 bg-white rounded-full items-center justify-center text-pmc-blue shadow-2xl">
                            <ShieldCheck size={40} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black mb-2">Neural Vault Integration</h4>
                            <p className="text-white/40 text-sm font-medium">All documents are stored in encrypted municipal nodes via UrbanPulse Brain.</p>
                        </div>
                    </div>
                    <button className="px-10 py-5 bg-white text-pmc-blue rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">Manage Digital Vault</button>
                </div>
            </div>
        </div>
    );
};

export default OnlineServices;
