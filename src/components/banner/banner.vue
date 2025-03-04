<template>
  <view style="height: 300rpx;">
    <up-swiper v-if="banners.length>0" bgColor="transparent" height="300rpx" :list="banners" keyName="image" showTitle
      indicatorStyle="right: 10px" circular @change="onSwiperChanged" @click="onClickBanner">
      <template #indicator>
        <view class="indicator">
          <view class="indicator__dot" v-for="(item, index) in banners" :key="index"
            :class="[index === current && 'indicator__dot--active']">
          </view>
        </view>
      </template>
    </up-swiper>
    <up-skeleton titleWidth="100%" titleHeight="300rpx" v-if="banners.length<=0" :loading="true"
      :animate="true"></up-skeleton>
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue';

  import {
    clickBanner
  } from "../../pages/opts"

  const current = ref(0)
  const props = defineProps({
    banners: Array
  })

  const onSwiperChanged = (data) => {
    if (current.value != data.current) {
      current.value = data.current;
    }
  }


  const onClickBanner=(index)=>{
    clickBanner(props.banners[index]);
  }
</script>
<style lang="scss">
  .indicator {
    @include flex(row);
    justify-content: center;

    &__dot {
      height: 1px;
      width: 8px;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.35);
      margin: 0 3px;
      transition: background-color 0.3s;

      &--active {
        background-color: #00e0ff;
      }
    }
  }
</style>
