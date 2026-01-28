'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { Zap, LayoutDashboard, Search, Users, MessageCircle, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/discover', label: 'Discover' },
        { href: '/connections', label: 'Connections' },
        { href: '/chat', label: 'Chat' },
        { href: '/profile', label: 'Profile' },
    ];

    return (
        <nav className="glass-card border-b border-zinc-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/dashboard" className="text-2xl font-bold text-white flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        Skill<span className="text-green-400">Craft</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive('/dashboard')
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                            }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/discover"
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive('/discover')
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                            }`}
                        >
                            <Search className="w-4 h-4" />
                            Discover
                        </Link>
                        <Link
                            href="/connections"
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive('/connections')
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            Connections
                        </Link>
                        <Link
                            href="/chat"
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive('/chat')
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                            }`}
                        >
                            <MessageCircle className="w-4 h-4" />
                            Chat
                        </Link>
                        <Link
                            href="/profile"
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive('/profile')
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                            }`}
                        >
                            <User className="w-4 h-4" />
                            Profile
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-300 text-sm">
                            Hey, <span className="text-green-400 font-medium">{user?.username}</span>
                        </span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-red-400 bg-zinc-900/30 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-zinc-800/50 hover:border-red-500/50"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
