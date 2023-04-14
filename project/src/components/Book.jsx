import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../src/hoc/auth';
import styled from 'styled-components';
import examImg from '../Book.png';
import { callBookAPI } from '../actions/logdata_action';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import axiosurl from '../axiosurl';
import moment from 'moment';
import { loginUser } from '../actions/user_action';
import { Cookies } from 'react-cookie';
import {FaSearch} from "react-icons/fa";

function Book() {
  const clientTitle = useSelector((state) => state.logdata.bookinfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [searchClass, setSearchClass] = useState('searchBoard');
  const [Imgsrc, setImgsrc] = useState(examImg);
  const bookSearch = useRef();
  const logDate = useRef();
  const titleNyear = useRef();
  const author = useRef();
  const genre = useRef();
  const review = useRef();
  const P = useSelector((state) => state.date.date);
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
    if (e.key == 'Enter') search();
  };
  const search = async () => {
    if (bookSearch.current.value === '') alert('검색어를 입력하세요');
    else {
      const result = await callBookAPI({
        title: bookSearch.current.value,
      });
      console.log('component', result);
      dispatch(result);
      setSearchClass('searchBoard');
      bookSearch.current.value = '';
      setOpen(true);
    }
    // dispatch를 실행할 때는 action을 보내야 한다. action은 객체형태 즉, {} 형태여야 한다.
  };
  function titleconfirm(e) {
    let bookform = clientTitle[e.target.className];
    setSearchClass('d-none');
    titleNyear.current.value = `${bookform.title}(${bookform.publisher})`;
    author.current.value = bookform.author;
    genre.current.value = bookform.categoryName;
    setImgsrc(bookform.img);
  }
  const user = useSelector((state) => state.user.loginSuccess);
  const submit = () => {
    //console.log('user', user);
    if (titleNyear.current.value === '' || review.current.value === '')
      alert('정보를 모두 입력하세요');
    else {
      if (
        window.confirm(
          '한번 등록된 로그는 수정할 수 없습니다. 이대로 올릴까요?'
        ) === true
      ) {
        axios({
          method: 'post',
          url: axiosurl.toDBbook,
          data: {
            email: user.email,
            date: logDate.current.value,
            title: titleNyear.current.value,
            author: author.current.value,
            genre: genre.current.value,
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

  return (
    <>
      <Div6>
        <Img src={Imgsrc} alt="예시이미지" style={{marginRight:'50px'}}></Img>
        <Div7>
        <div style={{ display: "flex", alignItems: "center" }}>
            <SearchInput
            type="text"
            name="search"
            placeholder="ㅤ책 제목을 검색해주세요"
            ref={bookSearch}
            onKeyPress={onKeyPress}
            style={{ marginRight: "-40px" }} // 검색 입력창과 버튼 사이의 간격을 조정
          />
          <button type="button" onClick={search}>
          <FaSearch /> 
          </button>
        </div>
  {open === true ? (
    <Div8 className={searchClass}>
      {clientTitle.length < 1
  ? '책을 찾을 수 없습니다'
  : clientTitle.map((el, index) => (
      <p key={index} className={index} onClick={titleconfirm}>
        {`${el.title},${el.author},${el.publisher}`}
        <hr style={{marginTop:'20px'}}/>
      </p>
    ))}
    </Div8>
  ) : null}
<div style={{ position: 'relative' }}>
  <Label
    htmlFor="date">
    Date.
  </Label>
  <Input
    type="text"
    ref={logDate}
    defaultValue={moment(P).format('YYYY.MM.DD. ddd')}
  />
</div>

<div style={{ position: 'relative' }}>
  <Label
    htmlFor="titleNyear"
  >
    Title.
  </Label>
  <Input ref={titleNyear} type="text" id="titleNyear" />
</div>

<div style={{ position: 'relative' }}>
  <Label htmlFor="author">
    Author.
  </Label>
  <Input ref={author} type="text" id="author" />
</div>

<div style={{ position: 'relative' }}>
  <Label
    htmlFor="genre">
    Genre. </Label>
  <Input ref={genre} type="text" id="genre" />
</div>

<div style={{ position: 'relative' }}>
<Label htmlFor="review">
   Review.
</Label>
<textarea ref={review} placeholder="후기를 작성해주세요" />
</div>
</Div7>
<Button onClick={submit}>Record</Button>
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
  background-color: rgb(238 237 234);
  border-radius: 50px;
  box-shadow: #d0d6c3;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0px;
    padding-top: 180px;
    display: flex;
    width: 100%;
    border-radius: 50px 50px 0px 0px;
    margin-top: 30px;
    margin-bottom: 0px;
    height: 1250px;
  }
`;

const Button = styled.button`
  width: 2500px;
  height: 100px;
  margin-top: 855px;
  margin-left: -600px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid white;
  appearance: none;
  font-size: 1.2rem;
  font-weight: 1000;
  font-style:italic;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  &:hover,
  &:focus {
    color: #1f2020;
    outline: 0;
  }
  cursor: pointer;
  color: white;
  background-color: #484848;   
  transition: box-shadow 200ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    box-shadow: 0 0 40px 40px white inset;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;
    margin-left: 0px;
    align-items: center;
    width: 420px;
    display: flex;
    padding: 40px 0px;
  }
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
    background-color: transparent;
    color: #353434;
    border-radius: 15px;
    width: 600px;
    height: 36px;
    display: inline-block;
    height: 300px;
    scroll-behavior: smooth;
    @media screen and (max-width: 768px) {
      margin-left: 0px;
      margin-top: 53px;
      align-items: center;
      display: flex;
      padding-top: 11px;
      scroll-behavior: smooth;
      width: 95%;
      max-width: 410px;
    }
  }
`;

const Div8 = styled.div`
  position: absolute;
  top: 23.7rem;
  border-radius: 10px;
  padding: 1.2rem;
  background-color: white;
  color: black;
  width: 600px;
  margin-left: 20px;
  border-color:gray;
  box-shadow: 0px 1px 1px 1px gray;
  z-index:10;
  background-color: #F0F0F0;
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    margin-left: 0px;
    top: 47rem;
  }
`;

const SearchInput = styled.input`
  border: 1px solid white;
  margin-bottom: -3px;
  margin-left: 20px;
  border-radius: 20px;
  border-color: #232121;
  background-color: transparent;
  outline: none;
  width: 600px;
  height: 52px;
  display: inline-block;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    width: 400px;
    margin-top: 0px;
    margin-left: -10px;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1.5px solid black;
  margin-top: 70px;
  margin-left: 20px;
  outline: none;
  background-color: rgb(238 237 234);
  color: #505050;
  width: 600px;
  height: 36px;
  display: inline-block;
  flex-wrap: wrap;
  text-align: right; /* 오른쪽 정렬 추가 */
  @media screen and (max-width: 768px) {
    width: 260px;
    margin-left:150px;
    margin-top: 10px;
    font-size:small;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 3.3rem;
  left: 1.5rem;
  font-size: 2rem;
  color: #464646;

  /* 특정 라벨에 대한 스타일 */
  ${props => props.htmlFor === 'review' && `
  position: absolute;
  top: 3.3rem;
  left: 1.5rem;
  font-size: 2rem;
  color: #464646;
    @media screen and (max-width: 768px) {
     top:0.2em;
     left:-2.9em;
    }
  `}

  /* 화면 너비가 768px 이하일 때의 스타일 */
  @media screen and (max-width: 768px) {
    top: 0.3em;
   
    /* 반응형에 맞는 스타일 */
  }
`;

const Img = styled.img`
  margin-left: -100px;
  margin-top: 50px;
  width: 400px;
  height: 500px;
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    margin-top: -130px;
    margin-left: 0px;
    width: 95%;
    max-width: 400px;
    max-height: 450px;
  }
 
`;

export default Auth(Book, true);
