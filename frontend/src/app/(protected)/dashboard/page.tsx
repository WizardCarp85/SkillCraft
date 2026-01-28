'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Target, BookOpen, Search, Users, MessageCircle, ArrowRight, User, Sparkles, Zap } from 'lucide-react';

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            {/* Welcome Hero Section */}
            <div className="relative glass-card rounded-2xl overflow-hidden shadow-2xl border border-green-500/10">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-linear-to-br from-green-500/5 via-transparent to-emerald-500/5" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
                
                <div className="relative p-8">
                    <div className="flex items-start justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-xl bg-linear-to-br from-green-600 to-emerald-600 shadow-lg shadow-green-500/20">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-medium">
                                    Active
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-white">
                                Welcome back, <span className="text-green-400">{user?.displayName || user?.username}</span>!
                            </h1>
                            <p className="text-gray-400 text-base max-w-2xl">
                                Ready to exchange knowledge and grow together? Let's make today a learning adventure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Overview - Enhanced */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6 shadow-xl border border-green-500/10 hover:border-green-500/30 transition-all">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-green-500/10">
                                <Target className="w-5 h-5 text-green-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Skills I Can Teach</h2>
                        </div>
                        <Link 
                            href="/profile" 
                            className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 font-medium"
                        >
                            Edit <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-25">
                        {user?.skillsHave && user.skillsHave.length > 0 ? (
                            user.skillsHave.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-linear-to-br from-green-500/20 to-emerald-500/20 text-green-300 rounded-lg text-sm border border-green-500/30 shadow-lg hover:scale-105 transition-transform cursor-default"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <div className="w-full flex items-center justify-center py-8">
                                <div className="text-center space-y-2">
                                    <p className="text-gray-500 text-sm">No skills added yet</p>
                                    <Link 
                                        href="/profile" 
                                        className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 font-medium text-sm"
                                    >
                                        Add your first skill <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-6 shadow-xl border border-blue-500/10 hover:border-blue-500/30 transition-all">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-blue-500/10">
                                <BookOpen className="w-5 h-5 text-blue-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Skills I Want to Learn</h2>
                        </div>
                        <Link 
                            href="/profile" 
                            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                        >
                            Edit <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-25">
                        {user?.skillsWant && user.skillsWant.length > 0 ? (
                            user.skillsWant.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-linear-to-br from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30 shadow-lg hover:scale-105 transition-transform cursor-default"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <div className="w-full flex items-center justify-center py-8">
                                <div className="text-center space-y-2">
                                    <p className="text-gray-500 text-sm">No skills added yet</p>
                                    <Link 
                                        href="/profile" 
                                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm"
                                    >
                                        Add what you want to learn <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions - Enhanced */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    Quick Actions
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/discover"
                        className="group glass-card rounded-2xl p-6 hover:bg-zinc-900/50 transition-all duration-300 transform hover:scale-105 shadow-xl border border-zinc-800/50 hover:border-purple-500/50 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="p-3 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <Search className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                                Find Matches
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">Discover people who want to learn what you know</p>
                            <div className="flex items-center gap-1 text-purple-400 text-xs font-medium">
                                Explore now <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/connections"
                        className="group glass-card rounded-2xl p-6 hover:bg-zinc-900/50 transition-all duration-300 transform hover:scale-105 shadow-xl border border-zinc-800/50 hover:border-blue-500/50 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                                My Connections
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">Manage your skill swap requests</p>
                            <div className="flex items-center gap-1 text-blue-400 text-xs font-medium">
                                View all <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/chat"
                        className="group glass-card rounded-2xl p-6 hover:bg-zinc-900/50 transition-all duration-300 transform hover:scale-105 shadow-xl border border-zinc-800/50 hover:border-green-500/50 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="p-3 rounded-xl bg-linear-to-br from-green-500/20 to-emerald-500/20 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <MessageCircle className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                                Messages
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">Chat with your skill swap partners</p>
                            <div className="flex items-center gap-1 text-green-400 text-xs font-medium">
                                Open chat <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/profile"
                        className="group glass-card rounded-2xl p-6 hover:bg-zinc-900/50 transition-all duration-300 transform hover:scale-105 shadow-xl border border-zinc-800/50 hover:border-orange-500/50 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="p-3 rounded-xl bg-linear-to-br from-orange-500/20 to-yellow-500/20 w-fit mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <User className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                                My Profile
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">Update your skills and preferences</p>
                            <div className="flex items-center gap-1 text-orange-400 text-xs font-medium">
                                Edit profile <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
