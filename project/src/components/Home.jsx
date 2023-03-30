import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import axiosurl from '../axiosurl';
import Auth from '../hoc/auth';
import ReactTypingEffect from 'react-typing-effect';
import HomeCalendar from './HomeCalendar';
import { Cookies } from 'react-cookie';
import YeongCalendar from './YeongCalendar';
import moment from 'moment';
import styled from 'styled-components';
import ChartPerson from './ChartPerson';
import './Homeyeong.css';
import './Home.css';


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
    <Container fluid>
      <Row style={{ margin: '50px', marginBottom: '0px' }}>
        <Col xs={12} style={{ padding: '0px', margin: 'auto' }}>
          <Row style={{ maxWidth: '2000px', margin: 'auto' }}>
            <Col xs={12} md={6}>
              <YeongCalendar />
            </Col>
            <Col xs={12} md={6} style={{ maxHeight: '1000px' }}>
              <Row style={{ height: '100%' }}>
                <Col xs={12} className="secondTitle">
                  {/* <Div8> */}
                  <div style={{ paddingLeft: '50px' }}>
                    <ReactTypingEffect
                      // text={['고스란히 기록하는 나의 문화생활']}
                      text={typingText}
                      style={{
                        backgroundColor: '#e1e0c8	',
                        fontSize: '23px',
                        fontWeight: '500',
                        // marginLeft: '250px',
                      }}
                    />
                  </div>
                  {/* </Div8> */}
                  <P>
                    모든 것이 바쁘게 흘러가는 요즘, 문화생활까지 덧없이 자연스레
                    지나쳐버리게 되는 날이 많아집니다. <br /> CultureLog는 내가
                    보고 듣고 읽은 것들을 기록하는 공간입니다. <br /> 자신이
                    경험한 문화생활과 리뷰, 그리고 생각을 기록하며 삶의 빈 곳을
                    채워보는 건 어떨까요? <br />
                    <br />
                    달력 속 날짜를 클릭하면 책, 영화, 공연을 선택해 이야기를
                    남길 수 있는 작성창으로 이동합니다.
                  </P>
                </Col>
                <Col xs={12} style={{ padding: '0px' }}>
                  <ChartPerson
                    movie={movie}
                    book={book}
                    perfo={perfo}
                    Allmovie={Allmovie}
                    Allbook={Allbook}
                    Allperfo={Allperfo}
                    innerWidth={innerWidth}
                  />
                </Col>
                {/* <br /> */}
                <Col xs={12} className="recordYearCol">
                  <div className="recordYear">
                    <div className="recordYearTitle">올해의 기록 </div>
                    <div className="recordYearSubTitle">
                      올해 나는 얼마나 채웠을까?
                    </div>
                  </div>
                  <div className="recordYear">
                    <span>책</span>
                    <span>
                      {yearData.length > 0 ? yearData[1].length : '0000000'}
                    </span>
                  </div>
                  <hr />
                  <div className="recordYear">
                    <span>공연</span>
                    <span>
                      {yearData.length > 0 ? yearData[0].length : '0000000'}
                    </span>
                  </div>
                  <hr />
                  <div className="recordYear">
                    <span>영화</span>
                    <span>
                      {yearData.length > 0 ? yearData[2].length : '0000000'}
                    </span>
                  </div>
                  <hr />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      
    </Container>
  );
}

export default Auth(Home, true);
