import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import axiosurl from '../axiosurl';
import Auth from '../hoc/auth';
import ReactTypingEffect from 'react-typing-effect';
import { Cookies } from 'react-cookie';
import YeongCalendar from './YeongCalendar';
import moment from 'moment';
import styled from 'styled-components';
import ChartPerson from './ChartPerson';
import './Homeyeong.css';
import './Home.css';
import main2 from '../main2.png'
import RecordBook from '../RecordBook.png'
import RecordMovie from '../RecordMovie.png'
import RecordPerformance from '../RecordPerformance.png'
import Blogo from '../Blogo.png'
import Mlogo from '../Mlogo.png'
import Plogo from '../Plogo.png'




const P = styled.p`
  display: flex;
  font-size: 16px;
  /* margin-top: 80px; */
  /* margin-bottom: 345px; */
  margin-top: 60px;
  color: #3c5087;
  text-align: center;
  justify-content: center;
  padding-left: 50px;
  @media screen and (max-width: 1070px) {
    font-size: 14px;
    margin-top: 25px;
    padding-left: 20px;
  }
  @media screen and (max-width: 880px) {
    height: 300px;
    display: flex;
    margin-bottom: 300px;
  }
`;
const Div8 = styled.div`
  @media screen and (max-width: 900px) {
    display: flex;
    margin-left: -170px;
    font-size: x-small;
  }
`;

