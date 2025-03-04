<template>
  <view style="margin:20rpx;display: flex;flex-direction: column;">
    <up-text lineHeight="35" color="#DDD" size="21" :bold="true" :text="data.name"></up-text>
    <view style="display: flex;flex-wrap: wrap;justify-content: space-between">
      <view @click="clickMovie(item)" style="width: 49%;height: 300rpx;margin-top: 10rpx; margin-bottom: 10rpx;" v-for="(item,index) in data.list"
        :key="index">
        <view style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;height: 100%;">
          <view v-bind:style="{'background-image':'url('+item.coverImgUrl+')','background-size':'100% 100%','display': 'flex', 'flex-direction': 'column','justify-content': 'flex-end',  'flex': '1 1 100%'}">
            <view style="padding-left: 10rpx;padding-right: 10rpx; display: flex;flex-direction: row;justify-content: space-between; font-size: 24rpx; height: 50rpx;line-height: 50rpx; color: #EEE; background: linear-gradient(to top,rgb(0,0,0,1),rgb(0,0,0,0));">
              <up-icon name="heart-fill" color="#EEE" size="14" labelSize="10" labelColor="#EEE" :label="item.playCount"></up-icon>
              <text>{{item.duration}}</text>
            </view>
          </view>
          <up-text margin="5rpx" color="#DDD" size="14" :text="item.title" lines="1"></up-text>
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

  import {clickMovie} from "../../pages/opts"

  const props = defineProps({
    data: Object
  })
</script>

<style>
</style>
