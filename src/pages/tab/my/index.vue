<template>
  <view style="width: 100%;height: 100vh;background-color: #101012;display: flex;flex-direction: column;">
    <view style="width:100%; height: 200px;
    background-image: url(/static/images/my/my_bg.webp);background-size: 100% 100%;">
      <view style="display: flex;height: 60px;padding-right: 20px;justify-content: flex-end;"><up-icon name="scan"
          color="#AAA" size="30"></up-icon></view>
      <view
        style="display: flex;margin-left: 20px;margin-right: 20px;margin-top: 20px; justify-content: space-between;align-items: flex-end;">
        <view style="display: flex;flex-direction: row;align-items: center;">
          <up-icon name="/static/images/my/avatar.webp" color="#2979ff" size="80"></up-icon>
          <view @click="toLogin"
            style="margin-left: 10px;display: flex;flex-direction: row;align-items: center;color: #FFF;">
            <span v-if="!isLogin" style="font-weight: bold;">登录/注册</span>
            <span v-if="isLogin" style="font-size: 24px;">{{loginInfo.nickname}}</span>
            <up-icon v-if="isLogin" :name="getSix()" :color="getSixColor()" size="30"></up-icon>
          </view>
        </view>
        <view><up-image src="/static/images/my/my_float_sign.png" width="66px" height="48px"></up-image></view>
      </view>
    </view>

    <!-- 关注 -->
    <view
      style="display: flex;flex-direction: row;justify-content: space-between;margin-left: 20px;margin-right: 20px;">
      <view style="display: flex;flex-direction: column;align-items: center;width: 80px;"
        v-for="(item,ix) in titleNames" :key="ix">
        <span style="color: #CCC;">-</span>
        <view style="margin-top: 2px;color: #AAA;font-size: 14px;">{{item}}</view>
      </view>
    </view>

    <!-- VIP广告 -->
    <view style="display: flex;flex-direction: row;height: 60px;margin:20px 20px;
    background:linear-gradient(to right,#4582e8,#8b3bfd);border-radius: 4px;
    align-items: center;justify-content: center;color:#FFF;font-weight: bold;">
      <span>开通VIP,享高清片源等9大特权</span>
    </view>

    <!-- 离线视频 -->
    <view
      style="display: flex;flex-direction: row;justify-content: space-between;margin-left: 20px;margin-right: 20px;">
      <view style="display: flex;flex-direction: column;align-items: center;" v-for="(item,ix) in iconNames" :key="ix">
        <up-icon :name="getIconUrl(0,ix)" color="#2979ff" size="30"></up-icon>
        <view style="margin-top: 5px;color: #AAA;">{{item}}</view>
      </view>
    </view>

    <!-- 个人服务 -->
    <view style="margin: 20px;">
      <view style="font-weight: bold;font-size: 24px;color:#FFF;">个人服务</view>
      <template v-for="(subs,index) in serviceNames" :key="index">
        <view
          style="display: flex;flex-direction: row;justify-content: space-between;margin:15px 20px;font-size: 16px;color:#ccc;">
          <view style="display: flex;flex-direction: column;align-items: center;" v-for="(item,ix) in subs" :key="ix">
            <up-icon :name="getIconUrl(index+1,ix)" color="#2979ff" size="30"></up-icon>
            <view style="margin-top: 5px;">{{item}}</view>
          </view>
        </view>
      </template>

    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import {
    getPlayer
  } from '@/utils/auth';

  import {
    useUserStore
  } from '@/store';
  const userStore = useUserStore();
  const isLogin = ref(false);
  const loginInfo = getPlayer(); //userStore.getUserInfo();
  console.error(loginInfo)
  if (loginInfo && loginInfo['email']) {
    isLogin.value = true;
  }

  const titleNames = ref(["关注", "粉丝", "等级", "金币"]);
  const iconNames = ref(["离线视频", "历史记录", "我的收藏", "消息"]);
  const serviceNames = ref([
    ["赚金币", "广告中心", "VIP开通记录", "大V认证"],
    ["求片", "帮助中心", "联系客服", "设置"]
  ])

  const getSixColor = () => {
    if (loginInfo.value) {
      let six = loginInfo.value.six;
      return six == 1 ? "#2979ff" : six == 3 ? "#2979ff" : "#ca2716";
    }
    return "#2979ff";
  }

  const getSix = () => {
    if (loginInfo.value) {
      let six = loginInfo.value.six;
      return six == 1 ? "man" : six == 3 ? "backspace" : "woman";
    }
    return "backspace";
  }

  const getIconUrl = (row, col) => {
    let c = row * 4 + col;
    let url = '/static/images/my/my_icon_' + c + '.png';
    return url;
  }

  const toLogin = () => {
    if (!isLogin.value) { //没有登录,打开登录界面
      uni.navigateTo({
        url: "/pages/login/index"
      })
    }
  }
</script>

<style>

</style>
