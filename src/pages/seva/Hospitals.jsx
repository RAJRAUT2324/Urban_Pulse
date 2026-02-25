import React from 'react';
import { motion } from 'framer-motion';
import { Hospital, MapPin, Phone, Clock, ShieldCheck, HeartPulse, Activity, ChevronRight } from 'lucide-react';

const Hospitals = () => {
    const amravatiHospitals = [
        { name: "PDMMC (Dr. Panjabrao Deshmukh Memorial Medical College)", location: "Panchavati, Amravati", specialties: ["Multi-Speciality", "Critical Care", "Trauma"], availability: "High", contact: "0721-2551401", status: "Beds Available" },
        { name: "Irvin District Government Hospital", location: "District Hospital Rd, Camp, Amravati", specialties: ["General Medicine", "Emergency", "Maternity"], availability: "Medium", contact: "0721-2662058", status: "Open 24/7" },
        { name: "Dande Hospital", location: "Dastur Nagar, Amravati", specialties: ["Orthopedic", "Neuro Surgery", "Physiotherapy"], availability: "High", contact: "0721-2575444", status: "Beds Available" },
        { name: "Radiant Super Speciality Hospital", location: "Akola Rd, Near Chhatri Talao, Amravati", specialties: ["Cardiology", "Nephrology", "Oncology"], availability: "Normal", contact: "0721-2511011", status: "Consultation Open" },
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
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-pmc-blue">Public Health Node</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-pmc-blue tracking-tighter mb-6">
                        रुग्णालये <span className="text-gradient">Hospitals</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
                        Access real-time availability and directory of municipal and private healthcare facilities in Amravati.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-8">
                        {amravatiHospitals.map((hosp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="premium-card p-8 group hover:border-pmc-blue/30 transition-all cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-pmc-blue/5 rounded-2xl flex items-center justify-center text-pmc-blue group-hover:bg-pmc-blue group-hover:text-white transition-all">
                                                <Hospital size={24} />
                                            </div>
                                            <h3 className="text-2xl font-black text-pmc-blue tracking-tight">{hosp.name}</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-4 mb-6">
                                            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                                                <MapPin size={16} /> {hosp.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                                                <Phone size={16} /> {hosp.contact}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {hosp.specialties.map((spec, j) => (
                                                <span key={j} className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:bg-pmc-blue/5 group-hover:text-pmc-blue transition-colors">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:w-48 flex flex-col justify-between items-end">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${hosp.availability === 'High' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                            {hosp.status}
                                        </span>
                                        <button className="flex items-center gap-2 text-pmc-blue font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all mt-4">
                                            Book Appointment <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                            <h4 className="text-xl font-black text-pmc-blue mb-6 flex items-center gap-3">
                                <Activity size={20} className="text-pmc-accent" /> City Health Flux
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { label: 'Blood Sync', val: 'A+ (Rare)', color: 'red' },
                                    { label: 'Active ICU Nodes', val: '142 Free', color: 'pmc-accent' },
                                    { label: 'Avg Wait Delta', val: '12m', color: 'slate' }
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                        <span className={`text-sm font-black text-${stat.color}-500 uppercase`}>{stat.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-pmc-blue to-pmc-accent p-8 rounded-[2.5rem] text-white shadow-xl">
                            <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                                <ShieldCheck size={24} /> PM-JAY Verified
                            </h4>
                            <p className="text-sm font-medium opacity-80 leading-relaxed mb-6 italic">
                                "All municipal hospitals listed are fully compliant with Ayushman Bharat neural verification standards."
                            </p>
                            <button className="w-full py-4 bg-white text-pmc-blue rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Check Eligibility</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hospitals;
