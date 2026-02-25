import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Zap,
    AlertTriangle,
    MapPin,
    ArrowUpRight,
    ShieldCheck,
    Cpu,
    Eye,
    TrendingUp,
    Clock,
    Target,
    BrainCircuit
} from 'lucide-react';

const UrbanNervousSystem = ({ grievances }) => {
    // Mock Asset Data (Digital Health Cards)
    const assetProfiles = [
        { assetId: 'RD-PUNE-001', assetType: 'ROAD', location: 'Baner Main Road', failureCount18Months: 12, healthStatus: 'STRUCTURAL_FATIGUE', recommendation: 'FULL_REBUILD' },
        { assetId: 'WT-PUNE-094', assetType: 'PIPE', location: 'Kothrud Water Line B', failureCount18Months: 2, healthStatus: 'GOOD', recommendation: 'NONE' },
        { assetId: 'EL-PUNE-212', assetType: 'POLE', location: 'Viman Nagar Grid Transformer', failureCount18Months: 5, healthStatus: 'DEGRADED', recommendation: 'PATCH' },
    ];

    // Mock Passive Detection Data (Silent Citizen Mode)
    const passiveLogs = [
        { id: 1, location: 'Magarpatta Flyover', event: 'Vibration Spike (8.2g)', source: 'Silent Detection', confidence: 92, status: 'AI Flagged' },
        { id: 2, location: 'Hinjewadi Ph 3', event: 'Sudden Traffic Flow Deceleration', source: 'Silent Detection', confidence: 78, status: 'AI Flagged' },
        { id: 3, location: 'Kalyani Nagar', event: 'Acoustic Leak Signature', source: 'Silent Detection', confidence: 85, status: 'AI Flagged' },
    ];

    return (
        <div className="space-y-12 pb-24">
            {/* 1. DIGITAL HEALTH CARD SECTION */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-black flex items-center gap-3 tracking-tighter uppercase">
                            <Activity className="text-pmc-accent" />
                            Digital Health Cards
                        </h3>
                        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1">Asset Memory Profile & Fatigue Index</p>
                    </div>
                    <div className="px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400">
                        Total Assets Indexed: 4,821
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {assetProfiles.map((asset, i) => (
                        <motion.div
                            key={asset.assetId}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-slate-200 rounded-4xl p-8 relative overflow-hidden group hover:border-pmc-accent/30 transition-all duration-500 shadow-xl shadow-slate-200/50"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-slate-200">
                                <Cpu size={140} />
                            </div>

                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-2 h-2 rounded-full ${asset.healthStatus === 'GOOD' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : asset.healthStatus === 'DEGRADED' ? 'bg-yellow-500' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse'}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-pmc-accent">{asset.assetType}</span>
                                    </div>
                                    <h4 className="font-black text-xl text-slate-800 tracking-tight">{asset.location}</h4>
                                    <p className="text-slate-300 text-[10px] mt-1 font-mono uppercase font-black">{asset.assetId}</p>
                                </div>
                                <ArrowUpRight className="text-slate-200 group-hover:text-pmc-accent transition-colors" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                                <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Failures (18m)</p>
                                    <p className="text-2xl font-black text-slate-800">{asset.failureCount18Months}</p>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Pulse Health</p>
                                    <p className={`text-2xl font-black ${asset.healthStatus === 'GOOD' ? 'text-green-600' : asset.healthStatus === 'DEGRADED' ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {asset.healthStatus === 'GOOD' ? '92%' : asset.healthStatus === 'DEGRADED' ? '54%' : '14%'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="p-4 bg-pmc-blue rounded-3xl border border-white/10 shadow-lg">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-pmc-accent mb-2 flex items-center gap-2">
                                        <ShieldCheck size={12} /> AI Recommendation
                                    </p>
                                    <p className="text-xs font-bold text-white/90 leading-relaxed uppercase italic tracking-tight">
                                        {asset.recommendation === 'FULL_REBUILD' ? 'CRITICAL: Initiate full infrastructure replacement process.' :
                                            asset.recommendation === 'PATCH' ? 'SCHEDULED: Apply thermal patch remediation within 72h.' :
                                                'OPTIMAL: Continue standard sensor polling intervals.'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 2. SILENT CITIZEN & ROOT CAUSE SECTION */}
            <div className="grid grid-cols-12 gap-8">
                {/* Silent Citizen Mode */}
                <section className="col-span-12 xl:col-span-7">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-black flex items-center gap-3 tracking-tighter uppercase">
                                <Eye className="text-pmc-accent" />
                                Silent Citizen Mode
                            </h3>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1">Passive Anomaly Detection via Telemetry Clusters</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Global Scan Active</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-[3rem] p-8 h-[550px] overflow-hidden flex flex-col xl:flex-row gap-8 shadow-xl shadow-slate-200/50 group">
                        {/* Detection Feed */}
                        <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-4">
                            {passiveLogs.map((log) => (
                                <div
                                    key={log.id}
                                    className="p-6 bg-white border border-slate-100 rounded-4xl flex items-center justify-between group/item hover:bg-slate-50 transition-all cursor-pointer hover:border-pmc-accent/30 shadow-sm"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center group-hover/item:text-pmc-accent transition-colors text-slate-300">
                                            <Target size={22} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-800">{log.location}</p>
                                            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{log.event}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="px-3 py-1 bg-pmc-accent/5 border border-pmc-accent/20 rounded-lg text-[9px] font-black text-pmc-accent uppercase mb-1">
                                            {log.confidence}% MATCH
                                        </div>
                                        <span className="text-[8px] uppercase font-bold text-slate-300 tracking-[0.2em]">{log.source}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-4xl">
                                <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.5em]">Waiting for stream inflow...</p>
                            </div>
                        </div>

                        {/* Visualizer Block */}
                        <div className="w-full xl:w-72 bg-slate-950 rounded-4xl border border-white/10 relative overflow-hidden flex items-center justify-center p-8 group-hover:border-pmc-accent/50 transition-all shadow-2xl">
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(255,255,255,0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                            <div className="relative text-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-40 h-40 border-2 border-pmc-accent rounded-full border-dashed p-4 flex items-center justify-center"
                                >
                                    <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center">
                                        <div className="w-20 h-20 border-2 border-pmc-blue/30 rounded-full border-dashed" />
                                    </div>
                                </motion.div>
                                <Zap size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pmc-accent drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                                <p className="text-[10px] font-black text-white uppercase mt-8 tracking-[0.3em]">Sector 7G Pulse</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Root Cause & Dynamic Priority Side Panel */}
                <div className="col-span-12 xl:col-span-5 space-y-8">
                    {/* Explainable AI Box */}
                    <div className="bg-linear-to-br from-pmc-blue to-pmc-accent rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:opacity-30 transition-opacity">
                            <BrainCircuit size={120} />
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                            <Cpu size={20} />
                            Explainable AI (XAI)
                        </h4>
                        <div className="bg-slate-950/40 backdrop-blur-md p-6 rounded-4xl border border-white/20 mb-6">
                            <p className="text-sm font-medium leading-relaxed italic text-white/90">
                                "The recurring asphalt failure at Magarpatta Flyover is highly correlated (94%) with the underground pipeline expansion index recorded in Q4. Root cause identified as <strong>Sub-surface Pressure Oscillations</strong> from unregulated drainage outflow."
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-pmc-blue bg-white shadow-sm" />)}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/80">Verified by 12 Urban Planners</span>
                        </div>
                    </div>

                    {/* Dynamic Priority Panel */}
                    <div className="bg-white border border-slate-200 rounded-[3rem] p-10 group hover:border-pmc-accent/30 transition-all shadow-xl shadow-slate-200/50">
                        <div className="flex justify-between items-center mb-10">
                            <h4 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 text-slate-800">
                                <TrendingUp size={20} className="text-pmc-accent" />
                                Dynamic Priority
                            </h4>
                            <div className="w-12 h-12 rounded-2xl bg-pmc-blue flex items-center justify-center text-white border border-pmc-blue/10 group-hover:scale-110 transition-transform font-black shadow-lg shadow-pmc-blue/20">
                                4.2x
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'Severity Index', val: '8.4', color: 'red-600' },
                                { label: 'Population Impact', val: 'High', color: 'orange-600' },
                                { label: 'Context (Hospital Proximity)', val: '1.8x', color: 'pmc-accent' },
                                { label: 'SLA Buffer', val: '02h 45m', icon: <Clock size={12} />, color: 'slate-400 font-mono' }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                        {item.icon} {item.label}
                                    </span>
                                    <span className={`text-xs font-black text-${item.color} uppercase tracking-tighter`}>{item.val}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-5 bg-slate-50 border border-slate-100 rounded-3xl text-center shadow-inner">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] mb-2">Priority Classification</p>
                            <p className="text-2xl font-black text-red-600 uppercase tracking-tighter animate-pulse">Critical Intervention</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrbanNervousSystem;
