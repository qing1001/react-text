import axios from 'axios';
import errCode from '../config/error-code';

//创建axios实例
const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {

    }
})

//请求拦截器(设置公共参数)
axiosInstance.interceptors.request.use(config => {
    let token = '';

    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    if (config.method === 'post') {
        config.data = Object.keys(config.data)
            .reduce((p, c) => {
                p += `&${c}=${config.data[c]}`;
                return p;
            }, '')
            .slice(1);
        config.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    return config;
});

// 响应拦截器,根据不同的错误返回不同的错误提示
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data.status === 0) {
            return response.data.data;
        } else {
            return Promise.reject(response.data.msg);
        }
    },
    (err) => {
        let errMessage = '';

        if (err.response) {
            // 接受到响应了,
            errMessage = errCode[err.response.status];
        } else {
            if (err.message.indexOf('Network Error') !== -1) {
                errMessage = '网络连接失败，请重新连接网络试试';
            } else if (err.message.indexOf('timeout') !== -1) {
                errMessage = '网络连接超时，请稍后在尝试';
            }
        }

        return Promise.reject(errMessage || '发生未知错误，请联系管理员~');
    }
);

export default axiosInstance;
