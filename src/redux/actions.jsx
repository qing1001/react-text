

/**
 * 用来创建action对象的工厂函数模块
 * 同步action
 * 异步action
 * 
 */
import { reqLogin } from '../api';
import { setItem } from '../utils/storage';

const saveUser = user => ({ type: 'SAVE_USER', data: user });

export const saveUserAsync = (username, password) => {
    return (dispatch) => {
        //异步代码
        return reqLogin(username, password)
            .then(
                (response) => {
                    setItem('user', response);
                    //触发更新
                    dispatch(saveUser(response));

                }
            );

    }
}