<template>
  <view class="view-content" v-if="data.scrap_info.id">
    <view class="header">
      <view class="title">{{data.scrap_info.apply_personnel_name}}物资经理提交申请</view>
      <view class="box">
        <view class="l">
          <image src="../../static/images/logo.png" mode=""></image>
          <text>中建八三(沪)资产系统</text>
        </view>
        <view class="r">{{data.scrap_info.status}}</view>
      </view>
    </view>
    <view class="content">
      <view class="content-box">
        <view class="title">
          <image src="../../static/images/box-1.png" mode=""></image>
          <text>项目信息</text>
        </view>
        <view class="box-1 box-1-1">
          <view class="tit">{{data.project_info.name}} ({{data.project_info.sn}})</view>
          <view class="text">
            <text>项目编号：</text>
            <text>{{data.project_info.sn}}</text>
          </view>
          <view class="text">
            <text>项目经理：</text>
            <text>{{data.project_info.manager_personnel.nickname}}&nbsp;&nbsp;|&nbsp;&nbsp;{{data.project_info.manager_personnel.username}}</text>
          </view>
          <view class="text">
            <text>物资经理：</text>
            <text>{{data.project_info.materials_personnel.nickname}}&nbsp;&nbsp;|&nbsp;&nbsp;{{data.project_info.materials_personnel.username}}</text>
          </view>
          <view class="text">
            <text>项目周期：</text>
            <text>{{data.project_info.plan_stime}}-{{data.project_info.plan_etime}}</text>
          </view>
          <view class="text">
            <text>项目地址：</text>
            <text>{{data.project_info.address}}</text>
          </view>
          <view class="text">
            <text>项目描述：</text>
            <text>{{data.project_info.intro}}</text>
          </view>
          <view class="text">
            <text>项目物资：</text>
            <text>{{data.project_info.materials_list}}</text>
          </view>
        </view>
        <view class="title">
          <image src="../../static/images/box-2.png" mode=""></image>
          <text>{{curStatus == 2 ? '申请报废明细' : '报废物资明细'}}</text>
        </view>
        <view class="box-1 box-1-2">
          <view class="list" v-if="data.materials_lists.data.length>0">
            <view class="box-sp" v-for="(item, index) in data.materials_lists.data" :key="index">
              <view class="top">
                <view class="l">
                  <image src="../../static/images/box-5.png" mode=""></image>
                  物资编号：{{item.sn}}
                </view>
              </view>
              <view class="cont">
                <view class="box bod">
                  <view>
                    物资名称：
                    <text>{{item.name}}</text>
                  </view>
                  <view>
                    物资总价：
                    <text>￥{{item.amount}}</text>
                  </view>
                </view>
                <view class="box">
                  <view>
                    物资单价：
                    <text>￥{{item.price}}</text>
                  </view>
                  <view>
                    {{curStatus != 2?'确认报废数量':'申请报废数量'}}：
                    <text>{{item.count}}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="title tit3">
          <image src="../../static/images/box-3.png" mode=""></image>
          <text>报废说明</text>
        </view>
        <view class="textarea">
          {{data.scrap_info.remark}}
        </view>
      </view>
      <view class="content-box content-box-2">
        <view class="title">
          <image src="../../static/images/box-4.png" mode=""></image>
          <text>流程</text>
        </view>
        <view class="line-list">
          <view class="line">
            <view class="l">
              <view class="big">发起申请</view>
              <view class="sm">{{data.scrap_info.apply_personnel_name}}</view>
            </view>
            <div class="r">{{data.scrap_info.create_time}}</div>
          </view>
          <view class="line">
            <view class="l">
              <view class="big">审批人</view>
              <view class="sm">{{data.scrap_info.confirm_personnel_name}}（{{data.scrap_info.status}}）</view>
              <view class="blue" v-if="data.scrap_info.confirm_remark">理由：{{data.scrap_info.confirm_remark}}</view>
            </view>
            <div class="r" v-if="data.scrap_info.confirm_time">{{data.scrap_info.confirm_time}}</div>
          </view>
        </view>
        
      </view>
    </view>
    <view class="foot-view" v-if="curStatus == 2">
      <div class="foot-btn">
        <text @click="draw(3)">拒绝</text>
        <text @click="draw(1)">同意</text>
      </div>
    </view>
  </view>
</template>

