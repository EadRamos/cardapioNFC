import axios from '../services/api.js';
import { defineStore } from 'pinia';

const authStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        tokenClient: localStorage.getItem('tokenClient') || null,
        tag: localStorage.getItem('tag') || null
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post('/login', credentials);
                const { token } = response.data;

                localStorage.setItem('token', token);

                this.token = token;

                
            } catch (error) {
                console.error('Login error: ', error);
                throw error;
            }
        },

        async loginClient(tag) {
            try {
                
                await axios.post('/login/client', {tag})
                .then((response) => {
                  
                    if(response.data.tag) {
                        const { tokenClient, tag } = response.data;

                        localStorage.setItem('tokenClient', tokenClient);
                        localStorage.setItem('tag', tag);

                        this.tokenClient = tokenClient;
                        this.tag = tag;
                    }

                    return true;
                })
                .catch ((error) => {
                    console.error('Login client error: ', error);
                    throw error;
                })
            } catch (error) {
                console.error('Login client error: ', error);
                throw error;
            }
        },

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenClient');
            localStorage.removeItem('tag');

            this.token = null;
            this.tokenClient = null;
            this.tag = null;
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
        isClientLoggedIn: (state) => !!state.tokenClient,
    },
});

export default authStore;