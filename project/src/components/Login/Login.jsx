import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, cookieUser } from '../../actions/user_action';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Auth from '../../hoc/auth';
import { socketUserLogin } from '../../actions/socket_action';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import logo2 from '../../logo2.png'

const Div1 = styled.div`
  margin: auto;
  width: 500px;
  /* padding: 300px; */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 100% !important;
  }
  h1 {
    font-weight: 700;
    font-size: 40px;
    color: #31383C;
    margin-bottom: 30px;
  }
`;
const Input = styled.input`
  width: 350px;
  height: 50px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1.5px solid black;
  outline: none;
  @media screen and (max-width: 350px) {
    width: 300px !important;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 70vh;
`;
const Div2 = styled.div`
  text-align: center;
  /* margin-top: -250px; */
  margin-top: 30px;
  width: 100%;
  align-items: center;
  button {
    background-color: #31383C;
    color: #f3e9e9;
    border-radius: 4px;
    border-color: #cecc7f;
    box-shadow: 0 2px 8px rgba(140, 218, 161, 0.25);
    display: inline-block;
    margin-right: 10px;
  }
`;
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const socket = useSelector((state) => state.socket.socket);
  const roomList = useSelector((state) => state.socket.roomList);

  const [Cookies, setCookie, removeCookie] = useCookies();

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault(); //이걸 써야 페이지가 초기화되는 것을 막을 수 있다.
    // console.log('Email', Email);
    // console.log('Password', Password);
    // const expires = moment().add('100', 'm').toDate();
    // setCookie('coookeee', true, { expires });
    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body))
      //랜딩페이지(초기페이지로 렌딩)
      //로그인 성공시 '/home'로 이동.
      .then((response) => {
        // 현재 방 목록 받아오기
        if (response.payload.loginSuccess) {
          socket.emit('userLogin', roomList[0], response.payload);
          navigate('/home');
          alert(`${Email}님 오늘도 행복한 하루 보내세요🥰`);
        } else {
          alert('아이디와 비밀번호 정보를 확인해주세요🙂');
        }
      });
  };
  const navigateToJoin = () => {
    navigate('/Join');
  };

  return (
  
    <div className="grid-cols-2 rows-2 flex border-slate-500 border-2 fixed">
      <div className="col-span-2 w-2/3">
      <img src={logo2}></img></div>
      <div className='w-1/3 h-2/3 '>
      <Form onSubmit={onSubmitHandler}>
        <Div1>
          <p className='italic text-4xl'>LOG-IN</p>
          <Input type="text" value={Email} onChange={onEmailHandler} placeholder="Id" className='bg-transparent' />
          <Input className='bg-transparent'
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="PASSWORD"
          />
          <div className='absolute bottom-30 flex space-x-200'>
            <button type="submit">로그인</button>
            <button onClick={navigateToJoin}>회원가입</button>
          </div>
        </Div1>
      </Form>
      </div>
      </div>
   
/*
<div class="grid grid-cols-2">
  <div class="row-span-4 flex-1 ">
  <img src={logo2} />
  </div>
  <div class="row-span-3 border-slate-800 border-1 grid justify-items-center flex-2 columns-1 gap-1" onsubmit={onSubmitHandler}>
            <div class="text-5xl">Log-in</div>
            <input class="bg-transparent w-1/2 h-45" type="text" value={Email} onChange={onEmailHandler} placeholder="Id" /> <br />
            <input class="bg-transparent w-1/2 h-45" type="password" value={Password} onChange={onPasswordHandler} placeholder="PASSWORD"  />
  </div>
  <div class="border-slate-800 border-1 bg-gray-600 mt-150 flex-3"> 
  <button class="mx-200" type="submit">로그인</button>
  <button class="mx-200 text-2xl" onClick={navigateToJoin}>회원가입</button>
  </div>
</div> */

  );
}
export default Auth(Login, null);




   