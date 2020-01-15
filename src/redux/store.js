/**
 * 用来创建store对象
 * applyMiddleware   异步中间件
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

//开发调试工具,只有开发时才使用
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers';

//向外暴露传reducers函数
export default createStore(reducers, process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk));