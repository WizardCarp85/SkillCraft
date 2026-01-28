'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loading() {
    const [dots, setDots] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    
    const loadingTexts = [
        'Preparing your workspace',
        'Loading skills',
        'Connecting to community',
        'Almost there'
    ];

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        const textInterval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % loadingTexts.length);
        }, 2000);

        return () => {
            clearInterval(dotsInterval);
            clearInterval(textInterval);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    animation: 'gridMove 20s linear infinite'
                }} />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-green-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Animated Background Orbs */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            {/* Loading Content */}
            <div className="relative flex flex-col items-center gap-8">
                {/* Outer Ring */}
                <div className="relative">
                    <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-green-500/20 animate-ping" />
                    <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-green-500/30" style={{ animation: 'spin 3s linear infinite reverse' }} />
                    
                    {/* Logo Container */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                        {/* Rotating Border */}
                        <div className="absolute inset-0 rounded-2xl animate-spin [animation-duration:3s]">
                            <div className="absolute top-0 left-0 w-4 h-4 bg-green-500 rounded-tl-2xl" />
                            <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-tr-2xl" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 bg-emerald-400 rounded-bl-2xl" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-br-2xl" />
                        </div>
                        
                        {/* Logo */}
                        <div className="relative w-24 h-24 group">
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-green-600 to-emerald-600 blur-xl opacity-60 animate-pulse" />
                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-green-500/50 shadow-2xl shadow-green-500/50 group-hover:scale-110 transition-transform">
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

                {/* Brand Name with Glitch Effect */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white relative">
                        <span className="relative inline-block">
                            Skill
                            <span className="absolute inset-0 text-green-400 opacity-50 blur-sm">Skill</span>
                        </span>
                        <span className="text-green-400 relative inline-block ml-1">
                            Craft
                            <span className="absolute inset-0 text-emerald-500 opacity-50 blur-sm">Craft</span>
                        </span>
                    </h1>
                    
                    {/* Progress Bar */}
                    <div className="w-64 h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-green-600 via-emerald-500 to-green-600 animate-pulse" style={{
                            animation: 'progress 2s ease-in-out infinite'
                        }} />
                    </div>
                    
                    {/* Dynamic Loading Text */}
                    <p className="text-green-400 text-sm font-medium min-h-[20px] transition-all duration-300">
                        {loadingTexts[textIndex]}{dots}
                    </p>
                </div>

                {/* Skill Icons Orbit */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 animate-spin [animation-duration:4s]">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-500/50" />
                    </div>
                    <div className="absolute inset-0 animate-spin [animation-duration:4s] [animation-delay:0.5s]">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
                    </div>
                    <div className="absolute inset-0 animate-spin [animation-duration:4s] [animation-delay:1s]">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-green-300 shadow-lg shadow-green-400/50" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
                }
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes gridMove {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(50px); }
                }
            `}</style>
        </div>
    );
}
