import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, HelpCircle, ShieldCheck, FileWarning, Search, MessageSquare, Send, User, Mic, Sparkles, ChevronRight } from 'lucide-react';

const AshaAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentStep, setCurrentStep] = useState('GREETING'); // GREETING, LANGUAGE, OPTIONS, CHAT
    const [language, setLanguage] = useState('en-US');
    const [gender, setGender] = useState('female');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    const utteranceRef = useRef(null);
    const scrollRef = useRef(null);

    const GROQ_API_KEY = "VITE_GROQ_API_KEY_SCUBBED";

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            handleGreeting();
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleGreeting = () => {
        const text = "Namaste! Hello, I am Asha, your UrbanPulse Digital Assistant. How are you today?";
        addMessage(text, 'bot');
        speak(text);
        setTimeout(() => {
            setCurrentStep('LANGUAGE');
        }, 1500);
    };

    const addMessage = (text, sender) => {
        setMessages(prev => [...prev, { text, sender, id: Date.now() }]);
    };

    const speak = (text) => {
        if (!synth || isMuted) return;
        if (synth.speaking) synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;

        const voices = synth.getVoices();
        const voice = voices.find(v =>
            v.lang.startsWith(language.split('-')[0]) &&
            (gender === 'female' ? /female|google/i.test(v.name) : /male/i.test(v.name))
        ) || voices.find(v => v.lang.startsWith(language.split('-')[0])) || voices[0];

        if (voice) utterance.voice = voice;
        utteranceRef.current = utterance;
        synth.speak(utterance);
    };

    const handleLanguageChoice = (lang, g) => {
        setLanguage(lang);
        setGender(g);
        const response = lang === 'hi-IN'
            ? "ठीक है, मैं आपसे हिंदी में बात करूँगी। मैं आपकी क्या मदद कर सकती हूँ?"
            : "Great! I will assist you in English. How can I help you today?";
        addMessage(response, 'bot');
        speak(response);
        setCurrentStep('OPTIONS');
    };

    const handleOptionClick = async (option) => {
        addMessage(option.label, 'user');

        if (option.value === 'OTHER') {
            setCurrentStep('CHAT');
            const followUp = "Please ask me anything about Pune City services or the UrbanPulse portal.";
            addMessage(followUp, 'bot');
            speak(followUp);
        } else {
            let response = "";
            switch (option.value) {
                case 'COMPLAIN':
                    response = language === 'hi-IN'
                        ? "पोर्टल पर शिकायत करने के लिए, आप 'कम्पलेंट' सेक्शन में जाकर फॉर्म भर सकते हैं।"
                        : "To place a complaint, navigate to the 'Grievances' section and fill out the form with necessary details.";
                    break;
                case 'QUERY':
                    response = language === 'hi-IN'
                        ? "आप हमारे हेल्पडेस्क नंबर १८००-१२३-४५६ पर कॉल कर सकते हैं।"
                        : "You can call our helpdesk at 1800-123-456 for manual assistance.";
                    break;
                case 'STATUS':
                    response = language === 'hi-IN'
                        ? "अपनी शिकायत की स्थिति जानने के लिए कृपया अपना ग्रीवांस आईडी दर्ज करें।"
                        : "Please enter your Grievance ID to track the status of your old query.";
                    break;
                default:
                    response = "I'm here to help.";
            }
            addMessage(response, 'bot');
            speak(response);
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;
        const userText = input;
        addMessage(userText, 'user');
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: "You are Asha, a helpful AI assistant for the UrbanPulse PMC (Pune Municipal Corporation) portal. Answer questions politely and concisely about city services, grievance reporting, and urban development in Pune." },
                        { role: "user", content: userText }
                    ],
                    max_tokens: 150
                })
            });

            const data = await response.json();
            const botResponse = data.choices[0].message.content;
            addMessage(botResponse, 'bot');
            speak(botResponse);
        } catch (error) {
            const errorMsg = "I'm having trouble connecting to my brain right now. Please try again later.";
            addMessage(errorMsg, 'bot');
            speak(errorMsg);
        } finally {
            setIsTyping(false);
        }
    };

    const LadyNamasteLogo = () => (
        <svg viewBox="0 0 100 100" className="w-full h-full shadow-inner">
            <circle cx="50" cy="35" r="20" fill="#FFE0BD" />
            <path d="M50 55 C30 55 20 80 20 100 L80 100 C80 80 70 55 50 55" fill="#2E8B8B" />
            <path d="M30 35 C30 15 70 15 70 35 L70 40 L30 40 Z" fill="#2D3436" />
            <circle cx="50" cy="18" r="8" fill="#2D3436" />
            <path d="M45 70 L50 60 L55 70" fill="none" stroke="#FFE0BD" strokeWidth="6" strokeLinecap="round" />
            <path d="M48 65 L50 55 L52 65" fill="#FFE0BD" />
        </svg>
    );

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-100 flex flex-col items-end gap-4 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, y: 30, filter: 'blur(10px)' }}
                        className="glass-dark border border-white/10 rounded-[2.5rem] w-[320px] sm:w-[400px] overflow-hidden shadow-2xl flex flex-col max-h-[600px] relative"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <MessageSquare size={120} />
                        </div>

                        {/* Premium Header */}
                        <div className="bg-linear-to-br from-pmc-blue/50 to-pmc-accent/20 p-6 flex justify-between items-center text-white border-b border-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 p-1.5 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden group">
                                    < LadyNamasteLogo />
                                </div>
                                <div>
                                    <h4 className="font-black text-lg tracking-tighter flex items-center gap-2">
                                        आशा <span className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]">Asha</span>
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-pmc-accent animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                                        <span className="text-[10px] uppercase font-black tracking-widest text-pmc-accent">Active Protocol</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 active:scale-90 rounded-full transition-all border border-white/10">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Context */}
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto min-h-[350px] scrollbar-hide bg-slate-950/20" ref={scrollRef}>
                            <AnimatePresence mode="popLayout">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] font-medium leading-relaxed tracking-tight shadow-lg ${msg.sender === 'user'
                                            ? 'bg-pmc-accent text-white rounded-tr-none border border-white/10'
                                            : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none backdrop-blur-sm'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 shadow-lg flex gap-1.5 items-center backdrop-blur-sm">
                                        <div className="w-1.5 h-1.5 bg-pmc-accent rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-pmc-accent/60 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-1.5 h-1.5 bg-pmc-accent/30 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Interaction Flows */}
                            {currentStep === 'LANGUAGE' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-3 pt-4 border-t border-white/5"
                                >
                                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] px-1">Initialization Sequence</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { label: "English", sub: "Female", val: ['en-US', 'female'] },
                                            { label: "हिन्दी", sub: "Female", val: ['hi-IN', 'female'] },
                                            { label: "English", sub: "Male", val: ['en-US', 'male'] },
                                            { label: "हिन्दी", sub: "Male", val: ['hi-IN', 'male'] },
                                        ].map((btn, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleLanguageChoice(...btn.val)}
                                                className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-pmc-accent/20 hover:border-pmc-accent/30 transition-all text-left group"
                                            >
                                                <div className="text-white font-black text-xs transition-colors group-hover:text-pmc-accent">{btn.label}</div>
                                                <div className="text-[9px] text-white/30 uppercase font-bold tracking-widest mt-1 group-hover:text-white/50">{btn.sub}</div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 'OPTIONS' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-3 pt-4 border-t border-white/5"
                                >
                                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] px-1">Navigation Hub</p>
                                    {[
                                        { label: "Grievance Protocol", value: "COMPLAIN", icon: <FileWarning size={16} /> },
                                        { label: "Helpdesk Direct", value: "QUERY", icon: <HelpCircle size={16} /> },
                                        { label: "Trace Resolution", value: "STATUS", icon: <Search size={16} /> },
                                        { label: "Neural Search (Groq AI)", value: "OTHER", icon: <Sparkles size={16} /> },
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleOptionClick(opt)}
                                            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-pmc-accent/20 hover:border-pmc-accent/30 transition-all font-black text-white/70 text-xs flex items-center gap-4 group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-pmc-accent group-hover:bg-pmc-accent/10 transition-colors">
                                                {opt.icon}
                                            </div>
                                            <span className="flex-1 text-left group-hover:text-white transition-colors">{opt.label}</span>
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Command Center */}
                        <div className="p-6 bg-slate-900/60 border-t border-white/5 backdrop-blur-xl">
                            <AnimatePresence mode="wait">
                                {currentStep === 'CHAT' ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-3"
                                    >
                                        <div className="flex-1 relative group">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                placeholder="Ask the Pulse..."
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-pmc-accent/10 focus:border-pmc-accent transition-all placeholder:text-white/20 font-medium"
                                            />
                                            <Mic size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-pmc-accent transition-colors cursor-pointer" />
                                        </div>
                                        <button
                                            onClick={handleSendMessage}
                                            className="bg-pmc-accent text-white p-4 rounded-2xl hover:bg-blue-600 active:scale-95 transition-all shadow-xl shadow-pmc-accent/20 flex items-center justify-center"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setIsMuted(!isMuted)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${isMuted ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-pmc-accent/10 border-pmc-accent/20 text-pmc-accent'}`}
                                            >
                                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                            </button>
                                            <div>
                                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Voice Feedback</p>
                                                <p className="text-[11px] font-bold text-white/60 capitalize tracking-tight">{gender} Interface</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-pmc-accent uppercase tracking-[0.2em] animate-pulse">Neural Active</p>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launch Anchor */}
            <motion.button
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95, rotate: -5 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-20 h-20 rounded-4xl flex items-center justify-center shadow-2xl relative transition-all duration-500 group border-4 border-white ${isOpen ? 'bg-slate-900 border-white/10 rotate-180' : 'bg-pmc-blue border-white active-glow'}`}
            >
                <div className="absolute inset-0 bg-linear-to-tr from-pmc-blue to-pmc-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.8rem]"></div>
                <div className="w-12 h-12 relative z-10 transition-all duration-500">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                            >
                                <X size={28} className="text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5 }}
                                className="w-full h-full"
                            >
                                <LadyNamasteLogo />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Micro-Interaction Badge */}
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-pmc-accent rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                    >
                        <Sparkles size={10} className="text-white animate-pulse" />
                    </motion.div>
                )}
            </motion.button>
        </div>
    );
};

export default AshaAgent;



