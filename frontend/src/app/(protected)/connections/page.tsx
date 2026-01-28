'use client';

import { useState, useEffect } from 'react';
import { connectionAPI } from '@/lib/api';
import { Users, Inbox, Send, Check, X, MessageCircle, Handshake } from 'lucide-react';

interface Connection {
    _id: string;
    sender: {
        _id: string;
        username: string;
        email: string;
        skillsHave: string[];
        skillsWant: string[];
    };
    receiver: {
        _id: string;
        username: string;
        email: string;
        skillsHave: string[];
        skillsWant: string[];
    };
    skillOffered: string;
    skillRequested: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
}

export default function ConnectionsPage() {
    const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'active'>('received');
    const [receivedRequests, setReceivedRequests] = useState<Connection[]>([]);
    const [sentRequests, setSentRequests] = useState<Connection[]>([]);
    const [activeConnections, setActiveConnections] = useState<Connection[]>([]);
    const [loading, setLoading] = useState(true);
    const [respondingTo, setRespondingTo] = useState<string | null>(null);

    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = async () => {
        try {
            const [received, sent, active] = await Promise.all([
                connectionAPI.getReceivedRequests(),
                connectionAPI.getSentRequests(),
                connectionAPI.getActiveConnections(),
            ]);
            setReceivedRequests(received.data);
            setSentRequests(sent.data);
            setActiveConnections(active.data);
        } catch (error) {
            console.error('Failed to fetch connections:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRespond = async (connectionId: string, status: 'accepted' | 'rejected') => {
        setRespondingTo(connectionId);
        try {
            await connectionAPI.respondToRequest(connectionId, status);
            await fetchConnections();
        } catch (error) {
            console.error('Failed to respond:', error);
        } finally {
            setRespondingTo(null);
        }
    };

    const tabs = [
        { id: 'received', label: 'Received', count: receivedRequests.length },
        { id: 'sent', label: 'Sent', count: sentRequests.filter(r => r.status === 'pending').length },
        { id: 'active', label: 'Active', count: activeConnections.length },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-white text-xl">Loading connections...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="glass-card rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-linear-to-br from-blue-600 to-cyan-600">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white">Connections</h1>
                </div>
                <p className="text-gray-300 text-lg ml-14">Manage your skill swap requests and partnerships</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                            activeTab === tab.id
                                ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                                : 'glass-card text-gray-300 hover:bg-white/10'
                        }`}
                    >
                        {tab.label}
                        {tab.count > 0 && (
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                                activeTab === tab.id ? 'bg-white/20' : 'bg-green-500/30 text-green-300'
                            }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="space-y-4">
                {activeTab === 'received' && (
                    <>
                        {receivedRequests.length === 0 ? (
                            <div className="glass-card rounded-3xl p-12 shadow-xl text-center">
                                <div className="inline-flex p-4 rounded-full bg-zinc-900/50 mb-4">
                                    <Inbox className="w-12 h-12 text-gray-500" />
                                </div>
                                <h2 className="text-xl font-semibold text-white mb-2">No pending requests</h2>
                                <p className="text-gray-400">When someone wants to swap skills with you, it&apos;ll appear here</p>
                            </div>
                        ) : (
                            receivedRequests.map((request) => (
                                <div key={request._id} className="glass-card rounded-3xl p-6 shadow-xl">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg">
                                                    {request.sender.username[0].toUpperCase()}
                                                </div>
                                                <h3 className="text-lg font-semibold text-white">{request.sender.username}</h3>
                                            </div>
                                            <p className="text-gray-300">
                                                Offers to teach <span className="text-green-400 font-medium">{request.skillOffered}</span>
                                                {' '}and wants to learn <span className="text-blue-400 font-medium">{request.skillRequested}</span>
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleRespond(request._id, 'accepted')}
                                                disabled={respondingTo === request._id}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                            >
                                                <Check className="w-4 h-4" />
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleRespond(request._id, 'rejected')}
                                                disabled={respondingTo === request._id}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors disabled:opacity-50"
                                            >
                                                <X className="w-4 h-4" />
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}

                {activeTab === 'sent' && (
                    <>
                        {sentRequests.length === 0 ? (
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
                                <div className="inline-flex p-4 rounded-full bg-zinc-900/50 mb-4">
                                    <Send className="w-12 h-12 text-gray-500" />
                                </div>
                                <h2 className="text-xl font-semibold text-white mb-2">No sent requests</h2>
                                <p className="text-gray-400">Go to Discover to find people to swap skills with!</p>
                            </div>
                        ) : (
                            sentRequests.map((request) => (
                                <div key={request._id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                                    {request.receiver.username[0].toUpperCase()}
                                                </div>
                                                <h3 className="text-lg font-semibold text-white">{request.receiver.username}</h3>
                                            </div>
                                            <p className="text-gray-300">
                                                You offered <span className="text-green-400 font-medium">{request.skillOffered}</span>
                                                {' '}to learn <span className="text-blue-400 font-medium">{request.skillRequested}</span>
                                            </p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                            request.status === 'pending'
                                                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                : request.status === 'accepted'
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                        }`}>
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}

                {activeTab === 'active' && (
                    <>
                        {activeConnections.length === 0 ? (
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
                                <div className="inline-flex p-4 rounded-full bg-zinc-900/50 mb-4">
                                    <Handshake className="w-12 h-12 text-gray-500" />
                                </div>
                                <h2 className="text-xl font-semibold text-white mb-2">No active connections</h2>
                                <p className="text-gray-400">Once someone accepts your request (or you accept theirs), they&apos;ll appear here</p>
                            </div>
                        ) : (
                            activeConnections.map((connection) => (
                                <div key={connection._id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                                                    {(connection.sender.username[0] || connection.receiver.username[0]).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">
                                                        {connection.sender.username} ↔ {connection.receiver.username}
                                                    </h3>
                                                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                                                        Active Swap
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-gray-300">
                                                Swapping <span className="text-green-400 font-medium">{connection.skillOffered}</span>
                                                {' '}for <span className="text-blue-400 font-medium">{connection.skillRequested}</span>
                                            </p>
                                        </div>
                                        <a
                                            href={`/chat?connection=${connection._id}`}
                                            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all text-center shadow-lg"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Chat
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
