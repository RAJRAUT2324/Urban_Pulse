import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#f0f0f0] pt-16 pb-8 font-sans text-gray-700">
            <div className="gov-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-4 md:px-0">

                    {/* Column 1: Brand & Info */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-pmc-blue rounded-full flex items-center justify-center p-2 border-2 border-pmc-saffron">
                                <span className="text-white text-2xl font-black italic">UP</span>
                            </div>
                            <h4 className="text-xl font-black text-pmc-blue leading-tight tracking-tighter">
                                UrbanPulse <br />
                                <span className="text-pmc-saffron uppercase text-sm tracking-widest">Corporation</span>
                            </h4>
                        </div>

                        {/* Badges Placeholder */}
                        <div className="grid grid-cols-3 gap-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="bg-white p-2 border border-gray-200 rounded text-[8px] font-black text-center">W3C CSS</div>
                            <div className="bg-white p-2 border border-gray-200 rounded text-[8px] font-black text-center">W3C HTML</div>
                            <div className="bg-white p-2 border border-gray-200 rounded text-[8px] font-black text-center italic">STQC</div>
                            <div className="bg-white p-2 border border-gray-200 rounded text-[8px] font-black text-center">GIGW</div>
                            <div className="bg-white p-2 border border-gray-200 rounded text-[8px] font-black text-center italic">WCAG 2.0</div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Visitors (last 30 days)</p>
                            <div className="text-2xl font-black text-pmc-blue tracking-tighter">8,99,487</div>
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div className="space-y-6">
                        <h5 className="text-sm font-black text-pmc-blue uppercase tracking-[0.2em] border-l-4 border-pmc-saffron pl-4">Services</h5>
                        <ul className="space-y-3 font-bold text-[13px] text-gray-500">
                            <li className="hover:text-pmc-blue cursor-pointer transition-colors" onClick={() => window.location.href = '/transparency-portal'}>Transparency Portal</li>
                            <li className="hover:text-pmc-blue cursor-pointer transition-colors" onClick={() => window.location.href = '/help-contact'}>Help</li>
                            <li className="hover:text-pmc-blue cursor-pointer transition-colors" onClick={() => window.location.href = '/help-contact?tab=contact'}>Contact</li>
                            <li className="hover:text-pmc-blue cursor-pointer transition-colors">UrbanPulse Care</li>
                            <li className="hover:text-pmc-blue cursor-pointer transition-colors">Digital Apps</li>
                        </ul>
                    </div>

                    {/* Column 3: Information & Links */}
                    <div className="grid grid-cols-1 gap-12">
                        <div className="space-y-6">
                            <h5 className="text-sm font-black text-pmc-blue uppercase tracking-[0.2em] border-l-4 border-pmc-saffron pl-4">Information</h5>
                            <ul className="space-y-3 font-bold text-[13px] text-gray-500">
                                <li className="hover:text-pmc-blue cursor-pointer transition-colors">About UrbanPulse</li>
                                <li className="hover:text-pmc-blue cursor-pointer transition-colors">News & Updates</li>
                                <li className="hover:text-pmc-blue cursor-pointer transition-colors">FAQ's</li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h5 className="text-sm font-black text-pmc-blue uppercase tracking-[0.2em] border-l-4 border-pmc-saffron pl-4">Useful Links</h5>
                            <ul className="space-y-3 font-bold text-[13px] text-gray-500">
                                <li className="hover:text-pmc-blue cursor-pointer transition-colors">Sitemap</li>
                                <li className="hover:text-pmc-blue cursor-pointer transition-colors">Government GR</li>
                                <li className="hover:text-pmc-blue cursor-pointer transition-colors">Help & Support</li>
                                <li className="hover:text-pmc-blue cursor-pointer transition-colors">Website Policy</li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Reach Us */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex gap-4 items-center group">
                                <div className="bg-pmc-blue/5 p-2 rounded-full group-hover:bg-pmc-blue group-hover:text-white transition-all"><Phone size={16} /></div>
                                <span className="text-sm font-black text-gray-700">18001030222</span>
                            </div>
                            <div className="flex gap-4 items-center group">
                                <div className="bg-pmc-blue/5 p-2 rounded-full group-hover:bg-pmc-blue group-hover:text-white transition-all"><Mail size={16} /></div>
                                <span className="text-sm font-black text-gray-700">info@urbanpulse.gov.in</span>
                            </div>
                            <div className="flex gap-4 items-start group">
                                <div className="bg-pmc-blue/5 p-2 rounded-full mt-1 group-hover:bg-pmc-blue group-hover:text-white transition-all"><MapPin size={16} /></div>
                                <span className="text-[12px] font-bold text-gray-500 leading-relaxed">
                                    UrbanPulse Corporation, Near Mangala Theatre, Shivajinagar, Pune- 411 005.
                                </span>
                            </div>
                            <div className="flex gap-4 items-center group cursor-pointer pt-4">
                                <div className="bg-pmc-blue/5 p-2 rounded-full group-hover:bg-pmc-blue group-hover:text-white transition-all"><MessageSquare size={16} /></div>
                                <span className="text-sm font-black text-pmc-blue border-b-2 border-pmc-blue/10">Share your feedback</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-200 mb-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4 md:px-0">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        Copyright @ 2026 UrbanPulse. All Rights Reserved.
                    </div>

                    <div className="flex gap-4">
                        {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-pmc-blue text-white flex items-center justify-center hover:bg-pmc-saffron hover:scale-110 transition-all shadow-md">
                                <Icon size={18} fill="currentColor" />
                            </a>
                        ))}
                    </div>

                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                        Design and Developed By <br />
                        <span className="text-pmc-blue">Smart Digital Services Pvt. Ltd.</span>
                    </div>
                </div>

                <div className="text-center mt-8 space-x-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase">Updated on 23/02/2026</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
