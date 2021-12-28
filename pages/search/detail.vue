<template>
  <view class="view-content" v-if="data.id">
    <view class="top-cont">
      <view class="top">
        <view class="l">
          <image :src="imgUrl+data.cover_path" mode=""></image>
          <view class="name textEllipsis">{{data.name}}</view>
        </view>
        <view class="status">{{data.status}}</view>
      </view>
      <view class="text-arr">
        <view>
          <text>项目经理：</text>
          <text>{{data.project_personnel}}</text>
        </view>
        <view>
          <text>物资经理：</text>
          <text>{{data.materials_personnel}}</text>
        </view>
        <view>
          <text>项目周期：</text>
          <text>{{data.plan_stime}}-{{data.plan_etime}}</text>
        </view>
        <view>
          <text>项目地址：</text>
          <text>{{data.address}}</text>
        </view>
        <view>
          <text>项目描述：</text>
          <text>{{data.intro}}</text>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="title">项目物资数据</view>
      <view class="goods">
        <view class="box">
          <image src="../../static/images/goods.png" mode=""></image>
          <view>
            <text class="big">{{data.materials_total}}</text>
            <text class="sm">物资总数</text>
          </view>
        </view>
        <view class="box">
          <image src="../../static/images/move.png" mode=""></image>
          <view>
            <text class="big">{{data.materials_allow_total}}</text>
            <text class="sm">可调拨总数</text>
          </view>
        </view>
      </view>
      <view class="title">项目物资明细</view>
      <view class="list" v-if="data.materials_list.length>0">
        <view class="box" v-for="(item,i) in data.materials_list" :key="i">
          <view class="top">
            <view class="l">
              <image src="../../static/images/box-5.png" mode=""></image>
              {{item.sn}}
            </view>
            <view class="r textEllipsis">
              {{item.name}}
            </view>
          </view>
          <view class="cont">
            <view class="box bod">
              <view>
                物资单价：
                <text>￥{{item.price}}</text>
              </view>
              <view>
                物资数量：
                <text>{{item.surplus_cnt}}</text>
              </view>
            </view>
            <view class="box">
              <view>
                物资总价：
                <text>￥{{item.amount}}</text>
              </view>
              <view>
                可调拨数：
                <text>{{item.allow_cnt}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="list" v-else>
        <view class="nodata">
          暂无数据
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  import {imgUrl} from '@/service/config/env.js'
  import {projectInfoApi} from '@/service/search.services.js'
  export default {
    data() {
      return {
        imgUrl: imgUrl,
        id: '',
        data: ''
      }
    },
    onLoad(option) {
      this.id = option.pId
    },
    onShow() {
      uni.showLoading({
          title: '加载中'
      });
      this.imgUrl = imgUrl
      this.getDetail()
    },
    methods: {
      getDetail() {
        projectInfoApi({id: this.id}).then(res => {
          if(res.data) {
            this.data = res.data
          }
          uni.hideLoading()
        }).catch(err => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.view-content {
  padding-bottom: 60rpx;
}
.top-cont {
  padding: 47rpx 30rpx 30rpx;
  background-color: #FFFFFF;
  border-bottom-left-radius: 50rpx;
  border-bottom-right-radius: 50rpx;
}
.top {
  display: flex;
  justify-content: space-between;
  >* {
    flex-shrink: 0;
  }
  .l {
    display: flex;
    image {
      width: 100rpx;
      height: 100rpx;
      margin-right: 24rpx;
    }
  }
  .name {
    line-height: 50rpx;
    font-size: 36rpx;
    width: 414rpx;
  }
  .status {
    width: 130rpx;
    height: 60rpx;
    line-height: 60rpx;
    background-color: rgba(30, 159, 255,.1);
    text-align: center;
    color: #1E9FFF;
    font-size: 28rpx;
    border-radius: 30rpx;
  }
}
.text-arr {
  margin-left: 124rpx;
  margin-top: -24rpx;
  view {
    display: flex;
    color: #A6B6C6;
    font-size: 24rpx;
    line-height: 33rpx;
    margin-bottom: 16rpx;
    white-space: pre-wrap;
    >* {
      flex-shrink: 0;
    }
    text:first-of-type {
      width: 23%;
    }
    text:last-of-type {
      width: 76%;
    }
  }
}
.content {
  padding: 0 30rpx;
  .title {
    margin: 50rpx 0 16rpx;
    font-size: 34rpx;
    color: #333333;
    font-weight: bold;
  }
  .goods {
    display: flex;
    justify-content: space-between;
    align-items: center;
    >* {
      flex-shrink: 0;
    }
    .box {
      padding: 35rpx 0;
      background-color: #FFFFFF;
      border-radius: 20rpx;
      width: 334rpx;
      box-shadow: 0 1px 20rpx rgba(234,234,234,.15);
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        width: 93rpx;
        height: 93rpx;
        margin-right: 30rpx;
      }
      text {
        display: block;
        &.big {
          font-size: 34rpx;
          color: #333333;
          line-height: 48rpx;
        }
        &.sm {
          font-size: 24rpx;
          color: #A6B6C6;
          line-height: 33rpx;
        }
      }
    }
  }
  .list {
    .box {
      background-color: #FFFFFF;
      box-shadow: 0 1px 20rpx rgba(234,234,234,.15);
      padding: 0 24rpx 0 19rpx;
      margin-bottom: 20rpx;
      border-radius: 20rpx;
      .top {
        padding-right: 5rpx;
        border-bottom: 1px solid #F2F5F7;
        height: 84rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >* {
          flex-shrink: 0;
        }
        .l {
          font-size: 24rpx;
          color: #778CA2;
          image {
            width: 21rpx;
            height: 21rpx;
            vertical-align: middle;
            margin-top: 10rpx;
            margin-right: 13rpx;
          }
        }
        .r {
          width: 310rpx;
          color: #20323E;
          font-size: 30rpx;
          font-weight: bold;
          text-align: right;
        }
      }
      .cont {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .box {
          width: 49%;
          padding: 26rpx 5rpx 23rpx 19rpx;
          view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 23rpx;
            color: #778CA2;
            text {
              font-size: 28rpx;
              color: #20323E;
            }
          }
          &.bod {
            border-right: 1px solid #F2F5F7;
            padding-right: 25rpx;
            padding-left: 0;
          }
        }
      }
    }
    .nodata {
      background-color: #FFFFFF;
      box-shadow: 0 1px 20rpx rgba(234,234,234,.15);
      padding: 40rpx 24rpx 40rpx 19rpx;
      text-align: center;
    }
  }
}

</style>
