<template>
  <view class="view-content">
    <view class="content">
      <view class="title">需求申请</view>
      <view class="upload-list">
        <view class="img" v-for="(item, index) in images" :key="index">
          <image class="imgs" :src="imgUrl+item"></image>
          <view class="delect" @click="delectImg(index)">x</view>
        </view>
        <view class="add" @click="upload"><image src="../../static/images/add-img.png" mode=""></image></view>
      </view>
      <view class="title">选择审核人</view>
      <view class="choose-pick">
        <picker class="picker-st" @change="bindPickerChange" range-key="nickname" :value="selectvalue" :range="list">
          <view class="uni-input">
            <text>{{list[selectvalue].nickname || '请选择审核人'}}</text>
            <view class="icon-arrow"></view>
          </view>
        </picker>
      </view>
    </view>
    <view class="sub" @click="submit">
      立即提交
    </view>
  </view>
</template>

<script>
  import {imgUrl} from '@/service/config/env.js'
  import {uploadFiles} from '@/unit/common.js'
  import {getConfirmPersonnelApi, addNeedsApi} from '@/service/needs.services.js'
  export default {
    data() {
      return {
        imgUrl: imgUrl,
        list: [],
        selectvalue: '',
        images: []
      }
    },
    onShow() {
      this.getList()
    },
    methods: {
      getList () {
        getConfirmPersonnelApi({}).then(res => {
          if (res.data) {
            this.list = res.data
          }
          uni.hideLoading()
        }).catch(err => {
          uni.hideLoading()
        })
      },
      bindPickerChange(e) {
        this.selectvalue = e.target.value
      },
      upload () {
        uploadFiles({success: (res) => {
          let data = JSON.parse(res);
          this.images.push(data.data.src)
        }})
      },
      delectImg (i) {
        this.images.splice(i,1)
      },
      submit () {
        if (this.images.length == 0) {
          this.$showTip('请上传需求图片')
          return false
        } else if (this.selectvalue == '') {
          this.$showTip('请选择审核人')
          return false
        }
        uni.showLoading({
            title: '加载中'
        });
        let params = {
          images: JSON.stringify(this.images),
          confirm_personnel_id: this.list[this.selectvalue].id
        }
        addNeedsApi(params).then(res => {
          this.$showTip(res.msg)
          uni.hideLoading()
          uni.switchTab({
            url: '/pages/myself/index',
          })
        }).catch(err => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.content {
  padding: 44rpx 30rpx 70rpx;
  background-color: #FFFFFF;
  border-bottom-left-radius: 50rpx;
  border-bottom-right-radius: 50rpx;
  box-shadow: 0px 2px 16px rgba(166,182,252,0.3);
  .title {
    font-size: 30rpx;
    color: #20323E;
    margin-bottom: 10rpx;
  }
  .upload-list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 44rpx;
    > * {
      flex-shrink: 0;
    }
    .add {
      width: 81rpx;
      height: 99rpx;
      margin-bottom: 11px;
      margin-right: 8px;
    }
    .img {
      width: 81rpx;
      height: 99rpx;
      position: relative;
      margin-right: 15rpx;
      margin-bottom: 20rpx;
      .imgs {
        border-radius: 10rpx;
      }
      .delect {
        position: absolute;
        right: -15rpx;
        top: -15rpx;
        width: 30rpx;
        height: 30rpx;
        text-align: center;
        line-height: 30rpx;
        border-radius: 50%;
        background-color: rgba(30, 159, 255, 0.1);
        color: #1E9FFF;
        font-size: 20rpx;
      }
    }
      
  }
  .choose-pick {
    width: 100%;
    height: 64rpx;
    line-height: 64rpx;
    border: 1px solid #CAD8E6;
    border-radius: 11rpx;
    .picker-st {
      height: 100%;
      padding: 0 26rpx 0 24rpx;
      .uni-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text {
          font-size: 26rpx;
          color: #20323E;
        }
        .icon-arrow {
          width: 0;                 /*  宽高设置为0，很重要，否则达不到效果 */
          height: 0px;
          border: 10rpx solid #20323E;
          border-bottom-color: transparent;    /* 设置透明背景色 */
          border-left-color: transparent;
          border-right-color: transparent;
          margin-top: 4rpx;
        }
      }
    }
  }
}
.sub {
  margin: 80rpx auto 0;
  width: 605rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #1E9FFF;
  border-radius: 40rpx;
  font-size: 30rpx;
  color: #FFFFFF;
}
</style>
