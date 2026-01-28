'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Target, BookOpen, Search, Users, MessageCircle, ArrowRight, User } from 'lucide-react';

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="glass-card rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-linear-to-br from-green-600 to-emerald-600">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white">
                        Welcome back, <span className="text-green-400">{user?.username}</span>!
                    </h1>
                </div>
                <p className="text-gray-300 text-lg ml-14">
                    Ready to learn something new or teach someone today?
                </p>
            </div>

            {/* Skills Overview */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-3xl p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-green-500/10">
                            <Target className="w-5 h-5 text-green-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">Skills I Can Teach</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {user?.skillsHave && user.skillsHave.length > 0 ? (
                            user.skillsHave.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-linear-to-br from-green-500/20 to-emerald-500/20 text-green-300 rounded-full text-sm border border-green-500/30 shadow-lg"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-400">
                                No skills added yet.{' '}
                                <Link href="/profile" className="text-green-400 hover:underline font-medium">
                                    Add some!
                                </Link>
                            </p>
                        )}
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <BookOpen className="w-5 h-5 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">Skills I Want to Learn</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {user?.skillsWant && user.skillsWant.length > 0 ? (
                            user.skillsWant.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-linear-to-br from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 shadow-lg"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-400">
                                No skills added yet.{' '}
                                <Link href="/profile" className="text-green-400 hover:underline font-medium">
                                    Add some!
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                    href="/discover"
                    className="group glass-card rounded-3xl p-6 hover:bg-zinc-900/50 transition-all duration-300 transform hover:scale-105 shadow-lg border border-zinc-800/50 hover:border-green-500/50"
                >
                    <div className="p-3 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                        <Search className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                        Find Matches
                    </h3>
                    <p className="text-gray-400 text-sm">Discover people who want to learn what you know</p>
                </Link>
                <Link
                    href="/connections"
                    className="group glass-card rounded-3xl p-6 hover:bg-zinc-900/50 transition-all duration-300 transform hover:scale-105 shadow-lg border border-zinc-800/50 hover:border-blue-500/50"
                >
                    <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                        My Connections
                    </h3>
                    <p className="text-gray-400 text-sm">Manage your skill swap requests</p>
                </Link>
                <Link
                    href="/chat"
                    className="group glass-card rounded-3xl p-6 hover:bg-zinc-900/50 transition-all duration-300 transform hover:scale-105 shadow-lg border border-zinc-800/50 hover:border-green-500/50"
                >
                    <div className="p-3 rounded-xl bg-linear-to-br from-green-500/20 to-emerald-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                        Messages
                    </h3>
                    <p className="text-gray-400 text-sm">Chat with your skill swap partners</p>
                </Link>
                <Link
                    href="/profile"
                    className="group glass-card rounded-3xl p-6 hover:bg-zinc-900/50 transition-all duration-300 transform hover:scale-105 shadow-lg border border-zinc-800/50 hover:border-orange-500/50"
                >
                    <div className="p-3 rounded-xl bg-linear-to-br from-orange-500/20 to-yellow-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                        <User className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                        My Profile
                    </h3>
                    <p className="text-gray-400 text-sm">Update your skills and preferences</p>
                </Link>
            </div>
        </div>
    );
}
