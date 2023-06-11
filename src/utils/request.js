// 对axios进行封装(增强)
import axios from "axios";
//设置服务器地址
// axios.defaults.baseURL = "http://127.0.0.1:5000";

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("在发送请求之前做些什么....", config);
    //从本地存储中取出token
    let token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。

    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;
