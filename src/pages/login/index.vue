<template>
  <view style="width: 100%;display: flex;flex-direction: column;background-color: #101012;">
    <up-navbar bgColor="transparent" leftText="" title="" :safeAreaInsetTop="true" @leftClick="leftClick">
      <template #left>
        <up-icon name="arrow-left" color="#FFF" size="19"></up-icon>
      </template>
    </up-navbar>

    <view style="color: #FFF;font-size: 20px;margin-top: 80px;margin-left: 30px;margin-right: 30px;">
      <view v-if="optType==0">
        <view>账号/邮箱登录</view>
        <view style="height: 60px;"></view>
        <view style="font-size: 14px;">账号</view>
        <up-input v-model="l_email" color="#AAA" placeholder="请输入账号/邮箱" border="bottom" clearable
          fontSize="13px"></up-input>
        <view style="margin-top: 30px;font-size: 14px;">密码</view>
        <up-input v-model="l_pwd" color="#AAA" :password="showPwd" placeholder="请输入登录密码" border="bottom"
          :clearable="false" fontSize="13px">
          <template #suffix>
            <up-icon :name="getPwdIcon()" @click="onShowPwdIcon"></up-icon>
          </template>
        </up-input>
      </view>

      <view v-if="optType==1">
        <view>邮箱注册</view>
        <view style="height: 60px;"></view>
        <view style="font-size: 14px;">邮箱</view>
        <up-input v-model="r_email" color="#AAA" placeholder="请输入邮箱" border="bottom" clearable
          fontSize="13px"></up-input>
        <view style="margin-top: 30px;font-size: 14px;">密码</view>
        <up-input v-model="r_pwd" color="#AAA" :password="showPwd" placeholder="请输入登录密码" border="bottom"
          :clearable="false" fontSize="13px">
          <template #suffix>
            <up-icon :name="getPwdIcon()" @click="onShowPwdIcon"></up-icon>
          </template>
        </up-input>
        <view style="margin-top: 30px;font-size: 14px;">验证码</view>
        <up-input color="#AAA" type="number" maxlength="6" placeholder="请输入验证码" border="bottom" :clearable="false"
          fontSize="13px">
          <template #suffix>
            <view @click="getCode">
              <span style="font-size: 14px;color: #0aa0f9;">{{codeTips}}</span>
              <up-code style="color: #FFF;" :seconds="seconds" ref="uCodeRef" @change="codeChange"></up-code>
            </view>
          </template>
        </up-input>
      </view>

      <view style="text-align: center; margin-top: 30px; height: 40px;line-height: 40px; width: 100%;
        border-radius: 2px; background: linear-gradient(to right,#00bbff,#00dcff);
        font-size: 14px; " @click="toNextOpt">{{getOptType()}}</view>

      <view @click="toRegister" v-if="optType==0"
        style="width: 100%;text-align: center;color: #CCC; margin-top: 15px;font-size: 12px;">
        没有账号? 去注册</view>
    </view>


    <view style="position: fixed;bottom: 0px;width: 100%;height: 60px;color: #CCC;font-size: 13px;text-align: center;">
      <view>登录/注册均表示</view>
      <view>您已民阅读同意&nbsp;&nbsp;<span style="color: #0aa0f9;">用户协议和隐私政策</span></view>
    </view>

  </view>
</template>

<script setup>
  import {
    useUserStore
  } from '@/store';
  import {
    setPlayer
  } from '@/utils/auth';
  const userStore = useUserStore();

  const showPwd = ref(false)
  const optType = ref(0); //操作类型 0:登录 1:注册
  const seconds = ref(30);
  const uCodeRef = ref(null);
  const codeTips = ref("");

  //登录
  const l_pwd = ref("");
  const l_email = ref("");

  //注册
  const r_pwd = ref("");
  const r_email = ref("");

  const codeChange = (text) => {
    codeTips.value = text;
  };

  const getCode = () => {
    if (uCodeRef.value.canGetCode) {
      // 模拟向后端请求验证码
      uni.$u.toast('验证码已发送');
      uni.hideLoading();
      // 这里此提示会被start()方法中的提示覆盖
      // 通知验证码组件内部开始倒计时
      uCodeRef.value.start();
    } else {
      uni.$u.toast('倒计时结束后再发送');
    }
  };

  //点击登录/注册
  const toNextOpt = () => {
    if (optType.value === 0) { //登录
      userStore.login({
        account: l_email.value,
        password: l_pwd.value
      }).then((res) => {
        setPlayer(res.data);
        //登录成功,跳到主页面
        uni.reLaunch({
          url: '/pages/tab/home/index'
        });
      }).catch(e => {
        console.error(e)
        uni.$u.toast('登录失败');
      })
    } else { //注册
      userStore.register({
        email: r_email.value,
        password: r_pwd.value,
        code: 0
      }).then(res => {
        setPlayer(res.data);
        //注册成功,跳到登录
        optType.value = 0;
      }).catch(e => {
        console.error(e)
        uni.$u.toast('注册失败');
      })
    }
  }

  const toRegister = () => {
    optType.value = 1;
  }

  const getPwdIcon = () => {
    if (!showPwd.value) {
      return "eye-fill";
    }
    return "eye-off";
  }
  const getOptType = () => {
    return optType.value == 1 ? "下一步" : "登录";
  }

  const onShowPwdIcon = () => {
    showPwd.value = !showPwd.value
  }

  const leftClick = () => {
    if (optType.value == 1) {
      optType.value = 0;
      return;
    }
    const pages = getCurrentPages();
    if (pages.length > 1) {
      uni.navigateBack()
    } else {
      uni.reLaunch({
        url: '/pages/tab/home/index'
      });
    }

    uni.navigateBack({
      data: 1,
      success: () => {
        console.error("success")
      },
      fail: (e) => {
        console.error("fail", e)
      }
    });
  }
</script>

<style>
</style>
