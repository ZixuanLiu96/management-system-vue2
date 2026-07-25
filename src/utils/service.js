import axios from "axios";
import { Message } from "element-ui";
const service = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

//请求拦截器
service.interceptors.request.use((req) => {
  if (sessionStorage.getItem("token")) {
    req.headers.token = sessionStorage.getItem("token");
  }
  return req;
});

//响应拦截器
service.interceptors.response.use((res) => {
  const result = res.data;
  if (result.success) {
    // Message({ message: result.message, type: "success" });
    return result;
  } else {
    //不成功的操作
    Message({ message: result.message || "请求错误", type: "error" });
    // 如果获取信息失败，主动调用promise对象的reject方法，以免再正式发请求的时候自动调用then方法
    return Promise.reject(new Error(result.message || "请求错误"));
  }
});

export default service;
