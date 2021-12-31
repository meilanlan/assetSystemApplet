<template>
	<view class="view-content">
    <view class="search" @click="gotoPages('/pages/search/index')">
      <image src="../../static/images/search.png" class="search-icon"></image>
      <view class="search-input">
        搜索项目名称或物资名称
      </view>
    </view>
    <!-- <view class="list">
      <view class="box">工程总数：<text>{{total.project_total}}</text></view>
      <view class="box">物资总数：<text>{{total.materials_total}}</text></view>
      <view class="box">可调拨数：<text>{{total.materials_allow_total}}</text></view>
    </view> -->
    <view class="map" >
      <x-map v-if="token" :source="'home'" :total="total" :lists='lists' ></x-map>
    </view>
    
	</view>
</template>

<script>
  import {indexAPI} from '@/service/index.services.js'
  import {MAPPOI, gettokenStore, setInfoStore, getInfoStore} from '@/store/dataCache.js'
  import {XMap} from '../../components/x-map.vue'
	export default {
    components: {
      XMap
    },
		data() {
			return {
        myAmap: '',
				searchName: '',
        title: 'map',
        latitude: 0,
        longitude: 0,
        total: {
          materials_allow_total: 0,
          materials_total: 0,
          project_total: 0
        },
        lists: [],
        token: '',
			}
		},
    onShow() {
      uni.showLoading({
        title: '项目搜索中',
        mask: true
      })
      this.token = gettokenStore()
      this.getmap()
    },
		methods: {
      getmap() {
        indexAPI({}).then(res => {
          if (res.data) {
            this.total = res.data.total
            this.lists = res.data.lists
          }
          if (res.data.lists.length == 0) this.$showTip('没有搜索到项目或物资')
          uni.hideLoading()
        }).catch(err => {
          uni.hideLoading()
        })
      },
      gotoPages (url) {
        uni.navigateTo({
          url: url
        })
      }
		}
	}
</script>

<style scoped lang="scss">
.list {
  margin-top: 30rpx;
  padding: 0 50rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  color: #FFFFFF;
  font-size: 20rpx;
  >* {
    flex-shrink: 0;
  }
  .box {
    box-sizing: border-box;
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
  z-index: 1;
}
</style>
