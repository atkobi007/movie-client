export type RoleType = '' | '*' | 'user';
export interface UserState {
  user_id ?: string;
  user_name ?: string;
  avatar ?: string;
  token ?: string;
  nickname ?: string;
  email ?: string;
  password ?: string;
  six ?: number,
  vipLevel ?: number;
}

export type providerType =
  | 'weixin'
  | 'qq'
  | 'sinaweibo'
  | 'xiaomi'
  | 'apple'
  | 'univerify'
  | undefined;
