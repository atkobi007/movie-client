/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  // eslint-disable-next-line ts/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'uview-plus';
declare module 'uview-plus/libs/mixin/mpShare.js';
declare module 'vue3-video-play/dist/index.mjs'
