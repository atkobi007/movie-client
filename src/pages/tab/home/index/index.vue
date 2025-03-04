<!-- 滚动吸附效果演示(vue) -->
<template>
  <view>
    <!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
    <z-paging ref="paging" v-model="dataList" :loading-more-enabled="false" :auto-scroll-to-top-when-reload="false"
      @query="queryList">
      <banner :banners="banners"></banner>
      <dayHot :data="dayHotData"></dayHot>
      <indexCommon :data="item" v-for="(item,index) in otherList" :key="index"></indexCommon>
      <up-gap height="40" bgColor="transparent"></up-gap>
    </z-paging>
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue';
  import {
    indexStore
  } from "@/store"
  import banner from "../../../../components/banner/banner.vue"
  import dayHot from "@/components/day_hot/index.vue"
  import indexCommon from "@/components/index_common/index.vue"

  const store = indexStore();
  const paging = ref(null);
  const current = ref(0);
  const dataList = ref([])
  const banners = ref([])
  const dayHotData = ref([]);
  const otherList = ref([]);

  //获取首页数据
  const getHome = () => {
    store.getActionRecommend().then(res => {
      let list = res || [];
      let bannerObj = list.filter(v => {
        return v.type == 0;
      })[0]
      console.error(bannerObj)
      let bList = bannerObj ? bannerObj.bannerList : [];
      for (let i = 0; i < bList.length; i++) {
        let url = bList[i].surfacePlot;
        if (url.indexOf("http") == -1) {
          url = "/static/" + url;
        }
        bList[i]['image'] = url;
      }
      banners.value = bList;

      let oList = list.filter(v => {
        return v.type !== 0 && v.list.length > 0;
      });
      oList.sort((a, b) => {
        return a.sort - b.sort;;
      });
      otherList.value = oList;
    });
  }

  onMounted(() => {
    console.error("onMounted")
    getHome();
  })

  // @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
  const queryList = (pageNo, pageSize) => {
    // 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
    // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
    // 模拟请求服务器获取分页数据，请替换成自己的网络请求
    //paging.value.complete([21, 3, 3, 3, 3, 4]);
  }
</script>

<style lang="scss">

</style>