<script>
  import {setInfoStore} from '@/store/dataCache.js'
  import {scrapInfoApi} from '@/service/user.services.js'
  export default {
    data() {
      return {
        id: '',
        curStatus: 1,
        data: {}
      }
    },
    onLoad(option) {
      this.curStatus = option.type
      this.id = option.id
    },
    onShow() {
      uni.showLoading({
          title: '加载中'
      });
      this.getDetail()
    },
    methods: {
      getDetail() {
        let params = {
          limit: 9999,
          id: this.id
        }
        scrapInfoApi(params).then(res => {
          if (res.data) {
            this.data = res.data
          }
          uni.hideLoading()
        }).catch(err => {
          uni.hideLoading()
        })
      },
      draw (type) {
        let param = {
          scrap_id: this.data.scrap_info.id,
          status: type,
        }
        setInfoStore('verifyInfo', param)
        uni.navigateTo({
          url: "/pages/myself/manage-agaree?type=2"
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.view-content {
  padding-bottom: 230rpx;
}
.header {
  padding: 52rpx 30rpx 40rpx;
  background-color: #FFFFFF;
  border-bottom-left-radius: 50rpx;
  border-bottom-right-radius: 50rpx;
  box-shadow: 0px 2px 16px rgba(166,182,252,0.3);
  .title {
    color: #333333;
    font-size: 36rpx;
    font-weight: bold;
  }
  .box {
    margin-top: 17rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24rpx;
    >* {
      flex-shrink: 0;
    }
    image {
      width: 52rpx;
      height: 52rpx;
      vertical-align: middle;
      margin-right: 15rpx;
    }
    text {
      color: #A6B6C6;
    }
    .r {
      color: #1E9FFF;
    }
  }
}
.content {
  padding: 40rpx 30rpx 0;
  .content-box {
    background-color: #FFFFFF;
    border-radius: 20rpx;
    box-shadow: 0 1px 20rpx rgba(182,182,182,.15);
    padding: 40rpx 15rpx;
    margin-bottom: 30rpx;
    &.content-box-2 {
      padding-bottom: 0;
    }
    .title {
      &.tit3 {
        margin-top: 25rpx;
      }
      image {
        width: 38rpx;
        height: 38rpx;
        margin-right: 6rpx;
        vertical-align: sub;
      }
      text {
        font-size: 32rpx;
        line-height: 45rpx;
        color: #333333;
        font-weight: bold;
      }
    }
    .tit {
      font-size: 28rpx;
      color: #20323E;
      font-weight: bold;
      line-height: 40rpx;
      margin-bottom: 10rpx;
    }
    .box-1 {
      margin-top: 18rpx;
      // padding: 0 30rpx 28rpx 20rpx;
      padding: 0 18rpx 20rpx;
      &.box-1-1 {
        border-bottom: 1px dashed #CAD8E6;
        margin-bottom: 24rpx;
      }
      &.box-1-2 {
        padding-left: 0;
        padding-right: 0;
      }
      .text {
        margin-bottom: 15rpx;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        >* {
          flex-shrink: 0;
        }
        text {
          font-size: 24rpx;
          color: #A6B6C6;
          white-space: pre-wrap;
          width: 20%;
          &:last-of-type {
            width: 80%;
          }
        }
      }
      .list {
        margin-top: 27rpx;
        .box-sp {
          background-color: #FFFFFF;
          box-shadow: 0 1px 20rpx rgba(156,156,156,.15);
          padding: 0 24rpx 0 19rpx;
          border-radius: 20rpx;
          margin-bottom: 20rpx;
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
          }
          .cont {
            display: flex;
            justify-content: space-between;
            .box {
              width: 49%;
              padding: 26rpx 5rpx 23rpx 19rpx;
              box-shadow: none;
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
                &.blue {
                  color: #0193FF;
                  text {
                    color: #0193FF;
                  }
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
      }
    }
  }
}
.textarea {
  margin-top: 29rpx;
  border-radius: 20rpx;
  background-color: #F5F9FB;
  height: 134rpx;
  padding: 22rpx 38rpx;
  font-size: 26rpx;
  color: #778CA2;
  overflow-y: auto;
}
.line-list {
  flex-grow: 1;
  flex-shrink: 1;
  padding: 24px 18px 0 40px;
  .line {
    height: 130rpx;
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    position: relative;
    padding-left: 26rpx;
    >* {
      flex-shrink: 0;
      flex-grow: 0;
    }
    .l {
      color: #778CA2;
      .big {
        font-size: 30rpx;
        color: #20323E;
      }
      .blue {
        color: #0193FF;
      }
    }
    .r {
      color: #A6B6C6;
    }
    &::before {
      content: " ";
      position: absolute;
      // left:-80px;
      left: -13rpx;
      top: 7rpx;
      z-index: 1;
      background: url(../../static/images/box-6.png) no-repeat center center;
      background-size: 28rpx 28rpx;
      width: 28rpx;
      height: 28rpx;
      text-align: center;
    }
    &::after {
      content: " ";
      position: absolute;
      top: 16rpx;
      left: 0;
      width: 1px;
      height: 130rpx;
      border-left: 1px dashed #CAD8E6;
    }
    &:last-of-type::after{
      display: none;
    }
  }
}
.foot-view {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 28rpx 37rpx 0;
  width: 100%;
  height: 182rpx;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #FFFFFF;
  border-top-left-radius: 50rpx;
  border-top-right-radius: 50rpx;
  box-sizing: border-box;
  box-shadow: 0 2rpx 16rpx #A6B6C6;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  .foot-btn {
    width: 338rpx;
    height: 80rpx;
    border-radius: 100rpx;
    border: 1px solid #1E9FFF;
    text {
      display: inline-block;
      width: 50%;
      text-align: center;
      line-height: 80rpx;
      box-sizing: border-box;
      font-size: 30rpx;
      color: #1E9FFF;
      &:last-of-type {
        background-color: #1E9FFF;
        border-top-right-radius: 100rpx;
        border-bottom-right-radius: 100rpx;
        color: #FFFFFF;
      }
    }
  }
}
</style>
