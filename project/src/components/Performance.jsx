import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import musicalImg from '../musical.png';
// import YeongCalendar from './YeongCalendar';
// import moment from 'moment';
// import Calendar from 'react-calendar';
import { callPerfoAPI } from '../actions/logdata_action';
import { useDispatch, useSelector } from 'react-redux';
import { dateData } from '../actions/date_action';
import axios from 'axios';
import axiosurl from '../axiosurl';
import moment from 'moment';
import Auth from '../../src/hoc/auth';
import { loginUser } from '../actions/user_action';
import { Cookies } from 'react-cookie';
function Performance(props) {
  const clientTitle = useSelector((state) => state.logdata.perfoinfo);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const P = useSelector((state) => state.date.date);

  const [searchClass, setSearchClass] = useState('searchBoard');
  const [Imgsrc, setImgsrc] = useState(musicalImg);
  const perfoSearch = useRef();
  const logDate = useRef();
  const titleNyear = useRef();
  const hall = useRef();
  const mainroll = useRef();
  const review = useRef();
  const date = useSelector(dateData);
  // console.log(date);
  const navigate = useNavigate();

  useEffect(() => {
    if (logDate.current.value === 'Invalid date') {
      alert('잘못된 접근입니다');
      navigate('/');
    }
    const cookies = new Cookies();
    if (cookies.get('x_auth') == null) {
      navigate('/');
    }
  }, []);
  const onKeyPress = (e) => {
    // eslint-disable-next-line eqeqeq
    if (e.key == 'Enter') search();
  };

  const search = async () => {
    if (perfoSearch.current.value === '') alert('검색어를 입력하세요');
    else {
      const result = await callPerfoAPI({
        title: perfoSearch.current.value,
      });
      console.log('component', result);
      setOpen(true);
      dispatch(result);
      setSearchClass('searchBoard');
      perfoSearch.current.value = '';
    }
    // dispatch를 실행할 때는 action을 보내야 한다. action은 객체형태 즉, {} 형태여야 한다.
  };
  function titleconfirm(e) {
    let perfoform = clientTitle[e.target.className];
    setSearchClass('d-none');
    titleNyear.current.value = `${perfoform.title}(${perfoform.startDate}~${perfoform.endDate},${perfoform.genre})`;
    hall.current.value = perfoform.hall;
    setImgsrc(perfoform.img);
  }
  const user = useSelector((state) => state.user.loginSuccess);
  const submit = () => {
    if (
      titleNyear.current.value === '' ||
      mainroll.current.value === '' ||
      review.current.value === ''
    )
      alert('정보를 모두 입력하세요');
    else {
      if (
        window.confirm(
          '한번 등록된 로그는 수정할 수 없습니다. 이대로 올릴까요?'
        ) === true
      ) {
        axios({
          method: 'post',
          url: axiosurl.toDBperfo,
          data: {
            email: user.email,
            date: logDate.current.value,
            title: titleNyear.current.value,
            hall: hall.current.value,
            mainroll: mainroll.current.value,
            review: review.current.value,
          },
        }).then(() => {
          //console.log('todb', res.data);
          console.log(alert('게시물이 등록되었습니다'));
          navigate('/home');
        });
      }
    }
  };
  //const [value, setValue] = useState();
  //<Calendar onChange={() => setValue} value={value} />
  return (
    <>
      <Div6>
        <Img src={Imgsrc} alt="예시이미지"></Img>
        <Div7>
          <SearchInput
            type="text"
            name="search"
            placeholder="공연명을 검색하세요"
            ref={perfoSearch}
            onKeyPress={onKeyPress}
          />
          <SearchBtn type="button" onClick={search}>
            검색
          </SearchBtn>
          {open === true ? (
            <Div8 className={searchClass}>
              {clientTitle.length < 1
                ? '공연을 찾을 수 없습니다'
                : clientTitle.map((el, index) => (
                    <p
                      key={index}
                      // key={el.img}
                      className={index}
                      dangerouslySetInnerHTML={{
                        __html: `[${el.genre}]-${el.title},${el.hall}`,
                      }}
                      onClick={titleconfirm}
                    ></p>
                  ))}
            </Div8>
          ) : null}

          <Input
            type="text"
            ref={logDate}
            defaultValue={moment(P).format('YYYY년 MM월 DD일')}
          />

          <Input
            ref={titleNyear}
            type="text"
            placeholder="공연명(공연연도, 공연장르)"
          />

          <Input ref={hall} type="text" placeholder="극장" />

          <Input
            type="text"
            ref={mainroll}
            placeholder="주요 출연자(직접입력)"
          />

          {/* <Star /> */}

          <textarea ref={review} placeholder="후기를 작성해주세요" />
        </Div7>
        <Button onClick={submit}>등록하기</Button>
      </Div6>
    </>
  );
}

