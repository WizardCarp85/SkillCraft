'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userAPI } from '@/lib/api';
import { User as UserIcon, Target, BookOpen, Plus, X, Save } from 'lucide-react';

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    const [skillsHave, setSkillsHave] = useState<string[]>(user?.skillsHave || []);
    const [skillsWant, setSkillsWant] = useState<string[]>(user?.skillsWant || []);
    const [newSkillHave, setNewSkillHave] = useState('');
    const [newSkillWant, setNewSkillWant] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const addSkill = (type: 'have' | 'want') => {
        if (type === 'have' && newSkillHave.trim()) {
            if (!skillsHave.includes(newSkillHave.trim())) {
                setSkillsHave([...skillsHave, newSkillHave.trim()]);
            }
            setNewSkillHave('');
        } else if (type === 'want' && newSkillWant.trim()) {
            if (!skillsWant.includes(newSkillWant.trim())) {
                setSkillsWant([...skillsWant, newSkillWant.trim()]);
            }
            setNewSkillWant('');
        }
    };

    const removeSkill = (type: 'have' | 'want', skill: string) => {
        if (type === 'have') {
            setSkillsHave(skillsHave.filter((s) => s !== skill));
        } else {
            setSkillsWant(skillsWant.filter((s) => s !== skill));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage('');

        try {
            await userAPI.updateProfile({ skillsHave, skillsWant });
            await refreshUser();
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent, type: 'have' | 'want') => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill(type);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="glass-card rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-linear-to-br from-green-600 to-emerald-600">
                        <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white">My Profile</h1>
                </div>
                <p className="text-gray-300 text-lg ml-14">Manage your skills and preferences</p>
            </div>

            {/* User Info */}
            <div className="glass-card rounded-3xl p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-white mb-4">Account Info</h2>
                <div className="space-y-3">
                    <div>
                        <label className="text-gray-400 text-sm">Username</label>
                        <p className="text-white font-medium text-lg">{user?.username}</p>
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">Email</label>
                        <p className="text-white font-medium text-lg">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Skills I Have */}
            <div className="glass-card rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-green-500/10">
                        <Target className="w-5 h-5 text-green-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Skills I Can Teach</h2>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {skillsHave.map((skill, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-linear-to-br from-green-500/20 to-emerald-500/20 text-green-300 rounded-full text-sm border border-green-500/30 flex items-center gap-2 shadow-lg"
                        >
                            {skill}
                            <button
                                onClick={() => removeSkill('have', skill)}
                                className="hover:text-red-400 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newSkillHave}
                        onChange={(e) => setNewSkillHave(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'have')}
                        placeholder="Add a skill (e.g., JavaScript, Guitar, Cooking)"
                        className="flex-1 px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                    <button
                        onClick={() => addSkill('have')}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </div>

            {/* Skills I Want */}
            <div className="glass-card rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Skills I Want to Learn</h2>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {skillsWant.map((skill, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-linear-to-br from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 flex items-center gap-2 shadow-lg"
                        >
                            {skill}
                            <button
                                onClick={() => removeSkill('want', skill)}
                                className="hover:text-red-400 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newSkillWant}
                        onChange={(e) => setNewSkillWant(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'want')}
                        placeholder="Add a skill you want to learn"
                        className="flex-1 px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                        onClick={() => addSkill('want')}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-4 bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-green-500/20"
                >
                    <Save className="w-5 h-5" />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
                {message && (
                    <span className={`text-sm font-medium ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </span>
                )}
            </div>
        </div>
    );
}
