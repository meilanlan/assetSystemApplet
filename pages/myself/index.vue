<template>
	<view class="view-content">
		<view class="user-info">
		  <!-- <view class="head"></view> -->
      <view class="info">
        <view class="h2">{{data.name}}</view>
        <text>{{data.sys_name}}</text>
      </view>
		</view>
    <view class="manage-box" v-if="userType === 1">
      <view class="h2">审批管理</view>
      <view class="list">
        <view class="li" @click="gotoPage(2)">
          <image class="icon-1" src="../../static/images/st-1.png" mode=""></image>
          <text>待审批</text>
        </view>
        <view class="li" @click="gotoPage(1)">
          <image class="icon-2" src="../../static/images/st-2.png" mode=""></image>
          <text>已审批</text>
        </view>
        <view class="li" @click="gotoPage(3)">
          <image class="icon-3" src="../../static/images/st-3.png" mode=""></image>
          <text>已驳回</text>
        </view>
      </view>
    </view>
    <view class="manage-box orther">
      <view class="h2">其他管理</view>
      <view class="list">
        <view class="li" @click="topage('/pages/myself/manage-goods')">
          <image class="icon-4" src="../../static/images/st-4.png" mode=""></image>
          <text>物资管理</text>
        </view>
        <view class="li" @click="topage('/pages/myself/manage-adjust')">
          <image class="icon-5" src="../../static/images/st-5.png" mode=""></image>
          <text>调拨管理</text>
        </view>
        <view class="li" @click="topage('/pages/myself/apply-needs')">
          <image class="icon-6" src="../../static/images/st-6.png" mode=""></image>
          <text>需求申请</text>
        </view>
      </view>
    </view>
    <view class="manage-box data-box">
      <view class="h2">数据看板</view>
      <view class="data-list">
        <view class="li">
          <view class="num">{{data.total.project_total}}</view>
          项目总数
        </view>
        <view class="li">
          <view class="num">{{data.total.project_status2_total}}</view>
          在建项目数
        </view>
        <view class="li">
          <view class="num">{{data.total.project_status1_total}}</view>
          立项项目数
        </view>
        <view class="li">
          <view class="num">{{data.total.project_status3_total}}</view>
          完工项目数
        </view>
        <view class="li">
          <view class="num">{{data.total.project_amount}}</view>
          项目总价值
        </view>
        <view class="li">
          <view class="num">{{data.total.materials_amount}}</view>
          物资总价值
        </view>
        <view class="li">
          <view class="num">{{data.total.materials_scrap_amount}}</view>
          报废总价值
        </view>
        <view class="li">
          <view class="num">{{data.total.materials_allocation_amount}}</view>
          调拨总价值
        </view>
        <view class="li">
          <view class="num">{{data.total.materials_allocation_total}}</view>
          调拨总次数
        </view>
        <view class="li">
          <view class="num">{{data.total.purchase_amount}}</view>
          采购总金额
        </view>
      </view>
    </view>
	</view>
</template>

<script>
  import {getInfoStore} from '@/store/dataCache.js'
  import {userApi} from '@/service/user.services.js'
	export default {
		data() {
			return {
				data: {},
        userType: 2
			}
		},
    onShow() {
      uni.showLoading({
          title: '加载中'
      });
      this.userType = getInfoStore('userInfo').userType
      this.getUser()
    },
		methods: {
      getUser () {
        userApi({}).then(res => {
          if (res.data) {
            this.data = res.data
          }
          uni.hideLoading()
        }).catch(err => {
          uni.hideLoading()
        })
      },
			gotoPage(id) {
        uni.navigateTo({
          url: `/pages/myself/manage-list?st=${id}`
        })
      },
      topage(url) {
        uni.navigateTo({
          url: url
        })
      }
		}
	}
</script>

<style scoped lang="scss">
.view-content {
  padding: 0 30rpx 180rpx;
}
.user-info {
  margin: 50rpx 0 45rpx;
  display: flex;
  align-items: center;
  >* {
    flex-shrink: 0;
  }
  .head {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background-color: pink;
    margin-right: 26rpx;
  }
  .h2 {
    color: #20323E;
    font-size: 46rpx;
    font-weight: bold;
    line-height: 65rpx;
  }
  text {
    color: #778CA2;
    font-size: 24rpx;
  }
}
.manage-box {
  background-color: #FFFFFF;
  border-radius: 20rpx;
  padding: 29rpx 30rpx 23rpx;
  margin-bottom: 35rpx;
  .h2 {
    font-size: 34rpx;
    font-weight: bold;
    color: #20323E;
  }
  .list {
    padding-left: 33rpx;
    padding-right: 40rpx;
    margin-top: 43rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .li {
      >* {
        display: block;
      }
      image {
        display: block;
        margin: 0 auto 24rpx;
      }
      .icon-1,
      .icon-3{
        width: 45rpx;
        height: 42rpx;
      }
      .icon-2 {
        width: 39rpx;
        height: 47rpx;
      }
      .icon-4 {
        width: 45rpx;
        height: 45rpx;
      }
      .icon-5 {
        width: 46rpx;
        height: 45rpx;
      }
      .icon-6 {
        width: 37rpx;
        height: 45rpx;
      }
      text {
        font-size: 24rpx;
        color: #20323E;
        text-align: center;
        line-height: 1;
      }
    }
    
  }
  .data-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .li {
      width: 33.3%;
      margin-top: 45rpx;
      color: #A6B6C6;
      font-size: 24rpx;
      text-align: center;
      .num {
        margin-bottom: 13rpx;
        font-size: 32rpx;
        color: #20323E;
        line-height: 45rpx;
      }
    }
  }
  &.data-box {
    padding: 0 0 39rpx;
    .h2 {
      padding: 29rpx 33rpx ;
    }
  }
  &.orther {
    .list {
      .li {
        image {
          margin: 0 auto 15rpx;
        }
      }
    }
  }
}
</style>
