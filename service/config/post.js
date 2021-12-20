import { ApiUrl } from './env.js'
import { gettokenStore } from '../../store/dataCache.js';

const post = (url, data) => {
  // let sign = '';
  let token = gettokenStore();
  if (!data.token) {
    data.token = token;
  }
  // if (data.sign) {
  //   delete data.sign;
  // }
  
  // for(let d in data) {
  //   if (data[d] !== null && data[d] !== undefined) {
  //     if (typeof data[d] === 'string') {
  //       data[d] = data[d].trim();
  //     }
  //     sign = sign + `${d}=${data[d]}&`;
  //   } else {
  //     delete data[d.toString()];
  //   }
  // }
  // sign = sign.substring(0, sign.length - 1);
  // console.log(sign, 'sign');
  // const crypto = require('crypto');
  // const hash = crypto.createHash('md5');
  // hash.update(sign);
  // data.sign = hash.digest('hex');
  var baseUrl = ApiUrl + url;
  var options = {
    url: baseUrl,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    data: data
  };
  console.log(data, 'datas')
  return new Promise((resolve, reject) => {
    options.complete = (response) => {
      let statusCode = response.statusCode;
      if (statusCode === 200) {
        if (~~response.data.code === 200) {
          resolve(response.data);
        } else if (~~response.data.code === 999) {
          uni.showToast({
            title: '请先登录',
            duration: 3000,
            icon: 'none'
          });
          uni.$emit('layout');
          // 去登陆 全局拦截
        } else {
          uni.showToast({
            title: response.data.msg,
            duration: 3000,
            icon: 'none'
          });
          reject(response.data);
        }
      } else {
        reject(response.data);
        if (statusCode) {
          switch (statusCode) {
            // 参数错误
            case 400:
              response.data.message = '请求参数错误！';
              break;
            // 未登录
            case 401:
              response.data.message = '未授权，请登录！';
              break;
            // 禁止访问
            case 403:
              response.data.message = '禁止访问！';
              break;
            // 资源不存在
            case 404:
              response.data.message = '资源不存在！';
              break;
            // 资源不存在
            case 408:
              response.data.message = '请求超时！';
              break;
            // 服务器内部错误
            case 500:
              response.data.message = '服务器内部错误！';
              break;
            // 其他错误，直接抛出错误
            default:
              response.data.message = response.data.message || '网络异常!';
          }
        } else {
          response.data = response.data || {};
          response.data.message = '网络异常!';
        }
        uni.showToast({
          title: response.data.message,
          duration: 3000,
          icon: 'none'
        });
      }
    }
    uni.request(options);
  })
};
export {
  post
}