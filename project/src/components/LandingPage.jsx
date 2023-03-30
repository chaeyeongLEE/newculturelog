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
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

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
  margin-left: '60px';
  @media screen and (max-width: 550px) {
    margin-left: 10px !important;
  }
`;

const ChartTitle = styled.div`
  @media screen and (max-width: 750px) {
    text-align: center;
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
    <>
      <Row style={{ width: '90%', height: '60vh', margin: 'auto' }}>
        <Col
          xs={12}
          style={{ padding: '0px', display: 'flex', alignItems: 'center' }}
        >
          <TitleSpan>나만의 문화 기록, Culture Log</TitleSpan>
        </Col>
        <Col
          xs={12}
          style={{
            padding: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* <div> */}
          <ChartTitle>
            <SubTitleSpan>전체 사용자 문화 기록 현황</SubTitleSpan>

            <Chart
              movie={movie}
              book={book}
              perfo={perfo}
              innerWidth={innerWidth}
            />
          </ChartTitle>
          {/* </div> */}
        </Col>
        <Col
          xs={12}
          style={{
            padding: '0px',
            borderColor: '#545d42',
            borderBlockStyle: 'dashed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxHeight: '150px',
          }}
        >
          <span style={{ color: '#545d42', fontSize: '1rem', margin: '5px' }}>
            github{' '}
            <a href="https://github.com/CultureBox/3rd_Project">
              <img
                src={githubLogo}
                style={{ width: '30px', margin: '5px' }}
                alt="github 주소"
              />
            </a>
          </span>
          <span style={{ color: '#545d42', fontSize: '1rem', margin: '5px' }}>
            Notion{' '}
            <a href="https://burnt-bike-223.notion.site/Culture-Log-0416219a3d8d4b81925a4042e50e1716">
              <img
                src={notionLogo}
                style={{ width: '30px', margin: '5px' }}
                alt="notion 주소"
              />
            </a>
          </span>
        </Col>
      </Row>
    </>
  );
}

export default Auth(LandingPage, null);
