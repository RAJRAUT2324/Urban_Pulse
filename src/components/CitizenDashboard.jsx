import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Clock,
    CheckCircle,
    ShieldCheck,
    Archive,
    ChevronRight,
    AlertTriangle,
    Plus,
    User,
    Award,
    Activity,
    MapPin,
    ArrowUpRight,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    X,
    Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CitizenImpactPanel from './citizen/CitizenImpactPanel';

const CitizenDashboard = () => {
    const [activeTab, setActiveTab] = useState('REPORTS'); // REPORTS, IMPACT_HUB
    const [grievances, setGrievances] = useState([]);
    const [user, setUser] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedbackModal, setFeedbackModal] = useState(null);
    const [rewardModal, setRewardModal] = useState(null); // { id: string, name: string }
    const [feedbackValue, setFeedbackValue] = useState('');
    const [feedbackComment, setFeedbackComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            navigate('/login');
            return;
        }
        fetchData(userInfo.token);
    }, [navigate]);

    const fetchData = async (token) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const [grievanceRes, userRes, creditRes] = await Promise.all([
                axios.get('/api/grievances'),
                axios.get('/api/users/profile', config),
                axios.get('/api/impact/credits', config)
            ]);

            setGrievances(Array.isArray(grievanceRes.data) ? grievanceRes.data : []);
            setUser(userRes.data);
            setCredits(creditRes.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setLoading(false);
        }
    };

    const handleVerify = async (id) => {
        setFeedbackModal(id);
    };

    const submitFeedback = async () => {
        if (!feedbackValue) {
            alert("Please select if the issue was resolved or not.");
            return;
        }

        try {
            const isResolved = feedbackValue === 'Resolved';
            await axios.put(`/api/grievances/${feedbackModal}/review`, {
                satisfaction: isResolved,
                comment: feedbackComment
            });

            // --- NEW: Instant QR Reward Modal ---
            if (isResolved) {
                setRewardModal({
                    id: feedbackModal,
                    name: user?.name || 'Citizen'
                });
            }
            // -------------------------------------

            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            fetchData(userInfo.token);
            setFeedbackModal(null);
            setFeedbackValue('');
            setFeedbackComment('');
        } catch (err) {
            alert("Feedback submission failed.");
        }
    };

    if (loading) return (
        <div className="py-32 flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 border-4 border-pmc-blue border-t-pmc-accent rounded-full animate-spin shadow-xl shadow-pmc-blue/10"></div>
            <p className="font-black text-pmc-blue uppercase tracking-[0.4em] text-xs animate-pulse">Synchronizing Data...</p>
        </div>
    );

    const pending = grievances.filter(g => g.status !== 'Archived');
    const resolvedCount = grievances.filter(g => g.status === 'Resolved' || g.status === 'Archived').length;

    const stats = [
        { label: "Total Reports", value: grievances.length, icon: <Activity size={20} />, color: "pmc-blue" },
        { label: "Active Tickets", value: pending.length, icon: <Clock size={20} />, color: "pmc-orange" },
        { label: "Success Rate", value: grievances.length ? Math.round((resolvedCount / grievances.length) * 100) + "%" : "0%", icon: <CheckCircle size={20} />, color: "pmc-accent" },
        { label: "Impact Credits", value: credits?.totalCredits || 0, icon: <Award size={20} />, color: "pmc-saffron" },
        { label: "Reports Submitted", value: grievances.length, icon: <Plus size={20} />, color: "pmc-accent" },
    ];

    return (
        <div className="space-y-12 pb-20">
            {/* Header & Stats */}
            <div className="flex flex-col xl:flex-row gap-10 items-stretch">
                <div className="xl:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="premium-card p-10 bg-pmc-blue text-white h-full relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-pmc-accent/20 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-pmc-accent/30 transition-colors" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-2 tracking-tighter">Citizen Profile</h2>
                            <p className="text-white/60 font-medium mb-10">Manage your reports and impact credits.</p>

                            <div className="flex items-center gap-5 mb-10">
                                <div className="w-16 h-16 rounded-2xl glass-dark border-white/10 flex items-center justify-center text-white shadow-2xl">
                                    <User size={32} />
                                </div>
                                <div>
                                    <p className="text-2xl font-black tracking-tight">{user?.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-pmc-accent" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-pmc-accent">Verified Citizen</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => setActiveTab('IMPACT_HUB')} className="btn-primary w-full text-[10px] py-3.5">
                                    Impact Hub
                                </button>
                                <button onClick={() => { setActiveTab('REPORTS'); navigate('/'); }} className="glass-dark border-white/10 w-full rounded-2xl py-3.5 font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                                    Report Issue
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="xl:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            key={stat.label}
                            className="premium-card p-8 bg-white group hover:border-pmc-blue/10"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${stat.color}/5 text-${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                                    {stat.icon}
                                </div>
                                <ArrowUpRight size={16} className="text-slate-200 group-hover:text-pmc-blue transition-colors" />
                            </div>
                            <h3 className="text-4xl font-black text-pmc-blue tracking-tighter">{stat.value}</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {activeTab === 'REPORTS' ? (
                        <>
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-black text-pmc-blue tracking-tighter">Active Reports</h2>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-pmc-orange" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{pending.length} Open</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    {pending.map((g, i) => (
                                        <motion.div
                                            layout
                                            key={g.grievanceId}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="premium-card p-8 bg-white group hover:shadow-2xl transition-all duration-700"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                                                <div className="flex items-start gap-6">
                                                    <div className="w-16 h-16 glass-effect bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-pmc-blue transition-colors relative overflow-hidden shrink-0">
                                                        <div className="absolute inset-0 bg-pmc-blue/0 group-hover:bg-pmc-blue/5 transition-colors" />
                                                        <Bell size={24} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-4 mb-3">
                                                            <span className="text-xl font-black text-pmc-blue tracking-tight">#{g.grievanceId}</span>
                                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${g.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-pmc-orange/10 text-pmc-orange'
                                                                }`}>
                                                                {g.status}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-4 text-slate-500 font-bold text-[11px] mb-4">
                                                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded text-slate-600 uppercase">
                                                                {g.category}
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <MapPin size={14} className="text-pmc-accent" />
                                                                {g.location}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <ShieldCheck size={14} className="text-pmc-accent" />
                                                            <p className="text-[10px] text-slate-400 font-mono tracking-tight">Verified Pulse ID: {g.lastHash?.substring(0, 16)}...</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="shrink-0">
                                                    {g.status === 'Resolved' ? (
                                                        <button
                                                            onClick={() => handleVerify(g.grievanceId)}
                                                            className="btn-pmc-accent w-full flex items-center justify-center gap-3"
                                                        >
                                                            Verify Resolution <ChevronRight size={18} />
                                                        </button>
                                                    ) : (
                                                        <div className="px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-center min-w-[200px]">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Current Phase</p>
                                                            <p className="text-sm font-black text-pmc-blue">Processing Ledger</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {pending.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-20 text-center premium-card bg-slate-50/50 border-dashed border-slate-200"
                                    >
                                        <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                                            <CheckCircle size={40} className="text-pmc-accent" />
                                        </div>
                                        <h3 className="text-2xl font-black text-pmc-blue mb-2 tracking-tight">Clean Ledger</h3>
                                        <p className="text-slate-500 font-medium">All your reports have been successfully audited and resolved.</p>
                                    </motion.div>
                                )}
                            </div>
                        </>
                    ) : (
                        <CitizenImpactPanel />
                    )}
                </div>

                <div className="space-y-8">
                    {/* Security Info Card */}
                    <div className="premium-card p-10 bg-slate-900 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-pmc-accent/10 rounded-full blur-[60px]" />
                        <ShieldCheck className="text-pmc-accent mb-8" size={48} />
                        <h4 className="text-2xl font-black mb-4 tracking-tighter">Immutable Governance</h4>
                        <p className="text-slate-400 font-medium leading-relaxed mb-10 text-base">
                            Your reports are recorded on the UrbanPulse Ledger. Every status change is cryptographically verified to ensure accountability.
                        </p>
                        <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-pmc-accent hover:text-white transition-colors">
                            Audit Data <ArrowUpRight size={16} />
                        </button>
                    </div>

                    {/* History Section */}
                    <div className="premium-card p-10 bg-white">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-pmc-blue tracking-tighter flex items-center gap-3">
                                <Archive size={20} className="text-slate-300" />
                                Archived Case
                            </h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">History</span>
                        </div>
                        <div className="space-y-6">
                            {grievances.filter(g => g.status === 'Archived').slice(0, 5).map((g) => (
                                <div key={g._id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-pmc-accent transition-colors" />
                                        <div>
                                            <p className="text-sm font-black text-pmc-blue tracking-tight">#{g.grievanceId}</p>
                                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{g.category}</p>
                                        </div>
                                    </div>
                                    <CheckCircle size={16} className="text-slate-200 group-hover:text-pmc-accent transition-colors" />
                                </div>
                            ))}
                            {grievances.filter(g => g.status === 'Archived').length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">No archived data</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Modal */}
            <AnimatePresence>
                {feedbackModal && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setFeedbackModal(null)}
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <button onClick={() => setFeedbackModal(null)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-400">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="mb-12">
                                <div className="w-20 h-20 bg-pmc-blue/5 text-pmc-blue rounded-4xl flex items-center justify-center mb-8">
                                    <MessageSquare size={36} />
                                </div>
                                <h3 className="text-4xl font-black text-pmc-blue tracking-tighter mb-4">Audit Feedback</h3>
                                <p className="text-slate-500 font-medium text-lg leading-relaxed">Was your issue #{feedbackModal} resolved to your total satisfaction?</p>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <button
                                        onClick={() => setFeedbackValue('Resolved')}
                                        className={`p-8 rounded-4xl border-2 transition-all flex flex-col items-center gap-4 ${feedbackValue === 'Resolved' ? 'border-pmc-accent bg-pmc-accent/5 text-pmc-accent' : 'border-slate-100 hover:border-pmc-blue/20'}`}
                                    >
                                        <ThumbsUp size={32} />
                                        <span className="font-black uppercase tracking-widest text-xs">Verified Resolved</span>
                                    </button>
                                    <button
                                        onClick={() => setFeedbackValue('Not Resolved')}
                                        className={`p-8 rounded-4xl border-2 transition-all flex flex-col items-center gap-4 ${feedbackValue === 'Not Resolved' ? 'border-pmc-orange bg-pmc-orange/5 text-pmc-orange' : 'border-slate-100 hover:border-pmc-blue/20'}`}
                                    >
                                        <ThumbsDown size={32} />
                                        <span className="font-black uppercase tracking-widest text-xs">Report Persistence</span>
                                    </button>
                                </div>

                                <textarea
                                    className="w-full p-8 bg-slate-50 rounded-4xl border border-slate-100 focus:ring-4 ring-pmc-blue/5 outline-none text-base placeholder:text-slate-300 min-h-[160px] transition-all"
                                    placeholder="Add an audit comment or additional details..."
                                    value={feedbackComment}
                                    onChange={(e) => setFeedbackComment(e.target.value)}
                                />

                                <button
                                    onClick={submitFeedback}
                                    className="btn-primary w-full py-6 text-base"
                                >
                                    Submit Final Audit
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Reward QR Code Modal */}
            <AnimatePresence>
                {rewardModal && (
                    <div className="fixed inset-0 z-110 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setRewardModal(null)}
                            className="absolute inset-0 bg-pmc-blue/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl overflow-hidden border border-white/20"
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 bg-pmc-accent/10 text-pmc-accent rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Award size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-pmc-blue tracking-tighter mb-2">Instant Reward Earned!</h3>
                                <p className="text-slate-500 font-medium text-sm mb-8 italic">"You are the best person for self motivation and every time!"</p>

                                <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
                                    <div className="bg-slate-50 p-6 rounded-4xl border-2 border-slate-100 flex-1 relative group">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.origin + '/reward-redemption/' + rewardModal.id)}`}
                                            alt="Reward QR Code"
                                            className="w-40 h-40 mx-auto rounded-2xl shadow-lg border-4 border-white"
                                        />
                                        <div className="mt-4">
                                            <p className="text-[10px] font-black text-pmc-blue uppercase tracking-widest mb-1">Scan for Reward</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-4xl border-2 border-slate-100 flex-1 relative group">
                                        <img
                                            src="/assets/golden-badge.png"
                                            alt="Golden Prime Badge"
                                            className="w-40 h-40 mx-auto rounded-2xl shadow-lg border-4 border-white object-cover"
                                        />
                                        <div className="mt-4">
                                            <p className="text-[10px] font-black text-pmc-blue uppercase tracking-widest mb-1">Golden Prime Badge</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm font-bold text-slate-800 leading-relaxed">
                                        Scan the QR at partner shops or <span className="text-pmc-accent">download your official badge</span> below!
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <a
                                            href="/assets/golden-badge.png"
                                            download="UrbanPulse_Golden_Badge.png"
                                            className="btn-pmc-accent flex items-center justify-center gap-2 py-4 text-xs"
                                        >
                                            Download Badge
                                        </a>
                                        <button
                                            onClick={() => setRewardModal(null)}
                                            className="w-full bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] py-4 hover:bg-slate-800 transition-all"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CitizenDashboard;
