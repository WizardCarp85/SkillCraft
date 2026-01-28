'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { Zap, LayoutDashboard, Search, Users, MessageCircle, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed left-0 top-0 h-screen w-64 glass-card border-r border-zinc-800/50 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-zinc-800/50">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-green-500/50 animate-smooth shrink-0">
                        <Image 
                            src="/logo.png" 
                            alt="SkillCraft Logo" 
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold text-white">
                        Skill<span className="text-green-400">Craft</span>
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
                <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive('/dashboard')
                            ? 'bg-green-500/20 text-green-400'
                            : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                >
                    <LayoutDashboard className="w-5 h-5 shrink-0" />
                    Dashboard
                </Link>
                <Link
                    href="/discover"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive('/discover')
                            ? 'bg-green-500/20 text-green-400'
                            : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                >
                    <Search className="w-5 h-5 shrink-0" />
                    Discover
                </Link>
                <Link
                    href="/connections"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive('/connections')
                            ? 'bg-green-500/20 text-green-400'
                            : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                >
                    <Users className="w-5 h-5 shrink-0" />
                    Connections
                </Link>
                <Link
                    href="/chat"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive('/chat')
                            ? 'bg-green-500/20 text-green-400'
                            : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    Chat
                </Link>
                <Link
                    href="/profile"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive('/profile')
                            ? 'bg-green-500/20 text-green-400'
                            : 'text-gray-300 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                >
                    <User className="w-5 h-5 shrink-0" />
                    Profile
                </Link>
            </div>

            {/* User Section & Logout */}
            <div className="p-4 border-t border-zinc-800/50 space-y-3">
                <div className="px-3 py-2 rounded-lg bg-zinc-900/50">
                    <p className="text-xs text-gray-500 mb-1">Active User</p>
                    <p className="text-sm text-green-400 font-medium truncate">{user?.username}</p>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-red-400 bg-zinc-900/30 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-zinc-800/50 hover:border-red-500/50"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </nav>
    );
}
