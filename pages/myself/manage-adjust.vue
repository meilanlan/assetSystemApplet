<template>
  <view class="view-content">
    <scroll-view
      scroll-y="true" 
      class="list_scroll"
      @scrolltolower="lower" 
    >
      <view class="item-box" v-for="item in list" :key="item.id" @click="toDetail(item)">
        <view class="title">
          <view class="l">
            <image src="../../static/images/book.png"></image>
            <text>{{item.to_project_name}}</text>
          </view>
          <view :class="['r', item.apply_confirm_status == '待确认'? 'no' : '', item.apply_confirm_status == '已拒绝'?'err':'']">{{item.apply_confirm_status}}</view>
        </view>
        <view class="swiper-body">
          <view>调拨单号：{{item.sn}}</view>
          <view>申请日期：{{item.create_time}}</view>
          <view>由{{item.apply_personnel_name}}物资经理提交 <text>{{item.status}}</text></view>
        </view>
      </view>
      <view class="nodata" v-if="list.length == 0">
        暂无数据
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import {allocationListsApi} from "@/service/user.services.js"
  export default {
    data() {
      return {
        page: {
          limit: 10,
          current: 1,
          total: 0
        },
        list: []
      }
    },
    onShow() {
      uni.showLoading({
          title: '加载中'
      });
      this.getList()
    },
    onPullDownRefresh() {
      this.page.current = 1
      this.getList()
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1000);
    },
    methods: {
      getList() {
        allocationListsApi(this.page).then(res => {
          if (this.page.current === 1) {
            this.list = res.data
          } else {
            this.list = this.list.concat(res.data)
          }
          this.page.total = res.count
          uni.hideLoading()
        }).catch(err => {
          uni.hideLoading()
        })
      },
      lower () {
        if (this.page.total > this.list.length) {
          this.page.current++
          this.getList()
        }
      },
      toDetail(item) {
        let url = ''
        let curStatus = item.apply_confirm_status == '待确认' ? 2
                        : item.apply_confirm_status == '已确认' ? 1
                        : 3;
                        
        uni.navigateTo({
          url: `/pages/myself/manage-adjust-detail?id=${item.id}&type=${curStatus}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.view-content {
  height: 100vh;
  padding: 30rpx 0 40rpx;
  box-sizing: border-box;
  .list_scroll {
    height: 100%;
  }
}
.nodata {
  padding: 30rpx 0;
  text-align: center;
  color: #778CA2;
  background-color: #FFFFFF;
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
      &.no {
        color: #FFB800;
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
