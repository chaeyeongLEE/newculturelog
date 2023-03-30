import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Homeyeong.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import YeongCalendar from './YeongCalendar';

// Main Page(채영_리액트캘린더 이용)
export default function Home_passed() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK}/api/hello`)
      .then((response) => console.log(response));
  }, []);
  return (
    <Container fluid>
      <Row style={{ height: '100%' }}>
        <Col xs={12} style={{ padding: '0px', margin: 'auto' }}>
          <Row style={{ maxWidth: '2000px', margin: 'auto' }}>
            <Col xs={12} md={6}>
              <YeongCalendar />
              <Col xs={12} style={{ padding: '6px 12px' }}>
                <p className="calendarFooter">
                  날짜를 클릭하여 오늘의 문화를 기록하세요
                </p>
              </Col>
            </Col>
            <Col xs={12} md={6}>
              <Row style={{ height: '100%' }}>
                <Col xs={12} style={{ height: '50%' }}>
                  <img
                    src="http://placehold.it/320x100?text=sample"
                    alt="temporary"
                    id="tempImg"
                  />
                </Col>
                <Col xs={12} style={{ height: '50%', paddingTop: '10px' }}>
                  <div className="recordYear">
                    <div className="recordYearTitle">올해의 기록</div>
                    <div className="recordYearSubTitle">
                      올해 나는 얼마나 채웠을까?
                    </div>
                  </div>
                  <div className="recordYear">
                    <span>책</span>
                    <span>0000000</span>
                  </div>
                  <hr />
                  <div className="recordYear">
                    <span>공연</span>
                    <span>0000000</span>
                  </div>
                  <hr />
                  <div className="recordYear">
                    <span>영화</span>
                    <span>0000000</span>
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
