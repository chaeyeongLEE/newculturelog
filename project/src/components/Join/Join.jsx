import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../actions/user_action';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Auth from '../../hoc/auth';
import logo2 from '../../logo2.png'

function Join() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //아이디, 비밀번호, 비밀번호 확인
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  //오류 메세지 상태 저장
  const [EmailMessage, setEmailMessage] = useState('');
  const [PasswordMessage, setPasswordMessage] = useState('');
  const [PasswordConfirmMessage, setPasswordConfirmMessage] = useState('');
  //유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
    if (e.target.value < 2 || e.target.value.length > 8) {
      setEmailMessage('2글자 이상 8글자 미만으로 입력해주세요');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이름 형식입니다.');
      setIsEmail(true);
    }
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
    const passwordValidation =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,8}$/;
    const passwordCurrent = e.target.value;
    if (!passwordValidation.test(passwordCurrent)) {
      setPasswordMessage(
        '영문자+숫자+특수문자(!@#$%^*+=-) 조합으로 4자리 이상 8자리 이하로 입력해주세요.'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호입니다.');
      setIsPassword(true);
    }
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
    if (Password === e.target.value) {
      setPasswordConfirmMessage('비밀번호를 똑같이 입력하셨어요');
      setIsPasswordConfirm(true);
      if (Password === e.target.value && !isPassword) {
        setPasswordConfirmMessage('비밀번호 형식에 맞게 입력해주세요');
      }
    } else {
      setPasswordConfirmMessage('비밀번호와 비밀번호 확인은 같아야 합니다.');
      setIsPasswordConfirm(false);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault(); //이걸 써야 페이지가 초기화되는 것을 막을 수 있다.
    // 회원가입 DB에 저장할 때 permission도 설정 부탁드려요
    // 기본 값 default
    // 관리자는 따로 DB에서 직접 수정할 예정입니다.
    // 관리자 manager
    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    } else if (!isPassword) {
      return alert('비밀번호 형식에 맞게 입력해주세요');
    }

    let body = {
      email: Email,
      password: Password,
      permission: 'default',
    };
    //리덕스를 쓰지 않을 경우
    //axios.post('/api/users/register', body)
    if (!Email) {
      return alert('아이디를 입력해주세요');
    } else if (!Password) {
      return alert('비밀번호를 입력해주세요');
    }
    dispatch(registerUser(body))
      //랜딩페이지(초기페이지로 렌딩)
      //회원가입 성공시 '/login'로 이동.
      .then((response) => {
        if (response.payload.success) {
          navigate('/login');
          alert(`환영합니다 ${Email}님😍`);
        } else {
          alert(response.payload.msg);
        }
      });
  };
  return (
   
<div class="grid grid-cols-2">
  <div class="row-span-4 flex-1">
    <img src={logo2} />
  </div>
  <div class="row-span-3 border-slate-800 border-1 grid justify-items-center flex-2">
  <input class="border-0 bg-transparent h-50 mb-4 w-2/3 p-2" type="text" value={Email} onChange={onEmailHandler} placeholder="Email" />
    {Email.length > 0 && (<div>{EmailMessage}</div>)}
    <input class="border-0 bg-transparent h-50 mb-4 w-2/3 p-2" type="password" value={Password} onChange={onPasswordHandler} placeholder="Password" />
    {Password.length > 0 && (<div>{PasswordMessage}</div>)}
    <input class="border-0 bg-transparent h-50 mb-4 w-2/3 p-2" type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder="Confirm Password" />
    {ConfirmPassword.length > 0 && (<div>{PasswordConfirmMessage}</div>)}
  </div>
  <div class="row-span-1 bg-gray-600 flex items-center justify-center col-span-2 sm:col-span-1">
    <button class="text-white font-bold py-4 px-4 rounded w-full max-w-md focus:outline-none focus:shadow-outline" type="submit">Register</button>
  </div>
</div>



  );
}
export default Auth(Join, null);