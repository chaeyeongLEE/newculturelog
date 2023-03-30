import axios from 'axios';
import axiosurl from '../axiosurl';
import { BOOK, MOVIE, PERFORMANCE } from './types';

export function callMovieAPI(dataTosubmit) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: axiosurl.callmovie,
      params: dataTosubmit,
    }).then((res) => {
      // console.log('movieactionfunction', res.data);

      resolve({
        type: MOVIE,
        payload: res.data,
      });
    });
  });
}

export function callBookAPI(dataTosubmit) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: axiosurl.callbook,
      params: dataTosubmit,
    }).then((res) => {
      // console.log('bookactionfunction', res.data);

      resolve({
        type: BOOK,
        payload: res.data,
      });
    });
  });
}

export function callPerfoAPI(dataTosubmit) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: axiosurl.callperfo,
      params: dataTosubmit,
    }).then((res) => {
      // console.log('performanceactionfunction', res.data);

      resolve({
        type: PERFORMANCE,
        payload: res.data,
      });
    });
  });
}
