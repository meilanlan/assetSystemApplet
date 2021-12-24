<template>
  <view class="view-content" v-if="data.allocation_info.id">
    <view class="header">
      <view class="title">{{data.allocation_info.apply_personnel_name}}物资经理提交申请</view>
      <view class="box">
        <view class="l">
          <image src="../../static/images/logo.png" mode=""></image>
          <text>中建八三(沪)资产系统</text>
        </view>
        <view class="r">{{data.allocation_info.status}}</view>
      </view>
    </view>
    <view class="content">
      <view class="content-box">
        <view class="title">
          <image src="../../static/images/box-1.png" mode=""></image>
          <text>调入项目信息</text>
        </view>
        <view class="box-1 box-1-1">
          <view class="tit">{{data.to_project_info.name}} ({{data.to_project_info.sn}})</view>
          <view class="text">
            <text>项目编号：</text>
            <text>{{data.to_project_info.sn}}</text>
          </view>
          <view class="text">
            <text>项目经理：</text>
            <text>{{data.to_project_info.manager_personnel.nickname}}&nbsp;&nbsp;|&nbsp;&nbsp;{{data.to_project_info.manager_personnel.username}}</text>
          </view>
          <view class="text">
            <text>物资经理：</text>
            <text>{{data.to_project_info.materials_personnel.nickname}}&nbsp;&nbsp;|&nbsp;&nbsp;{{data.to_project_info.materials_personnel.username}}</text>
          </view>
          <view class="text">
            <text>项目周期：</text>
            <text>{{data.to_project_info.plan_stime}}-{{data.to_project_info.plan_etime}}</text>
          </view>
          <view class="text">
            <text>项目地址：</text>
            <text>{{data.to_project_info.address}}</text>
          </view>
          <view class="text">
            <text>项目描述：</text>
            <text>{{data.to_project_info.intro}}</text>
          </view>
          <view class="text">
            <text>项目物资：</text>
            <text>{{data.to_project_info.materials_list}}</text>
          </view>
        </view>
        <view v-if="data.from_project_info.id">
          <view class="title">
            <image src="../../static/images/box-1.png" mode=""></image>
            <text>调出项目信息</text>
          </view>
          <view class="box-1 box-1-1">
            <view class="tit">{{data.from_project_info.name}} ({{data.from_project_info.sn}})</view>
            <view class="text">
              <text>项目编号：</text>
              <text>{{data.from_project_info.sn}}</text>
            </view>
            <view class="text">
              <text>项目经理：</text>
              <text>{{data.from_project_info.manager_personnel.nickname}}&nbsp;&nbsp;|&nbsp;&nbsp;{{data.from_project_info.manager_personnel.username}}</text>
            </view>
            <view class="text">
              <text>物资经理：</text>
              <text>{{data.from_project_info.materials_personnel.nickname}}&nbsp;&nbsp;|&nbsp;&nbsp;{{data.from_project_info.materials_personnel.username}}</text>
            </view>
            <view class="text">
              <text>项目周期：</text>
              <text>{{data.from_project_info.plan_stime}}-{{data.from_project_info.plan_etime}}</text>
            </view>
            <view class="text">
              <text>项目地址：</text>
              <text>{{data.from_project_info.address}}</text>
            </view>
            <view class="text">
              <text>项目描述：</text>
              <text>{{data.from_project_info.intro}}</text>
            </view>
            <view class="text">
              <text>项目物资：</text>
              <text>{{data.from_project_info.materials_list}}</text>
            </view>
          </view>
        </view>
        <view class="title">
          <image src="../../static/images/box-2.png" mode=""></image>
          <text>申请物资明细</text>
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
                    物资单价：
                    <text>￥{{item.price}}</text>
                  </view>
                </view>
                <view class="box">
                  <view>
                    物资总价：
                    <text>￥{{item.apply_amount}}</text>
                  </view>
                  <view class="blue">
                    申请物资数量：
                    <text>{{item.apply_count}}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="title tit3">
          <image src="../../static/images/box-3.png" mode=""></image>
          <text>调拨说明</text>
        </view>
        <view class="textarea">
          {{data.allocation_info.apply_remark}}
        </view>
      </view>
      <view v-if="curStatus!=3 && !data.from_project_info.id">
        <view class="sp-tit">请选择调出项目</view>
        <view class="content-box">
          <view class="choose-pick">
            <picker class="picker-st" @change="bindPickerChange" range-key="name" :value="selectvalue" :range="data.project_lists">
              <view class="uni-input">
                <text>{{data.project_lists[selectvalue].name}}</text>
                <view class="icon-arrow"></view>
              </view>
            </picker>
          </view>
          <view class="title">
            <image src="../../static/images/box-1.png" mode=""></image>
            <text>调出项目信息</text>
          </view>
          <view class="box-1 box-1-1" v-if="projectData.project_info.id">
            <view class="tit">{{projectData.project_info.name}} ({{projectData.project_info.sn}})</view>
            <view class="text">
              <text>项目经理：</text>
              <text>{{projectData.project_info.manager_personnel.nickname}}&nbsp;&nbsp;|&nbsp;&nbsp;{{projectData.project_info.manager_personnel.username}}</text>
            </view>
          </view>
          <view class="nodata box-1 box-1-1" v-else>
            暂无数据
          </view>
          <view class="title">
            <image src="../../static/images/box-2.png" mode=""></image>
            <text>项目物资明细</text>
          </view>
          <view class="box-1 box-1-2" v-if="projectData.materials_lists.data.length>0">
            <view class="list">
              <view class="box-sp" v-for="(item, index) in projectData.materials_lists.data" :key="index">
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
                    <view class="blue">
                      确认调拨数量：
                      <view class="edit" @click="openModal(item, index)">
                        <text>{{item.count}}</text>
                        <image class="img" src="../../static/images/edit.png" mode=""></image>
                      </view>
                    </view>
                  </view>
                  <view class="box">
                    <view>
                      物资单价：
                      <text>￥{{item.price}}</text>
                    </view>
                    <view>
                      可调拨数量：
                      <text>{{item.allow_cnt}}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="nodata box-1" v-else>
            暂无数据
          </view>
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
              <view class="sm">{{data.allocation_info.apply_personnel_name}}</view>
            </view>
            <div class="r">{{data.allocation_info.create_time}}</div>
          </view>
          <view class="line">
            <view class="l">
              <view class="big">审批人</view>
              <view class="sm">{{data.allocation_info.confirm_personnel_name}}（{{data.allocation_info.status}}）</view>
              <view class="blue" v-if="data.allocation_info.confirm_remark">理由：{{data.allocation_info.confirm_remark}}</view>
            </view>
            <div class="r" v-if="data.allocation_info.confirm_time">{{data.allocation_info.confirm_time}}</div>
          </view>
          <view class="line" v-if="curStatus == 3">
            <view class="l">
              <view class="big">确认人</view>
              <view class="sm">{{data.allocation_info.apply_personnel_name}}（{{data.allocation_info.apply_confirm_status}}）</view>
              <view class="blue" v-if="data.allocation_info.apply_confirm_remark">理由：{{data.allocation_info.apply_confirm_remark}}</view>
            </view>
            <div class="r" v-if="data.allocation_info.apply_confirm_time">{{data.allocation_info.apply_confirm_time}}</div>
          </view>
        </view>
        
      </view>
    </view>
    <view class="foot-view" v-if="curStatus != 1">
      <div class="foot-btn">
        <text @click="draw(3)">拒绝</text>
        <text @click="draw(1)">同意</text>
      </div>
    </view>
    
    <view class="modal" v-if="isModal">
      <view class="modal-box">
        <view class="modal-title">确认调拨数量</view>
        <view class="modal-inpt">
          <input class="inpt" type="number" v-model="curCount" placeholder-style='color:#A6B6C6'/>
        </view>
        <view class="modal-foot">
          <view class="btn" @click="isModal = false">取消</view>
          <view class="btn" @click="sureCount">确认</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {setInfoStore} from "@/store/dataCache.js"
  import {allocationInfoApi, allocationChangeApi} from '@/service/user.services.js'
  export default {
    data() {
      return {
        selectvalue: 0,
        id: '',
        curStatus: 1,
        data: {},
        projectData: {},
        isModal: false,
        list: [], // 确认调拨的物资数组
        countIndex: 0, // 修改调拨的物资的index
        curCount: 0
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
      this.getDetail() //调拨
    },
    methods: {
      getDetail() {
        let params = {
          limit: 9999,
          id: this.id
        }
        allocationInfoApi(params).then(res => {
          if (res.data) {
            this.data = res.data
            let defaultInfo = {
              id: -1,
              name: '请选择调出项目'
            }
            this.data.project_lists.unshift(defaultInfo)
          }
          uni.hideLoading()
        }).catch(err => {
          uni.hideLoading()
        })
      },
      bindPickerChange(e) {
        this.selectvalue = e.target.value
        if (this.selectvalue != 0) {
          uni.showLoading({
              title: '加载中'
          });
          this.getProjectInfo()
        }
      },
      getProjectInfo() {
        let params = {
          project_id: this.data.project_lists[this.selectvalue].id,
          allocation_id: this.data.allocation_info.id
        }
        allocationChangeApi(params).then(res => {
          if (res.data) {
            this.projectData = res.data
            let arr = []
            if (res.data.materials_lists.data.length > 0) {
              res.data.materials_lists.data.forEach((item, i) => {
                item['count'] = 0 // 调拨物资确认数量
                arr.push(item)
              })
              this.projectData.materials_lists.data = arr
            }
          }
          uni.hideLoading()
        }).catch(err => {
          uni.hideLoading()
        })
      },
      openModal(item, i) {
        this.countIndex = i
        this.isModal = true
        this.curCount = this.projectData.materials_lists.data[this.countIndex].count
      },
      sureCount() {
        if (this.curCount>this.projectData.materials_lists.data[this.countIndex].allow_cnt) {
          this.$showTip('数量不能超出可调拨数量')
        } else {
          this.projectData.materials_lists.data[this.countIndex].count = this.curCount
          this.isModal = false
        }
      },
      draw (type) {
        if (this.selectvalue == 0) {
          this.$showTip('请选择调出项目')
          return false
        }
        let arr = []
        let num = 0
        this.projectData.materials_lists.data.forEach((item, i) => {
          if (item.count == 0) num=num+1
           arr.push({
             name: item.name,
             count: item.count,
             allow_cnt: item.allow_cnt,
             id: item.id,
             price: item.price
           })
         })
         if (num == this.projectData.materials_lists.data.length) {
           this.$showTip('请至少填写一个需要调拨的物资')
           return false
         }
         
        let param = {
          from_project: this.projectData.materials_lists.data[this.countIndex].id,
          allocation_id: this.data.allocation_info.id,
          status: type,
          lists: JSON.stringify(arr),
        }
        setInfoStore('verifyInfo', param)
        uni.navigateTo({
          url: "/pages/myself/manage-agaree?type=1"
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.nodata {
  text-align: center;
  font-size: 24rpx;
  color: #778CA2;
  padding: 40rpx 0 !important;
}
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
              color: #20323E;
              image {
                width: 21rpx;
                height: 21rpx;
                vertical-align: baseline;
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
                  .edit {
                    .img {
                      width: 26rpx;
                      height: 24rpx;
                      margin-left: 5rpx;
                    }
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
  .sp-tit {
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    margin-bottom: 10rpx;
  }
  .choose-pick {
    margin-bottom: 41rpx;
    height: 64rpx;
    background: #F6FAFF;
    border-radius: 11rpx;
    line-height: 64rpx;
    .picker-st {
      height: 100%;
      padding: 0 29rpx 0 24rpx;
      
      .uni-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text {
          font-size: 26rpx;
          color: #0193FF;
        }
        .icon-arrow {
          width: 0;                 /*  宽高设置为0，很重要，否则达不到效果 */
          height: 0px;
          border: 10rpx solid #0193FF;
          border-bottom-color: transparent;    /* 设置透明背景色 */
          border-left-color: transparent;
          border-right-color: transparent;
          margin-top: 4rpx;
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1110;
  opacity: 1;
  outline: 0;
  text-align: center;
  // -ms-transform: scale(1.185);
  // transform: scale(1.185);
  // backface-visibility: hidden;
  // perspective: 2000upx;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease-in-out 0s;
  // pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-box {
    width: 366rpx;
    height: 234rpx;
    background: #FFFFFF;
    border: 1px solid #707070;
    opacity: 1;
    border-radius: 16rpx;
    overflow: hidden;
    .modal-title {
      margin-top: 27rpx;
      line-height: 42rpx;
      font-size: 30rpx;
      font-weight: 400;
      color: #20323E;
      text-align: center;
    }
    .modal-inpt {
      margin: 17rpx auto 0;
      width: 178rpx;
      height: 53rpx;
      border: 1px solid #CAD8E6;
      border-radius: 4rpx;
      .inpt {
        width: 100%;
        height: 100%;
        font-size: 30rpx;
        color: #20323E;
      }
    }
    .modal-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 75rpx;
      margin-top: 20rpx;
      border-top: 1px solid #F2F5F7;
      .btn {
        width: 49%;
        line-height: 75rpx;
        text-align: center;
        font-size: 28rpx;
        color: #0193FF;
        &:first-of-type {
          border-right: 1px solid #F2F5F7;
          color: #778CA2;
        }
      }
    }
  }
}

</style>
