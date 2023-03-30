const axios = require('axios');

axios({
  method: 'get',
  url: 'https://openapi.naver.com/v1/search/movie.json',
  params:{
    query: '어벤져스',
    display: 20
  },
  headers: {
    'X-Naver-Client-Id': 'ID 입력',
    'X-Naver-Client-Secret': '키 입력',
  },
})
.then((response) => {
  console.log(response.data);
});
