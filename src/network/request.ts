import axios, { AxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:19999/';
export { baseURL };

export function request(options: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    // 创建axios实例
    const instance = axios.create({
      baseURL,
      timeout: 5000
      // 带上cookies
      //withCredentials: true // 带 cookies 必须要 cors 跨域
    });

    // 请求拦截,在 headers 上加上 token
    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        // 请求错误时
        console.error('请求失败', err);
        return Promise.reject(err); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // // 响应拦截
    // instance.interceptors.response.use(
    //   (response) => {
    //     // 必须返回
    //     let data;
    //     if (response.data == undefined) {
    //       data = JSON.parse(response.request.responseText);
    //     } else {
    //       data = response.data;
    //     }

    //     console.log(data);

    //     return data;
    //   },
    //   (err) => {
    //     return Promise.reject(err);
    //   }
    // );

    // // 发送网络请求，返回一个 promise
    // return instance(config)
    // 请求处理
    instance(options)
      .then((response) => {
        // 必须返回
        let data;
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText);
        } else {
          data = response.data;
        }
        resolve(data);
        // resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
