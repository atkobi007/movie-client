<template>
  <!-- 使用z-paging-swiper为根节点可以免计算高度 -->
  <z-paging-swiper style="height: 100%;">
    <!-- 需要固定在顶部不滚动的view放在slot="top"的view中 -->
    <!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
    <template #top>
      <up-tabs @change="onTabChanged" :list="tabList" :current="current" lineHeight="2" :activeStyle="{
  		    color: '#DDD',
  		    fontWeight: 'bold',
  		    transform: 'scale(1.2)'
  		}" :inactiveStyle="{
  		    color: '#AAA',
  		    transform: 'scale(1)'
  		}" keyName="title">
        <template #left>
          <view style="padding-left: 10rpx;">
            <up-icon name="/static/tabbar/tabbar_icon.png" color="#2979ff" size="28"></up-icon>
          </view>
        </template>
        <template #right>
          <view style="display: flex;flex-direction: row;padding-left: 20rpx;padding-right: 20rpx;">
            <up-icon style="margin-right: 10rpx;" size="24" name="search"></up-icon>
            <up-icon name="list" size="24"></up-icon>
          </view>
        </template>
      </up-tabs>
    </template>
    <!-- swiper必须设置height:100%，因为swiper有默认的高度，只有设置高度100%才可以铺满页面  -->
    <swiper class="swiper" style="height: 100%;" :current="current" @change="onTabChanged">
      <swiper-item class="swiper-item" v-for="(item, ix) in tabList" :key="ix">
        <index v-if="ix===0&& ix===current" style="height: 100%; "></index>
        <other :tab="item" v-if="ix!==0 && ix===current" :title="ix" :categoryPid="item.id"></other>
      </swiper-item>
    </swiper>
  </z-paging-swiper>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import index from "./index/index.vue"
  import other from "./other/index.vue"
  import {
    indexStore
  } from "@/store"

  const store = indexStore();
  const current = ref(0);
  const tabList = ref([])

  // tabs通知swiper切换
  const onTabChanged = (data) => {
    let currentIndex = 0;
    if (data['detail']) {
      currentIndex = data['detail'].current;
    } else {
      currentIndex = data.index;
    }
    if (current.value == currentIndex) return;
    current.value = currentIndex;
  }

  onMounted(() => {
    store.getActionTabs().then(res => {
      tabList.value = res;
    });
  })
</script>
