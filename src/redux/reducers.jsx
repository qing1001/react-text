
/**
 * 用来根据之前的状态(prevState)生成新状态(newState)函数模块
 * 多个函数的暴露要引用一个combineReducers的方法
 * 通过export default combineReducers调用传一个对象,对象里面传多个redux函数
 */

import { combineReducers } from 'redux'
import {getItem} from '../utils/storage'

//解决刷新是redux没有存储
const initUser = getItem('user') || {};

function user(prevState = initUser, action) {
    switch (action.type) {
        case 'SAVE_USER':
            return action.data;
        default:
            return prevState;
    }
}

function bbb(prevState = 222, action) {
    switch (action.type) {
        default:
            return prevState;
    }
}

export default combineReducers({
    user,
    bbb
})