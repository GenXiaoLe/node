import axios from 'axios';

const http = axios.create({
    // baseURL: 'http://localhost:8080/',
    withCredentials: true,
})

//http request 拦截器
http.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//http response 拦截器
http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)

export { http };
export default {
    install: (Vue) => {
        Vue.prototype.$http = http;
    }
}

