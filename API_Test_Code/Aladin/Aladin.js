const axios = require('axios');

// 서비스 키
const TTBKey = '키 입력';
// 페이지 시작
const start = '1';
// 결과 개수
const maxResult = '10';
// 책 종류 - 베스트셀러
const bookType = 'Bestseller';

axios({
  method: 'get',
  url: `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${[TTBKey]}&QueryType=${bookType}&MaxResults=${maxResult}&start=${start}&SearchTarget=Book&output=js&Version=20131101`
  // url: `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${[TTBKey]}&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`
})
.then((response) => {
  console.log(response.data);
});