// Main Page
function Home() {
  const navigate = useNavigate();
  // const [isManager, setIsManager] = useState(false);
  const user = useSelector((state) => state.user.loginSuccess);
  const [yearData, setYearData] = useState([]);
  const [yearAllData, setYearAllData] = useState([]);
  const [movie, setMovie] = useState('');
  const [book, setBook] = useState('');
  const [perfo, setPerfo] = useState('');
  const [Allmovie, setAllMovie] = useState('');
  const [Allbook, setAllBook] = useState('');
  const [Allperfo, setAllPerfo] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: axiosurl.logOfyear,
      params: { date: moment(new Date()).format('YYYY년'), user: user.email },
    }).then((re) => {
      // console.log('year', re.data);
      setYearData(re.data);
      setPerfo(re.data[0].length);
      setBook(re.data[1].length);
      setMovie(re.data[2].length);
      // console.log(re);
    });
    axios({
      method: 'get', //데이터가 없어도 비동기 처리가 되기때문에 then()메서드가 항상 실행된다.
      url: axiosurl.DBAll,
    }).then((response) => {
      // console.log(response.data);
      setAllPerfo(response.data[0].length);
      setAllBook(response.data[1].length);
      setAllMovie(response.data[2].length);
    });
  }, [user]);

  // useEffect(() => {
  //   axios.get('/api/hello').then((response) => console.log('test', response));

  //   // if (loginInformation.userId === '63ecad322ba25214448d088d') {
  //   //   setIsManager(true);
  //   // } else {
  //   //   setIsManager(false);
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resizeListener = () => {
      // console.log('window.innerWidth', window.innerWidth);
      if (window.innerWidth > 2000) {
        setInnerWidth(2000 / 2);
      } else if (window.innerWidth > 768) {
        setInnerWidth(window.innerWidth / 2);
      } else {
        setInnerWidth(window.innerWidth + 50);
      }
    };
    window.addEventListener('resize', resizeListener);

    if (innerWidth < 768) {
      setInnerWidth(window.innerWidth + 50);
    } else {
      setInnerWidth(window.innerWidth / 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('innerWidth', innerWidth);

  const typingText = '고스란히 기록하는 나의 문화생활';

  return (
    // <Container fluid>
    //   <Row style={{ margin: '50px', marginBottom: '0px' }}>
    //   <img src={main2}></img>

    //     <Col xs={12} style={{ padding: '0px', margin: 'auto' }}>
    //       <Row style={{ maxWidth: '2000px', margin: 'auto' }}>
    //         <Col xs={12} md={6}>
    //           <YeongCalendar />
    //         </Col>
    //         <Col xs={12} md={6} style={{ maxHeight: '1000px' }}>
    //           <Row style={{ height: '100%' }}>
    //             <Col xs={12} className="secondTitle">
    //               {/* <Div8> */}
    //               <div style={{ paddingLeft: '50px' }}>
    //                 <ReactTypingEffect
    //                   // text={['고스란히 기록하는 나의 문화생활']}
    //                   text={typingText}
    //                   style={{
    //                     backgroundColor: '#e1e0c8	',
    //                     fontSize: '23px',
    //                     fontWeight: '500',
    //                     // marginLeft: '250px',
    //                   }}
    //                 />
    //               </div>
    //               {/* </Div8> */}
    //               <P>
    //                 모든 것이 바쁘게 흘러가는 요즘, 문화생활까지 덧없이 자연스레
    //                 지나쳐버리게 되는 날이 많아집니다. <br /> CultureLog는 내가
    //                 보고 듣고 읽은 것들을 기록하는 공간입니다. <br /> 자신이
    //                 경험한 문화생활과 리뷰, 그리고 생각을 기록하며 삶의 빈 곳을
    //                 채워보는 건 어떨까요? <br />
    //                 <br />
    //                 달력 속 날짜를 클릭하면 책, 영화, 공연을 선택해 이야기를
    //                 남길 수 있는 작성창으로 이동합니다.
    //               </P>
    //             </Col>
    //             <Col xs={12} style={{ padding: '0px' }}>
                  // <ChartPerson
                  //   movie={movie}
                  //   book={book}
                  //   perfo={perfo}
                  //   Allmovie={Allmovie}
                  //   Allbook={Allbook}
                  //   Allperfo={Allperfo}
                  //   innerWidth={innerWidth}
                  // />
    //             </Col>
    //             {/* <br /> */}
    //             <Col xs={12} className="recordYearCol">
                  // <div className="recordYear">
                  //   <div className="recordYearTitle">올해의 기록 </div>
                  //   <div className="recordYearSubTitle">
                  //     올해 나는 얼마나 채웠을까?
                  //   </div>
                  // </div>
                  // <div className="recordYear">
                  //   <span>책</span>
                  //   <span>
                  //     {yearData.length > 0 ? yearData[1].length : '0000000'}
                  //   </span>
                  // </div>
                  // <hr />
                  // <div className="recordYear">
                  //   <span>공연</span>
                  //   <span>
                  //     {yearData.length > 0 ? yearData[0].length : '0000000'}
                  //   </span>
                  // </div>
                  // <hr />
                  // <div className="recordYear">
                  //   <span>영화</span>
                  //   <span>
                  //     {yearData.length > 0 ? yearData[2].length : '0000000'}
                  //   </span>
                  // </div>
    //               <hr />
    //             </Col>
    //           </Row>
    //         </Col>
    //       </Row>
    //     </Col>
    //   </Row>
      
    // </Container>
  
  
  <div class="grid grid-cols-2 border-2 border-slate-500">
    
  <div class="col-span-2"><img src={main2}></img></div>
  <div class="col-span-2 flex justify-center border-1 border-b-neutral-600 h-47"> ■ 달력 속 날짜를 클릭하면 책, 영화, 공연을 선택해 이야기를 남길 수 있는 작성창으로 이동합니다 ■ </div>
  <div class="flex justify-center border-0 border-b-neutral-600 border-e-neutral-600 bg-slate-600 h-95">
  <p className="text-3xl text-slate-950 text-white italic mt-28">Culture Calendar</p> </div>
  <div class="flex justify-center row-span-3 border-2 border-b-neutral-600">04 그냥둬요 + 기록게시판</div>
  <div class="col-span-2 flex justify-center border-2 border-e-neutral-600"> <YeongCalendar /></div>
  <div class="col-span-2 border-2 border-e-neutral-600 border-t-neutral-600 border-b-neutral-600 " >
          <div class="flex justify-left gap-5 p-10 mx-100">
          <img src={Blogo} /> Book
          <img src={Plogo} /> Performance
          <img src={Mlogo} /> Movie  
          </div>
  </div>
  <div class="col-span-2 py-60 border-2 border-b-neutral-600 flex flex-row flex justify-items-center place-items-center">
                  <div className="basis-1/4">
                    <p className="text-slate-900 italic text-3xl"> Record of the year </p>
                    <p className="text-slate-900"> 올해 나는 얼마나 기록했을까? </p>
                  </div>
                    <div className='mx-90'>
                      <div className='z-0 w-25 h-40'><img src={RecordBook}/></div>
                      <p className="text-slate-950 text-white z-1"> 책 
                      {yearData.length > 0 ? yearData[1].length : '0000000'}</p>
                    </div>

                    <div>
                      <div className='z-0 w-25 h-40'><img src={RecordPerformance}/></div>
                      <p className="text-slate-950 text-white z-1"> 공연
                      {yearData.length > 0 ? yearData[0].length : '0000000'}</p>
                    </div>
                    <div>
                      <div className='z-0 w-25 h-40'><img src={RecordMovie}/></div>
                      <p className="text-slate-950 z-1 text-white"> 영화
                      {yearData.length > 0 ? yearData[2].length : '0000000'} </p>
                    </div>
                    
</div>

<div class="col-span-2 flex justify-center w-auto">          
    <p className="text-slate-950"> Culture Log Graphic </p>
    <div>
                    <ChartPerson
                    movie={movie}
                    book={book}
                    perfo={perfo}
                    Allmovie={Allmovie}
                    Allbook={Allbook}
                    Allperfo={Allperfo}
                    innerWidth={innerWidth} /></div>

</div>
</div>
  );
}

export default Auth(Home, true);