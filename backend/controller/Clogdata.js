const axios = require('axios');
const apikeys = require('./apikeys');
const parseXML = require('xml-js');

exports.Naver = (req, res) => {
  console.log(req.query);
  axios({
    method: 'get',
    url: 'https://openapi.naver.com/v1/search/movie.json',
    params: {
      query: req.query.title,
      display: 20,
    },
    headers: {
      'X-Naver-Client-Id': apikeys.NaverId,
      'X-Naver-Client-Secret': apikeys.NaverSecret,
    },
  }).then((re) => {
    let MovieServerTitle = re.data.items;
    console.log(MovieServerTitle);
    let MovieClientTitle = [];
    for (let i = 0; i < MovieServerTitle.length; i++) {
      if (MovieServerTitle[i].image === undefined) {
        // 이미지가 없는 경우 기본 이미지 설정
        MovieServerTitle[
          i
        ].image = `/static/media/movie.ac373a6f91cd9aa9c511.png`;
      }

      MovieClientTitle.push({
        title: MovieServerTitle[i].title,
        pubDate: MovieServerTitle[i].pubDate,
        director: MovieServerTitle[i].director,
        actor: MovieServerTitle[i].actor,
        img: MovieServerTitle[i].image,
      });
    }
    console.log('clienttitle', MovieClientTitle);
    res.send(MovieClientTitle);
  });
};

//알라딘
const TTBKey = apikeys.TTBKey;
const start = '1';
const maxResult = '15';
const sort = 'SalesPoint';
const bookType = 'Keyword';

exports.Aladin = (req, res) => {
  axios({
    method: 'get',
    url: `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${TTBKey}&QueryType=${bookType}&MaxResults=${maxResult}&sort=${sort}&start=${start}&SearchTarget=Book&output=js&Version=20131101`,
    params: {
      query: req.query.title,
    },
  }).then((re) => {
    let BookServerTitle = re.data.item;
    // console.log(BookServerTitle);
    let BookClientTitle = [];
    for (let i = 0; i < BookServerTitle.length; i++) {
      if (BookServerTitle[i].cover === undefined) {
        // 이미지가 없는 경우 기본 이미지 설정
        BookServerTitle[
          i
        ].cover = `/static/media/book.930ff5b0e8446a2b8940.png`;
      }

      BookClientTitle.push({
        title: BookServerTitle[i].title,
        pubDate: BookServerTitle[i].pubDate,
        author: BookServerTitle[i].author,
        publisher: BookServerTitle[i].publisher,
        categoryName: BookServerTitle[i].categoryName,
        img: BookServerTitle[i].cover,
      });
    }
    console.log('clienttitle', BookClientTitle);
    res.send(BookClientTitle);
  });
};

//코피스 공연

// 서비스키
const SeriveKey = apikeys.ServiceKey;

// 시작 날짜
const stdate = '20160101';
// 종료 날짜
let eddate = new Date().toISOString().slice(0, 10).split('-').join('');

// 필수 데이터만 입력한 상태의 URL
//const kopisurl =

exports.Kopis = (req, res) => {
  console.log('req.header', req.headers.host);
  console.log('req.header', req.headers);
  console.log(req.query);
  axios({
    method: 'get',
    url: `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${SeriveKey}&stdate=${stdate}&eddate=${eddate}&cpage=1&rows=10&shprfnm=${req.query.title}`,
  }).then((result) => {
    console.log(`result.data : ${result.data}`);
    if (result.data.indexOf('mt20id') == -1) res.send([]);
    else {
      const xmlToJson = JSON.parse(
        parseXML.xml2json(result.data, {
          compact: true,
          spaces: 2,
        })
      ).dbs.db;
      console.log(xmlToJson.length);
      let perfoClientTitle;
      if (typeof xmlToJson.length === 'undefined') {
        perfoClientTitle = [
          {
            title: xmlToJson.prfnm._text,
            startDate: xmlToJson.prfpdfrom._text,
            endDate: xmlToJson.prfpdto._text,
            hall: xmlToJson.fcltynm._text,
            img: xmlToJson.poster._text,
            genre: xmlToJson.genrenm._text,
            prfstate: xmlToJson.prfstate._text,
          },
        ];
      } else {
        perfoClientTitle = xmlToJson.map((el) => {
          if (el.poster._text === undefined) {
            // 이미지가 없는 경우 기본 이미지 설정
            el.poster._text = `/static/media/musical.befa04984f11659cda42.png`;
            // el.poster._text = `/static/media/musical.png`;
          }
          console.log('el.poster._text', el.poster._text);
          return {
            title: el.prfnm._text,
            startDate: el.prfpdfrom._text,
            endDate: el.prfpdto._text,
            hall: el.fcltynm._text,
            img: el.poster._text,
            genre: el.genrenm._text,
            prfstate: el.prfstate._text,
          };
        });
      }
      console.log('clienttitle', perfoClientTitle);
      res.send(perfoClientTitle);
    }
  });
};
