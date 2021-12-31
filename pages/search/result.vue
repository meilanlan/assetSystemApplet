<template>
  <view class="view-content">
    <x-map :total="total" :lists='lists'></x-map>
    <!-- <view class="map">
      <map style="width: 100%; height: 100vh;" scale="14" :show-location="true" :latitude="latitude" :longitude="longitude" :markers="markers" :include-points="markers" :polyline="polyline" @markertap="makertap" @callouttap="makertap"></map>
    </view>
    <view class="list">
      <view class="box">工程总数：<text>{{total.project_total}}</text></view>
      <view class="box">物资总数：<text>{{total.materials_total}}</text></view>
      <view class="box">可调拨数：<text>{{total.materials_allow_total}}</text></view>
    </view>
    <view class="look-list" @click="gotoPage" v-if="wxMarkerData.length > 0">
      <image class="icon" src="../../static/images/list-icon.png" mode=""></image>
      <text>查看列表</text>
    </view>
    <view class="my-swiper" v-if="wxMarkerData.length > 0">
      <swiper class="swiper" @change='swiperchange' :autoplay="false" :current="swiperIndex" previous-margin='30rpx' next-margin='30rpx'>
          <swiper-item v-for="(item, index) in wxMarkerData" :key="index">
              <view class="item-box" :class="swiperIndex == index ? 'sale' : '' " @click="toDetail(item)">
                <view class="title">
                  <view class="l">
                    <image src="../../static/images/book.png"></image>
                    <text class="textEllipsis">{{item.name}}</text>
                  </view>
                  <view class="r">{{item.status}}</view>
                </view>
                <view class="swiper-body">
                  <view>物资总数量：{{item.surplus_cnt}}</view>
                  <view>可调拨数量：{{item.allow_cnt}}</view>
                </view>
              </view>
          </swiper-item>
      </swiper>
    </view> -->
  </view>
</template>

<script>
  import {MAPPOI, getInfoStore} from "@/store/dataCache.js"
  import {mapSearchApi} from '@/service/search.services.js'
  import {XMap} from '../../components/x-map.vue'
  export default {
    components:{XMap},
    data() {
      return {
        userPoi: getInfoStore(MAPPOI),
        swiperIndex: 0,
        indicatorDots: true,
        option: null,
        total: {},
        lists: [], // 搜索结果
      };
    },
    onLoad(option) {
      this.option = option
    },
    onShow() {
      uni.showLoading({
        title: '正在查询搜索结果，请稍后',
        mask: true
      })
      this.getMapList()
    },
    methods: {
      getMapList () {
        mapSearchApi({keyword: this.option.searchInfo}).then(res => {
          if (res.data) {
            this.total = res.data.count
            this.lists = res.data.lists
            if (res.data.lists.length == 0) this.$showTip('没有搜索到项目或物资')
             uni.hideLoading()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.view-content {
  height: 100vh;
  position: relative;
}
.list {
  position: absolute;
  top: 30rpx;
  left: 0;
  padding: 0 50rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  color: #FFFFFF;
  font-size: 20rpx;
  z-index: 2;
  
  >* {
    flex-shrink: 0;
  }
  .box {
    min-width: 183rpx;
    margin-bottom: 20rpx;
    padding: 13rpx 10rpx 10rpx;
    background-color: #1E9FFF;
    border-radius: 32rpx;
    box-shadow: 0 2rpx 15rpx rgba($color: #C1CEDB, $alpha: .8);
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-of-type(2) {
      margin-left: 20rpx;
      margin-right: 20rpx;
    }
    text {
      font-size: 28rpx;
      font-weight: bold;
    }
  }
}
.map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  // z-index: -1;
}
.look-list {
  position: absolute;
  bottom: 352rpx;
  right: 30rpx;
  width: 114rpx;
  height: 114rpx;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: 0 2rpx 16rpx #CAD8E6;
  text-align: center;
  color: #333333;
  font-size: 20rpx;
  .icon {
    width: 40rpx;
    height: 29rpx;
    display: block;
    margin: 23rpx auto 10rpx;
  }
  text {
    line-height: 20rpx;
  }
}
.my-swiper {
  width: 100%;
  height: 222rpx;
  position: absolute;
  bottom: 94rpx;
  left: 0;
  .swiper {
    height: 100%;
    uni-swiper-item,
    swiper-item{
      display: flex;
      justify-content: center;
      align-items: center;
      > * {
        flex-shrink: 0;
      }
    }
  }
}
.item-box {
  width: 656rpx;
  height: 222rpx;
  transform: scaleY(.8);
  background-color: #FFFFFF;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 6rpx #CAD8E6;
  padding: 0 10rpx;
  &.sale {
    width: 656rpx;
    transform: scaleY(1);
  }
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
        width: 400rpx;
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
