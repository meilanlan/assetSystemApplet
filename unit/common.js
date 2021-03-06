import { gettokenStore } from '@/store/dataCache.js'
import {ApiUrl} from '@/service/config/env.js'
let jswx = '';

// 获取url携带的参数
const getParamByUrl = () => {
  var listParam = '';
  var listParamArr = '';
  var listParamObj = {};
  var url = window.location.href;
  listParam = url.split('?');
  if (listParam.length > 1) {
    listParam.shift();
    var listParam2 = decodeURIComponent(listParam.join());
    listParamArr = listParam2.split('&');
    listParamArr.forEach(function (ele) {
      var temp = ele.split('=');
      listParamObj[temp[0]] = temp[1];
    });
  }
  return listParamObj;
};

// 获取某一个参数
const getQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

// 判断是否Ios
const IsIOS = () => {
  const u = window.navigator.userAgent;
  return u.indexOf('iPhone') > -1 || u.indexOf('Mac OS') > -1;
};

// 获取当前经纬度
const getLocation = () => {
  var obj = '';
  uni.getLocation({
    type: 'wgs84',
    success: (res) => {
      obj = JSON.stringify(res);
      console.log(obj);
    },
    fail: (res) => {
      obj = JSON.stringify(res);
    },
    complete: (res) => {
      obj = JSON.stringify(res);
    }
  });
  return obj;
};

const uploadFiles = opt => {
  opt = opt || {};
  opt.url = opt.url || '/project/needsUpload';
  opt.name = opt.name || 'file'; // 文件对应的key,开发者在服务器端通过这个key可以获取到文件二进制内容
  opt.success = opt.success || function () {};
  uni.getStorage({
    key: 'token',
    success (res) {
      if (!res.data) {
        uni.showToast({
          title: '请先登录！',
          icon: 'none',
          success: () => {
            uni.navigateTo({
              url: '/pages/login/login'
            });
          }
        });
      } else {
        uni.chooseImage({
          count: 1,
          type: 'image',
          sizeType: ['copressed'],
          sourceType: ['album', 'camera'], //从相册选择、摄像头
          success (res) {
            // 因为有一张图片， 输出下标[0]， 直接输出地址
            let imgFiles = res.tempFilePaths[0];
            // 上传图片
            // 做成一个上传对象
            let gettoken = gettokenStore();
            uni.showLoading({
                title: '加载中'
            });
            uni.uploadFile({
              url: ApiUrl + opt.url + '?token=' + gettoken,
              fileType: 'image',
              filePath: imgFiles,
              name: opt.name,
              success (res) {
                console.log(res, 'success')
                opt.success(res.data);
              },
              fail (res) {
                console.log(res, 'fail')
                uni.showToast({
                  title: '请稍后重试'
                });
              }
            });
            uni.hideLoading()
          }
        });
      }
    }
  })
}

module.exports = {
  getParamByUrl,
  getQueryString,
  IsIOS,
  getLocation,
  uploadFiles
}