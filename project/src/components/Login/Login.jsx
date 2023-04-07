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
import Footer from '../Footer';

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
      <div className="grid grid-cols-1 md:grid-cols-2 border-slate-500 border-2 fixed h-screen">
        <div className="col-span-1 md:col-span-1 overflow-hidden">
           <img src={logo2} className="w-full h-full" alt="Logo" />
        </div>
        <div className="col-span-1 md:col-span-1 flex flex-col justify-center items-center border-b-slate-500 border-2">
          <Form onSubmit={onSubmitHandler} className="w-full" >
            <div className="text-center mb-6">
              <h1 className="text-5xl italic mb-50 text-left ml-110">LOG-IN</h1>
            </div>
            <div className="mb-4 flex justify-center">
              <div className="w-full max-w-md">
                <Input
                  type="text"
                  value={Email}
                  onChange={onEmailHandler}
                  placeholder="Id"
                  className="bg-transparent w-full border-b-2 border-black-300 py-2 px-3 focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
            <div className="mb-6 flex justify-center">
              <div className="w-full max-w-md">
                <Input
                  type="password"
                  value={Password}
                  onChange={onPasswordHandler}
                  placeholder="PASSWORD"
                  className="bg-transparent w-full border-b-2 border-black-300 py-2 px-3 focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="md:flex justify-between w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="submit"
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    로그인
                  </button>
                  <button
                    onClick={navigateToJoin}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </div>
          </Form>   
    </div> 
  <div><Footer /></div>
  </div>
  );
}
export default Auth(Login, null);




   