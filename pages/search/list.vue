<template>
  <view class="view-content">
    <scroll-view 
      v-if="list.length>0"
      scroll-y="true" 
      class="list_scroll"
       @scrolltolower="lower" 
      >
      <view class="item-box" v-for="item in list" :key="item.id" @click="gotoPgae(item)">
        <view class="title">
          <view class="l">
            <image src="../../static/images/book.png"></image>
            <text class="textEllipsis">{{item.name}}</text>
          </view>
          <view class="r">{{item.status}}</view>
        </view>
        <view class="swiper-body">
          <view>物资总数量：122</view>
          <view>可调拨数量：{{item.materials_list}}</view>
        </view>
      </view>
    </scroll-view>
    
  </view>
</template>

<script>
  import {projectListApi} from '../../service/search.services.js'
  export default {
    data() {
      return {
        list: [],
        page: {
          limit: 10,
          current: 1,
          total: 0
        },
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
      getList () {
        projectListApi(this.page).then(res => {
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
      gotoPgae(item) {
        // debugger
        uni.navigateTo({
          url:`/pages/search/detail?pId=${item.id}`
        });
      }
      
    }
  }
</script>

<style scoped lang="scss">
.view-content {
  height: 100vh;
  padding-top: 37rpx;
}
.list_scroll {
  height: 100%;
}
.item-box {
  width: 661rpx;
  // height: 222rpx;
  background-color: #FFFFFF;
  border-radius: 20rpx;
  padding: 0 10rpx 20rpx;
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
        width: 456rpx;
        color: #333333;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    .r {
      width: 130rpx;
      height: 60rpx;
      background: rgba(30, 159, 255, 0.26);
      opacity: 1;
      border-radius: 30rpx;
      text-align: center;
      line-height: 60rpx;
      color: #1E9FFF;
      font-size: 28rpx;
    }
  }
  .swiper-body {
    padding: 19rpx 16rpx 0;
    color: #778CA2;
    font-size: 28rpx;
    >view {
      line-height: 40rpx;
    }
  }
}
</style>
