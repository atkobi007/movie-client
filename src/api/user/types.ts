export interface ProfileParams {
  user_id ?: string;
}

export interface LoginParams {
  account : string;
  password : string;
}

export interface RegisterParams {
  email : string;
  password : string;
  code : string;
}


export interface LoginByCodeParams {
  code : string;
}

export interface LoginByCodeResult {
  [key : string] : any;
}

export interface LoginResult {
  token : string;
  user_id : number;
  user_name : string;
  avatar : string;
  nickname ?: string;
  email ?: string;
  password ?: string;
  six ?: number,
  vipLevel ?: number;
}
