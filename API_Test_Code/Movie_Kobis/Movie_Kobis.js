const axios = require('axios');

// 키
const Key = '키 입력';

// 설정 날짜
const targetDt = '20230201';

// URL
const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${Key}&targetDt=${targetDt}`;

async function test() {

  axios({
    method: 'get',
    url: url,
  })
  .then((response) => {
    console.log(response.data.boxOfficeResult.dailyBoxOfficeList);
  })

}

test();
