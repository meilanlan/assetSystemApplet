<template>
  <view class="view-content">
    <view class="content">
      <view class="textarea">
        <textarea class="text" v-model="confirm_remark" maxlength="-1" placeholder="请输入审批意见" placeholder-style='color:#A6B6C6;fontSize:28rpx' />
      </view>
      <image class="line" src="../../static/images/bg-2.png" mode=""></image>
      <view class="sub">
        <view class="box" @click="confrim">
          确认同意
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {setInfoStore,getInfoStore} from '@/store/dataCache.js'
  import {allocationConfrimApi, scrapConfrimApi, needsConfrimApi} from "@/service/user.services.js"
  export default {
    data() {
      return {
        confirm_remark: '',
        params: {},
        type: '',
        apiUrl: '',
      }
    },
    onLoad(option) {
      //type: 1===>调拨申请提交   2===>报废申请提交   3===>需求申请提交
      this.type = option.type
    },
    onShow() {
      this.params = getInfoStore('verifyInfo')
      console.log(this.params,'params')
      let arr = [allocationConfrimApi, scrapConfrimApi, needsConfrimApi];
      this.apiUrl = arr[this.type]
      console.log(this.type, this.apiUrl)
    },
    methods: {
      confrim() {
        console.log(this.confirm_remark)
        if (this.confirm_remark == '') {
          this.$showTip('请输入审批意见')
          return false
        }
        let p = {
          ...this.params,
          confirm_remark: this.confirm_remark,
        }
        
        this.apiUrl(p).then(res => {
          this.$showTip(res.msg)
          setTimeout(() => {
            uni.removeStorageSync('verifyInfo');// 清除审核信息
            uni.navigateTo({
              url: '/pages/myself/manage-list?st=2'
            })
          },500)
          
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.view-content {
  padding: 50rpx 0;
  height: 100vh;
  box-sizing: border-box;
  .content {
    height: 100%;
    width: 690rpx;
    margin: 0 auto;
    .textarea {
      font-size: 28rpx;
      height: 66%;
      padding: 40rpx;
      background-color: #FFFFFF;
      .text {
        height: 100%;
      }
    }
    .line {
      width: 100%;
      height: 142rpx;
    }
    .sub {
      width: 100%;
      padding: 0 0 50rpx;
      background-color: #FFFFFF;
      .box {
        width: 605rpx;
        height: 80rpx;
        line-height: 80rpx;
        background: #1E9FFF;
        border-radius: 40rpx;
        margin: -10rpx auto 0;
        text-align: center;
        color: #ffffff;
        font-size: 30rpx;
      }
    }
  }
  
}
</style>
