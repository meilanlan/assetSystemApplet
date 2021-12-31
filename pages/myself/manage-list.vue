<template>
  <view class="view-content">
    <view class="tab-list">
      <view class="box" :class="['box-'+(index+1), curStatus == item.id ? 'active' : '' ]" v-for="(item,index) in stArr" :key="item.id" @click="switchTab(item.id)">
        {{item.name}}
      </view>
      <view class="line" :style="{left: tabLeft}"></view>
    </view>
    <view class="list">
      <scroll-view
        scroll-y="true" 
        class="list_scroll"
        @scrolltolower="lower" 
      >
        <view class="item-box" v-for="(item, index) in list" :key="index" @click="gotoPage(item)">
          <view v-if="item.title != '需求申请'">
            <view class="title">
              <view class="l">
                <image src="../../static/images/book.png"></image>
                <text class="textEllipsis">{{item.project_name}}</text>
              </view>
              <view :class="['r', item.title == '申请报废'?'err':'']">{{item.title}}</view>
            </view>
            <view class="swiper-body">
              <view>调拨单号：{{item.sn}}</view>
              <view>申请日期：{{item.create_time}}</view>
              <view>由{{item.apply_personnel}}物资经理提交 <text>{{item.status}}</text></view>
            </view>
            <view class="reason">
              <image src="../../static/images/reason.png" mode=""></image>
              <text :class="item.title == '申请报废'?'err':''">
                {{item.title == '申请报废'?'报废原因':item.title == '申请调拨'?'调拨说明':'审批说明'}}申请原因：{{item.remark}}
              </text>
            </view>
          </view>
          <view v-else>
            <view class="title">
              <view class="l">
                <image src="../../static/images/img.png"></image>
                <text>图片信息</text>
              </view>
              <view class="r">{{item.title}}</view>
            </view>
            <view class="swiper-img">
              <scroll-view class="scroll-box" scroll-y="true" scroll-x="true">
                <view class="img-list">
                  <image class="img" v-for="(item,index) in item.images" :key="index" :src="imgUrl+item"></image>
                  <!-- <view class="img" v-for="(item, i) in item.images" :key="i"></view> -->
                </view>
              </scroll-view>
            </view>
            <view class="swiper-body">
              <view>申请日期：{{item.create_time}}</view>
              <view>由{{item.apply_personnel}}物资经理提交 <text>{{item.status}}</text></view>
            </view>
            <view class="reason-1"></view>
          </view>
        </view>
        <view class="nodata" v-if="list.length==0" >
          暂无数据
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import {imgUrl} from '@/service/config/env.js'
  import {examineApproveApi} from '@/service/user.services.js'
  export default {
    data() {
      return {
        imgUrl: imgUrl,
        curStatus: 2,
        tabLeft: '18%',
        styleNum: {
          2: '18%',
          1: '49%',
          3: '80%'
        },
        stArr: [
          {id: 2, name: '待审批'},
          {id: 1, name: '已审批'},
          {id: 3, name: '已驳回'},
        ],
        page: {
          current: 1,
          total: 0,
          limit: 10
        },
        list: []
      }
    },
    onLoad(option) {
      this.curStatus = option.st || 1;
      this.tabLeft = this.styleNum[this.curStatus];
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
        let params = {
          limit: this.page.limit,
          page: this.page.current,
          status: this.curStatus
        }
        examineApproveApi(params).then(res => {
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
      lower() {
        if (this.page.total > this.list.length) {
          this.page.current++
          this.getList()
        }
      },
      gotoPage(item) {
        let url = ''
        if (item.title=='申请报废') {
          url = `/pages/myself/manage-detail-scrap?id=${item.id}&type=${this.curStatus}`
        } else if (item.title=='申请调拨') {
          url = `/pages/myself/manage-detail-allocat?id=${item.id}&type=${this.curStatus}`
        } else {
          url = `/pages/myself/manage-detail-needs?id=${item.id}&type=${this.curStatus}`
        }
        uni.navigateTo({
          url: url
        })
      },
      switchTab(id) {
        if (this.curStatus != id) {
          uni.showLoading({
              title: '加载中'
          });
          this.curStatus = id;
          this.tabLeft = this.styleNum[id];
          this.page.current = 1;
          this.getList()
        }
      }
      
    }
  }
</script>

<style scoped lang="scss">
.nodata {
  text-align: center;
  color: #A6B6C6;
  font-size: 28rpx;
  padding: 30rpx 0;
}
.tab-list {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 47rpx 30rpx 40rpx;
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
    bottom: 35rpx;
    left: 18%;
    transition: all 500ms;
  }
}
.list {
  margin-top: 128rpx;
  height: calc(100vh - 80px);
  overflow: hidden;
  .list_scroll {
    height: 100%;
  }
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
        >* {
          flex-shrink: 0;
        }
        image {
          width: 24rpx;
          height: 26rpx;
          margin-right: 16rpx;
        }
        text {
          width: 464rpx;
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
      padding: 23rpx 8rpx 0;
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
        color: #A6B6C6;
        &.err {
          color: #FF5722;
        }
      }
    }
    .reason-1 {
      height: 8rpx;
    }
    .swiper-img {
      width: 100%;
      padding: 17rpx 9rpx 5rpx;
      overflow-x: hidden;
      .scroll-box {
        width: 100%;
        .img-list {
          display: flex;
          .img {
            flex-shrink: 0;
            width: 304rpx;
            height: 158rpx;
            margin-right: 20rpx;
          }
        }
      }
    }
  }
}
</style>
