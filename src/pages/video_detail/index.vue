<template>
  <view style="width: 100%;height: 100%; display: flex;flex-direction: column;background-color: #101012;">
    <!-- transparent -->
    <up-navbar :autoBack="true" bgColor="transparent" height="50">
      <template #center>
        <up-notice-bar fontSize="14" style="margin-left: 60rpx;" height="50" bgColor="transparent" color="#FFF" icon=""
          :text="title"></up-notice-bar>
      </template>
      <template #left>
        <up-icon name="arrow-left" size="26" height="50" color="#FFF"></up-icon>
      </template>
    </up-navbar>

    <view style="width: 100%;height: 300rpx;margin-top: 100rpx;background-color: aliceblue;">
      <div id="player" style="width: 100%;height: 400rpx;background-color: aliceblue;"></div>
    </view>

    <view style="width: 100%;margin-top: 100rpx;">
      <up-tabs style="margin-left: 30rpx;" :list="tabList" @click="clickTab" lineColor="#00c9ff" lineHeight="1"
        :activeStyle="{
                  color: '#FFF',
                  fontWeight: 'bold',
                  transform: 'scale(1.05)'
              }" :inactiveStyle="{
                  color: '#CCC',
                  transform: 'scale(1)'
              }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"></up-tabs>

      <view v-if="currentIndex==0"
        style="margin-left: 20rpx;margin-right: 20rpx; margin-top: 30rpx; display: flex;flex-direction: column;">
        <view style="font-size: 30rpx;font-weight: bold;color: #FFF">{{videoData.title}}</view>
        <view style="display: flex;flex-direction: row;font-size: 20rpx;height: 50rpx;line-height: 50rpx;">
          <up-icon name="heart-fill" size="16" :label="videoData.popularitySum"></up-icon>
          <up-icon name="level" size="16" :label="videoData.doubanScore"></up-icon>
        </view>
        <up-read-more closeText="展开" :toggle="true" showHeight="50"
          :shadowStyle='{"paddingTop": "100px","marginTop": "-100px","backgroundImage": ""}'>
          <rich-text :nodes="videoData.introduce"></rich-text>
        </up-read-more>
        <!-- <view>详情说明</view> -->
        <view style="display: flex;flex-wrap: wrap;color: #CCC;margin-top: 40rpx;">
          <view @click="clickWhich(ix)" class="j-text"
            :style="{'background-color': ix==currentWhich?'#0e222a':'#17181a','border':ix==currentWhich?'1px #0e222a solid':'1px #17181a solid',}"
            v-for="(item,ix) in newLines" :key="ix">
            <view>第{{item[0].sort}}集</view>
          </view>
        </view>
      </view>

      <view v-if="currentIndex==1" style="height: 400rpx;">
        这里是评论
      </view>
    </view>


  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue';
  import DPlayer from 'dplayer';

  import {
    indexStore
  } from "@/store"

  const title = ref("")
  let dp = ref(null);
  const videoData = ref(null)
  const ixStore = indexStore();
  const lines = ref([])
  const newLines = ref([]);
  const currentWhich = ref(0)

  const currentIndex = ref(0)
  const tabList = ref([{
      name: '简介'
    },
    {
      name: '评论'
    }
  ]);

  onLoad((params) => {
    let item = localStorage.getItem("currentVideo");
    let info = JSON.parse(decodeURIComponent(item));
    videoData.value = info;
    title.value = info.title;
  })

  onMounted(() => {
    ixStore.getPlayLine(videoData.value.id).then(res => {
      //根据sort 或者 name 分组,相同的就算作是多条线路处理,有多条的就按名称显示集数
      let dataList = res || [];
      dataList.sort((a, b) => {
        return a.sort - b.sort;
      })

      for (let i = 0; i < dataList.length; i++) {
        let ix = dataList[i].sort - 1;
        if (!newLines.value[ix]) {
          newLines.value[ix] = [];
        }
        let info = {
          name: '线路' + (newLines.value[ix].length + 1),
          url: res[i].file,
          type: 'hls',
          sort: res[i].sort,
        }
        newLines.value[ix].push(info);
      }
      lines.value = newLines.value[currentWhich.value];
      initPlayer();
    })

  })

  const initPlayer = () => {
    let dPlayer = new DPlayer({
      container: document.getElementById('player'),
      autoplay: false,
      theme: '#FADFA3',
      loop: false,
      lang: 'zh-cn',
      screenshot: false,
      hotkey: false,
      preload: 'false',
      logo: '', ///static/images/logo.png
      volume: 0.7,
      mutex: false,
      video: {
        quality: lines.value,
        defaultQuality: 0,
        pic: getUrlPic(),
        thumbnails: getUrlPic(),
      },
      pluginOptions: {
        hls: {
          // hls config
        },
      },
      // subtitle: {
      //   url: 'dplayer.vtt',
      //   type: 'webvtt',
      //   fontSize: '25px',
      //   bottom: '10%',
      //   color: '#b7daff',
      // },
      // danmaku: {
      //   id: '9E2E3368B56CDBB4',
      //   api: 'https://api.prprpr.me/dplayer/',
      //   token: 'tokendemo',
      //   maximum: 1000,
      //   addition: ['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'],
      //   user: 'DIYgod',
      //   bottom: '15%',
      //   unlimited: true,
      //   speedRate: 0.5,
      // },
      // contextmenu: [{1234567890aZ@#$%^
      //     text: 'custom1',
      //     link: 'https://github.com/DIYgod/DPlayer',
      //   },
      //   {
      //     text: 'custom2',
      //     click: (player) => {
      //       console.log(player);
      //     },
      //   },
      // ],
      // highlight: [{
      //     time: 20,
      //     text: '这是第 20 秒',
      //   },
      //   {
      //     time: 120,
      //     text: '这是 2 分钟',
      //   },
      // ],
    });
    dp.value = dPlayer;
  }

  const getUrlPic = () => {
    let url = videoData.value.surfacePlot;
    if (url.startsWith("http")) {
      return url;
    }
    return "/static/" + url;
  }

  //销毁视频播放
  onBeforeUnmount(() => {
    try {
      let hls = dp.value.plugins['hls']
      hls.stopLoad && hls.stopLoad();
      hls.destory && hls.destory();
    } catch (e) {
      console.error(e)
    }
  })

  const clickTab = (t) => {
    currentIndex.value = t.index;
  }

  const clickWhich = (index) => {
    if (currentWhich.value == index) return;
    currentWhich.value = index;
    lines.value = newLines.value[index];
    dp.value.switchVideo(
      lines.value[0]
    );
    dp.value.play();
  }
</script>

<style scoped>
  .j-text {
    padding: 12rpx;
    /* border: 1px #CCC solid */
    ;
    margin-right: 16rpx;
    margin-bottom: 16rpx;
  }

  .j-text-select {
    background-color: #0e222a;
  }
</style>
