<template>
  <view style="margin-left: 20rpx;margin-right: 20rpx;margin-top: 20rpx;display: flex;flex-direction: column;">
    <view style="display: flex;flex-direction: row;">
      <span
        style="margin-right: 6rpx; font-weight: bold;height: 50rpx;line-height: 50rpx;color: #DDD;font-size: 40rpx;">{{data.name}}</span>
      <up-icon name="arrow-right" color="#777"></up-icon>
    </view>
    <view style="display: flex;flex-wrap: wrap;justify-content: space-between">
      <view v-bind:style="{'width': '100%','height': '380rpx','margin-top': '10rpx', 'margin-bottom': '10rpx'}">
        <view style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;height: 100%;">
          <view @click="clickMovie(data.list[0])"
            v-bind:style="{'background-image':'url('+getConvUrl(data.list[0].surfacePlot)+')','background-size':'100% 100%','display': 'flex', 'flex-direction': 'column','justify-content': 'flex-end',  'flex': '1 1 100%'}">
            <view
              style="padding-bottom: 10rpx; padding-left: 15rpx;padding-right: 15rpx; display: flex;flex-direction: column;justify-content: space-between; font-size: 24rpx; height: 80rpx;line-height: 50rpx; color: #EEE; background: linear-gradient(to top,rgb(0,0,0,1),rgb(0,0,0,0));">
              <text style="color: #ff743d;font-size: 30rpx;font-weight: bold;">{{data.list[0].score}}</text>
              <view style="display: flex;flex-direction: row;justify-content: space-between">
                <up-icon space="1" name="heart-fill" color="#EEE" size="16" labelSize="12" labelColor="#EEE"
                  :label="getPlayerCount(data.list[0].doubanScore)"></up-icon>
                <text v-if="isShowUpdate()" style="font-size: 20rpx;">{{data.list[0].note}}</text>
              </view>
            </view>
          </view>
          <view style="display: flex;flex-direction: row;align-items: center;height: 80rpx;">
            <up-text style="display: flex;flex: 1;" color="#DDD" size="17" :text="data.list[0].title"
              lines="1"></up-text>
            <span style="color: #777;font-size: 20rpx;">{{data.list[0].contentType}}</span>
          </view>
        </view>
      </view>

      <view v-bind:style="{'width':'49%','height': '500rpx','margin-top': '10rpx', 'margin-bottom': '10rpx'}"
        v-for="(item,index) in data.list.filter((v,ix)=>{return ix>0})" :key="index">
        <view style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;height: 100%;">
          <view @click="clickMovie(item)"
            v-bind:style="{'background-image':'url('+getConvUrl(item.surfacePlot)+')','background-size':'100% 100%','display': 'flex', 'flex-direction': 'column','justify-content': 'flex-end',  'flex': '1 1 100%'}">
            <view
              style="padding-bottom: 10rpx; padding-left: 15rpx;padding-right: 15rpx; display: flex;flex-direction: column;justify-content: space-between; font-size: 24rpx; height: 80rpx;line-height: 50rpx; color: #EEE; background: linear-gradient(to top,rgb(0,0,0,1),rgb(0,0,0,0));">
              <text style="color: #ff743d;font-size: 30rpx;font-weight: bold;">{{item.score}}</text>
              <view style="display: flex;flex-direction: row;justify-content: space-between">
                <up-icon space="1" name="heart-fill" color="#EEE" size="16" labelSize="12" labelColor="#EEE"
                  :label="getPlayerCount(item.doubanScore)"></up-icon>
                <text v-if="isShowUpdate()" style="font-size: 20rpx;">{{item.note}}</text>
              </view>
            </view>
          </view>
          <view
            style="background-color: #17181a;color: #DDD; height: 100rpx;padding: 10rpx;display: flex;flex-direction: column;">
            <up-text color="#DDD" size="17" :text="item.title" lines="1"></up-text>
            <span style="font-size: 22rpx;color: #777;">{{item.cidMapper}}</span>
          </view>
        </view>
      </view>

    </view>
  </view>
  <!-- <view style="background-color: #17181a;width: 100%; height: 60rpx; margin-top:5rpx;
  display: flex;flex-direction: row;justify-content: space-evenly;align-items: center;">
    <view style="width: 180rpx;display: flex;justify-content: center"><up-icon space="3"
        name="/static/images/index/movie_icon.png" size="14" labelSize="12" labelColor="#888"
        :label="getTypeStr()"></up-icon></view>
    <span v-if="!isDongman()" style="width: 2rpx;height: 40rpx;background-color: #444;"></span>
    <view v-if="!isDongman()" style="width: 180rpx;display: flex;align-items: center;"><up-icon space="3"
        name="/static/images/index/refresh.png" size="14" labelSize="12" labelColor="#888" label="换一换"></up-icon></view>
  </view> -->
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue';
  import {
    clickMovie
  } from "../../pages/opts"

  const props = defineProps({
    data: Object,
  })

  const getPlayerCount = (count) => {
    if (count > 9999) {
      let d = count / 10000;
      return d.toFixed(2) + "万";
    }
    return count + "";
  }

  const getTypeStr = () => {
    switch (props.data.type) {
      case 3:
        return "更多精彩影片";
      case 4:
        return "更多电视剧";
      case 5:
        return "更多综艺";
      case 6:
        return "更多动漫";
    }
  }
  const isShowUpdate = () => {
    return props.data.type != 3;
  }
  const isDongman = () => {
    return props.data.type == 6;
  }

  const getConvUrl = (urlStr) => {
    let url = urlStr;
    if (url.indexOf("http") == -1 && url.indexOf("/static/") == -1) {
      url = "/static/" + url;
    }
    return url;
  }
</script>

<style>
</style>
