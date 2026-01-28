'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userAPI } from '@/lib/api';
import { User as UserIcon, Target, BookOpen, Plus, X, Save, MapPin, Globe, FileText, Camera, Calendar, AtSign, Pencil, ChevronDown, ChevronUp, Mail } from 'lucide-react';

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    
    // Profile fields
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [location, setLocation] = useState(user?.location || '');
    const [website, setWebsite] = useState(user?.website || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    
    // Skills
    const [skillsHave, setSkillsHave] = useState<string[]>(user?.skillsHave || []);
    const [skillsWant, setSkillsWant] = useState<string[]>(user?.skillsWant || []);
    const [newSkillHave, setNewSkillHave] = useState('');
    const [newSkillWant, setNewSkillWant] = useState('');
    
    // UI State
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync state when user data loads
    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setBio(user.bio || '');
            setLocation(user.location || '');
            setWebsite(user.website || '');
            setAvatar(user.avatar || '');
            setSkillsHave(user.skillsHave || []);
            setSkillsWant(user.skillsWant || []);
        }
    }, [user]);

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
            await userAPI.updateProfile({ 
                skillsHave, 
                skillsWant,
                displayName,
                bio,
                location,
                website,
                avatar
            });
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

    const getInitials = () => {
        if (displayName) {
            return displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        }
        return user?.username[0].toUpperCase() || 'U';
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Recently';
        return new Date(dateString).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Convert to base64 data URL for preview and storage
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            {/* Profile Header Card */}
            <div className="glass-card rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            {avatar ? (
                                <img 
                                    src={avatar} 
                                    alt="Avatar" 
                                    className="w-24 h-24 rounded-2xl object-cover border-2 border-green-500/30 shadow-lg"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                                    {getInitials()}
                                </div>
                            )}
                            <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <span className="text-xs text-gray-500">Click to change</span>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold text-white">
                                    {displayName || user?.username}
                                </h1>
                                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                                    <AtSign className="w-4 h-4" />
                                    <span>{user?.username}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {formatDate(user?.createdAt)}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-gray-300 hover:text-white text-sm font-medium rounded-xl border border-zinc-700/50 hover:border-green-500/50 transition-all shrink-0"
                            >
                                <Pencil className="w-4 h-4" />
                                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                            </button>
                        </div>
                        
                        {/* Profile Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span>{user?.email}</span>
                            </div>
                            {location && (
                                <div className="flex items-center gap-2 text-gray-400">
                                    <MapPin className="w-4 h-4 text-green-400" />
                                    <span>{location}</span>
                                </div>
                            )}
                            {website && (
                                <a 
                                    href={website.startsWith('http') ? website : `https://${website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span>{website.replace(/^https?:\/\//, '')}</span>
                                </a>
                            )}
                        </div>
                        
                        {bio && (
                            <div className="pt-2 border-t border-zinc-800/50">
                                <p className="text-gray-300 text-sm leading-relaxed">{bio}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-card rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">{skillsHave.length}</div>
                    <div className="text-gray-400 text-sm">Skills I Can Teach</div>
                </div>
                <div className="glass-card rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">{skillsWant.length}</div>
                    <div className="text-gray-400 text-sm">Skills I Want to Learn</div>
                </div>
                <div className="glass-card rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">{skillsHave.length + skillsWant.length}</div>
                    <div className="text-gray-400 text-sm">Total Skills</div>
                </div>
            </div>

            {/* Edit Profile Section */}
            {isEditing && (
            <div className="glass-card rounded-2xl p-6 shadow-xl border border-green-500/20">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                        <UserIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Edit Profile</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Display Name */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your display name"
                            className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="City, Country"
                            className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                    </div>

                    {/* Website */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm text-gray-400 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Website
                        </label>
                        <input
                            type="text"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="https://yourwebsite.com"
                            className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                    </div>

                    {/* Bio - Full Width */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm text-gray-400 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Bio
                            </span>
                            <span className={`text-xs ${bio.length > 450 ? 'text-yellow-400' : 'text-gray-500'}`}>
                                {bio.length}/500
                            </span>
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value.slice(0, 500))}
                            placeholder="Tell others about yourself, your interests, and what you're passionate about..."
                            rows={4}
                            className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                        />
                    </div>

                    {/* Save Profile Button */}
                    <div className="md:col-span-2 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                        <div>
                            {message && (
                                <span className={`text-sm font-medium ${
                                    message.includes('success') ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {message}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-green-500/20"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </div>
            </div>
            )}

            {/* Skills Management */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Skills I Have */}
                <div className="glass-card rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-green-500/10">
                            <Target className="w-5 h-5 text-green-400" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">Skills I Can Teach</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 min-h-25">
                        {skillsHave.length === 0 ? (
                            <div className="w-full text-center text-gray-500 py-8">
                                <p className="text-sm">No skills added yet</p>
                            </div>
                        ) : (
                            skillsHave.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-linear-to-br from-green-500/20 to-emerald-500/20 text-green-300 rounded-lg text-sm border border-green-500/30 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                                >
                                    {skill}
                                    <button
                                        onClick={() => removeSkill('have', skill)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </span>
                            ))
                        )}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newSkillHave}
                            onChange={(e) => setNewSkillHave(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, 'have')}
                            placeholder="Add a skill..."
                            className="flex-1 px-4 py-2.5 bg-zinc-900/50 border border-zinc-800/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                        <button
                            onClick={() => addSkill('have')}
                            className="flex items-center justify-center px-4 py-2.5 bg-linear-to-r from-green-600 to-emerald-600 text-white text-sm rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shrink-0"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Skills I Want */}
                <div className="glass-card rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <BookOpen className="w-5 h-5 text-blue-400" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">Skills I Want to Learn</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 min-h-25">
                        {skillsWant.length === 0 ? (
                            <div className="w-full text-center text-gray-500 py-8">
                                <p className="text-sm">No skills added yet</p>
                            </div>
                        ) : (
                            skillsWant.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-linear-to-br from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                                >
                                    {skill}
                                    <button
                                        onClick={() => removeSkill('want', skill)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </span>
                            ))
                        )}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newSkillWant}
                            onChange={(e) => setNewSkillWant(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, 'want')}
                            placeholder="Add a skill..."
                            className="flex-1 px-4 py-2.5 bg-zinc-900/50 border border-zinc-800/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button
                            onClick={() => addSkill('want')}
                            className="flex items-center justify-center px-4 py-2.5 bg-linear-to-r from-blue-600 to-cyan-600 text-white text-sm rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shrink-0"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Skills Button */}
            <div className="glass-card rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-semibold mb-1">Save Your Skills</h3>
                        <p className="text-gray-400 text-sm">Update your skills to find better matches</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {!isEditing && message && (
                            <span className={`text-sm font-medium ${
                                message.includes('success') ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {message}
                            </span>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-green-500/20"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Saving...' : 'Save Skills'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
