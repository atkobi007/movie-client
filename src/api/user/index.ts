/**
 * 用户信息相关接口
 */
import type { LoginByCodeParams, LoginByCodeResult, LoginParams, LoginResult, ProfileParams, RegisterParams } from './types';
import { get, post } from '@/utils/request';
import type { UserState } from '@/store/modules/user/types';
import type { CommonResult } from '@/api/common/types';

enum URL {
  login = '/user/login',
  loginByCode = '/user/loginByCode',
  logout = '/user/logout',
  profile = '/user/profile',
}

export const getUserProfile = (params ?: ProfileParams) : UserState => {
  let info : UserState = {
    user_id: '1',
    user_name: '江阳小道',
    avatar: '',
    token: 'xxxxx',
    nickname: '江阳小道',
    email: "jyxd@gmail.com",
    password: '123456',
    six: 1,
  }
  return info
  // return new Promise((r, j):Promise<UserState> => {
  //   let info : UserState = {
  //     user_id: '1',
  //     user_name: '江阳小道',
  //     avatar: '',
  //     token: 'xxxxx',
  //     nickname: '江阳小道',
  //     email: "jyxd@gmail.com",
  //     password: '123456',
  //     six: 1,
  //   }
  //   return info
  // })
}
export const login = (data : LoginParams) => post<LoginResult>({ url: URL.login, data });
export const loginByCode = (data : LoginByCodeParams) => post<LoginByCodeResult>({ url: URL.loginByCode, data });
export const logout = () => post<CommonResult>({ url: URL.logout });
export const register = (data : RegisterParams) => {
  let info : UserState = {
    user_id: '1',
    user_name: '江阳小道',
    avatar: '',
    token: 'xxxxx',
    nickname: '江阳小道',
    email: data.email,
    password: data.password,
    six: 1,
  }
  return {
    code: 200,
    message: "成功",
    data: info
  }
}
