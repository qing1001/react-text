//封装请求功能函数
import axiosInstance from './request';


//登录
export const reqLogin = (username, password) => {
    return axiosInstance({
        url: '/login',
        method: 'POST',
        data: {
            username,
            password
        }
    });
};


//分类
export const reqGetCategoryList = () => {
    return axiosInstance({
        url: '/category/get',
        method: 'GET'
    });
}