import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Auth API
export const authAPI = {
    register: (data: { username: string; email: string; password: string }) =>
        api.post('/auth/register', data),
    
    login: (data: { username: string; password: string }) =>
        api.post('/auth/login', data),
};

// User API
export const userAPI = {
    getMyProfile: () => api.get('/users/me'),
    
    updateProfile: (data: { skillsHave: string[]; skillsWant: string[] }) =>
        api.put('/users/profile', data),
    
    getMatches: () => api.get('/users/matches'),
    
    getUserById: (id: string) => api.get(`/users/${id}`),
};

// Connection API
export const connectionAPI = {
    sendRequest: (data: { receiverId: string; skillOffered: string; skillRequested: string }) =>
        api.post('/connections', data),
    
    getReceivedRequests: () => api.get('/connections/received'),
    
    getSentRequests: () => api.get('/connections/sent'),
    
    getActiveConnections: () => api.get('/connections/active'),
    
    respondToRequest: (connectionId: string, status: 'accepted' | 'rejected') =>
        api.put(`/connections/${connectionId}`, { status }),
};

// Chat API
export const chatAPI = {
    sendMessage: (data: { connectionId: string; receiverId: string; content: string }) =>
        api.post('/chat/send', data),
    
    getMessages: (connectionId: string) => api.get(`/chat/${connectionId}`),
    
    getConversations: () => api.get('/chat/conversations'),
    
    getUnreadCount: () => api.get('/chat/unread'),
    
    markAsRead: (connectionId: string) => api.put(`/chat/${connectionId}/read`),
};

export default api;
