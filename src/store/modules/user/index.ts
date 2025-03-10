import { defineStore } from 'pinia';
import type { UserState, providerType } from './types';
import { UserApi } from '@/api';
import type { LoginParams, RegisterParams } from '@/api/user/types';
import { clearToken, setToken,getPlayer } from '@/utils/auth';

const useUserStore = defineStore('user', {
  state: () : UserState => ({
    // user_id: '',
    // user_name: '江阳小道',
    // avatar: '',
    // token: '',
    // nickname: '江阳小道',
    // email: "jyxd@gmail.com",
    // password: '123456',
    // six: 1,
  }),
  getters: {
    userInfo(state : UserState) : UserState {
      return { ...state };
    },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial : Partial<UserState>) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await UserApi.getUserProfile();
      this.setInfo(result);
    },
    getUserInfo() {
      return this.$state;
    },
    register(registerParams : RegisterParams) {
      return new Promise((r, j) => {
        let user = UserApi.register(registerParams);
        this.setInfo(user.data)
        r(user)
      })
    },
    // 异步登录并存储token
    login(loginForm : LoginParams) {
      return new Promise((resolve, reject) => {
        let info=getPlayer();
        if (loginForm.account == info.email && loginForm.password == info.password) {
          const token = info.token;
          if (token) {
            setToken(token);
          }
          resolve({ code: 200, message: "成功", data: info });
        }else{
          reject(null);
        }
        // UserApi.login(loginForm).then((res) => {
        //   const token = res.token;
        //   if (token) {
        //     setToken(token);
        //   }
        //   resolve(res);
        // }).catch((error) => {
        //   reject(error);
        // });
      });
    },
    // Logout
    async logout() {
      await UserApi.logout();
      this.resetInfo();
      clearToken();
    },
    // 小程序授权登录
    authLogin(provider : providerType = 'weixin') {
      return new Promise((resolve, reject) => {
        uni.login({
          provider,
          success: async (result : UniApp.LoginRes) => {
            if (result.code) {
              const res = await UserApi.loginByCode({ code: result.code });
              resolve(res);
            }
            else {
              reject(new Error(result.errMsg));
            }
          },
          fail: (err : any) => {
            console.error(`login error: ${err}`);
            reject(err);
          },
        });
      });
    },
  },
});

export default useUserStore;
