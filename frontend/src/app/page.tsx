'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Zap, Edit, Search, Handshake, DollarSign, Target, MessageCircle, Globe, BookOpen, Code, Music, Paintbrush, Users, TrendingUp, Shield, ArrowRight, Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';

export default function HomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    return (
        <div className="min-h-screen bg-black overflow-hidden">
            {/* Animated background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20 pointer-events-none"></div>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>
            
            {/* Hero Section */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
                <nav className="flex items-center justify-between mb-20">
                    <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50 group-hover:shadow-green-500/80 group-hover:scale-110 transition-all">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span>Skill<span className="text-green-400">Craft</span></span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-6 py-2.5 text-gray-300 hover:text-white transition-all font-medium hover:bg-white/5 rounded-lg"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5"
                        >
                            Sign Up Free
                        </Link>
                    </div>
                </nav>

                <div className="text-center max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
                        <Sparkles className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">Join 10,000+ skill swappers worldwide</span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 leading-tight">
                        Learn by{' '}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 animate-pulse">
                                Teaching
                            </span>
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 blur-2xl opacity-20"></div>
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        The ultimate skill bartering platform. Exchange knowledge directly—no money, no middleman. 
                        <span className="text-green-400 font-semibold"> Just pure learning.</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link
                            href="/register"
                            className="group px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 hover:-translate-y-1 transition-all text-lg shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 flex items-center justify-center gap-2"
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="px-10 py-5 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-lg border border-white/10 hover:border-green-500/50"
                        >
                            See How It Works
                        </Link>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-sm">100% Free</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-sm">No Credit Card</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-sm">Secure Platform</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <section id="how-it-works" className="relative py-32 bg-gradient-to-b from-zinc-900/50 to-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            How It <span className="text-green-400">Works</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Three simple steps to start your skill-swapping journey
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connection lines */}
                        <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
                        
                        {[
                            {
                                icon: <Edit className="w-10 h-10" />,
                                step: '01',
                                title: 'List Your Skills',
                                description: 'Tell us what you can teach and what you want to learn. The more specific, the better your matches!',
                                color: 'from-green-500 to-emerald-500',
                                delay: 'delay-0'
                            },
                            {
                                icon: <Search className="w-10 h-10" />,
                                step: '02',
                                title: 'Find Perfect Matches',
                                description: 'Our smart algorithm connects you with people who have complementary skills and learning goals.',
                                color: 'from-blue-500 to-cyan-500',
                                delay: 'delay-100'
                            },
                            {
                                icon: <Handshake className="w-10 h-10" />,
                                step: '03',
                                title: 'Start Learning',
                                description: 'Connect, chat, and schedule sessions. Exchange knowledge on your own terms, completely free.',
                                color: 'from-purple-500 to-pink-500',
                                delay: 'delay-200'
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className={`relative group ${step.delay}`}
                            >
                                <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-green-500/20">
                                    {/* Step number */}
                                    <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-green-500/50">
                                        {step.step}
                                    </div>
                                    
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                        {step.icon}
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Why Choose <span className="text-green-400">SkillCraft?</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            The smartest way to learn and teach anything
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { 
                                icon: <DollarSign className="w-7 h-7" />, 
                                title: 'Completely Free', 
                                desc: 'No hidden fees, no subscriptions. Just pure knowledge exchange between people.',
                                gradient: 'from-green-500 to-emerald-500'
                            },
                            { 
                                icon: <Target className="w-7 h-7" />, 
                                title: 'Smart AI Matching', 
                                desc: 'Advanced algorithm finds your perfect skill-swap partner based on mutual interests.',
                                gradient: 'from-blue-500 to-cyan-500'
                            },
                            { 
                                icon: <MessageCircle className="w-7 h-7" />, 
                                title: 'Secure Chat', 
                                desc: 'Built-in messaging system keeps all communication safe and private.',
                                gradient: 'from-purple-500 to-pink-500'
                            },
                            { 
                                icon: <Globe className="w-7 h-7" />, 
                                title: 'Learn Anything', 
                                desc: 'From coding to cooking, music to marketing—every skill has value here.',
                                gradient: 'from-orange-500 to-red-500'
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Showcase */}
            <section className="relative py-32 bg-gradient-to-b from-black to-zinc-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Popular <span className="text-green-400">Skills</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Join thousands swapping these trending skills right now
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { icon: <Code className="w-7 h-7" />, label: 'Programming', color: 'from-blue-500 to-cyan-500', count: '2.3k' },
                            { icon: <Music className="w-7 h-7" />, label: 'Music', color: 'from-purple-500 to-pink-500', count: '1.8k' },
                            { icon: <Paintbrush className="w-7 h-7" />, label: 'Art & Design', color: 'from-orange-500 to-red-500', count: '1.5k' },
                            { icon: <Globe className="w-7 h-7" />, label: 'Languages', color: 'from-green-500 to-emerald-500', count: '3.1k' },
                            { icon: <BookOpen className="w-7 h-7" />, label: 'Writing', color: 'from-yellow-500 to-orange-500', count: '980' },
                            { icon: <TrendingUp className="w-7 h-7" />, label: 'Business', color: 'from-teal-500 to-cyan-500', count: '1.2k' },
                        ].map((skill, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-zinc-800/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-center"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg`}>
                                    {skill.icon}
                                </div>
                                <p className="text-white font-semibold mb-1">{skill.label}</p>
                                <p className="text-gray-500 text-xs">{skill.count} swappers</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Success <span className="text-green-400">Stories</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Real people, real skills, real results
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "I taught Python and learned Spanish. Best trade ever! No money involved, just pure knowledge exchange. Found an amazing partner in just 2 days.",
                                author: "Sarah K.",
                                skill: "Web Developer",
                                rating: 5
                            },
                            {
                                quote: "Amazing platform! I swapped my guitar lessons for cooking classes. Met great people and learned so much. This is the future of learning!",
                                author: "Mike R.",
                                skill: "Musician",
                                rating: 5
                            },
                            {
                                quote: "The matching algorithm is brilliant. Found someone who wanted to learn design while teaching me photography. We're still learning together!",
                                author: "Lisa M.",
                                skill: "Graphic Designer",
                                rating: 5
                            },
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-zinc-800/50 hover:border-green-500/30 transition-all duration-300 group"
                            >
                                {/* Rating stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                
                                <Quote className="w-10 h-10 text-green-400/30 mb-4" />
                                <p className="text-gray-300 mb-6 text-lg leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {testimonial.author[0]}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">{testimonial.author}</p>
                                        <p className="text-gray-500 text-sm">{testimonial.skill}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="relative py-32 bg-gradient-to-b from-zinc-900/50 to-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: <Users className="w-10 h-10" />, stat: '10,000+', label: 'Active Users', color: 'from-green-500 to-emerald-500' },
                            { icon: <Handshake className="w-10 h-10" />, stat: '25,000+', label: 'Skills Swapped', color: 'from-blue-500 to-cyan-500' },
                            { icon: <Star className="w-10 h-10" />, stat: '4.9/5', label: 'User Rating', color: 'from-purple-500 to-pink-500' },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="text-center group"
                            >
                                <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${item.color} mb-6 group-hover:scale-110 transition-transform shadow-2xl`}>
                                    <div className="text-white">{item.icon}</div>
                                </div>
                                <h3 className="text-5xl md:text-6xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{item.stat}</h3>
                                <p className="text-gray-400 text-lg">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Safety */}
            <section className="relative py-32">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-xl rounded-3xl p-12 md:p-16 text-center border border-green-500/20 overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        
                        <div className="relative">
                            <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-8 shadow-2xl shadow-green-500/50">
                                <Shield className="w-14 h-14 text-white" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Safe & Secure Platform
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                Your privacy and safety are our top priorities. All communications happen within our secure platform,
                                and we never share your personal information. Learn with confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Start?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Join thousands of learners exchanging skills every day. It&apos;s completely free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="group px-12 py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all text-xl shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 hover:scale-105 flex items-center justify-center gap-3"
                        >
                            Create Free Account
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                    
                    <p className="text-gray-500 text-sm mt-8">No credit card required • Takes less than 30 seconds</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative border-t border-zinc-800/50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white font-semibold">Skill<span className="text-green-400">Craft</span></span>
                        </div>
                        <p className="text-gray-400 text-sm">&copy; 2026 SkillCraft. Exchange knowledge, grow together.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
