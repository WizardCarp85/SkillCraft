'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { Zap, Edit, Search, Handshake, DollarSign, Target, MessageCircle, Globe, BookOpen, Code, Music, Paintbrush, Users, TrendingUp, Shield, ArrowRight, Star, Quote, CheckCircle2, Sparkles, Menu, Github, Twitter, Linkedin } from 'lucide-react';

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
            <div className="fixed inset-0 bg-linear-to-br from-green-900/20 via-black to-emerald-900/20 pointer-events-none animate-smooth"></div>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>
            
            {/* Hero Section */}
            <div className="relative w-full min-h-screen flex flex-col pt-6 overflow-hidden">
                {/* Animated grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
                
                {/* Floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
                
                {/* Enhanced Navbar */}
                <div className="relative w-full px-4 sm:px-6 lg:px-8 mb-8 z-10">
                    <nav className="max-w-7xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-xl px-6 py-4 sticky top-4 z-50 animate-smooth">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-3 group">
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-green-500/50 animate-smooth">
                                    <Image 
                                        src="/logo.png" 
                                        alt="SkillCraft Logo" 
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span className="hidden sm:inline">Skill<span className="text-green-400">Craft</span></span>
                            </Link>
                        
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-gray-300 hover:text-white animate-smooth font-medium hover:bg-white/5 rounded-lg"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-2.5 bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-emerald-500 animate-smooth shadow-md shadow-green-500/20 hover:shadow-green-500/30"
                                >
                                    Sign Up Free
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="relative text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center pb-20 px-4 sm:px-6 lg:px-8 z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6 animate-smooth hover:bg-green-500/15 mx-auto">
                        <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
                        <span className="text-green-400 text-sm font-medium">Join 10,000+ skill swappers worldwide</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                        Learn by{' '}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 via-emerald-400 to-green-500">
                                Teaching
                            </span>
                            <div className="absolute -inset-1 bg-linear-to-r from-green-400 to-emerald-400 blur-2xl opacity-20 animate-pulse"></div>
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        The ultimate skill bartering platform. Exchange knowledge directly—no money, no middleman. 
                        <span className="text-green-400 font-semibold"> Just pure learning.</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                        <Link
                            href="/register"
                            className="group px-8 py-3.5 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 animate-smooth text-base shadow-lg shadow-green-500/30 hover:shadow-green-500/50 flex items-center justify-center gap-2"
                        >
                            Get Started Free
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 animate-smooth" />
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="px-8 py-3.5 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-base border border-white/10 hover:border-green-500/50"
                        >
                            See How It Works
                        </Link>
                    </div>

                    {/* Trust badges with enhanced styling */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-green-500/30 animate-smooth">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-sm text-gray-300 font-medium">100% Free</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-green-500/30 animate-smooth">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-sm text-gray-300 font-medium">No Credit Card</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-green-500/30 animate-smooth">
                            <Shield className="w-5 h-5 text-green-400" />
                            <span className="text-sm text-gray-300 font-medium">Secure Platform</span>
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">10K+</div>
                            <div className="text-xs text-gray-500">Active Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">25K+</div>
                            <div className="text-xs text-gray-500">Skills Swapped</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">4.9★</div>
                            <div className="text-xs text-gray-500">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <section id="how-it-works" className="relative py-24 bg-linear-to-b from-zinc-900/50 to-black w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            How It <span className="text-green-400">Works</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Three simple steps to start your skill-swapping journey
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connection lines with arrows */}
                        <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-green-500/30 to-transparent"></div>
                        <div className="hidden md:block absolute top-1/3 left-1/3 w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                            <ArrowRight className="w-6 h-6 text-green-500/50" />
                        </div>
                        <div className="hidden md:block absolute top-1/3 left-2/3 w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                            <ArrowRight className="w-6 h-6 text-green-500/50" />
                        </div>
                        
                        {[
                            {
                                icon: <Edit className="w-8 h-8" />,
                                step: '01',
                                title: 'List Your Skills',
                                description: 'Tell us what you can teach and what you want to learn. The more specific, the better your matches!',
                                color: 'from-green-500 to-emerald-500'
                            },
                            {
                                icon: <Search className="w-8 h-8" />,
                                step: '02',
                                title: 'Find Perfect Matches',
                                description: 'Our smart algorithm connects you with people who have complementary skills and learning goals.',
                                color: 'from-blue-500 to-cyan-500'
                            },
                            {
                                icon: <Handshake className="w-8 h-8" />,
                                step: '03',
                                title: 'Start Learning',
                                description: 'Connect, chat, and schedule sessions. Exchange knowledge on your own terms, completely free.',
                                color: 'from-purple-500 to-pink-500'
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="relative group"
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-linear-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 rounded-2xl blur-xl transition-all duration-500"></div>
                                
                                <div className="relative bg-linear-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-green-500/20 min-h-70 flex flex-col">
                                    {/* Step number with pulse effect */}
                                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/50 group-hover:scale-110 transition-transform">
                                        {step.step}
                                    </div>
                                    
                                    {/* Icon container with enhanced styling */}
                                    <div className={`relative w-16 h-16 rounded-xl bg-linear-to-br ${step.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                                        <div className="absolute inset-0 bg-white/20 rounded-xl blur group-hover:blur-md transition-all"></div>
                                        <div className="relative">{step.icon}</div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-[15px]">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative py-24 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Why Choose <span className="text-green-400">SkillCraft?</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            The smartest way to learn and teach anything
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { 
                                icon: <DollarSign className="w-6 h-6" />, 
                                title: 'Completely Free', 
                                desc: 'No hidden fees, no subscriptions. Just pure knowledge exchange between people.',
                                gradient: 'from-green-500 to-emerald-500'
                            },
                            { 
                                icon: <Target className="w-6 h-6" />, 
                                title: 'Smart AI Matching', 
                                desc: 'Advanced algorithm finds your perfect skill-swap partner based on mutual interests.',
                                gradient: 'from-blue-500 to-cyan-500'
                            },
                            { 
                                icon: <MessageCircle className="w-6 h-6" />, 
                                title: 'Secure Chat', 
                                desc: 'Built-in messaging system keeps all communication safe and private.',
                                gradient: 'from-purple-500 to-pink-500'
                            },
                            { 
                                icon: <Globe className="w-6 h-6" />, 
                                title: 'Learn Anything', 
                                desc: 'From coding to cooking, music to marketing—every skill has value here.',
                                gradient: 'from-orange-500 to-red-500'
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-linear-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10"
                            >
                                <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-md`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Showcase */}
            <section className="relative py-24 bg-linear-to-b from-black to-zinc-900/50 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Popular <span className="text-green-400">Skills</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
                                className="group relative bg-linear-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-zinc-800/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-center"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${skill.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg`}>
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
            <section className="relative py-20 bg-linear-to-b from-zinc-900/50 via-zinc-900/30 to-zinc-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Success <span className="text-green-400">Stories</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
                                className="relative bg-linear-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-zinc-800/50 hover:border-green-500/30 transition-all duration-300 group"
                            >
                                {/* Rating stars */}
                                <div className="flex gap-1 mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                
                                <Quote className="w-10 h-10 text-green-400/30 mb-4" />
                                <p className="text-gray-300 mb-6 text-lg leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
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
            <section className="relative py-20 bg-linear-to-b from-zinc-900/50 to-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Users className="w-8 h-8" />, stat: '10,000+', label: 'Active Users', color: 'from-green-500 to-emerald-500' },
                            { icon: <Handshake className="w-8 h-8" />, stat: '25,000+', label: 'Skills Swapped', color: 'from-blue-500 to-cyan-500' },
                            { icon: <Star className="w-8 h-8" />, stat: '4.9/5', label: 'User Rating', color: 'from-purple-500 to-pink-500' },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="text-center group"
                            >
                                <div className={`inline-flex p-4 rounded-xl bg-linear-to-br ${item.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                    <div className="text-white">{item.icon}</div>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{item.stat}</h3>
                                <p className="text-gray-400">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Safety */}
            <section className="relative py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-linear-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-xl rounded-2xl p-8 md:p-10 text-center border border-green-500/20 overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        
                        <div className="relative">
                            <div className="inline-flex p-4 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 mb-6 shadow-lg shadow-green-500/50">
                                <Shield className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Safe & Secure Platform
                            </h2>
                            <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                Your privacy and safety are our top priorities. All communications happen within our secure platform,
                                and we never share your personal information. Learn with confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Ready to <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-400">Start?</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Join thousands of learners exchanging skills every day. It&apos;s completely free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="group px-12 py-6 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-emerald-500 animate-smooth text-xl shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 hover:scale-105 flex items-center justify-center gap-3"
                        >
                            Create Free Account
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 animate-smooth" />
                        </Link>
                    </div>
                    
                    <p className="text-gray-500 text-sm mt-8">No credit card required • Takes less than 30 seconds</p>
                </div>
            </section>

            {/* Enhanced Footer */}
            <footer className="relative border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-4 group">
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-green-500/30">
                                    <Image 
                                        src="/logo.png" 
                                        alt="SkillCraft Logo" 
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span className="text-2xl font-bold text-white">Skill<span className="text-green-400">Craft</span></span>
                            </Link>
                            <p className="text-gray-400 mb-6 max-w-md">
                                The ultimate skill bartering platform. Exchange knowledge, learn from each other, and grow together—completely free.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-green-400 animate-smooth">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-green-400 animate-smooth">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-green-400 animate-smooth">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Platform</h4>
                            <ul className="space-y-3">
                                <li><Link href="#how-it-works" className="text-gray-400 hover:text-green-400 animate-smooth">How It Works</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-green-400 animate-smooth">Features</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-green-400 animate-smooth">Success Stories</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-green-400 animate-smooth">FAQ</Link></li>
                            </ul>
                        </div>
                        
                        {/* Company */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-3">
                                <li><Link href="#" className="text-gray-400 hover:text-green-400 animate-smooth">About Us</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-green-400 animate-smooth">Contact</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-green-400 animate-smooth">Privacy Policy</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-green-400 animate-smooth">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Bottom */}
                    <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 text-sm">&copy; 2026 SkillCraft. Exchange knowledge, grow together.</p>
                        <div className="flex gap-6 text-sm">
                            <Link href="#" className="text-gray-500 hover:text-green-400 animate-smooth">Privacy</Link>
                            <Link href="#" className="text-gray-500 hover:text-green-400 animate-smooth">Terms</Link>
                            <Link href="#" className="text-gray-500 hover:text-green-400 animate-smooth">Cookies</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
