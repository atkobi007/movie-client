<template>
  <view style="margin-left: 20rpx;margin-right: 20rpx;margin-top: 20rpx;display: flex;flex-direction: column;">
    <view style="display: flex;flex-wrap: wrap;justify-content: space-between">
      <view v-bind:style="{'width':'49%','height': '500rpx','margin-top': '10rpx', 'margin-bottom': '10rpx'}"
        v-for="(item,index) in data" :key="index">
        <view style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;height: 100%;">
          <view @click="clickMovie(item)"
            v-bind:style="{'background-image':'url('+getConvUrl(item.surfacePlot)+')','background-size':'100% 100%','display': 'flex', 'flex-direction': 'column','justify-content': 'flex-end',  'flex': '1 1 100%'}">
            <view
              style="padding-bottom: 10rpx; padding-left: 15rpx;padding-right: 15rpx; display: flex;flex-direction: column;justify-content: space-between; font-size: 24rpx; height: 80rpx;line-height: 50rpx; color: #EEE; background: linear-gradient(to top,rgb(0,0,0,1),rgb(0,0,0,0));">
              <text style="color: #ff743d;font-size: 30rpx;font-weight: bold;">{{item.doubanScore/10}}</text>
              <view style="display: flex;flex-direction: row;justify-content: space-between">
                <up-icon space="1" name="heart-fill" color="#EEE" size="16" labelSize="12" labelColor="#EEE"
                  :label="getPlayerCount(item.popularitySum)"></up-icon>
                <text v-if="isShowUpdate()" style="font-size: 20rpx;">{{item.updateStatus}}</text>
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

  const isShowUpdate = () => {
    return props.data.type != 3;
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
