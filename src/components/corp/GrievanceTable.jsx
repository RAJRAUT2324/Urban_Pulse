import React, { useState } from 'react';
import {
    Search,
    ShieldAlert,
    MoreVertical,
    MapPin,
    Clock,
    BrainCircuit,
    ChevronDown,
    ArrowUpRight,
    Map,
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GrievanceTable = ({ grievances, isOffline, role, onSolve }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [solvingId, setSolvingId] = useState(null);

    // ... internal logic ...

    const handleSolve = async (id) => {
        setSolvingId(id);
        await onSolve(id);
        setSolvingId(null);
    };

    // UI-only sorting / filtering
    const filtered = grievances.filter(g =>
        g.grievanceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.category.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));

    const getPriorityMeta = (score) => {
        if (score > 100) return { label: 'CRITICAL', color: 'red', icon: <ShieldAlert size={12} /> };
        if (score > 60) return { label: 'HIGH', color: 'orange', icon: <ChevronDown className="rotate-180" size={12} /> };
        if (score > 30) return { label: 'MEDIUM', color: 'yellow', icon: <ChevronDown size={12} /> };
        return { label: 'LOW', color: 'green', icon: <ChevronDown size={12} /> };
    };

    return (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-xl shadow-slate-200/50">
            {/* Table Action Bar */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <h4 className="font-black text-lg tracking-tight text-pmc-blue">Ledger Stream</h4>
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-pmc-accent" />
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{filtered.length} Indexed</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Quick search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-pmc-accent w-48 transition-all focus:w-64 text-slate-800 placeholder:text-slate-300 shadow-sm"
                        />
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                    <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors text-slate-600">Neural Sort</button>
                    <button className="px-4 py-2 bg-pmc-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-pmc-blue/20 flex items-center gap-2">
                        Map View <Map size={12} />
                    </button>
                </div>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-auto flex-1 custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-white z-10 shadow-sm">
                        <tr className="border-b border-slate-100">
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Protocol ID</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Citizen / Node</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Department</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">AI Priority</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Current Phase</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Audit</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        <AnimatePresence mode="popLayout">
                            {isOffline ? (
                                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <td colSpan="6" className="px-8 py-24 text-center">
                                        <div className="flex flex-col items-center gap-6 text-slate-800">
                                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 animate-pulse border border-red-100 shadow-lg">
                                                <ShieldAlert size={40} />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-xl font-black tracking-tight">Neural Synchronizer Offline</p>
                                                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">The connection to the UrbanPulse Brain on port 5000 was refused. Run <code className="text-pmc-blue bg-slate-50 px-2 py-0.5 rounded border border-pmc-blue/10">npm run server</code> to initialize the handshake.</p>
                                            </div>
                                        </div>
                                    </td>
                                </motion.tr>
                            ) : filtered.length === 0 ? (
                                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <td colSpan="6" className="px-8 py-24 text-center">
                                        <p className="text-xs font-black text-slate-200 uppercase tracking-[0.5em]">No active indices in local ledger</p>
                                    </td>
                                </motion.tr>
                            ) : (
                                filtered.map((grv, i) => {
                                    const meta = getPriorityMeta(grv.priorityScore || 0);
                                    return (
                                        <motion.tr
                                            key={grv._id || i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-slate-50 transition-all group relative cursor-pointer"
                                        >
                                            <td className="px-8 py-5 relative">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-pmc-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-800 group-hover:text-pmc-blue transition-colors tracking-tight">#{grv.grievanceId}</span>
                                                    <span className="text-[10px] text-slate-300 font-mono mt-1 uppercase">{grv.lastHash?.substring(0, 8) || '0xDEADBEEF'}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-pmc-accent transition-colors">
                                                        <MapPin size={14} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-slate-700">{grv.citizenName}</span>
                                                        <span className="text-[10px] text-slate-400 tracking-tighter truncate max-w-[150px]">{grv.location}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-500 tracking-tight">
                                                        {grv.department || grv.category}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col items-center">
                                                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border border-${meta.color}-500/20 bg-${meta.color}-500/5 text-${meta.color}-600 text-[9px] font-black shadow-sm`}>
                                                        {meta.icon}
                                                        {meta.label}
                                                    </div>
                                                    <span className="text-[9px] text-slate-300 font-bold mt-1.5 uppercase tracking-widest">{grv.priorityScore || 0} Score</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${grv.status === 'Resolved' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]' : 'bg-pmc-accent animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.3)]'}`} />
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${grv.status === 'Resolved' ? 'text-green-600' : 'text-pmc-accent'}`}>
                                                        {grv.status}
                                                    </span>
                                                </div>
                                                {grv.aiAnalysis?.contextEscalation && (
                                                    <div className="flex items-center gap-1 mt-1 text-[8px] font-bold text-red-500 uppercase tracking-widest">
                                                        <BrainCircuit size={10} /> Neural Escalation
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    {(role === 'Admin' || (role === 'Officer' && grv.department === 'Roads')) && grv.status !== 'Resolved' && grv.status !== 'Archived' && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleSolve(grv.grievanceId);
                                                            }}
                                                            disabled={solvingId === grv.grievanceId}
                                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 ${solvingId === grv.grievanceId
                                                                ? 'bg-slate-100 text-slate-400 cursor-wait'
                                                                : 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/20'
                                                                }`}
                                                        >
                                                            {solvingId === grv.grievanceId ? 'Processing...' : (
                                                                <>
                                                                    Resolve <CheckCircle2 size={12} />
                                                                </>
                                                            )}
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm text-slate-600"
                                                    >
                                                        Details
                                                    </button>
                                                    <button className="p-2 text-slate-300 hover:text-pmc-blue transition-colors rounded-lg hover:bg-slate-50">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Pagination / Footer */}
            <div className="px-8 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Layer 2 Audit Trail Active</p>
                <div className="flex items-center gap-4 text-slate-800">
                    <span className="text-[10px] font-bold text-slate-400">Page 1 of 1</span>
                    <div className="flex gap-2">
                        <button disabled className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-200 cursor-not-allowed shadow-sm">
                            <ChevronDown className="rotate-90" size={14} />
                        </button>
                        <button disabled className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-200 cursor-not-allowed shadow-sm">
                            <ChevronDown className="-rotate-90" size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrievanceTable;
