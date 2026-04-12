import api from '../utils/api';

export interface LoginResponse {
    access_token: string;
    token_type: string;
    must_change_pwd: boolean;
    role: string;
}

export const authService = {
    login: async (identifier: string, password: string): Promise<LoginResponse> => {
        // Note: Le backend attend 'username'. Souvent dans Horizon, l'email est utilisé ou le début de l'email.
        // Pour l'instant, on envoie identifer tel quel dans le champ 'username' attendu par le backend.
        const response = await api.post<LoginResponse>('/auth/login', {
            username: identifier,
            password: password,
        });

        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('must_change_pwd', String(response.data.must_change_pwd));
        }

        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('must_change_pwd');
        localStorage.removeItem('user');
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    submitAccountRequest: async (data: any) => {
        const response = await api.post('/accounts/request', data);
        return response.data;
    }
};
