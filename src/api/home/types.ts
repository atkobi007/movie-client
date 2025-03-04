export interface IndexParams {
  // phone: string;
  // code: string;
}
export interface IndexResult {

}

export interface PlayLineParams {
  videoId : number;
}

export interface VideoParams {
  pageIndex : number;
  pageSize : number;
  categoryPid : number;//一级分类id
  categoryChildId : number;//二级分类id
}

export interface HotVideoParams {
  categoryPid : number;//一级分类id
  tabType : number;//热播类型 0:天热播  1:周热播  2:月热播  3:年热播
}
