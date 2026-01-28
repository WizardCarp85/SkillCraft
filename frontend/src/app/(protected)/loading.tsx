'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProtectedLoading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => prev >= 100 ? 0 : prev + 10);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 ml-64">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-green-400/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Loading Content */}
            <div className="relative flex flex-col items-center gap-6">
                {/* Outer Ring Animation */}
                <div className="relative">
                    <div className="absolute inset-0 w-28 h-28 rounded-full border-2 border-green-500/20 animate-ping" />
                    
                    {/* Logo with Rotation */}
                    <div className="relative w-24 h-24">
                        {/* Rotating Border */}
                        <div className="absolute inset-0 rounded-2xl animate-spin [animation-duration:3s]">
                            <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-tl-2xl" />
                            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-tr-2xl" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 bg-emerald-400 rounded-bl-2xl" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-br-2xl" />
                        </div>
                        
                        {/* Logo */}
                        <div className="relative w-20 h-20 ml-2 mt-2">
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-green-600 to-emerald-600 blur-xl opacity-60 animate-pulse" />
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-green-500/50 shadow-2xl shadow-green-500/50">
                                <Image 
                                    src="/logo.png" 
                                    alt="SkillCraft Logo" 
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Circle */}
                <div className="relative w-32 h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-linear-to-r from-green-600 to-emerald-500 transition-all duration-200 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Orbiting Dots */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 animate-spin [animation-duration:2s]">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-500/50" />
                    </div>
                    <div className="absolute inset-0 animate-spin [animation-duration:2s] [animation-delay:0.33s]">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
                    </div>
                    <div className="absolute inset-0 animate-spin [animation-duration:2s] [animation-delay:0.66s]">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-300 shadow-lg shadow-green-400/50" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
                }
            `}</style>
        </div>
    );
}
