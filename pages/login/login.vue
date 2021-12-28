<template>
  <view class="login">
    <view class="bg"></view>
    <view class="title">Hi，欢迎登录</view>
    <view class="inpt-box">
      <input class="inpt" type="number" v-model="mobile" maxlength="11" placeholder="请输入手机号" placeholder-style='color:#A6B6C6'/>
      <input class="inpt" type="password" v-model="paw" placeholder="请输入密码" placeholder-style='color:#A6B6C6'/>
      <view class="btn" @click="goLogin">登录</view>
    </view>
  </view>
</template>

<script>
  // import md5 from 'js-md5'
  import {settokenStore, setInfoStore} from '@/store/dataCache.js'
  import {Login} from '../../service/common.services.js'
  export default {
    data() {
      return {
        mobile: '',
        paw: '',
        isLogin: true
      }
    },
    methods: {
      goLogin() {
        if (this.mobile == '') {
          uni.showToast({
            title: '请填写手机号码',
            icon:'none',
            duration: 2000
          });
          return false
        } else if (this.paw === '') {
          uni.showToast({
            title: '请输入密码',
            icon:'none',
            duration: 2000
          });
          return false
        }
        if (this.isLogin === true) {
          this.isLogin = false
          uni.showLoading({
              title: '正在登录'
          });
          let params = {
            username: this.mobile,
            // password: md5(this.paw, 32)
            password: this.paw.replace(/(^\s*)|(\s*$)/g, "")
          }
          Login(params).then(res => {
            this.isLogin = true
            if (~~res.code === 200) {
              settokenStore(res.data.token)
              setInfoStore('userInfo',{
                userType: res.data.user_type
              })
              // 回到上一页
              var pages = getCurrentPages()
              var length = pages.length - 2 > 0 ? pages.length - 2 : 0
              var route = pages[length].route
              if (pages.length >= 2 && route.indexOf('login') === -1) {
                uni.navigateBack({
                  delta: 1
                })
              } else {
                uni.switchTab({
                  url: '/pages/index/index',
                })
              }
              uni.hideLoading()
            }
          }).catch(err => {
            this.isLogin = true
            uni.hideLoading()
          })
        }
        
      }
    }
  }
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background-color: #FFFFFF;
  background-image: url('~@/static/images/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  .title {
    font-size: 60rpx;
    font-weight: bold;
    color: #333333;
    font-family: PingFang SC;
    padding: 264rpx 30rpx 0;
  }
  .inpt-box {
    padding: 50rpx 30rpx 0;
    .inpt {
      margin-bottom: 30rpx;
      height: 100rpx;
      border-radius: 100rpx;
      background-color: #F5F9FB;
      padding-left: 53rpx;
      font-size: 30rpx;
      color: #A6B6C6;
    }
    .btn {
      margin-top: 50rpx;
      height: 100rpx;
      border-radius: 100rpx;
      background: linear-gradient(to bottom, #43AFFF, #1E9FFF);
      text-align: center;
      line-height: 100rpx;
      box-shadow: 0 1px 20rpx rgba(30, 159, 255, .4);
      color: #FFFFFF;
      font-size: 34rpx;
    }
  }
}
</style>
