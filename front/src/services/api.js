import axios from 'axios';
import authStore from '@/store/auth.js';

const api = axios.create({
    baseURL: import.meta.env.BACK_API || 'http://localhost:8001/',
    timeout: 5000,
});

api.interceptors.request.use(( header ) => {
    const auth = authStore();

    if (auth.isLoggedIn) header.headers.Authorizattiton = `Bearer ${auth.token}`;
    if (auth.isClientLoggedIn) header.headers.AuthorizattitonClient = Authorizattiton = `Bearer ${auth.clientToken}`;

    return header;
}, error => {
   
    return Promise.rejact(error);
});

api.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status === 401) {
            console.error('Token expired');
            localStorage.removeItem('token');
            localStorage.removeItem('tokenClient');
            //window.location.href = '/';
        }

        return error;
    }
);

export default api;