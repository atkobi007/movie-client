<template>
  <!-- #101012 -->
  <view style="width: 100%;background-color:101012;display: flex;flex-direction: column;">

    <!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
    <z-paging ref="paging" v-model="dataList" :loading-more-enabled="false" :auto-scroll-to-top-when-reload="false"
      @query="queryList">

      <up-image :show-loading="true" src="/static/images/hot/rb_bg.webp" width="100%" height="150px"></up-image>
      <!-- 小程序中直接修改组件style为position: sticky;无效，需要在组件外层套一层view -->
      <view
        style="z-index: 100;position: sticky;top :0;background: url(/static/images/hot/rb_bg.webp); background-size: 100% 100%;">
        <!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
        <up-tabs @click="onTabClick" :current="currentTab" :scrollable="false"
          style="width: 100%; background-color: #101012;" :list="tabList" lineWidth="15" lineColor="#00cdff"
          :activeStyle="{
      	                color: '#FFF',
      	                fontWeight: 'bold',
      	                transform: 'scale(1.05)'
      	            }" :inactiveStyle="{
      	                color: '#AAA',
      	                transform: 'scale(1)'
      	            }" itemStyle="padding-left: 20px; padding-right: 20px; height: 50px;">
        </up-tabs>
        <up-tabs @click="onSubTabClick" :current="subCurrentTab" :scrollable="false" style=" background-color: #101012;"
          :list="subTabList" lineWidth="15" lineColor="#00cdff" :activeStyle="{
      	              color: '#ff743d',
      	              fontWeight: 'bold',
      	              transform: 'scale(1.05)'
      	          }" :inactiveStyle="{
      	              color: '#AAA',
      	              transform: 'scale(1)'
      	          }" itemStyle="padding-left: 20px; padding-right: 20px; height: 50px;">
        </up-tabs>
      </view>

      <view style="margin: 20px 15px;
      display: flex;flex-direction: row;justify-content: space-between">
        <view style="width: 32%;height: 240px;display: flex;flex-direction: column;" v-for="(item,ix) in topMovieList"
          @click="clickMovie(item)" :key="ix">
          <view v-bind:style="{'background': getUrl(item)}" style="width: 100%;height: 180px;border-radius: 4px;
              background-size: 100% 100%;">
            <view v-bind:style="{'background-color':getTopBgColor(ix),'color':getTopTitleColor(ix)}" style="font-weight: bold; font-size: 12px; width: 18px;
            height: 18px;line-height: 18px; text-align: center;border-radius: 4px;">
              {{ix+1}}
            </view>
          </view>
          <!-- <view style="margin-top: 5px; color: #FFF;font-weight: bold;font-size: 20px;height: 30px;line-height: 30px;">
            {{item.title}}
          </view> -->
          <up-text :text="item.title" style="margin-top: 5px;" color="#FFF" :bold="true" size="20" lines="1"></up-text>
          <view style="color: #888;font-size: 14px;height: 24px;line-height: 24px;">{{item.year}}年</view>
          <view style="color: #888;font-size: 14px;height: 24px;line-height: 24px;">{{item.catory}}</view>
        </view>
      </view>
      <view style="color: #FFF;margin: 30px 15px;">
        <view style="display: flex;flex-direction: row;margin-bottom: 15px;" v-for="(item,ix) in subMovieList"
          @click="clickMovie(item)" :key="ix">
          <view v-bind:style="{'background': getUrl(item)}" style="width: 140px;height: 180px;border-radius: 4px;
              background-size: 100% 100%;">
            <view v-bind:style="{'background-color':'rgb(0,0,0,0.6)','color':'#FFF'}" style="font-weight: bold; font-size: 12px; width: 18px;
            height: 18px;line-height: 18px; text-align: center;border-radius: 4px;">
              {{ix+4}}
            </view>
          </view>
          <view style="margin-left: 10px;">
            <!-- <view style="color: #FFF;font-weight: bold;font-size: 20px;height: 30px;line-height: 30px;text-overflow: ellipsis;"></view> -->
            <up-text :text="item.title" color="#FFF" :bold="true" size="20" lines="1"></up-text>
            <view style="color: #888;font-size: 14px;height: 24px;line-height: 24px;">{{item.year}}年</view>
            <view style="color: #888;font-size: 14px;height: 24px;line-height: 24px;">{{item.catory}}</view>
          </view>
        </view>


      </view>

    </z-paging>


  </view>
</template>

<script setup lang="ts">
  import {
    ref
  } from "vue";
  import {
    indexStore
  } from "@/store"
  import { clickMovie } from "../../opts.js"

  const store = indexStore();

  const dataList = ref<any>([]);

  const currentTab = ref(0);
  const subCurrentTab = ref(0);

  // @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
  const queryList = (pageNo, pageSize) => {
    // 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
    // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
    // 模拟请求服务器获取分页数据，请替换成自己的网络请求
    //paging.value.complete([21, 3, 3, 3, 3, 4]);
  }

  const tabList = ref([{
    name: '电影',
    id: 1,
  },
  {
    name: '电视剧',
    id: 2,
  },
  {
    name: '综艺',
    id: 3,
  },
  {
    name: '动漫',
    id: 4,
  }
  ]);

  const subTabList = ref([{
    name: '周榜'
  },
  {
    name: '月榜'
  },
  {
    name: '年榜'
  }
  ]);

  const topMovieList = ref<any>([]);
  const subMovieList = ref<any>([]);

  // 定义方法
  const onTabClick = (item : any) => {
    currentTab.value = item.index;
    subCurrentTab.value = 0;
    getVideos();
  }

  // 定义方法
  const onSubTabClick = (item : any) => {
    subCurrentTab.value = item.index;
    getVideos();
  }

  const getTopBgColor = (index : number) => {
    let color;
    if (index < 1) {
      color = "#ff0073";
    } else if (index < 2) {
      color = "#ff9056";
    } else {
      color = "#f7c4a8";
    }
    return color;
  }
  const getTopTitleColor = (index : number) => {
    let color;
    if (index < 2) {
      color = "#FFF";
    } else {
      color = "#964e27"
    }
    return color;
  }

  onMounted(() => {
    getVideos();
  })

  const getVideos = () => {
    topMovieList.value = [];
    subMovieList.value = [];
    let tabType = subCurrentTab.value;
    let tType = tabType + 1;
    let id = tabList.value[currentTab.value].id;
    store.getHotVideos(id, tType).then(((res : any) => {
      let list : Array<any> = res.data || [];
      topMovieList.value = list.slice(0, 3);
      subMovieList.value = list.slice(3);
    }))
  }

  const getUrl = (item : any) => {
    let url : string = item.surfacePlot;
    if (url.startsWith("http")) {
      return "url(" + url + ")";
    }
    return "url(/static" + url + ")";
  }
</script>

<style lang="scss" scoped>

</style>
