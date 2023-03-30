import React, { useEffect, useState } from 'react';
import Auth from '../../src/hoc/auth';


import githubLogo from '../github.png';
import notionLogo from '../notion.png';
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
import sea from '../sea.png'

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
  //margin-right: '20px';
  @media screen and (max-width: 550px) {
    margin-left: 10px !important;
  }
`;

// const Chart = styled.div`
// padding: '0px';
// display: flex;
// align-items: center;
// justify-content: center;
//  @media screen and (max-width: 750px) {
//     text-align: center;
//   }
// `;


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
    //<>
    <div className='grid grid-cols-2 gap4'>
      <div className='col-span-2'>
      <img src={sea}></img>
     
      </div>
      
      <div className='grid-cols-1 p-90'>
      <SubTitleSpan>
      <p className='text-28'> : 전체 사용자 문화 기록 현황</p> <br />
      <p className=' text-18'>가입 유저들의 책, 영화, 공연 문화기록 현황이에요.<br />
      'CultureLog'에서 문화기록을 함께 해보아요.</p>
      </SubTitleSpan>

      </div>
      <div className='grid-cols-1 p-70'>
      <Chart className='flex' 
              movie={movie} 
              book={book}
              perfo={perfo}
              innerWidth={innerWidth}
            />
      </div>
   
      <div className='grid-cols-1 p-40 border-2 border-t-gray-300 border-r-gray-300' >
      <p className='text-20 mx-50'>Project information</p><br />
      <p className='text-20 mx-50 '>
      <a href="https://github.com/CultureBox/3rd_Project">
      {/* <img src={githubLogo} style={{ width: '25px', margin: '5px' }} alt="github 주소" /> */}
      Github
      </a>    
         | <a href="https://burnt-bike-223.notion.site/Culture-Log-0416219a3d8d4b81925a4042e50e1716">
     {/* <img src={notionLogo} style={{ width: '25px', margin: '5px' }} alt="notion 주소" /> */}
      Notion
      </a>
      </p>

      </div>
      <div className='grid-cols-1 p-40 border-2 border-t-gray-300 border-r-gray-300'>
      <p className='text-20 mx-50'>Culture Log</p><br />
      <p className='text-15 mx-50'>:Cultural life will bring you a sense of relaxation like a sweet rain in your busy life. Record that leisure time and remember that moment of you</p>
      </div>
      </div>
      // <Row style={{ width: '90%', height: '60vh', margin: 'auto' }}>
      //   <Col
      //     xs={12}
      //     style={{ padding: '0px', display: 'flex', alignItems: 'center' }}
      //   >
      //     <TitleSpan>나만의 문화 기록, Culture Log</TitleSpan>
      //   </Col>
      //   <Col
      //     xs={12}
      //     style={{
      //       padding: '0px',
      //       display: 'flex',
      //       alignItems: 'center',
      //       justifyContent: 'center',
      //     }}
      //   >
      //     {/* <div> */}
      //     <ChartTitle>
      //       <SubTitleSpan>전체 사용자 문화 기록 현황</SubTitleSpan>

      //       <Chart
      //         movie={movie}
      //         book={book}
      //         perfo={perfo}
      //         innerWidth={innerWidth}
      //       />
      //     </ChartTitle>
      //     {/* </div> */}
      //   </Col>
      //   <Col
      //     xs={12}
      //     style={{
      //       padding: '0px',
      //       borderColor: '#545d42',
      //       borderBlockStyle: 'dashed',
      //       display: 'flex',
      //       alignItems: 'center',
      //       justifyContent: 'center',
      //       maxHeight: '150px',
      //     }}
      //   >
      //     <span style={{ color: '#545d42', fontSize: '1rem', margin: '5px' }}>
      //       github{' '}
      //       <a href="https://github.com/CultureBox/3rd_Project">
      //         <img
      //           src={githubLogo}
      //           style={{ width: '30px', margin: '5px' }}
      //           alt="github 주소"
      //         />
      //       </a>
      //     </span>
      //     <span style={{ color: '#545d42', fontSize: '1rem', margin: '5px' }}>
      //       Notion{' '}
      //       <a href="https://burnt-bike-223.notion.site/Culture-Log-0416219a3d8d4b81925a4042e50e1716">
      //         <img
      //           src={notionLogo}
      //           style={{ width: '30px', margin: '5px' }}
      //           alt="notion 주소"
      //         />
      //       </a>
      //     </span>
      //     
      //   </Col>
      // </Row>
  //  </>
  );
}

export default Auth(LandingPage, null);
