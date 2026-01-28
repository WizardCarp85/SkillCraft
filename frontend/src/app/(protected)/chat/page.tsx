'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { chatAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { initSocket, getSocket } from '@/lib/socket';
import { MessageCircle, Send } from 'lucide-react';

interface Conversation {
    connectionId: string;
    otherUser: {
        _id: string;
        username: string;
        email: string;
    };
    skillOffered: string;
    skillRequested: string;
    lastMessage: {
        content: string;
        createdAt: string;
        isFromMe: boolean;
    } | null;
    unreadCount: number;
}

interface Message {
    _id: string;
    sender: {
        _id: string;
        username: string;
    };
    content: string;
    createdAt: string;
}

export default function ChatPage() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user) {
            initSocket(user.id);
            fetchConversations();
        }
    }, [user]);

    useEffect(() => {
        const socket = getSocket();
        if (socket) {
            socket.on('receiveMessage', (message: Message) => {
                if (selectedConversation) {
                    setMessages((prev) => [...prev, message]);
                }
                fetchConversations(); // Update unread counts
            });
        }

        return () => {
            socket?.off('receiveMessage');
        };
    }, [selectedConversation]);

    useEffect(() => {
        // Auto-select conversation from URL param
        const connectionId = searchParams.get('connection');
        if (connectionId && conversations.length > 0) {
            const conv = conversations.find((c) => c.connectionId === connectionId);
            if (conv) {
                selectConversation(conv);
            }
        }
    }, [searchParams, conversations]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const response = await chatAPI.getConversations();
            setConversations(response.data);
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const selectConversation = async (conversation: Conversation) => {
        setSelectedConversation(conversation);
        try {
            const response = await chatAPI.getMessages(conversation.connectionId);
            setMessages(response.data);
            await chatAPI.markAsRead(conversation.connectionId);
            fetchConversations(); // Update unread counts
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedConversation || !user) return;

        setSending(true);
        try {
            const response = await chatAPI.sendMessage({
                connectionId: selectedConversation.connectionId,
                receiverId: selectedConversation.otherUser._id,
                content: newMessage,
            });

            setMessages((prev) => [...prev, response.data]);
            setNewMessage('');

            // Emit via socket for real-time
            const socket = getSocket();
            socket?.emit('sendMessage', {
                receiverId: selectedConversation.otherUser._id,
                message: response.data,
            });
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setSending(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)]">
            <div className="glass-card rounded-2xl h-full flex overflow-hidden shadow-xl">
                {/* Conversations List */}
                <div className="w-80 border-r border-white/10 flex flex-col">
                    <div className="p-4 border-b border-white/10">
                        <h2 className="text-lg font-semibold text-white">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.length === 0 ? (
                            <div className="p-4 text-center text-gray-400">
                                <p>No conversations yet</p>
                                <p className="text-sm mt-2">Accept a connection to start chatting!</p>
                            </div>
                        ) : (
                            conversations.map((conv) => (
                                <button
                                    key={conv.connectionId}
                                    onClick={() => selectConversation(conv)}
                                    className={`w-full p-4 text-left hover:bg-white/10 transition-colors border-b border-white/5 ${
                                        selectedConversation?.connectionId === conv.connectionId
                                            ? 'bg-white/10'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg">
                                            {conv.otherUser.username[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-white font-medium truncate">
                                                    {conv.otherUser.username}
                                                </h3>
                                                {conv.unreadCount > 0 && (
                                                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow-lg">
                                                        {conv.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-400 text-sm truncate">
                                                {conv.lastMessage
                                                    ? conv.lastMessage.content
                                                    : `${conv.skillOffered} ↔ ${conv.skillRequested}`}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {selectedConversation.otherUser.username[0].toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">
                                        {selectedConversation.otherUser.username}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {selectedConversation.skillOffered} ↔ {selectedConversation.skillRequested}
                                    </p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.length === 0 ? (
                                    <div className="text-center text-gray-400 mt-8">
                                        <p>No messages yet</p>
                                        <p className="text-sm">Say hello to start the conversation!</p>
                                    </div>
                                ) : (
                                    messages.map((message) => (
                                        <div
                                            key={message._id}
                                            className={`flex ${
                                                message.sender._id === user?.id ? 'justify-end' : 'justify-start'
                                            }`}
                                        >
                                            <div
                                                className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                                                    message.sender._id === user?.id
                                                        ? 'bg-green-600 text-white rounded-br-md shadow-lg'
                                                        : 'bg-white/10 text-white rounded-bl-md shadow-lg'
                                                }`}
                                            >
                                                <p>{message.content}</p>
                                                <p className={`text-xs mt-1 ${
                                                    message.sender._id === user?.id
                                                        ? 'text-green-200'
                                                        : 'text-gray-400'
                                                }`}>
                                                    {formatTime(message.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-white/10">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={sending || !newMessage.trim()}
                                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-all disabled:opacity-50 shadow-lg"
                                    >
                                        <Send className="w-4 h-4" />
                                        {sending ? '...' : 'Send'}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <div className="inline-flex p-4 rounded-full bg-zinc-900/50 mb-4">
                                    <MessageCircle className="w-12 h-12 text-gray-500" />
                                </div>
                                <p>Select a conversation to start chatting</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
