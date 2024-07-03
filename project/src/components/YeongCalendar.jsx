/* eslint-disable no-sequences */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './YeongCalendar.css';
import moment from 'moment';
import Pop from './Pop';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import axiosurl from '../axiosurl';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Blogo from '../Blogo.png'
import Mlogo from '../Mlogo.png'
import Plogo from '../Plogo.png'

const Div5 = styled.div`
  margin-left: 10px;
  margin-top: 10px;
`;

const Div7 = styled.div`
  // margin-right: 70px;
  margin-top: -40px;
  text-align: right;
  display: flex-end;
  p {
    margin-right: 20px;
  }
`;

export default function YeongCalendar(props) {
  const [value, setValue] = useState(new Date());
  const [modalShow, setModalShow] = useState(false);
// 상세보기 제자리에서 구현
  const [datailShow, setDatailShow] = useState(false);

  const [data, setData] = useState([]);
  const [selectPerformance, setSelectPerformance] = useState(null);
  const handlePerformanceClose = () => setSelectPerformance(null);
  const [selectBook, setSelectBook] = useState(null);
  const handleBookClose = () => setSelectBook(null);
  const [selectMovie, setSelectMovie] = useState(null);
  const handleMovieClose = () => setSelectMovie(null);
  const navigate = useNavigate();
  const [marks, setMarks] = useState([]);
  const [markData, setMarkData] = useState();
  // const [marks, setMarks] = useState(['2023년 02월 21일']);
  // // 하이라이트 표시를 위한 배열
  const fromDBdate = () => {};
  const dispatch = useDispatch();
  const P = useSelector((state) => state.date.date);
  // const marks = [{ P }];
  //const marks = [moment(P).format('DD-MM-YYYY')];
  //const marks = data.map((item) => new Date(item.date));
  // console.log('내가선택한날짜', value); // 내가 선택한 날짜
  const user = useSelector((state) => state.user.loginSuccess);
  console.log(user);
  
  const useremail = useSelector((state)=> state.user?.userData?.email);
  const handleDayClick = (value, event) => {
    //console.log('user', user);
    //현재 클릭한 날짜
    const clickedDate = moment(value).format('YYYY년 MM월 DD일');
    axios({
      method: 'get', //데이터가 없어도 비동기 처리가 되기때문에 then()메서드가 항상 실행된다.
      url: axiosurl.fromDB,
      params: { date: clickedDate, user: user.email },
    }).then((response) => {
      // console.log('data', response.data);
      // console.log('공연리뷰', data[0][1]);
      setData(response.data);
      setModalShow(!modalShow);
    });
  };
 
  // 마크가져오기
  useEffect(() => {
    if (user.userId) {
      axios({
        method: 'get', //데이터가 없어도 비동기 처리가 되기때문에 then()메서드가 항상 실행된다.
        url: axiosurl.fromDBAll,
        params: { user: user.email },
      }).then((rep) => {
        // console.log('------------');
        // console.log('rep.data', rep.data);
        // console.log('Object.keys(rep.data', Object.keys(rep.data));
        setMarks(Object.keys(rep.data));
        setMarkData(rep.data);
      });
    }
  }, [user]);

  const deleteLog = (e, category) => {
    // console.log(e);
    // console.log('category', category);
    axios({
      method: 'delete',
      url: axiosurl.DBdelete,
      params: { _id: e, category: category },
    })
      .then((response) => {
        // console.log('성공');
        setSelectPerformance(null);
        setSelectBook(null);
        setSelectMovie(null);
        // console.log('data', data);
        if (category === '공연') {
          // data[0]
          const updatedData = [
            data[0].filter((el) => el._id !== e._id),
            data[1],
            data[2],
          ];
          setData(updatedData);
        } else if (category === '책') {
          // data[1]
          const updatedData = [
            data[0],
            data[1].filter((el) => el._id !== e._id),
            data[2],
          ];
          setData(updatedData);
        } else if (category === '영화') {
          // data[2]
          const updatedData = [
            data[0],
            data[1],
            data[2].filter((el) => el._id !== e._id),
          ];
          setData(updatedData);
        }

        // useState에서 설정을 하는 것보다 한 번 요청하고 받는게
        // 더 효율적일 것 같아서 삭제 이후 Mark 데이터 갱신을 위해 서버 재요청
        if (user.userId) {
          axios({
            method: 'get',
            url: axiosurl.fromDBAll,
            params: { user: user.email },
          }).then((rep) => {
            setMarks(Object.keys(rep.data));
            setMarkData(rep.data);
          });
        }
      })
      .catch(() => {
        console.log('실패');
      });
  };
  const checkData = () => {
    if ( data[0]?.length > 0 ) return true;
    if ( data[1]?.length > 0 ) return true;
    if ( data[2]?.length > 0 ) return true;
  }
  return (
    <div className='grid grid-cols-2'>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={handleDayClick}
        // 날짜 및 데이터 여부 체크
        // return되는 클래스 이름이 button에 들어감
        tileClassName={({ date, view }) => {
          // let temp = '';
          const tempData = marks.find(
            (x) => x === moment(date).format('YYYY년 MM월 DD일')
          );
         
          if (tempData) {
            return 'highlight ';
          }
        }}
        // 점으로 표시되는 기능
        tileContent={({ date, view }) => {
          let tempTileContent = [];
          const tempDotData = marks.find(
            (x) => x === moment(date).format('YYYY년 MM월 DD일')
          );
          // console.log('tempDotData', tempDotData);
          if (tempDotData) {
            if (markData[tempDotData].book) {
              tempTileContent.push( 
                <div className="dot dotBook" key={'dotBook'}></div>
              );
            }
            if (markData[tempDotData].movie) {
              tempTileContent.push(
                <div className="dot dotMovie" key={'dotMovie'}></div>
              );
            }
            if (markData[tempDotData].perfo) {
              tempTileContent.push(
                <div className="dot dotPerfo" key={'dotPerfo'}></div>
              );
            }
            //아래 tempTileContent는 마킹이 놓이는 자리의 값
            return (
              <>
                <div className="h-19 flex">
                  {tempTileContent}
                </div>
              </>
            );
          }
        }} />
      {modalShow && (
        <Pop show={modalShow} date={value} onHide={() => setModalShow(false)} />
      )}
      <div className='border-l-1 border-slate-500'>
        <Div5>
          {checkData() ? <div></div> :<div className='text-xl my-30 mt-200 ml-80'> 안녕하세요. 단비같은 여유와 함께 어떤 문화생활을 하셨나요? <br />Culture Log 와 오늘도 {useremail}님의 기록을 함께해요! </div>}
          
            {data.some((arr) => arr.length > 0) && (
          <div className='text-2xl ml-40 mb-30' style={{
            borderBottom: '1px solid black', // 검은 줄 스타일 적용
            marginBottom: '20px',
            marginRight:'100px',
            clear: 'both',
          }}> Record of the Day</div>
        )}

{data.map((arr, idx) => {
  return arr.length > 0 && (
    <div className='flex' key={idx} style={{
      borderBottom: '1px solid black', // 검은 줄 스타일 적용
      marginBottom: '20px',
      marginLeft:'40px', 
      clear: 'both',
      marginRight:'100px',
    }}>
      <div className='w-1/3'>
        <img src={idx === 0 ? Plogo : idx === 1 ? Blogo : Mlogo} style={{ width: '40%', height: 'auto'}}/>
        
      </div>
      <div className='w-2/3'>
        {idx === 0 && (
          <>
            Title. {arr[0].title}
            <br /><br />
            Hall. {arr[0].hall}
          </>
        )}
        
        {idx === 1 && (
          <>
            Title. {arr[0].title}
            <br /><br />
            Author. {arr[0].author}
          </>
        )}
        {idx === 2 && (
          <>
            Title. {arr[0].title}
            <br /><br />
            director. {arr[0].director}
          </>
        )}
        <Button
          style={{
            marginLeft: 'auto',
            marginTop: '50px',
            marginBottom: '20px',
            borderRadius: '50%',
            width: '180px',
            backgroundColor: 'none',
            color: 'black',
            borderColor: 'black',
            display: 'inline-flex',
            justifyContent:'center',
            float: 'right',
          }}
          onClick={() => {
            if (idx === 0) {
              setSelectPerformance(arr[0]);
            } else if (idx === 1) {
              setSelectBook(arr[0]);
            } else {
              setSelectMovie(arr[0]);
            }
          }}
          className='hover:bg-gray-500 text-gray-800'
        >
          Detail
        </Button>
      </div>
    </div>
  );
})}
          
          <span><Modal show={selectPerformance !== null} onHide={handlePerformanceClose}>
              <Modal.Header closeButton>
                <Modal.Title>Performance Record</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div style={{ borderBottom: '1px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Title. {' '}
                {selectPerformance !== null
                  ? selectPerformance.title !== null
                    ? selectPerformance.title
                    : ''
                  : ''}{' '}
                <br />
                
                </div>
                <div style={{ borderBottom: '1px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Hall. {' '}
                {selectPerformance !== null
                  ? selectPerformance.hall !== null
                    ? selectPerformance.hall
                    : ''
                  : ''}
                <br />
                </div>
                <div style={{ borderBottom: '1px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Actor.
                {selectPerformance !== null
                  ? selectPerformance.mainroll !== null
                    ? selectPerformance.mainroll
                    : ''
                  : ''}
                <br /> </div>
                <div style={{ borderBottom: '0px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Review.
                {selectPerformance !== null
                  ? selectPerformance.review !== null
                    ? selectPerformance.review
                    : ''
                  : ''}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{
                    backgroundColor: 'rgb(171, 131, 131)',
                    borderColor: 'white',
                  }}
                  onClick={() => {
                    deleteLog(selectPerformance, '공연');
                  }}
                >
                  기록 삭제
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgb(204, 193, 193)',
                    borderColor: 'white',
                  }}
                  onClick={handlePerformanceClose}
                >
                  창닫기
                </Button>
              </Modal.Footer>
            </Modal>
          </span>
          <span>
            <Modal show={selectBook !== null} onHide={handleBookClose}>
              <Modal.Header closeButton>
                <Modal.Title>기록 상세보기</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div style={{ borderBottom: '1px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Title. {' '}
                {selectBook !== null
                  ? selectBook.title !== null
                    ? selectBook.title
                    : ''
                  : ''}
                <br /> </div>
                <div style={{ borderBottom: '1px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Author. {' '}
                {selectBook !== null
                  ? selectBook.author !== null
                    ? selectBook.author
                    : ''
                  : ''}
                <br /> </div>
                <div style={{ borderBottom: '1px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Genre. {' '}
                {selectBook !== null
                  ? selectBook.genre !== null
                    ? selectBook.genre
                    : ''
                  : ''}
                <br /> </div>
                <div style={{ borderBottom: 'none',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Review. {' '}
                {selectBook !== null
                  ? selectBook.review !== null
                    ? selectBook.review
                    : ''
                  : ''}</div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{
                    backgroundColor: 'rgb(171, 131, 131)',
                    borderColor: 'white',
                  }}
                  onClick={() => {
                    deleteLog(selectBook, '책');
                  }}
                >
                  기록 삭제
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgb(204, 193, 193)',
                    borderColor: 'white',
                  }}
                  onClick={handleBookClose}
                >
                  창닫기
                </Button>
              </Modal.Footer>
            </Modal>
          </span>
          <span>
            <Modal show={selectMovie !== null} onHide={handleMovieClose}>
              <Modal.Header closeButton>
                <Modal.Title>기록 상세보기</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div style={{ borderBottom: '1px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Title. {' '}
                {selectMovie !== null
                  ? selectMovie.title !== null
                    ? selectMovie.title
                    : ''
                  : ''}
                <br /> </div>
                <div style={{ borderBottom: '1px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Director. {' '}
                {selectMovie !== null
                  ? selectMovie.director !== null
                    ? selectMovie.director
                    : ''
                  : ''}
                <br /> </div>
                <div style={{ borderBottom: '1px solid black',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Actor. {' '}
                {selectMovie !== null
                  ? selectMovie.actor !== null
                    ? selectMovie.actor
                    : ''
                  : ''}{' '}
                <br /> </div>
                <div style={{ borderBottom: 'none',
                            padding: '10px',
                            paddingTop: '15px', 
                            paddingBottom:'10px'}}>
                ■ Review. {' '}
                {selectMovie !== null
                  ? selectMovie.review !== null
                    ? selectMovie.review
                    : ''
                  : ''}</div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{
                    backgroundColor: 'rgb(171, 131, 131)',
                    borderColor: 'white',
                  }}
                  onClick={() => {
                    deleteLog(selectMovie, '영화');
                  }}
                >
                  기록 삭제
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgb(204, 193, 193)',
                    borderColor: 'white',
                  }}
                  onClick={handleMovieClose}
                >
                  창닫기
                </Button>
                {/* <Button variant="primary" onClick={handleMovieClose}>Save Changes</Button> */}
              </Modal.Footer>
            </Modal>
          </span>
        </Div5>
      </div>
    </div>
  );
}

