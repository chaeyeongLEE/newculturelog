import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  AUTH_USER,
  COOKIE_USER,
} from './types';
export function loginUser(dataTosubmit) {
  // console.log(process.env.REACT_APP_BACK);
  const request = axios
    .post(`${process.env.REACT_APP_BACK}/api/users/login`, dataTosubmit)
    .then((response) => response.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
export function registerUser(dataTosubmit) {
  const request = axios
    .post(`${process.env.REACT_APP_BACK}/api/users/register`, dataTosubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
export function cookieUser(cookie) {
  const request = axios
    .get(`${process.env.REACT_APP_BACK}/api/users/login`, cookie)
    .then((response) => response.data);
  return {
    type: COOKIE_USER,
    payload: request,
  };
}
export function auth() {
  //여기서 보내주는 부분 //get 메소드 이므로 바디는 필요 없음.
  const request = axios
    .get(`${process.env.REACT_APP_BACK}/api/users/auth`)
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}
