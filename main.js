import Vue from 'vue';
import App from './App';
import store from './store';
import {settokenStore, gettokenStore} from './store/dataCache.js'

// Vue.config.productionTip = false;

Vue.prototype.$store = store;
// toast
Vue.prototype.$showTip = (text) => {
  uni.showToast({
    title: text,
    icon: 'none',
    duration: 2000
  })
}

Vue.prototype.$checkLogin = (url) => {
  if (!gettokenStore()) {
    uni.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 2000,
      success: () => {
        uni.navigateTo({
          url: '/pages/login/login'
        });
      }
    });
  } else {
    uni.navigateTo({
      url: `${url}`
    });
  }
};

const layout = () => {
  console.log('登出');
  settokenStore('');
  uni.navigateTo({
    url: '/pages/login/login'
  });
}
uni.$on('layout', layout)
App.mpType = 'app';
const app = new Vue({
    store,
    ...App
})
app.$mount(()=>{})
