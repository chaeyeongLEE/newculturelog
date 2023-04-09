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


  return (
  <div class="grid grid-cols-2 border-2 border-slate-500 ">
  <div class="col-span-2"><img src={main2}></img></div>
  <div class="col-span-2 flex justify-center border-1 border-b-neutral-600 h-47 text-sm pt-8 md:text-lg pt-6 pb-5"> ■ 달력 속 날짜를 클릭하면 책, 영화, 공연을 선택해 이야기를 남길 수 있는 작성창으로 이동합니다 ■ </div>
  <div class="flex justify-center border-0 border-b-neutral-600 border-e-neutral-600 bg-slate-600 h-95">
  <p className="text-2xl text-slate-950 text-white italic mt-28">Culture Calendar</p> </div>
  <div class="flex justify-center"></div>
  <div class="col-span-2 flex justify-center "> <YeongCalendar /></div>
  <div class="col-span-2 border-2 border-e-neutral-600 border-t-neutral-600 border-b-neutral-600">
  <div class="flex justify-left gap-3 p-4 md:p-10 "> 
    <img src={Blogo} class="w-8 h-8 ml-25 md:w-30 md:h-30 ml-150" /> 
    <span class="text-slate-900 text-base md:text-xl">Book</span> 
    <img src={Plogo} class="w-8 h-8 ml-0 md:w-30 md:h-30 ml-30" /> 
    <span class="text-slate-900 text-base md:text-xl">Performance</span> 
    <img src={Mlogo} class="w-8 h-8 md:w-30 md:h-30" /> 
    <span class="text-slate-900 text-base md:text-xl">Movie</span> 
  </div>
</div>

  <div class="col-span-2  border-2 border-b-neutral-600 flex flex-row flex justify-items-center place-items-center gap-2 " style={{padding:'32px 0px 32px 65px', marginBottom:'25px'}}>
  <div className="basis-1/4">
    <p className="text-slate-910 italic text-3xl"> Record of the year </p>
    <p className="text-slate-910"> 올해 나는 얼마나 기록했을까? </p>
  </div>

  <div className='flex gap-10'>
  <div className='z-0 h-full flex-shrink-0 relative'>
    <img className='object-cover h-1/4 w-1/4' src={RecordBook} />
    <p className="text-slate-950 text-white text-4xl absolute bottom-0 right-220 ml-140 mb-2">{yearData.length > 0 ? yearData[1].length : '0000000'}</p>
    <p className="text-slate-900 text-white italic text-3xl absolute top-0 left-0 ml-2 mt-2">책</p>
  </div>
</div>

<div className='flex gap-10'>
  <div className='z-0 h-full flex-shrink-0 relative'>
    <img className='object-cover h-1/4 w-1/4' src={RecordPerformance}/>
    <p className="text-slate-950 text-white text-4xl absolute bottom-0 right-220 ml-140 mb-2">{yearData.length > 0 ? yearData[0].length : '0000000'}</p>
    <p className="text-slate-900 text-white italic text-3xl absolute top-0 left-0 ml-2 mt-2">공연</p>
  </div>
</div>

<div className='flex gap-10'>
  <div className='z-0 h-full flex-shrink-0 relative'>
      <img className='object-cover h-1/4 w-1/4' src={RecordMovie} />
      <p className="text-slate-950 text-white text-4xl absolute bottom-0 right-220 ml-140 mb-2">{yearData.length > 0 ? yearData[2].length : '0000000'}</p>
      <p className="text-slate-900 text-white italic text-3xl absolute top-0 left-0 ml-2 mt-2">영화</p>
    </div>
  </div>

</div>


<div class="col-span-2 flex justify-center w-full">
  <div class="flex justify-center items-center flex-col">
  <div className="text-slate-930 text-3xl mb-5 text-center"> Culture Log Graphic </div>

    <ChartPerson
      movie={movie}
      book={book}
      perfo={perfo}
      Allmovie={Allmovie}
      Allbook={Allbook}
      Allperfo={Allperfo}
      innerWidth={innerWidth} />
  </div>
</div>

</div>

  );
}

export default Auth(Home, true);