const Div6 = styled.div`
  margin: auto;
  margin-top: 70px;
  margin-bottom: 70px;
  height: 1200px;
  width: 1300px;
  padding: 180px;
  text-align: center;
  display: flex;
  background-color: #d0d6c3;
  border-radius: 50px;
  box-shadow: rgba(223, 231, 136, 0.56) 0px 22px 70px 4px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0px;
    padding-top: 180px;
    padding-bottom: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 50px 50px 0px 0px;
    margin-top: 30px;
    margin-bottom: 0px;
    height: 1250px;
  }
  /* @media screen and (max-width: 700px) {
    flex-direction: column;
    margin-top: 0px;
    margin-left: 30px;
    width: 500px;
    height: 1610px;
    display: flex;
  } */
`;
const Button = styled.button`
  width: 150px;
  height: 50px;
  margin-top: 900px;
  margin-left: -600px;
  text-align: center;
  box-sizing: border-box;
  border: 3px solid white;
  appearance: none;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  &:hover,
  &:focus {
    color: #92c6b6;
    outline: 0;
  }
  cursor: pointer;
  background-color: transparent;
  border-radius: 0.6em;
  color: white;
  transition: box-shadow 200ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 0 0 40px 40px white inset;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;
    margin-left: 0px;
    align-items: center;
    width: 200px;
    display: flex;
    padding: 11px 0px;
  }
  /* @media screen and (max-width: 700px) {
    flex-direction: column;
    margin-top: 55px;
    margin-left: -10px;
    align-items: center;
    width: 200px;
    display: flex;
    padding: 11px 0px;
  } */
`;
const Div7 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0px;
    margin-top: 30px;
    align-items: center;
    max-width: 400px;
  }

  p {
    color: #090909;
    font-weight: 700;
  }

  textarea {
    margin-top: 128px;
    margin-left: 23px;
    outline: none;
    background-color: #fffafb80;
    color: #353434;
    border-radius: 15px;
    width: 600px;
    height: 36px;
    display: inline-block;
    height: 300px;
    scroll-behavior: smooth;
    @media screen and (max-width: 768px) {
      margin-left: 0px;
      margin-top: 30px;
      align-items: center;
      display: flex;
      padding-top: 11px;
      scroll-behavior: smooth;
      width: 95%;
      max-width: 410px;
    }
    /* @media screen and (max-width: 700px) {
      margin-left: -178px;
      align-items: center;
      width: 407px;
      display: flex;
      padding-top: 11px;
      scroll-behavior: smooth;
    } */
  }
`;

const Div8 = styled.div`
  position: absolute;
  top: 30.5rem;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: white;
  color: black;
  width: 700px;
  box-shadow: 1px 1px 1px 1px gray;
  background-color: #e3a49f;
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    margin-left: 0px;
    top: 47rem;
  }
  /* @media screen and (max-width: 700px) {
    width: 400px;
    margin-left: -180px;
    top: 47rem;
  } */
`;

const SearchInput = styled.input`
  border: 2px solid white;
  margin-bottom: -3px;
  margin-left: 20px;
  border-radius: 20px;
  outline: none;
  color: #010101;
  width: 420px;
  height: 52px;
  display: inline-block;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    width: 75%;
    max-width: 300px;
    margin-top: 0px;
    margin-left: -90px;
    margin-bottom: 10px;
  }
  /* @media screen and (max-width: 700px) {
    width: 300px;
    margin-top: 20px;
    margin-left: -170px;
    margin-bottom: 10px;
  } */
`;

const SearchBtn = styled.button`
  width: 100px;
  height: 50px;
  margin-top: -46px;
  margin-left: 490px;
  text-align: center;
  box-sizing: border-box;
  border: 2px solid white;
  appearance: none;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  &:hover,
  &:focus {
    color: #92c6b6;
    outline: 0;
  }
  cursor: pointer;
  background-color: transparent;
  border-radius: 0.6em;
  color: white;
  transition: box-shadow 200ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 0 0 40px 40px white inset;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: -61px;
    margin-left: 300px;
    align-items: center;
    width: 80px;
    display: flex;
    padding-top: 16px;
  }
  /* @media screen and (max-width: 700px) {
    flex-direction: column;
    margin-top: -61px;
    margin-left: 150px;
    align-items: center;
    width: 80px;
    display: flex;
    padding-top: 16px;
  } */
`;

const Input = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1.5px solid black;
  margin-top: 60px;
  margin-left: 20px;
  outline: none;
  background-color: #d0d6c3;
  color: #fefefe;
  width: 600px;
  height: 36px;
  display: inline-block;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    width: 95%;
    margin-left: 0px;
    margin-top: 20px;
    max-width: 100%;
  }
  /* @media screen and (max-width: 700px) {
    width: 400px;
    margin-left: -180px;
  } */
`;

const Img = styled.img`
  margin-left: -100px;
  margin-top: 70px;
  width: 400px;
  height: 590px;
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    margin-top: -130px;
    margin-left: 0px;
    width: 95%;
    max-width: 400px;
    max-height: 450px;
  }
  /* @media screen and (max-width: 700px) {
    text-align: center;
    margin-top: -130px;
    margin-left: -126px;
  } */
`;
export default Auth(Performance, true);
