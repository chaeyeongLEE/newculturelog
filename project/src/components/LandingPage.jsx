import React, { useEffect, useState } from 'react';
import Auth from '../../src/hoc/auth';

import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/user_action';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axiosurl from '../axiosurl';
import Chart from './Chart';
//import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import main1 from '../main1.png'

const TitleSpan = styled.span`
  color: #545d42;
  font-size: 4rem;
  font-weight: 700;
  @media screen and (min-width: 820px) and (max-width: 1090px) {
    font-size: 3rem !important;
  }
  @media screen and (min-width: 550px) and (max-width: 820px) {
    font-size: 2rem !important;
  }
  @media screen and (max-width: 550px) {
    font-size: 1.3rem !important;
  }
`;

const SubTitleSpan = styled.span`
  color: #545d42;
  margin-left:50px;
  @media screen and (max-width: 550px) {
    margin-left: 10px !important;
  }
`;

function LandingPage() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState('');
  const [book, setBook] = useState('');
  const [perfo, setPerfo] = useState('');
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get('x_auth') != null) {
      navigate('/home');
    } else {
      axios({
        method: 'get', //데이터가 없어도 비동기 처리가 되기때문에 then()메서드가 항상 실행된다.
        url: axiosurl.DBAll,
      }).then((response) => {
        // console.log('data', response.data);
        setPerfo(response.data[0].length);
        setBook(response.data[1].length);
        setMovie(response.data[2].length);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const resizeListener = () => {
      // console.log('window.innerWidth', window.innerWidth);
      if (window.innerWidth > 2000) {
        setInnerWidth(2000);
      } else if (window.innerWidth > 750) {
        setInnerWidth(window.innerWidth);
      } else {
        setInnerWidth(window.innerWidth + 150);
      }
    };
    window.addEventListener('resize', resizeListener);

    if (innerWidth <= 750) {
      setInnerWidth(window.innerWidth + 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('innerWidth', innerWidth);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    <div className='md:col-span-2'>
      <img src={main1} alt="메인 이미지" className='w-full'></img>
    </div>
    <div className='md:col-span-2'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='md:col-span-1 p-9 md:p-75'>
          <SubTitleSpan>
            <p className='text-28'> : 전체 사용자 문화 기록 현황</p> <br />
            <p className=' text-18'>가입 유저들의 책, 영화, 공연 문화기록 현황이에요.<br />
              'CultureLog'에서 문화기록을 함께 해보아요.</p>
          </SubTitleSpan>
        </div>
        <div className='md:col-span-1 p-7 md:p-0'>
          <Chart className='flex'
            movie={movie}
            book={book}
            perfo={perfo}
            innerWidth={innerWidth}
          />
        </div>
        <div className='md:col-span-1 p-4 border-2 border-t-gray-500 border-r-gray-500'>
          <p className='text-15 mx-5 font-bold'>Project information</p><br />
          <p className='text-15 mx-5'>
            <a href="https://github.com/CultureBox/3rd_Project">
              Github
            </a>
            | <a href="https://burnt-bike-223.notion.site/Culture-Log-0416219a3d8d4b81925a4042e50e1716">
              Notion
            </a>
          </p>
        </div>
        <div className='md:col-span-1 p-4 border-2 border-t-gray-500 border-r-gray-500'>
          <p className='text-20 mx-5 mb-0 font-bold'>Culture Log</p>
          <p className='text-13 mx-5 mt-0'>: Cultural life will bring you a sense of relaxation like a sweet rain in your busy life. Record that leisure time and remember that moment of you</p>
        </div>
      </div>
    </div>
  </div>
  
     
  );
}

export default Auth(LandingPage, null);
