<template>
  <view class="view-content">
    <view class="item-box" v-for="item in 20" :key="item">
      <view class="title">
        <view class="l">
          <image src="../../static/images/book.png"></image>
          <text>项目名称</text>
        </view>
        <view class="r">未确认</view>
      </view>
      <view class="swiper-body">
        <view>调拨单号：YT2021050501</view>
        <view>申请日期：2021-09-09 20:45:09</view>
        <view>由xxx物资经理提交 <text>处理中</text></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
.view-content {
  padding: 30rpx 0 40rpx;
}
.item-box {
  width: 661rpx;
  // height: 222rpx;
  background-color: #FFFFFF;
  border-radius: 20rpx;
  padding: 0 22rpx 7rpx;
  margin: 0 auto 20rpx;
  .title {
    height: 96rpx;
    padding: 0 15rpx 0 18rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #F2F5F7;
    >* {
      flex-shrink: 0;
    }
    .l {
      display: flex;
      align-items: center;
      image {
        width: 24rpx;
        height: 26rpx;
        margin-right: 16rpx;
      }
      text {
        color: #333333;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    .r {
      line-height: 60rpx;
      color: #1E9FFF;
      font-size: 28rpx;
      &.err {
        color: #FF5722;
      }
    }
  }
  .swiper-body {
    padding: 23rpx 20rpx 0;
    color: #A6B6C6;
    font-size: 24rpx;
    >view {
      line-height: 33rpx;
      margin-bottom: 18rpx;
    }
    text {
      display: inline-block;
      margin-left: 13rpx;
      width: 81rpx;
      height: 35rpx;
      line-height: 35rpx;
      background: rgba(30, 159, 255, 0.26);
      border-radius: 6rpx;
      text-align: center;
      font-size: 20rpx;
      color: #1E9FFF;
    }
  }
  .reason {
    border-top: 1px solid #F2F5F7;
    padding: 29rpx 13rpx 28rpx;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    >*{
      flex-shrink: 0;
      display: block;
    }
    image {
      width: 23rpx;
      height: 23rpx;
      margin-right: 13rpx;
      margin-top: 6rpx;
    }
    text {
      width:91%;
      font-size: 24rpx;
      color: #FF5722;
    }
  }
}
</style>
