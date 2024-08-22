import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:7213',
});
instance.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
