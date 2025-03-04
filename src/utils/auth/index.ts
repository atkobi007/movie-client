const TokenKey = 'admin-token';
const TokenPrefix = 'Bearer ';
function isLogin() {
  return !!uni.getStorageSync(TokenKey);
}
function getToken() {
  return uni.getStorageSync(TokenKey);
}
function setToken(token : string) {
  uni.setStorageSync(TokenKey, token);
}
function clearToken() {
  uni.removeStorageSync(TokenKey);
}
// 设置用户信息缓存
function setPlayer<T>(p : T) {
  uni.setStorageSync("user-xx-00", p)
}

function getPlayer() {
  let info = uni.getStorageSync("user-xx-00");
  if (info && (typeof (info) == 'string')) {
    return JSON.parse(info);
  }
  if (!info) return null;
  return info;
}

export { TokenPrefix, isLogin, getToken, setToken, clearToken, setPlayer, getPlayer };
