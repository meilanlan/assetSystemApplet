<script>
  import 'static/css/common.css'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
  @import url('@/components/u-parse/u-parse.css');
	/*每个页面公共css */
  uni-tabbar {
    .uni-tabbar {
      height: 180rpx;
      border-top-left-radius: 50rpx;
      border-top-right-radius: 50rpx;
      box-shadow: 0px 2px 16px rgba(166,182,198,0.3);
    }
  }
  
  .view-content {
    position: relative;
    overflow-x: hidden;
    // overflow-y: scroll;
  }
  
  .search {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20rpx 0 26rpx;
    border-bottom-left-radius: 50rpx;
    border-bottom-right-radius: 50rpx;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 16px rgba(166,182,252,0.3);
    .search-input {
      margin: 0 auto;
      width: 690rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      background-color: #F5F9FB;
      color: #A6B6C6;
      font-size: 26rpx;
      padding-left: 95rpx;
      box-sizing: border-box;
    }
    .search-icon {
      width: 29rpx;
      height: 30rpx;
      position: absolute;
      left: 80rpx;
      top: 46rpx;
    }
  }
</style>
