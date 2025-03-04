<template>
  <view style="width: 100%;background-color: #101012;display: flex;flex-direction: column;">



    <!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
    <z-paging ref="paging" v-model="dataList" :loading-more-enabled="false" :auto-scroll-to-top-when-reload="false"
      @query="queryList">

      <view style="display: flex;flex-direction: column;margin: 30px 20px;">
        <view
          style="background-image: url(/static/images/vip/userinfo_bg.png);background-size: 100% 100%;height: 70px;">
          <view
            style="margin: 0px 25px;height: 50px;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
            <view style="display: flex;flex-direction: row;">
              <up-icon name="/static/images/my/avatar.webp" size="30px"></up-icon>
              <view v-if="loginInfo==null" style="display: flex;flex-direction: column;margin-left: 8px;align-items: flex-start;">
                <span style="color: #CCC;font-size: 12px;margin-top: 3px;">登录/注册</span>
              </view>
              <view v-else="loginInfo!=null" style="display: flex;flex-direction: column;margin-left: 8px;align-items: flex-start;">
                <up-icon name="level" labelColor="#FFF" space="5px" :bold="true" :label="loginInfo.nickanme" labelPos="left"></up-icon>
                <span style="color: #CCC;font-size: 12px;margin-top: 3px;">{{getVip()}}</span>
              </view>
            </view>
            <view
              style="color:#972d19;background: linear-gradient(to bottom,#fee8c2,#fec2a2);padding: 5px 10px;border-radius: 3px;font-weight: bold;">
              开通VIP</view>
          </view>
        </view>

        <!-- INFO -->
        <view
          style="padding-top: 15px; display: flex;flex-direction: column;background: linear-gradient(to bottom,#feeac4,#fec2a2);border-radius: 0px 0px 10px 10px;">
          <up-image :show-loading="true" src="/static/images/vip/vip_title.webp" width="100%" height="30px"></up-image>
          <!-- Grid -->
          <view style="padding-bottom: 40px;">
            <template v-for="(subs,index) in titleNames" :key="index">
              <view
                style="margin-top: 40px; width: 100%; display: flex;flex-direction: row;justify-content: space-evenly;">
                <view style="display: flex;flex-direction: column;align-items: center;width: 100px;"
                  v-for="(item,ix) in subs" :key="ix">
                  <up-image :show-loading="true" :src="getIconUrl(index,ix)" width="50px" height="30px"></up-image>
                  <view style="margin-top: 10px;color: #444244;font-size: 12px;">{{item}}</view>
                </view>
              </view>
            </template>
          </view>
        </view>

        <!-- List -->
        <view style="display: flex;flex-direction: column;">
          <view v-for="(item,ix) in listInfos" :key="ix"
            style="display: flex;flex-direction: row;width: 100%;height: 60px;justify-content: space-between;">
            <view style="display: flex;width: 100%;flex-direction: row;color:#EEE;align-items: center;font-size: 18px;">
              <up-image :show-loading="true" :src="getSubIconUrl(ix)" width="24px" height="24px"></up-image>
              <span style="margin-left: 10px;">{{item}}</span>
            </view>
            <up-icon name="arrow-right"></up-icon>
          </view>

        </view>

      </view>

      <up-gap height="40" bgColor="transparent"></up-gap>
    </z-paging>


  </view>
</template>

<script setup>
  import {
    ref
  } from "vue";
  import {
    getPlayer
  } from '@/utils/auth';

  let p = getPlayer();
  const loginInfo = ref(p);

  const dataList = ref([])
  const titleNames = ref([
    ["超清4K", "过滤播放器广告", "求片"],
    ["云加速", "倍速播放", "求片"],
    ["自定义弹幕", "VIP表情包", "发起投票权"]
  ]);

  const listInfos = ref(["会员代充", "会员兑换", "常见问题", "VIP会员服务条款"]);

  const getIconUrl = (row, col) => {
    let c = row * 3 + col;
    let url = '/static/images/vip/vip_' + c + '.png';
    return url;
  }
  const getSubIconUrl = (ix) => {
    let url = '/static/images/vip/vip_icon_' + ix + '.png';
    return url;
  }

  const getVip=()=>{
    if(loginInfo.value){
      return loginInfo.groupId==3?"VIP会员":loginInfo.groupId==2?"普通会员":"你还未开通VIP";
    }
    return "游客";
  }

  // @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
  const queryList = (pageNo, pageSize) => {
    // 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
    // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
    // 模拟请求服务器获取分页数据，请替换成自己的网络请求
    //paging.value.complete([21, 3, 3, 3, 3, 4]);
  }
</script>

<style>

</style>
