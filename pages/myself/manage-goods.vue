<template>
  <view class="view-content">
    <view class="box-bg"></view>
    <view class="box-top"></view>
    <view class="content-box">
      <view v-for="item in [1,2,3]" :key="item">
        <view class="header" :class="item>1?'header-1':''">
          <view class="header-box">
            <view class="l">
              <image src="../../static/images/goods-1.png" mode=""></image>
              <text>物资编号：WZ2021090900000123</text>
            </view>
            <view class="r">椅子</view>
          </view>
        </view>
        <view class="content-text">
          <view class="li">
            <text>项目名称：</text>
            <text>xxxxxxxxxx项目</text>
          </view>
          <view class="li">
            <text>品牌：</text>
            <text>小米</text>
          </view>
          <view class="li">
            <text>规格型号：</text>
            <text>xxxl23330303</text>
          </view>
          <view class="li">
            <text>物资来源：</text>
            <text>采购</text>
          </view>
          <view class="li">
            <text>计量单位：</text>
            <text>把</text>
          </view>
          <view class="li">
            <text>物资数量：</text>
            <text>12323</text>
          </view>
          <view class="li">
            <text>物资单价：</text>
            <text>￥234.00</text>
          </view>
          <view class="li">
            <text>物资总价：</text>
            <text>￥88883.90</text>
          </view>
          <view class="li">
            <text>源物资时间：</text>
            <text>2021-09-09 23:09:09</text>
          </view>
          <view class="li">
            <text>创建时间：</text>
            <text>2021-09-09 23:09:09</text>
          </view>
          <view class="li">
            <text>用途介绍：</text>
            <text>拍摄现场平面图拍摄现场平面图拍摄现场拍摄现场平面图拍摄现场平面图拍摄现场拍摄现场平面图拍摄现场平面图拍摄现场拍摄现场平面图拍摄现场平面图拍摄现场</text>
          </view>
        </view>
        <view class="content-bg-1" v-show="item!=[1,2,3].length"></view>
      </view>
    </view>
    <view class="content-bg-2"></view>
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
  padding: 52rpx 20rpx;
  position: relative;
}
.box-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 340rpx;
  background: linear-gradient(to bottom, #2b87eb, #fafafa);
  z-index: -1;
}
.box-top {
  margin: 0 auto;
  width: 711rpx;
  height: 29rpx;
  background-color: #1E8CEB;
  box-shadow: 0rpx 3rpx 6rpx rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 100rpx;
}
.content-box {
  margin: -14.5rpx auto 0;
  width: 682rpx;
  // box-shadow: 0rpx 3rpx 10rpx rgba(167, 167, 167, 0.16);
  border-radius: 0px 0px 10rpx 10rpx;
  color: #778CA2;
  font-size: 24rpx;
  box-sizing: border-box;
  .header {
    padding: 45rpx 0 0;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    // box-shadow: 3rpx 0 10rpx rgba(167, 167, 167, 0.16);
    color: #20323E;
    font-size: 26rpx;
    .header-box {
      padding: 0 21rpx;
      height: 80rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #F2F5F7;
    }
    &.header-1 {
      padding: 0;
    }
    >* {
      flex-shrink: 0;
    }
    .l {
      display: flex;
      align-items: center;
      image {
        width: 30rpx;
        height: 31rpx;
      }
      text {
        margin-left: 5rpx;
        font-weight: bold;
      }
    }
    .r {
      font-weight: bold;
    }
  }
  .content-text {
    padding: 27rpx 30rpx 0 21rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 3rpx 8rpx rgba(167, 167, 167, .16);
    .li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 21rpx;
      >* {
        flex-shrink: 0;
      }
      text {
        width: 486rpx;
        text-align: right;
      }
      text:first-of-type {
        width: 147rpx;
        text-align: left;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .content-bg-1 {
    margin-top: -4rpx;
    width: 100%;
    height: 142rpx;
    background: url('../../static/images/bg-2.png') no-repeat;
    background-size: 100% 100%;
  }
}
.content-bg-2 {
  width: 682rpx;
  height: 105rpx;
  margin: 0 auto;
  background: url(../../static/images/bg-1.png) no-repeat;
  background-size: 100% 100%;
}
</style>
