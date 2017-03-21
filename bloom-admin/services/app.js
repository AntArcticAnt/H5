import { request, fetch } from '../utils/request'
import {AL} from '../utils'
import Cookie from 'js-cookie';

const login = async({
  username,
  password,
}) => {

  AL.log("--- 登录请求 ---")
  AL.log("username",username)
  AL.log("password",password)

  const URL = `/app/login`;
  const success = await fetch(URL, {
    username,
    password,
  });

  if (success){
    const now = new Date();
    now.setDate(now.getDate() + 1);
    Cookie.set('user_session', now.getTime());
    Cookie.set('user_name', username);
  }

  return success;

  // return request('/api/login', {
  //   method: 'post',
  //   data: params
  // })
}

const getUserInfo = ()=>{

  const now = new Date();

  const user_name = Cookie.get('user_name');
  const user_session = Cookie.get('user_session');
  if (user_name && user_session>now.getTime()){
    return {
      username:user_name
    };
  } else {
    return null
  }

}

const logout = () => {

  Cookie.remove('user_session');
  Cookie.remove('user_name');
  return true;
}

export {
  login,
  logout,
  getUserInfo,
}
