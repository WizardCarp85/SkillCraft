'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, User, ArrowRight, Check, TrendingUp, Users, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex">
            {/* Left Side - Benefits */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-zinc-900 to-black items-center justify-center p-12 shadow-[inset_-20px_0_30px_-15px_rgba(0,0,0,0.3)]">
                <div className="max-w-lg">
                    <div className="mb-12">
                        <Sparkles className="w-16 h-16 text-green-400 mb-6 animate-float" />
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Continue Your <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-400">Growth</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Join thousands of learners exchanging skills and growing together.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-smooth hover:bg-white/10">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                                <Check className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Active Community</h3>
                                <p className="text-gray-400 text-sm">Connect with passionate learners from around the world</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-smooth hover:bg-white/10">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                                <TrendingUp className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Track Progress</h3>
                                <p className="text-gray-400 text-sm">Monitor your learning journey and skill development</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-smooth hover:bg-white/10">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                                <Users className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Smart Matching</h3>
                                <p className="text-gray-400 text-sm">Find perfect skill swap partners based on your goals</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-6 rounded-2xl bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                        <p className="text-gray-300 italic mb-3">
                            &quot;SkillCraft transformed how I learn. I&apos;ve mastered 3 new skills this month!&quot;
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-500 to-emerald-600"></div>
                            <div>
                                <p className="text-white font-medium">Sarah Chen</p>
                                <p className="text-gray-400 text-sm">Active Member</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Back to Home */}
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 animate-smooth mb-8 group">
                        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 animate-smooth" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 mb-12 group">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-green-500/30 animate-smooth">
                            <Image 
                                src="/logo.png" 
                                alt="SkillCraft Logo" 
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-2xl font-bold text-white">Skill<span className="text-green-400">Craft</span></span>
                    </Link>

                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
                        <p className="text-gray-400 text-lg">Sign in to continue your learning journey</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm animate-smooth">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent animate-smooth"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent animate-smooth"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 animate-smooth cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full py-4 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-emerald-500 hover:scale-[1.02] animate-smooth disabled:opacity-50 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 animate-smooth" />
                        </button>
                    </form>

                    <p className="text-gray-400 text-center mt-8">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-green-400 hover:text-green-300 font-medium animate-smooth">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
