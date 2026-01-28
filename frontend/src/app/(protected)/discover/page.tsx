'use client';

import { useState, useEffect } from 'react';
import { userAPI, connectionAPI } from '@/lib/api';
import { Search, Sparkles, Send } from 'lucide-react';

interface Match {
    user: {
        _id: string;
        username: string;
        email: string;
        skillsHave: string[];
        skillsWant: string[];
    };
    score: number;
    mutualMatch: boolean;
}

export default function DiscoverPage() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [sendingTo, setSendingTo] = useState<string | null>(null);
    const [selectedSkills, setSelectedSkills] = useState<{ [key: string]: { offer: string; request: string } }>({});

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const response = await userAPI.getMatches();
            setMatches(response.data);
        } catch (error) {
            console.error('Failed to fetch matches:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendRequest = async (match: Match) => {
        const skills = selectedSkills[match.user._id];
        if (!skills?.offer || !skills?.request) {
            alert('Please select skills to offer and request');
            return;
        }

        setSendingTo(match.user._id);
        try {
            await connectionAPI.sendRequest({
                receiverId: match.user._id,
                skillOffered: skills.offer,
                skillRequested: skills.request,
            });
            alert('Connection request sent!');
            // Remove from matches list
            setMatches(matches.filter((m) => m.user._id !== match.user._id));
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to send request');
        } finally {
            setSendingTo(null);
        }
    };

    const updateSelectedSkill = (userId: string, type: 'offer' | 'request', skill: string) => {
        setSelectedSkills((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [type]: skill,
            },
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-white text-xl">Finding matches...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="glass-card rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-linear-to-br from-purple-600 to-pink-600">
                        <Search className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white">Discover Matches</h1>
                </div>
                <p className="text-gray-300 text-lg ml-14">
                    Find people who have the skills you want and want the skills you have
                </p>
            </div>

            {matches.length === 0 ? (
                <div className="glass-card rounded-3xl p-12 shadow-xl text-center">
                    <div className="inline-flex p-4 rounded-full bg-zinc-900/50 mb-4">
                        <Search className="w-12 h-12 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">No matches found</h2>
                    <p className="text-gray-400">
                        Try adding more skills to your profile to find people to swap with!
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {matches.map((match) => (
                        <div
                            key={match.user._id}
                            className="glass-card rounded-3xl p-6 shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                {/* User Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                            {match.user.username[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">
                                                {match.user.username}
                                            </h3>
                                            {match.mutualMatch && (
                                                <span className="inline-flex items-center gap-1 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                                                    <Sparkles className="w-3 h-3" />
                                                    Mutual Match
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Their Skills */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-400 text-sm mb-2">Can teach you:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {match.user.skillsHave.map((skill, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => updateSelectedSkill(match.user._id, 'request', skill)}
                                                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                                                            selectedSkills[match.user._id]?.request === skill
                                                                ? 'bg-blue-500 text-white'
                                                                : 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                                                        }`}
                                                    >
                                                        {skill}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm mb-2">Wants to learn:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {match.user.skillsWant.map((skill, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => updateSelectedSkill(match.user._id, 'offer', skill)}
                                                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                                                            selectedSkills[match.user._id]?.offer === skill
                                                                ? 'bg-purple-500 text-white'
                                                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
                                                        }`}
                                                    >
                                                        {skill}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="flex flex-col items-end gap-2">
                                    {selectedSkills[match.user._id]?.offer && selectedSkills[match.user._id]?.request && (
                                        <p className="text-sm text-gray-400 text-right mb-2">
                                            Offer: <span className="text-green-400 font-medium">{selectedSkills[match.user._id].offer}</span>
                                            <br />
                                            Learn: <span className="text-blue-400 font-medium">{selectedSkills[match.user._id].request}</span>
                                        </p>
                                    )}
                                    <button
                                        onClick={() => handleSendRequest(match)}
                                        disabled={sendingTo === match.user._id}
                                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all disabled:opacity-50 shadow-lg shadow-green-500/20"
                                    >
                                        <Send className="w-4 h-4" />
                                        {sendingTo === match.user._id ? 'Sending...' : 'Send Request'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
