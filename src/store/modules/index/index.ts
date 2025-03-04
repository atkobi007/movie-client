import { defineStore } from 'pinia';
import type { IndexState, IndexResult, TabModel, MovieModel, Recommend } from '../index/types';
import { IndexApi } from '@/api';

const indexStore = defineStore('app', {
  state: () : IndexState => ({
    indexResult: new Map<number, IndexResult>,
    tabs: new Array<TabModel>(),
    recommendList: new Array<Recommend>()
  }),
  getters: {
    getIndexResult() : Map<number, IndexResult> {
      return this.indexResult;
    },
    getTabs() : Array<TabModel> {
      return this.tabs;
    },
    getRecommends() : Array<Recommend> {
      return this.recommendList;
    }
  },
  actions: {
    setIndexResult(index : number, info : IndexResult) {
      this.indexResult.set(index, info)
    },
    //获取推荐数据信息
    async getActionRecommend() {
      return new Promise((r, _) => {
        if (this.recommendList.length > 0) {
          r(this.recommendList);
          return;
        }
        IndexApi.getRecommendResult().then(res => {
          console.error("getRecommendResult:", res)
          this.recommendList = res.data;
          r(this.recommendList);
        }).catch(err => {
          console.error("getRecommendResult:", err);
        })

      })
    },
    //获取首页tab数据
    async getActionTabs() {
      return new Promise((r, _) => {
        if (this.tabs.length > 0) {
          r(this.tabs);
          return;
        }
        IndexApi.getTabs().then(res => {
          if (res.code === 200) {
            let list = res.data;
            list.sort((a, b) => {
              return a.sort - b.sort;
            })
            this.tabs = list;
            r(this.tabs);
          } else {
            r(this.tabs);
          }
        }).catch(_ => {
          r(this.tabs);
        })
      });
    },

    //获取分类视频信息
    async getVideos(pageIndex : number, pageSize : number, categoryPid : number, categoryChildId : number) {
      return new Promise((r, _) => {


        IndexApi.getVideos({ pageIndex: pageIndex, pageSize: pageSize, categoryPid: categoryPid, categoryChildId: categoryChildId }).then(res => {
          if (res.code == 200) {
            let list = res.data;
            r(res)
          }
        }).catch(err => {
          r([])
        })
      });
    },

    //获取分类视频信息
    async getHotVideos(categoryPid : number, tabType : number) {
      return new Promise((r, _) => {

        IndexApi.getHotVideos({ categoryPid: categoryPid, tabType: tabType }).then(res => {
          if (res.code == 200) {
            let list = res.data;
            r(res)
          }
        }).catch(err => {
          r([])
        })
      });
    },

    //获取播放地址信息
    async getPlayLine(videoId : number) {
      return new Promise((r, _) => {
        IndexApi.getPlayLine({ videoId: videoId }).then(res => {
          console.error(res)
          if (res.code == 200) {
            let list = res.data;
            r(list)
          }
        })
      })
    },
    initIndexResult() {
      this.indexResult = new Map<number, IndexResult>()
      this.indexResult.set(0, {
        banners: [{
          title: "xx",
          image: "/src/static/images/banner/banner1.jpg"
        }, {
          title: "xx",
          image: "/src/static/images/banner/banner2.jpg"
        }, {
          title: "xx",
          image: "/src/static/images/banner/banner3.jpg"
        }]
      })
      this.indexResult.set(1, {
        banners: [{
          title: "xx",
          image: "/src/static/images/banner/banner2.jpg"
        }, {
          title: "xx",
          image: "/src/static/images/banner/banner3.jpg"
        }]
      })
    },
    getIndexResultByIndex(index : number) : Promise<any> {
      return new Promise((resolve, reject) => {
        let data = this.indexResult.get(index);
        if (data) {
          resolve(data)
          return;
        }
        IndexApi.getIndexResult().then((res : any) => {
          if (res.ret === 200) {
            let list = res.data.list;
            for (let i = 0; i < list.length; i++) {
              let bannerList = list[i].bannerList;
              for (let j = 0; j < bannerList.length; j++) {
                let url = bannerList[j].showURL;
                bannerList[j]['image'] = url;
              }
            }
            this.indexResult.set(index, list);
            resolve(this.indexResult.get(index))
          } else {
            reject([])
          }
        }).catch(err => {
          console.error(err)
          reject([])
        })
      });
    }
  },
});

export default indexStore;
