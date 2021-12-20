<template>
  <view class="view-content">
    <view class="title">{{data.name}}</view>
    <view class="date">{{data.create_time}}</view>
    <view class="info">
      <rich-text :nodes="htmls"></rich-text>
    </view>
  </view>
</template>

<script>
  import {messageInfotApi} from '@/service/message.service.js'
  export default {
    data() {
      return {
        id: '',
        data: {},
        // htmls: '<!DOCTYPE html>↵<html>↵<head>↵</head>↵<body>↵<p>文字消息哦</p>↵</body>↵</html>'
        htmls: ''
      }
    },
    onLoad(option) {
      this.id = option.id
    },
    onShow() {
      console.log(2)
      this.getInfo()
    },
    methods: {
      getInfo() {
        messageInfotApi({id: this.id}).then(res => {
          if (res.data) {
            this.data = res.data;
            let start = this.data.content.indexOf('<body>')+7 // 截取body开始的位置
            let end = this.data.content.indexOf('</body>')
            this.htmls = this.data.content.substring(start, end)
            // var htmlString = res.data.content.replace(/\\/g, "").replace(/
            
            // this.htmlNodes = htmlParser(htmlString);
            
            // this.dataNotice = res.data.data;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.view-content {
  width: 100%;
  height: 100vh;
  background-color: #FFFFFF;
  padding-bottom: 30rpx;
  .title {
    margin-top: 71rpx;
    text-align: center;
    font-size: 36rpx;
    color: #20323E;
    font-weight: bold;
    line-height: 50rpx;
  }
  .date {
    margin-top: 15rpx;
    text-align: center;
    font-size: 24rpx;
    color: #B6C4D1;
    line-height: 33rpx;
  }
  .info {
    margin-top: 45rpx;
    padding: 0 30rpx;
    color: #778CA2;
    font-size: 28rpx;
    line-height: 46rpx;
  }
}
</style>
