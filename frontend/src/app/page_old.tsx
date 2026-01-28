'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Zap, Edit, Search, Handshake, DollarSign, Target, MessageCircle, Globe, BookOpen, Code, Music, Paintbrush, Users, TrendingUp, Shield, ArrowRight, Star, Quote } from 'lucide-react';

export default function HomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <nav className="flex items-center justify-between mb-16">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        Skill<span className="text-green-400">Craft</span>
                    </h1>
                    <div className="flex gap-4">
                        <Link
                            href="/login"
                            className="px-6 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-500/20"
                        >
                            Sign Up
                        </Link>
                    </div>
                </nav>

                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Learn by <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Teaching</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Exchange skills with others. Teach what you know, learn what you want.
                        No money needed—just knowledge.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all text-lg shadow-xl shadow-green-500/30"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="px-8 py-4 glass-card text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-lg"
                        >
                            How It Works
                        </Link>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-4xl font-bold text-white text-center mb-12">
                        How It Works
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '📝',
                                title: '1. List Your Skills',
                                description: 'Add skills you can teach and skills you want to learn',
                            },
                            {
                                icon: '🔍',
                                title: '2. Find Matches',
                                description: 'Our algorithm finds people who match your skill swap needs',
                            },
                            {
                                icon: '🤝',
                                title: '3. Start Swapping',
                                description: 'Connect, chat, and start learning from each other',
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="glass-card rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                <div className="text-5xl mb-4">{step.icon}</div>
                                <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-white text-center mb-12">
                        Why SkillCraft?
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '💰', title: 'Free', desc: 'No money exchanged, just skills' },
                            { icon: '🎯', title: 'Smart Matching', desc: 'Find perfect skill swap partners' },
                            { icon: '💬', title: 'Built-in Chat', desc: 'Communicate safely within the platform' },
                            { icon: '🌍', title: 'Any Skill', desc: 'From coding to cooking to music' },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/5 rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors"
                            >
                                <div className="text-4xl mb-3">{feature.icon}</div>
                                <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Ready to start learning?
                    </h3>
                    <p className="text-gray-300 mb-8">
                        Join SkillCraft today and start exchanging skills with people around the world.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all text-lg"
                    >
                        Create Your Account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
                    <p>© 2026 SkillCraft. Built with ❤️ for skill swappers.</p>
                </div>
            </footer>
        </div>
    );
}
