'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function NavigationLoader() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
    }, [pathname]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-100 animate-fadeIn">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Loading Content */}
            <div className="relative flex flex-col items-center gap-6">
                {/* Outer Ring */}
                <div className="relative">
                    <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-green-500/30 animate-ping" />
                    
                    {/* Logo Container */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        {/* Rotating Border */}
                        <div className="absolute inset-0 rounded-2xl animate-spin" style={{ animationDuration: '2s' }}>
                            <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-tl-2xl" />
                            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-tr-2xl" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 bg-emerald-400 rounded-bl-2xl" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-br-2xl" />
                        </div>
                        
                        {/* Logo */}
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-green-600 to-emerald-600 blur-lg opacity-60 animate-pulse" />
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-green-500/50 shadow-2xl shadow-green-500/50">
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

                {/* Progress Bar */}
                <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-green-600 to-emerald-500 animate-slideRight" />
                </div>

                {/* Orbiting Dots */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-500/50" />
                    </div>
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDelay: '0.33s' }}>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
                    </div>
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDelay: '0.66s' }}>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-300 shadow-lg shadow-green-400/50" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideRight {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-in;
                }
                .animate-slideRight {
                    animation: slideRight 1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
