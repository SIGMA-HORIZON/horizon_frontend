import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

/** Convert the REST API base URL to a WebSocket base URL (http→ws, https→wss). */
export function apiBaseToWsUrl(apiBaseUrl = API_URL) {
    const url = (apiBaseUrl || API_URL).trim();
    if (url.startsWith('https://')) {
        return url.replace('https://', 'wss://');
    }
    if (url.startsWith('http://')) {
        return url.replace('http://', 'ws://');
    }
    return url;
}

export const WS_URL = apiBaseToWsUrl(API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('horizon_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs globales (ex: 401 Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('horizon_token');
            if (typeof window !== 'undefined') {
                window.location.href = '/connexion';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
