import React from 'react'
import axios from 'axios'
import { message } from 'antd'


//进行初步的封装axios拦截器
export default function Test() {
    //配置axios拦截器
    //axios.create({})创建axios实例,可以修改axios默认配置
    const axiosInstance = axios.create({
        //修改的配置
        baseURL: '/api', //可放置公共路径
        timeout: 10000, //请求的超时时间,超出时间会自动中断
        //设置公共请求头
        headers: {
            //只能写死
        }

    });


    // 请求拦截器
    axiosInstance.interceptors.request.use(

        config => {
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }

            if (config.method === 'post') {
                //修改请求参数
                //提取对象的所有属性
                const keys = Object.keys(config.data);
                const data = keys
                    .reduce((prev, curr) => {
                        prev += `&${curr}=${config.data[curr]}`;
                        return prev;
                    }, '')
                    .slice(1);
                config.data = data;
                config.headers['content-type'] = 'application/x-www-form-urlencoded';
            }

            return config;
        }
    );

    //响应拦截器统一处理错误
    axiosInstance.interceptors.response.use(
        //请求响应成功
        (response) => {
            if (response.data.status === 0) {
                return response.data.data;
            } else {
                return Promise.reject(response.data.msg);
            }
        },
        //请求响应失败
        (err) => {
            const errCode = {
                401: '没有权限访问当前接口',
                403: '禁止访问当前接口',
                404: '未找到当前资源',
                500: '服务器发生未知错误,请联系管理员'
            }
            let errMessage = '';
            if (err.response) {
                //受到响应
                errMessage = errCode[err.response.status];
            } else {
                if (err.message.indexOf('Network Error') !== -1) {
                    errMessage = '网络链接失败,请一会在式'
                } else if (err.message.indexOf('timeout') !== -1) {
                    errMessage = '网络链接超时,请一会在式'
                }
            }
            return Promise.reject(errMessage || '发生未知错误,请联系管理员')
        }

    );

    let token = '';
    let id = '';
    const handleClick1 = () => {
        axiosInstance({
            method: 'POST',
            url: '/login',
            data: {
                username: 'admin',
                password: 'admin'
            }
        })
            .then(
                response => {

                    token = response.token;
                    message.success('登录成功');

                    // if (response.data.status === 0) {
                    //     //除了登录页面其他都需要令牌token
                    //     // console.log(response.data);
                    //     token = response.data.data.token;

                    //     message.success('登录成功');
                    // } else {
                    //     message.error(response.data.msg)
                    // }
                }
            )
            .catch(
                err => {
                    console.log(err);
                    message.error(err)
                }

            )
    }
    const handleClick2 = () => {
        axiosInstance({
            method: 'POST',
            url: '/category/add',
            data: {

                categoryName: '水果',

            }

        })
            .then(
                response => {
                    id = response.data.data._id
                    message.success('添加成功');
                    // if (response.data.status === 0) {
                    //     id = response.data.data._id
                    //     message.success('添加成功')
                    // } else {
                    //     message.error(response.data.msg)
                    // }
                }
            )
            .catch(
                err => {
                    console.log(err);
                    message.error(err)
                }

            )
    }
    const handleClick3 = () => {
        axiosInstance({
            method: 'POST',
            url: '/category/delete',
            data: {

                categoryId: id,
            }

        })
            .then(
                response => {
                    message.success('删除分类成功')
                    // if (response.data.status === 0) {

                    //     message.success('删除分类成功')
                    // } else {
                    //     message.error(response.data.msg)
                    // }
                }
            )
            .catch(
                err => {
                    console.log(err);
                    message.error(err)
                }

            )
    }

    return (
        <div>
            <button onClick={handleClick1}>按钮1</button>
            <button onClick={handleClick2}>按钮2</button>
            <button onClick={handleClick3}>按钮3</button>
        </div>
    );

}

/*
export default function Test() {
    let token = '';
    let id = '';
    const handleClick1 = () => {
        axios({
            method: 'POST',
            url: '/api/login',
            data: {
                username: 'admin',
                password: 'admin'
            }
        })
            .then(
                response => {
                    if (response.data.status === 0) {
                        //除了登录页面其他都需要令牌token
                        // console.log(response.data);
                        token = response.data.data.token;

                        message.success('登录成功');
                    } else {
                        message.error(response.data.msg)
                    }
                }
            )
            .catch(
                err => {
                    console.log(err);
                    message.error('网络错误')
                }

            )
    }
    const handleClick2 = () => {
        axios({
            method: 'POST',
            url: '/api/category/add',
            data: {

                categoryName: '水果',

            },
            headers: {

                authorization: `Bearer ${token}`
            }
        })
            .then(
                response => {
                    if (response.data.status === 0) {
                        id = response.data.data._id
                        message.success('添加成功')
                    } else {
                        message.error(response.data.msg)
                    }
                }
            )
            .catch(
                err => {
                    console.log(err);
                    message.error('网络错误')
                }

            )
    }
    const handleClick3 = () => {
        axios({
            method: 'POST',
            url: '/api/category/delete',
            data: {

                categoryId: id,

            },
            headers: {

                authorization: `Bearer ${token}`
            }
        })
            .then(
                response => {
                    if (response.data.status === 0) {

                        message.success('删除分类成功')
                    } else {
                        message.error(response.data.msg)
                    }
                }
            )
            .catch(
                err => {
                    console.log(err);
                    message.error('网络错误')
                }

            )
    }

    return (
        <div>
            <button onClick={handleClick1}>按钮1</button>
            <button onClick={handleClick2}>按钮2</button>
            <button onClick={handleClick3}>按钮3</button>
        </div>
    );

}



*/