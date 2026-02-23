import React, { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import WorkflowAnim from '../components/WorkflowAnim';
import { ShieldCheck, Database, Smartphone, CheckCircle } from 'lucide-react';

const steps = [
    {
        title: "Reported",
        description: "Citizen reports an issue using the mobile app with location & photo.",
        icon: <Smartphone className="text-neon-green" size={32} />,
        color: "rgba(34, 197, 94, 0.2)"
    },
    {
        title: "AI Classified",
        description: "Our neural network automatically categorizes and prioritizes the complaint.",
        icon: <Database className="text-neon-green" size={32} />,
        color: "rgba(34, 197, 94, 0.3)"
    },
    {
        title: "Force Assigned",
        description: "Smart routing assigns the nearest municipal department instantly.",
        icon: <ShieldCheck className="text-neon-green" size={32} />,
        color: "rgba(34, 197, 94, 0.4)"
    },
    {
        title: "Blockchain Verified",
        description: "Resolution is locked into proof-of-work blockchain for transparency.",
        icon: <CheckCircle className="text-neon-green" size={32} />,
        color: "rgba(34, 197, 94, 0.5)"
    }
];

const HowItWorks = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={containerRef} className="h-[300vh] bg-navy relative">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-10">
                <div className="mb-20 pl-4 md:pl-20">
                    <h2 className="text-5xl font-black mb-4">Digital Justice Pipeline</h2>
                    <p className="text-white/40 max-w-lg">
                        From the moment you report, UrbanPulse ensures every step is tracked,
                        verified, and resolved through our automated workflow.
                    </p>
                </div>

                {/* 3D Background Element per section or floating */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
                    <Canvas>
                        <Suspense fallback={null}>
                            <WorkflowAnim />
                        </Suspense>
                    </Canvas>
                </div>

                <motion.div style={{ x }} className="flex gap-20 relative z-10 pl-20 pr-[20vw]">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="min-w-[400px] h-[500px] glass p-10 flex flex-col justify-between group"
                            style={{ boxShadow: `0 0 30px ${step.color}` }}
                        >
                            <div>
                                <div className="mb-6 p-4 rounded-xl bg-white/5 inline-block group-hover:bg-neon-green/20 transition-colors">
                                    {step.icon}
                                </div>
                                <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                                <p className="text-white/60 leading-relaxed text-lg">
                                    {step.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-6xl font-black text-white/5">0{i + 1}</span>
                                <div className="flex-1 h-[2px] bg-gradient-to-r from-neon-green/40 to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
