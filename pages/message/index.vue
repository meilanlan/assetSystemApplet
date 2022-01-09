<template>
  <view class="message">
    <view class="tab-list">
      <view class="tab-box" :class="['box-'+(index+1), curStatus == item.id ? 'active' : '' ]" v-for="(item,index) in stArr" :key="item.id" @click="switchTab(item.id)">
        {{item.name}}
      </view>
      <view class="line" :style="{left: tabLeft}"></view>
    </view>
    <div class="message-box">
      <scroll-view
        scroll-y="true" 
        class="list_scroll"
        @scrolltolower="lower" 
      >
      <view v-if="curStatus==1">
        <view class="nodata" v-if="projectList.length == 0">
          暂无动态
        </view>
        <view class="project-box" v-for="(item,index) in projectList" :key="index">
          <view class="r">
            <view class="h2" >
              <u-parse :content="item.log"></u-parse>
              <!-- <rich-text :nodes="item.log"></rich-text> -->
            </view>
            <text class="h4">{{item.create_time}}</text>
          </view>
        </view>
      </view>
      <view v-else>
        <view class="nodata" v-if="list.length == 0">
          暂无消息
        </view>
        <view class="box" v-for="(item,index) in list" :key="index" @click="gotoPage(item)">
          <image src="../../static/images/p-img.png" mode=""></image>
          <view class="r">
            <text class="h2 textEllipsis">{{item.name}}</text>
            <view class="h3 text2Ellipsis">
              {{item.contentHtml}}
            </view>
            <text class="h4">{{item.create_time}}</text>
          </view>
        </view>
      </view>
        
      </scroll-view>
    </div>
    
  </view>
</template>

<script>
  // import marked from 'marked'
  import UParse from '@/components/u-parse/u-parse.vue'
  import {messageListApi, projectNewsApi} from '@/service/message.services.js'
	export default {
    components:{UParse},
		data() {
			return {
				page: {
          current: 1,
          total: 0,
          limit: 10
        },
        projectPage: {
          current: 1,
          total: 0,
          limit: 10
        },
        list: [],
        projectList: [],
        stArr: [
          {id: 1, name: '工程状态'},
          {id: 2, name: '消息通知'},
        ],
        tabLeft: '26%',
        styleNum: {
          1: '26%',
          2: '72%'
        },
        curStatus: 1
			};
		},
    onShow() {
      uni.showLoading({
          title: '加载中'
      });
      this.getProject()
      // this.getList()
    },
    onPullDownRefresh() {
      if (this.curStatus == 1) {
        this.page.current = 1
        this.getList()
      } else {
        this.projectPage.current = 1;
        this.getProject()
      }
      
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1000);
    },
    methods: {
      switchTab(id) {
        if (this.curStatus != id) {
          uni.showLoading({
              title: '加载中'
          });
          this.curStatus = id;
          this.tabLeft = this.styleNum[id];
          if (this.curStatus == 1) {
            this.projectPage.current = 1;
            this.getProject()
          } else {
            this.page.current = 1;
            this.getList()
          }
          
        }
      },
      lower() {
        if (this.curStatus == 1) {
          if (this.projectPage.total > this.projectList.length) {
            this.projectPage.current++
            this.getProject()
          }
        } else {
          if (this.page.total > this.list.length) {
            this.page.current++
            this.getList()
          }
        }
        
      },
      getProject () {
        let params = {
          limit: this.projectPage.limit,
          page: this.projectPage.current
        }
        projectNewsApi(params).then(res => {
          if (this.projectPage.current === 1) {
            this.projectList = res.data
          } else {
            this.projectList = this.projectList.concat(res.data)
          }
          this.projectPage.total = res.count
          uni.hideLoading()
        }).catch(err => {
          uni.hideLoading()
        })
      },
      getList() {
        let params = {
          limit: this.page.limit,
          page: this.page.current
        }
        messageListApi(params).then(res => {
          res.data.forEach((item, index) => {
            let start = item.content.indexOf('<body>')+7 // 截取body开始的位置
            let end = item.content.indexOf('</body>')
            let h = item.content.substring(start, end);
            h= h.replace(/<img[^>]*>/, '').replace(/<p>/g, '').replace(/<\/p>/g,'');
            this.$set(res.data[index], 'contentHtml', h)
          })
          
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
      gotoPage(item) {
        uni.navigateTo({
          url: '/pages/message/detail?id='+item.id
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
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
    .tab-box {
      width: 50%;
      text-align: center;
      font-size: 30rpx;
      color: #20323E;
      font-weight: bold;
      line-height: 42rpx;
      position: relative;
      &.box-1::after{
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
.nodata {
  text-align: center;
  padding-top: 40rpx;
}
.message {
  height: calc(100vh - 20px);
  padding: 36rpx 30rpx 0;
  .list_scroll {
    height: 100%;
  }
  .message-box {
    margin-top: 90rpx;
    height: calc(100vh - 68px);
  }
  .box {
    margin-bottom: 20rpx;
    padding: 27rpx 7rpx 27rpx 27rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
    display: flex;
    >* {
      flex-shrink: 0;
    }
    image {
      margin-right: 22rpx;
      width: 126rpx;
      height: 126rpx;
    }
    .r {
      text {
        display: block;
      }
      .h2 {
        width: 490rpx;
        font-size: 32rpx;
        color: #20323E;
        line-height: 45rpx;
      }
      .h3 {
        width: 507rpx;
        margin-top: 6rpx;
        font-size: 24rpx;
        color: #778CA2;
        line-height: 1.2;
      }
      .h4 {
        margin-top: 12rpx;
        color: #B6C4D1;
        font-size: 20rpx;
        line-height: 28rpx;
      }
    }
  }
  .project-box {
    padding: 27rpx 7rpx 27rpx 27rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    .h2 {
      font-size: 28rpx;
      font-weight: bold;
      border-bottom: 1px solid #FAFAFA;
      padding-bottom: 12rpx;
    }
    .h4 {
      margin-top: 12rpx;
      color: #B6C4D1;
      font-size: 20rpx;
      line-height: 28rpx;
    }
  }
}
</style>
