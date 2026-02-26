import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Award, Edit2, Save, X, LogOut, ShieldCheck, ChevronRight, Hash, TrendingUp, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TripleHeader from '../components/TripleHeader';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
    });
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo) {
            navigate('/login');
        } else {
            fetchProfile(userInfo.token);
            fetchCredits(userInfo.token);
        }
    }, [navigate]);

    const fetchProfile = async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get('/api/users/profile', config);
            setUser(data);
            setFormData({
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber || '',
                address: data.address || '',
                password: '',
            });
        } catch (err) {
            setError('Failed to fetch profile');
        } finally {
            if (credits !== null) setLoading(false);
        }
    };

    const fetchCredits = async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get('/api/impact/credits', config);
            setCredits(data);
        } catch (err) {
            console.error("Failed to fetch credits");
        } finally {
            setLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.put('/api/users/profile', formData, config);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }));
            setIsEditing(false);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50">
            <div className="w-16 h-16 border-4 border-pmc-blue border-t-pmc-accent rounded-full animate-spin"></div>
            <p className="font-black text-pmc-blue uppercase tracking-[0.4em] text-xs animate-pulse">Retrieving Profile...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50/50">
            <TripleHeader />

            <div className="pt-40 pb-32">
                <main className="gov-container max-w-5xl">
                    <div className="grid lg:grid-cols-12 gap-10">
                        {/* Profile Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="premium-card p-10 bg-pmc-blue text-white relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pmc-accent/20 rounded-full blur-[60px] -mr-16 -mt-16" />
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-4xl glass-dark border-white/10 flex items-center justify-center text-white shadow-2xl mb-6 ring-4 ring-white/5">
                                        <User size={48} />
                                    </div>
                                    <h1 className="text-3xl font-black tracking-tighter mb-2">{user?.name}</h1>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pmc-accent/20 text-pmc-accent text-[10px] font-black uppercase tracking-widest border border-pmc-accent/30">
                                        <ShieldCheck size={12} /> {user?.role}
                                    </div>

                                    <div className="w-full h-px bg-white/10 my-8" />

                                    <div className="w-full space-y-6">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-white/40 font-black uppercase tracking-widest">Trust Signal</span>
                                            <span className="font-black text-pmc-accent uppercase tracking-tighter">
                                                {credits?.totalCredits > 500 ? "Elite Importer" : (credits?.totalCredits > 100 ? "Verified Citizen" : "New Activist")}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 text-left">
                                            <div className="p-4 rounded-2xl glass-dark border-white/5">
                                                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Impact Credits</p>
                                                <p className="text-2xl font-black text-white leading-none">{credits?.totalCredits || 0} ✅</p>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                                    <span className="text-white/40">Voting Power</span>
                                                    <span className="text-pmc-saffron">{credits?.lockedCredits.developmentVoting || 0}</span>
                                                </div>
                                                <div className="w-full h-1 bg-white/5 rounded-full">
                                                    <div className="h-full bg-pmc-saffron" style={{ width: `${Math.min((credits?.lockedCredits.developmentVoting || 0) * 10, 100)}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="premium-card p-8 bg-white"
                            >
                                <h3 className="text-sm font-black text-pmc-blue uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Actions</h3>
                                <div className="space-y-2">
                                    <button onClick={() => navigate('/city-pulse')} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all font-black text-xs text-slate-500 hover:text-pmc-blue group">
                                        Governance Dashboard <ChevronRight size={16} className="text-slate-200 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button onClick={logoutHandler} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 transition-all font-black text-xs text-red-400 group">
                                        Terminate Session <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Profile Content */}
                        <div className="lg:col-span-8 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="premium-card p-10 md:p-14 bg-white"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                                    <div>
                                        <h2 className="text-3xl font-black text-pmc-blue tracking-tighter mb-2">Account Detail</h2>
                                        <p className="text-slate-400 font-medium tracking-tight">Manage your personal information and preferences.</p>
                                    </div>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-6 py-3 rounded-2xl bg-pmc-blue/5 text-pmc-blue font-black text-xs uppercase tracking-widest hover:bg-pmc-blue hover:text-white transition-all flex items-center gap-3"
                                        >
                                            <Edit2 size={16} /> Edit Profile
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-3 rounded-2xl bg-red-50 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-3"
                                        >
                                            <X size={16} /> Cancel
                                        </button>
                                    )}
                                </div>

                                <AnimatePresence mode="wait">
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mb-8 p-5 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-[11px] font-black uppercase tracking-widest text-center"
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                    {success && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mb-8 p-5 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-[11px] font-black uppercase tracking-widest text-center"
                                        >
                                            {success}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={submitHandler} className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Identity</label>
                                        <div className="relative group">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pmc-accent transition-colors" size={20} />
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                className={`w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:ring-4 focus:ring-pmc-blue/5 outline-none transition-all font-bold text-pmc-blue ${!isEditing ? 'opacity-70 cursor-not-allowed' : 'focus:border-pmc-blue'}`}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pmc-accent transition-colors" size={20} />
                                            <input
                                                type="email"
                                                disabled={!isEditing}
                                                className={`w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:ring-4 focus:ring-pmc-blue/5 outline-none transition-all font-bold text-pmc-blue ${!isEditing ? 'opacity-70 cursor-not-allowed' : 'focus:border-pmc-blue'}`}
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pmc-accent transition-colors" size={20} />
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                className={`w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:ring-4 focus:ring-pmc-blue/5 outline-none transition-all font-bold text-pmc-blue ${!isEditing ? 'opacity-70 cursor-not-allowed' : 'focus:border-pmc-blue'}`}
                                                placeholder="Enter contact number"
                                                value={formData.phoneNumber}
                                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Local Address</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pmc-accent transition-colors" size={20} />
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                className={`w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:ring-4 focus:ring-pmc-blue/5 outline-none transition-all font-bold text-pmc-blue ${!isEditing ? 'opacity-70 cursor-not-allowed' : 'focus:border-pmc-blue'}`}
                                                placeholder="Enter your residence"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Credential Update (Optional)</label>
                                            <div className="relative group">
                                                <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pmc-accent transition-colors" size={20} />
                                                <input
                                                    type="password"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:ring-4 focus:ring-pmc-blue/5 focus:border-pmc-blue outline-none transition-all font-bold text-pmc-blue"
                                                    placeholder="Keep empty to maintain current password"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {isEditing && (
                                        <div className="md:col-span-2 pt-4">
                                            <button
                                                type="submit"
                                                className="w-full py-5 bg-pmc-accent text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-pmc-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                            >
                                                <Save size={18} /> Commit Changes
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="premium-card p-10 bg-slate-900 text-white relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-pmc-saffron/10 rounded-full blur-[60px]" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                    <div className="w-20 h-20 bg-pmc-saffron/10 rounded-4xl flex items-center justify-center text-pmc-saffron shrink-0 border border-pmc-saffron/20">
                                        <Award size={40} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black tracking-tighter mb-2">PMC Elite Citizen Program</h4>
                                        <p className="text-slate-400 font-medium text-sm leading-relaxed">
                                            You are currently at <span className="text-pmc-saffron font-black">Level {Math.floor((credits?.totalCredits || 0) / 100) + 1}</span>. Keep reporting issues and verifying resolutions to earn more impact credits and unlock exclusive city benefits.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Civic Impact History Section */}
                            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <div>
                                        <h3 className="text-xl font-black text-pmc-blue tracking-tighter flex items-center gap-3">
                                            <History className="text-slate-400" size={24} />
                                            Civic Contribution History
                                        </h3>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Verified Ledger of Impact</p>
                                    </div>
                                    <Award className="text-pmc-accent" size={24} />
                                </div>
                                <div className="p-8 space-y-4">
                                    {credits?.history?.length > 0 ? (
                                        credits.history.slice().reverse().map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-pmc-blue/30 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-xl ${item.credits > 0 ? 'bg-green-100 text-green-600' : 'bg-pmc-blue/10 text-pmc-blue'}`}>
                                                        {item.credits > 0 ? <TrendingUp size={18} /> : <ShieldCheck size={18} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{item.reason}</p>
                                                        <p className="text-[10px] text-slate-400 uppercase font-black mt-1">
                                                            {new Date(item.date).toLocaleDateString()} {item.complaintId && `• REF: #${item.complaintId}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-lg font-black ${item.credits > 0 ? 'text-green-600' : 'text-pmc-blue'}`}>
                                                        {item.credits > 0 ? `+${item.credits}` : item.credits}
                                                    </p>
                                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">CIVIC PTS</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12">
                                            <p className="text-xs font-black text-slate-300 uppercase tracking-widest">No verified history available in the ledger.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;

