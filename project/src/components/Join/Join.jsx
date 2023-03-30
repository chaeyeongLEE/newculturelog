import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../actions/user_action';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Auth from '../../hoc/auth';

const Div2 = styled.div`
  margin: auto;
  width: 500px;
  height: 570px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
  @media screen and (max-width: 500px) {
    width: 100% !important;
  }
  input {
    width: 350px;
    height: 40px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1.5px solid black;
    outline: none;
    margin-bottom: 10px;
    padding-left: 5px;
  }
  h1 {
    font-weight: 700;
    font-size: 40px;
    color: #cecc7f;
    margin-bottom: 25px;
  }
  button {
    background-color: #cecc7f;
    color: #ffffff;
    border-color: #cecc7f;
    border-radius: 4px;
    margin-top: 20px;
    width: 100px;
    box-shadow: 0 2px 8px rgba(230, 115, 53, 0.25);
    font-size: 17px;
  }
`;
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80vh',
        minHeight: '570px',
      }}
    >
      <form onSubmit={onSubmitHandler}>
        <Div2>
          <h1>JOIN</h1>
          <label style={{ fontSize: '1.5rem' }}>ID</label>
          <input type="text" value={Email} onChange={onEmailHandler} />
          {Email.length > 0 && (
            <span style={{ fontSize: '0.9rem' }}>{EmailMessage}</span>
          )}
          <label style={{ marginTop: '15px', fontSize: '1.5rem' }}>
            Password
          </label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
          {Password.length > 0 && (
            <span style={{ fontSize: '0.9rem' }}>{PasswordMessage}</span>
          )}
          <label style={{ marginTop: '20px', fontSize: '1.5rem' }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
          {ConfirmPassword.length > 0 && (
            <span style={{ fontSize: '0.9rem' }}>{PasswordConfirmMessage}</span>
          )}
          {/* <br /> */}
          <button type="submit">회원가입</button>
        </Div2>
      </form>
    </div>
  );
}
export default Auth(Join, null);
