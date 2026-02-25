import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, CheckCircle2, AlertCircle, Zap, HeartPulse, Building2, Droplets } from 'lucide-react';

const DeptServices = ({ departmentId, category }) => {
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(null); // ID of service being bought
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // Mock services per department/category
    const servicesMap = {
        'healthcare': [
            { id: 'h1', name: 'General Consultation Subsidy', cost: 50, icon: <HeartPulse size={18} /> },
            { id: 'h2', name: 'Diagnostic Lab Discount (20%)', cost: 120, icon: <AlertCircle size={18} /> }
        ],
        'utility': [
            { id: 'u1', name: 'Solar Installation Permit Fee Waiver', cost: 200, icon: <Zap size={18} /> },
            { id: 'u2', name: 'Water Connection Inspection', cost: 80, icon: <Droplets size={18} /> }
        ],
        'infrastructure': [
            { id: 'i1', name: 'Priority Streetlight Request', cost: 150, icon: <Building2 size={18} /> },
            { id: 'i2', name: 'Tree Plantation Drive Entry', cost: 30, icon: <ChevronRight size={18} /> }
        ]
    };

    const currentServices = servicesMap[category] || servicesMap['infrastructure'];

    useEffect(() => {
        fetchCredits();
    }, []);

    const fetchCredits = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) return;
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('/api/impact/credits', config);
            setCredits(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const handleRedeem = async (service) => {
        setIsProcessing(service.id);
        setErrorMsg(null);
        setSuccessMsg(null);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            // Map our mock category to backend locked categories
            const backendCategory = category === 'healthcare' ? 'healthcare' : (category === 'utility' ? 'taxUtility' : 'developmentVoting');

            await axios.post('/api/impact/spend', {
                amount: service.cost,
                serviceName: service.name,
                category: backendCategory
            }, config);

            setSuccessMsg(`Successfully redeemed ${service.name}!`);
            fetchCredits(); // Update balance
            setIsProcessing(null);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Redemption failed. Check your credits.");
            setIsProcessing(null);
        }
    };

    if (loading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading credits...</div>;

    const availableCredits = category === 'healthcare' ? credits?.lockedCredits?.healthcare : (category === 'utility' ? credits?.lockedCredits?.taxUtility : credits?.lockedCredits?.developmentVoting);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-pmc-blue tracking-tight">Redeem Credits</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Available for this department</p>
                </div>
                <div className="px-6 py-3 bg-pmc-blue/5 border border-pmc-blue/10 rounded-2xl text-center min-w-[120px]">
                    <p className="text-[10px] font-black text-pmc-blue uppercase tracking-widest mb-1">Balance</p>
                    <p className="text-xl font-black text-pmc-blue">{availableCredits || 0} pts</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentServices.map((service) => (
                    <div key={service.id} className="premium-card p-6 bg-slate-50 border-slate-100 hover:border-pmc-blue/20 transition-all group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-pmc-blue shadow-sm group-hover:scale-110 transition-transform">
                                {service.icon}
                            </div>
                            <div>
                                <h4 className="font-black text-sm text-slate-700">{service.name}</h4>
                                <p className="text-[10px] font-bold text-pmc-accent uppercase tracking-widest font-mono">Cost: {service.cost} Credits</p>
                            </div>
                        </div>

                        <button
                            disabled={isProcessing === service.id || (availableCredits || 0) < service.cost}
                            onClick={() => handleRedeem(service)}
                            className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${(availableCredits || 0) < service.cost
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    : 'bg-white text-pmc-blue border border-pmc-blue/10 hover:bg-pmc-blue hover:text-white shadow-sm'
                                }`}
                        >
                            {isProcessing === service.id ? "Processing..." : (
                                <>
                                    Redeem Now <ShoppingBag size={14} />
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {successMsg && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-3">
                        <CheckCircle2 size={16} /> {successMsg}
                    </motion.div>
                )}
                {errorMsg && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-3">
                        <AlertCircle size={16} /> {errorMsg}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DeptServices;
