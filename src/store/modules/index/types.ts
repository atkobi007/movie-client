export interface IndexResult {
  banners : any
}

export interface IndexState {
  indexResult : Map<number, IndexResult>;
  tabs : Array<TabModel>;
  recommendList : Array<Recommend>;
}

export interface TabResultState {
  code : number;
  message : string;
  data : Array<TabModel>
}

export interface TabModel {
  id : number;
  title : number;
  sort : number;
  subTabs : Array<TabModel>;
}


export interface MovieModel {
  id : number;//                    int64  `json:"id"`
  title : string;//                 string `json:"title"` // 影片标题
  categoryPid : number;//          int64  `json:"categoryPid"` // 分类一级id
  categoryChildId : number;//       int64  `json:"categoryChildId"` // 分类二级id
  surfacePlot : string;//        string `json:"surfacePlot"` // 影片封面图
  recommend : number;//        int64  `json:"recommend"` // 是否推荐 1是 2否
  cycle : number;//         int64  `json:"cycle"` // 是否轮播 1是 2否
  cycleImg : string;//       string `json:"cycleImg"` // 轮播图片
  chargingMode : number;//      int64  `json:"chargingMode"` // 收费模式 1免费 2vip免费 3金币点播
  buyMode : number;//      int64  `json:"buyMode"` // 购买模式 1按部 2按集
  gold : number;//      int64  `json:"gold"` // 金币点播值
  directors : string;//     string `json:"directors"` // 导演
  actors : string;//     string `json:"actors"` // 演员
  imdbScore : number;//     int64  `json:"imdbScore"` // imd评分.百分制
  imdbScoreId : string;//     string `json:"imdbScoreId"` // imd评分ID
  doubanScore : number;//     int64  `json:"doubanScore"` // 豆瓣评分.百分制
  doubanScoreId : string;//     string `json:"doubanScoreId"` // 豆瓣评分ID
  introduce : string;//     string `json:"introduce"` // 简介
  popularityDay : number;//     int64  `json:"popularityDay"` // 日人气
  popularityWeek : number;//     int64  `json:"popularityWeek"` // 周人气
  popularityMonth : number;//      int64  `json:"popularityMonth"` // 月人气
  popularitySum : number;//     int64  `json:"popularitySum"` // 总人气
  note : string;//     string `json:"note"` // 连载状态
  year : string;//     string `json:"year"` // 年份
  albumId : number;//     int64  `json:"albumId"` // 关联专题id
  status : number;//     int64  `json:"status"` // 状态
  create_at : number;//     int64  `json:"create_at"`
  update_at : number;//     int64  `json:"update_at"`
  duration : number;//      int64  `json:"duration"` // 时长(单位s)
  region : string;//     string `json:"region"` // 自定义地区
  language : string;//     string `json:"language"` // 自定义语言
  label : string;//     string `json:"label"` // 自定义标签
  number : number;//      int64  `json:"number"` // 总集数
  total : number;//     int64  `json:"total"` // 更新集数
  horizontalPoster : string;//     string `json:"horizontalPoster"` // 横屏海报
  verticalPoster : string;//      string `json:"verticalPoster"` // 竖屏海报
  publish : string;//     string `json:"publish"` // 发行商
  serialNumber : string;//     string `json:"serialNumber"` // 序列号
  screenshot : string;//     string `json:"screenshot"` // 截屏
  gif : string;//    string `json:"gif"`
  alias : string;//     string `json:"alias"`
  releaseAt : number;//     int64  `json:"releaseAt"`
  shelfAt : number;//   int64  `json:"shelfAt"`
  end : number;//     int64  `json:"end"`
  unit : string;//     string `json:"unit"`
  watch : number;//     int64  `json:"watch"`
  collection_id : number;//    int64  `json:"collection_id"`
  useLocalImage : number;//     int64  `json:"useLocalImage"`
  titles_time : number;//    int64  `json:"titles_time"` // 片头时间
  trailerTime : number;//    int64  `json:"trailerTime"` // 片尾时间
  siteId : number;//   int64  `json:"siteId"` // 站点id
  categoryPidStatus : number;//   int64  `json:"categoryPidStatus"` // 顶级分类状态
  categoryChildIdStatus : number;//  int64  `json:"categoryChildIdStatus"` // 子级分类状态
  playUrl : string;//  string `json:"playUrl"` // 采集的源地址
  playUrlPutIn : number;//  int64  `json:"playUrlPutIn"` // 播放地址是否入库1-已经入库
}


export interface Recommend {
  bannerList : Array<MovieModel>;// []*MovieModel `json:"bannerList" dc:"banner数据"`
  list : Array<MovieModel>;//      []*MovieModel `json:"list" dc:"数据"`
  type : number;//         `json:"type" dc:"推荐页面0, 其他页面按分类id"`
  name : string;//       `json:"name" dc:"分类名称,服务器直接定义"`
  sort : number;//类型排序
}

export interface RecommendState {
  code : number;
  message : string;
  data : Array<Recommend>
}

export interface VideoState {
  code : number;
  message : string;
  data : Array<MovieModel>;
  bannerList : Array<MovieModel>;
  total : number;
}
export interface VideoHotState {
  code : number;
  message : string;
  data : Array<MovieModel>;
}

//播放地址信息
export interface PlayLineModel {
  id : number;
  videoLineId : number;//视频线路ID
  videoId : number;//视频ID
  name : string;//线路集数名称
  sort : number;//排序
  file : number;//播放地址
  chargingMode : number;//收费模式 1免费 2vip免费 3金币点播
  currency : number;//金币数量
  subTitle : string;//副标题
  status : number;//状态
  createAt : number;//创建时间
  updateAt : number;//更新时间
  siteId : number;//站点id
  tag : string;//标识 kcm3u8
  liveSource : number;//是否是直播源1-是 0-否
}
export interface PlayLineResultState {
  code : number;
  message : string;
  data : Array<PlayLineModel>
}
