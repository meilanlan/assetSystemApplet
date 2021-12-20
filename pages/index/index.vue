<template>
	<view class="view-content">
    <view class="search" @click="gotoPages('/pages/search/index')">
      <image src="../../static/images/search.png" class="search-icon"></image>
      <view class="search-input">
        搜索项目名称或物资名称
      </view>
    </view>
    <view class="list">
      <view class="box">工程总数：<text>{{total.project_total}}</text></view>
      <view class="box">物资总数：<text>{{total.materials_total}}</text></view>
      <view class="box">可调拨数：<text>{{total.materials_allow_total}}</text></view>
    </view>
    <view class="map" id="mapContainer" v-if="token">
      <map style="width: 100%; height: 100vh;" scale="14" :show-location="true" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
    </view>
    
	</view>
</template>

<script>
  import {indexAPI} from '@/service/index.services.js'
  import {MAPPOI, gettokenStore, setInfoStore, getInfoStore} from '@/store/dataCache.js'
	export default {
		data() {
			return {
				searchName: '',
        title: 'map',
        latitude: 0,
        longitude: 0,
        total: {
          materials_allow_total: 0,
          materials_total: 0,
          project_total: 0
        },
        covers: [],
        token: ''
			}
		},
		onShow() {
      this.getmap()
		},
    mounted() {
      this.token = gettokenStore()
      if (this.token) {
        uni.showLoading({
          title: '正在获取您的位置，请稍后',
          mask: true
        })
        var amapfile = require('@/unit/amap-wx.js');
        var myAmap = new amapfile.AMapWX({key: 'b274ecd162e4cd60d797f3b21084dbc8'})
        myAmap.getRegeo({
          iconPath: '/static/images/map-icon.png',
          success: (data) => {
            console.log(data)
            data[0].width = uni.upx2px(57) // 设置icon宽高
            data[0].height = uni.upx2px(57)
            this.latitude = data[0].latitude;
            this.longitude = data[0].longitude;
            let markers_new = []
            if (data&&data.length > 0) {
              data.forEach((item,index) => {
                markers_new.push({
                  id: item.id,
                  latitude: item.latitude,
                  longitude: item.latitude,
                  iconPath: '/static/images/map-icon.png',
                  width: uni.upx2px(57),
                  height: uni.upx2px(57),
                  anchor: {x: .5, y: .5},
                })
              })
              this.covers = markers_new
            }
            var mapPoi = {
              latitude: data[0].latitude,
              longitude: data[0].longitude,
            }
            setInfoStore(MAPPOI, mapPoi)
            uni.hideLoading()
          },
          fail: (data) => {
            this.$showTip('当前无法定位，请检查你是否开启权限')
            uni.hideLoading()
          }
        })
      }
    },
		methods: {
      getmap() {
        indexAPI({}).then(res => {
          if (res.data) {
            this.total = res.data.total
          }
        })
      },
      getAddress(point){
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function(rs){
          var addComp = rs.addressComponents;
          var address =  addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
          console.log(address);
        })
      },
      // chooseImage() {
      // 		var _this = this
      // 		uni.chooseImage({
      // 			count: 1, //默认9
      // 			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      // 			sourceType: ['album', 'camera'], //从相册选择、摄像头
      // 			success: function(res) {
      // 				// _this.imgShow = res.tempFilePaths[0]
      // 				// _this.uploadFile()
      // 			}
      // 		});
      // },
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
  z-index: -1;
}
</style>
