<template>
<view class="view-content">
    <view class="search">
      <image src="../../static/images/search.png" class="search-icon"></image>
      <input type="text" class="search-input" v-model="searchInfo" :focus="true" @confirm="searchfun" placeholder="搜索项目名称或物资名称" placeholder-style="color:#A6B6C6" />
    </view>
    <view class="title">
      <text>历史记录</text>
      <view class="delect" @click="remove"><image src="../../static/images/delect.png"></image></view>
    </view>
    <view class="record" v-show="list.length > 0">
      <view class="box" v-for="(item,index) in list" :key="index" @click="toSearch(item)">{{item}}</view>
    </view>
</view>
</template>

<script>
  import {setInfoStore, getInfoStore} from '@/store/dataCache.js'
  export default {
  	data() {
  		return {
  			searchInfo: '',
        list: []
  		}
  	},
  	onShow() {
      this.list = getInfoStore('searchList') || []
  	},
  	methods: {
      searchfun() {
        if (this.searchInfo) {
          if(this.list.indexOf(this.searchInfo) === -1) this.list.unshift(this.searchInfo)
          if(this.list.length > 10) {
            this.list.pop()
          }
          setInfoStore('searchList', this.list)
          console.log(this.list)
           uni.navigateTo({
             url:`/pages/search/result?searchInfo=${this.searchInfo}`
           });
        }
      },
      toSearch(info) {
        uni.navigateTo({
          url:`/pages/search/result?searchInfo=${info}`
        });
      },
      remove() {
        this.list = []
        setInfoStore('searchList', this.list)
      }
  	}
  }
</script>

<style scoped lang="scss">
  .title {
    margin-top: 180rpx;
    padding: 0 40rpx 28rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFang SC;
    text {
      color: #20323E;
      font-size: 32rpx;
      font-weight: bold;
    }
    .delect {
      width: 30rpx;
      height: 30rpx;
    }
  }
  .record {
    margin: 0 20rpx 0 40rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    >* {
      flex-shrink: 0;
    }
    .box {
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      padding: 13rpx 32rpx;
      text-align: center;
      font-size: 26rpx;
      color: #778CA2;
    }
  }
</style>
