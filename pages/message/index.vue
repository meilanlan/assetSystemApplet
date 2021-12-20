<template>
  <view class="message">
    <scroll-view
      v-if="list.length>0"
      scroll-y="true" 
      class="list_scroll"
      @scrolltolower="lower" 
    >
      <view class="box" v-for="(item,index) in list" :key="index" @click="gotoPage(item)">
        <image src="../../static/images/p-img.png" mode=""></image>
        <view class="r">
          <text class="h2 textEllipsis">{{item.name}}</text>
          <view class="h3 text2Ellipsis">
            <rich-text :nodes="item.contentHtml"></rich-text>
          </view>
          <text class="h4">{{item.create_time}}</text>
        </view>
      </view>
    </scroll-view>
    <view class="nodata" v-else>
      暂无消息
    </view>
  </view>
</template>

<script>
  import {messageListApi} from '@/service/message.service.js'
	export default {
		data() {
			return {
				page: {
          current: 1,
          total: 0,
          limit: 10
        },
        list: []
			};
		},
    filters: {
      filtersHtml(content) {
        let h = ''
        let start = content.indexOf('<body>')+7 // 截取body开始的位置
        let end = content.indexOf('</body>')
        h = content.substring(start, end)
        return h;
      }
    },
    onShow() {
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
      lower() {
        if (this.page.total > this.list.length) {
          this.page.current++
          this.getList()
        }
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
            h= h.replace(/<img[^>]*>/, '');
            this.$set(res.data[index], 'contentHtml', h)
            // res.data.contentHtml = item.content.substring(start, end)
          })
          
          if (this.page.current === 1) {
            this.list = res.data
          } else {
            this.list = this.list.concat(res.data)
          }
          this.page.total = res.count
          console.log(this.list, 'iiiii')
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

<style lang="scss">
.nodata {
  text-align: center;
  padding-top: 40rpx;
}
.message {
  height: calc(100vh - 40px);
  padding: 36rpx 30rpx 0;
  .list_scroll {
    height: 100%;
  }
  .box {
    margin-bottom: 20rpx;
    padding: 27rpx 7rpx 27rpx 27rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
    display: flex;
    // align-items: center;
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
        line-height: 33rpx;
      }
      .h4 {
        margin-top: 12rpx;
        color: #B6C4D1;
        font-size: 20rpx;
        line-height: 28rpx;
      }
    }
  }
}
</style>
