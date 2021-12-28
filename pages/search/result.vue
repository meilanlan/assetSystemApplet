<template>
  <view class="view-content">
    <view class="map">
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
    </view>
  </view>
</template>

<script>
  import {MAPPOI, getInfoStore} from "@/store/dataCache.js"
  import {mapSearchApi} from '@/service/search.services.js'
  export default {
    data() {
      return {
        userPoi: getInfoStore(MAPPOI),
        swiperIndex: 0,
        indicatorDots: true,
        option: null,
        wxMarkerData: [], // swiper数据
        latitude: 0,
        longitude: 0,
        markers: [], // 搜索结果
        polyline: [
          {
            points: [],
            color: "#1E9FFF", //设置连接的线的颜色
            width: uni.upx2px(6), //线的宽度
            dottedLine: false, //线是否是虚线
            arrowLine: false,//线是带箭头的线，开发者工具暂时不支持
          }
        ], // 连接点数组
        firstChoose: {}, // 记录当前选中的点
        secondChoose: {}, // 记录最后一次选中的点
        total: {
          materials_allow_total: 0,
          materials_total: 0,
          project_total: 0
        },
        myAmap: null
      };
    },
    onLoad(option) {
      this.option = option
      var amapfile = require('@/unit/amap-wx.js');
      this.myAmap = new amapfile.AMapWX({key: 'b274ecd162e4cd60d797f3b21084dbc8'})
    },
    onShow() {
      uni.showLoading({
        title: '正在查询搜索结果，请稍后',
        mask: true
      })
      this.latitude = this.userPoi.latitude
      this.longitude = this.userPoi.longitude
      this.getMapList()
    },
    methods: {
      getMapList () {
        mapSearchApi({keyword: this.option.searchInfo}).then(res => {
          if (res.data) {
            this.total = res.data.count
            if (res.data.lists.length > 0) {
              let markers_new = [];
              res.data.lists.forEach((item,index) => {
                let newItem = {}
                let obj = {
                  latitude: item.lat,
                  longitude: item.lng,
                  iconPath: '/static/images/map-icon.png',
                  width: uni.upx2px(57),
                  height: uni.upx2px(57),
                  anchor: {x: .5, y: .5},
                  label: {},
                  callout: {
                    content: item.name,
                    display: 'ALWAYS',
                    borderRadius: uni.upx2px(26),
                    color: '#20323E',
                    fontSize: uni.upx2px(28),
                    padding: uni.upx2px(8),
                    anchorY: 7,
                    bgColor: '#ffffff'
                  }
                }
                newItem = Object.assign(item,obj)
                markers_new.push(newItem)
              })
              
              this.wxMarkerData = JSON.parse(JSON.stringify(markers_new))
              this.markers = markers_new
              this.swiperIndex = 0
              // this.firstChoose = markers_new[0] // 记录当前选中的地址信息
              uni.hideLoading()
            } else {
              uni.hideLoading()
              this.$showTip('没有搜索到项目或物资')
            }
          }
        })
      },
      makertap (e){
        console.log(e, 'eeeeee')
        if (this.firstChoose.latitude && this.secondChoose.latitude) {
          this.firstChoose = {}
          this.secondChoose = {}
          this.polyline[0].points = []
        }
        if (!this.firstChoose.latitude) {
          // 初始化选中的第一个poi
          this.changeMarkerColor(this.markers, e.markerId);
        } else {
          this.drawLine(e.markerId)
        }
        // 连接直线
        // else if (this.firstChoose.id != e.markerId) {
        //   // 连接直线
        //   this.drawLine(e.markerId)
        // }
      },
      drawLine(id) {
        uni.showLoading({
          title: '正在计算两地间的距离',
          mask: true
        })
        for(let i = 0; i< this.markers.length; i++) {
          if (this.markers[i].id == id) {
            this.secondChoose['latitude'] = this.markers[i].latitude
            this.secondChoose['longitude'] = this.markers[i].longitude
            this.$set(this.markers[i], 'iconPath', '/static/images/map-tab.png')
            this.$set(this.markers[i].callout, 'color', '#ffffff')
            this.$set(this.markers[i].callout, 'bgColor', '#1E9FFF')
            // 创建文本
            this.$set(this.markers[i], 'label', {
              content: '两地相距:'+this.countDistace(this.firstChoose.latitude,this.firstChoose.longitude,this.secondChoose.latitude,this.secondChoose.longitude)+'km',
              bgColor: '#ff9e81',
              color: '#ffffff',
              borderRadius: uni.upx2px(6),
              fontSize: uni.upx2px(28),
              padding: uni.upx2px(8),
            })
            this.swiperIndex = i // swiper 定位设置
          } else {
            // this.$set(this.markers[i], 'iconPath', '/static/images/map-icon.png')
            // this.$set(this.markers[i].callout, 'color', '#20323E')
            // this.$set(this.markers[i].callout, 'bgColor', '#ffffff')
            this.$set(this.markers[i], 'label', {})
          }
        }
        
        this.polyline[0].points = [
          {
            latitude: this.firstChoose.latitude,
            longitude: this.firstChoose.longitude
          },
          {
            latitude: this.secondChoose.latitude,
            longitude: this.secondChoose.longitude
          }
        ]
        
        this.polyline = JSON.parse(JSON.stringify(this.polyline))
        setTimeout(() => {
          uni.hideLoading()
        },400)        
      },
      countDistace(latFrom, lngFrom, latTo, lngTo){
        // 计算两地距离
        let radLat1 = latFrom*Math.PI / 180.0;
        let radLat2 = latTo*Math.PI / 180.0;
        let a = radLat1 - radLat2;
        let b = lngFrom*Math.PI / 180.0 - lngTo*Math.PI / 180.0;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s;
      },
      changeMarkerColor(data, id) {
        // 初始化选中的第一个poi
        let markers = []
        for(let i = 0; i < data.length; i++) {
          if (data[i].id == id) {
            data[i].iconPath = '/static/images/map-tab.png'
            data[i].callout.color = '#ffffff'
            data[i].callout.bgColor = '#1E9FFF'
            this.firstChoose = data[i] // 记录当前选中的地址信息
            this.swiperIndex = i // swiper 定位设置
          } else {
            data[i].iconPath = '/static/images/map-icon.png'
            data[i].callout.color = '#20323E'
            data[i].callout.bgColor = '#ffffff'
          }
          data[i].label = {}; // 初始化连线文案
          markers.push(data[i])
        }
        this.markers = markers
      },
      tabClear () {
        uni.showLoading()
        // 清除选点信息
        if(this.polyline[0].points.length>=2) {
          this.polyline[0].points = [];
          this.latitude = 0
          this.longitude = 0
          let markers = []
          // 初始化iconPath
          for(let i = 0; i < this.markers.length; i++) {
            this.markers[i].iconPath = '/static/images/map-icon.png'
            this.markers[i].label = {}
            markers.push(this.markers[i])
          }
          this.markers = markers
        }
        if(this.firstChoose.latitude) this.firstChoose = {}
        if(this.secondChoose.latitude) this.secondChoose = {}
        setTimeout(() => {
          uni.hideLoading()
        },200)
      },
      swiperchange (e) {
        this.swiperIndex=e.detail.current;
      },
      gotoPage() {
        uni.navigateTo({
          url: '/pages/search/list'
        });
      },
      toDetail(item) {
        // url:`/pages/search/detail?pId=${item.id}`
        uni.navigateTo({
          url:'/pages/search/detail?pId='+item.id
        });
      }
    }
  }
</script>

<style lang="scss">
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
