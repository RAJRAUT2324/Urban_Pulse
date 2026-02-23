import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, MessageSquare, ShieldCheck, FileWarning, HelpCircle } from 'lucide-react';

const AshaAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [message, setMessage] = useState("Namaste! I am Asha. How can I help you today?");
    const [showCreditModal, setShowCreditModal] = useState(false);

    const synth = window.speechSynthesis;
    const utteranceRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpen && !isMuted) {
            speak(message);
        }
    }, [isOpen]);

    const speak = (text) => {
        if (synth.speaking) synth.cancel();

        utteranceRef.current = new SpeechSynthesisUtterance(text);
        utteranceRef.current.onstart = () => setIsSpeaking(true);
        utteranceRef.current.onend = () => setIsSpeaking(false);

        // Attempt to find a female/Indian voice if available
        const voices = synth.getVoices();
        const voice = voices.find(v => v.name.includes('Female') || v.lang === 'hi-IN') || voices[0];
        if (voice) utteranceRef.current.voice = voice;

        synth.speak(utteranceRef.current);
    };

    const stopSpeaking = () => {
        synth.cancel();
        setIsSpeaking(false);
    };

    const actions = [
        { label: "How to use portal?", icon: <HelpCircle size={16} />, onClick: () => speak("You can report issues by clicking the Report button at the top.") },
        { label: "Check Credit Score", icon: <ShieldCheck size={16} />, onClick: () => setShowCreditModal(true) },
        { label: "Report Issue", icon: <FileWarning size={16} />, onClick: () => speak("To report an issue, please use our mobile app or the report section below.") },
    ];

    return (
        <>
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            className="glass p-6 w-72 mb-4 relative"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2 right-2 p-1 hover:text-crisis-red transition-colors"
                            >
                                <X size={16} />
                            </button>

                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center border border-neon-green/30">
                                    <span className="text-neon-green font-bold text-xl">A</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-neon-green">Asha AI</h4>
                                    <p className="text-[10px] text-white/50 uppercase tracking-widest">Urban Pulse Guide</p>
                                </div>
                            </div>

                            <p className="text-sm text-white/90 mb-6 leading-relaxed">
                                {message}
                            </p>

                            <div className="flex flex-col gap-2">
                                {actions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={action.onClick}
                                        className="flex items-center gap-2 w-full text-left text-xs p-2 rounded-lg bg-white/5 hover:bg-neon-green/10 hover:text-neon-green transition-all"
                                    >
                                        {action.icon}
                                        {action.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                                <button
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                                    title={isMuted ? "Unmute" : "Mute"}
                                >
                                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                </button>
                                {isSpeaking && (
                                    <button
                                        onClick={stopSpeaking}
                                        className="text-[10px] text-crisis-red animate-pulse"
                                    >
                                        Stop Speaking
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 rounded-full bg-neon-green flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] text-navy overflow-hidden relative"
                >
                    {/* Avatar Placeholder */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#22c55e,#4ade80)]"></div>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white opacity-20"
                    />
                    <span className="relative z-10 font-bold text-2xl">A</span>
                </motion.button>
            </div>

            {/* Credit Score Modal Placeholder */}
            <AnimatePresence>
                {showCreditModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowCreditModal(false)}
                            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass p-8 max-w-md w-full relative z-10"
                        >
                            <h2 className="text-2xl font-bold text-neon-green mb-4">Your Civic Credit Score</h2>
                            <div className="p-6 bg-white/5 rounded-xl border border-neon-green/20 text-center">
                                <div className="text-5xl font-black text-neon-green mb-2">785</div>
                                <p className="text-sm text-white/60">Tier: Platinum Citizen</p>
                            </div>
                            <ul className="mt-6 space-y-3 text-sm text-white/80">
                                <li className="flex items-center gap-2">✓ 5 Issues reported (last month)</li>
                                <li className="flex items-center gap-2">✓ 100% resolution accuracy</li>
                                <li className="flex items-center gap-2">✓ Community hero badge earned</li>
                            </ul>
                            <button
                                onClick={() => setShowCreditModal(false)}
                                className="w-full mt-8 p-3 rounded-lg bg-neon-green text-navy font-bold hover:bg-neon-green/90 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AshaAgent;
