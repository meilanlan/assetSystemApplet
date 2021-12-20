<template>
  <view class="view-content">
    <view class="tab-list">
      <view class="box" :class="['box-'+(index+1), curStatus == item.id ? 'active' : '' ]" v-for="(item,index) in stArr" :key="item.id" @click="switchTab(item.id)">
        {{item.name}}
      </view>
      <view class="line" :style="tabStyle"></view>
    </view>
    <view class="list">
      <view class="item-box" v-for="item in 20" :key="item" @click="gotoPage(item)">
        <view class="title">
          <view class="l">
            <image src="../../static/images/book.png"></image>
            <text>项目名称</text>
          </view>
          <view class="r err">调拨</view>
        </view>
        <view class="swiper-body">
          <view>调拨单号：YT2021050501</view>
          <view>申请日期：2021-09-09 20:45:09</view>
          <view>由xxx物资经理提交 <text>处理中</text></view>
        </view>
        <view class="reason">
          <image src="../../static/images/reason.png" mode=""></image>
          <text>
            报废原因：休息休是休息休息休是休息休息休是休息休息休是休息休息休是休息休息休是休息
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        curStatus: 1,
        tabStyle: {
          left: '18%'
        },
        styleNum: {
          1: '18%',
          2: '49%',
          3: '80%'
        },
        stArr: [
          {id: 1, name: '待审批'},
          {id: 2, name: '已审批'},
          {id: 3, name: '已驳回'},
        ]
      }
    },
    onLoad(option) {
      this.curStatus = option.st || 1;
      this.tabStyle.left = this.styleNum[this.curStatus];
    },
    methods: {
      gotoPage(item) {
        uni.navigateTo({
          url: `/pages/myself/manage-detail?id=${item}`
        })
      },
      switchTab(id) {
        if (this.curStatus != id) {
          this.curStatus = id;
          this.tabStyle.left = this.styleNum[id];
        }
      }
      
    }
  }
</script>

<style scoped lang="scss">
.tab-list {
  position: fixed;
  top: 88rpx;
  left: 0;
  width: 100%;
  height: 89rpx;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 30rpx;
  box-sizing: border-box;
  background-color: #FAFAFA;
  z-index: 2;
  >* {
    flex-shrink: 0;
  }
  .box {
    width: 33.33%;
    text-align: center;
    font-size: 30rpx;
    color: #20323E;
    font-weight: bold;
    line-height: 42rpx;
    position: relative;
    &.box-1::after,
    &.box-2::after{
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 21rpx;
      width: 1px;
      background-color: #CAD8E6;
    }
    &.active {
      color: #1E9FFF;
    }
  }
  .line {
    width: 18rpx;
    height: 3rpx;
    background: #1E9FFF;
    border-radius: 2rpx;
    position: absolute;
    bottom: 0;
    left: 18%;
    transition: all 800ms;
  }
}
.list {
  margin-top: 128rpx;
  .item-box {
    width: 661rpx;
    // height: 222rpx;
    background-color: #FFFFFF;
    border-radius: 20rpx;
    padding: 0 22rpx 0;
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
}
</style>
