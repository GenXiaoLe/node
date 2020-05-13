import Vue from 'vue'
import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }
)

api.interceptors.response.use(
    response => {
        const { data } = response;

        return data;
    }
)

Vue.prototype.$http = api;

export const http = api;