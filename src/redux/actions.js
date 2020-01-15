

/**
 * 用来创建action对象的工厂函数模块
 * 同步action
 * 异步action
 * 
 */
import { reqLogin, reqGetCategoryList } from '../api';
import { setItem } from '../utils/storage';


const getCategoryList = categories => ({
    type: 'GET_CATEGORY_LIST',
    data: categories
});
export const getCategoryListAsync = () => {
    return dispatch => {
        // 发送请求
        reqGetCategoryList().then(response => {
            // 触发更新
            dispatch(getCategoryList(response));
        });
    };
};


export const removeUser = () => ({ type: 'REMOVE_USER' })

export const changeLanguage = lang => ({ type: 'CHANGE_LANGUAGE', data: lang });

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