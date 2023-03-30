const axios = require('axios');

// 서비스키
const SeriveKey = '키 입력';

// 시작 날짜
const stdate = '20221201';
// 종료 날짜
const eddate = '20221231';

// 필수 데이터만 입력한 상태의 URL
const url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${SeriveKey}&stdate=${stdate}&eddate=${eddate}&cpage=1&rows=10`;

async function test() {
  
  // axios 방법 1
  axios({
    method: 'get',
    url: url,
  })
  .then((response) => {
    console.log(response.data);
  })

  // axios 방법 2
  // const result = await axios.get(url);
  // console.log(result.data);
}

test();
