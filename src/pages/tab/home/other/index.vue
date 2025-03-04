<!-- 滚动吸附效果演示(vue) -->
<template>
  <view>
    <!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
    <z-paging ref="paging" v-model="dataList" :loading-more-enabled="false" :auto-scroll-to-top-when-reload="false"
      @query="queryList">
      <banner :banners="banners"></banner>
      <view style="width: 100%;height: 140rpx;margin-top: 10rpx; display: flex;flex-direction: row;color:#EEE;    align-items: center;
    justify-content: space-evenly;">
        <view style="display: flex;flex-direction: column;align-items: center;" @click="clickMovieType(0)">
          <view class="type_item">
            <up-icon name="/static/images/index/qb_type_icon.png"></up-icon>
          </view>
          <span style="margin-top: 5rpx;color: #DDD;">全部</span>
        </view>
        <view style="display: flex;flex-direction: column;align-items: center;" @click="clickMovieType(1)">
          <view class="type_item">
            <up-icon name="/static/images/index/zx_type_icon.png"></up-icon>
          </view>
          <span style="margin-top: 5rpx;color: #DDD;">最新上传</span>
        </view>
        <view style="display: flex;flex-direction: column;align-items: center;" @click="clickMovieType(2)">
          <view class="type_item">
            <up-icon name="/static/images/index/rq_type_icon.png"></up-icon>
          </view>
          <span style="margin-top: 5rpx;color: #DDD;">人气高</span>
        </view>
        <view style="display: flex;flex-direction: column;align-items: center;" @click="clickMovieType(3)">
          <view class="type_item">
            <up-icon name="/static/images/index/pf_type_icon.png"></up-icon>
          </view>
          <span style="margin-top: 5rpx;color: #DDD;">评分高</span>
        </view>
      </view>
      <movieList :data="otherList"></movieList>
      <up-gap height="40" bgColor="transparent"></up-gap>
    </z-paging>
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted,
  } from 'vue';
  import {
    clickMovieType
  } from "../../../opts"


  import {
    indexStore
  } from "@/store"
  import banner from "../../../../components/banner/banner.vue"
  import dayHot from "@/components/day_hot/index.vue"
  import indexCommon from "@/components/index_common/index.vue"

  import movieList from "@/components/movie_list/index.vue"

  const store = indexStore();
  const paging = ref(null);
  const current = ref(0);
  const dataList = ref([])
  const banners = ref([])
  const otherList = ref([]);

  const props=defineProps({
    categoryPid:Number
  })

  onMounted(() => {
    console.error("onMounted")
    // getHome();
    store.getVideos(1,30,props.categoryPid,0).then(res=>{
      console.error(res)
      if(res.code==200){
        let bList = res.bannerList;
        for (let i = 0; i < bList.length; i++) {
          let url = bList[i].surfacePlot;
          if (url.indexOf("http") == -1) {
            url = "/static/" + url;
          }
          bList[i]['image'] = url;
        }
        banners.value = bList;
        otherList.value.push(...res.data);
      }

    })
  })

  // @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
  const queryList = (pageNo, pageSize) => {
    // 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
    // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
    // 模拟请求服务器获取分页数据，请替换成自己的网络请求
    //paging.value.complete([21, 3, 3, 3, 3, 4]);
  }
</script>

<style lang="scss" scoped>
  .type_item {
    padding: 12rpx 50rpx;
    border: 1px #00baf7 solid;
    border-radius: 6rpx;
  }
</style>
