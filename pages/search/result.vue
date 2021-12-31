<template>
  <view class="view-content">
    <x-map :total="total" :lists='lists'></x-map>
  </view>
</template>

<script>
  import {MAPPOI, getInfoStore} from "@/store/dataCache.js"
  import {mapSearchApi} from '@/service/search.services.js'
  import {XMap} from '../../components/x-map.vue'
  export default {
    components:{XMap},
    data() {
      return {
        userPoi: getInfoStore(MAPPOI),
        swiperIndex: 0,
        indicatorDots: true,
        option: null,
        total: {},
        lists: [], // 搜索结果
      };
    },
    onLoad(option) {
      this.option = option
    },
    onShow() {
      this.getMapList()
    },
    methods: {
      getMapList () {
        mapSearchApi({keyword: this.option.searchInfo}).then(res => {
          if (res.data) {
            this.total = res.data.count
            this.lists = res.data.lists
             uni.hideLoading()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.view-content {
  height: 100vh;
  position: relative;
}
</style>
