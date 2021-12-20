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


module.exports = {
  getParamByUrl,
  getQueryString,
  IsIOS,
  getLocation
}