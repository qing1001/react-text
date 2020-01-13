//封装localStorage工具函数库
const localStorage = window.localStorage;

//获取数据
export function getItem(key) {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

//保存数据
export function setItem(key, value) {
    // 转换成json字符串
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

//删除数据
export function removeItem(key) {
    localStorage.removeItem(key);
}
