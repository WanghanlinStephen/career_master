import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.auto-resume.site/',
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // token 过期或无效
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default instance; 