import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../logo.png';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/user_action';
import { Cookies } from 'react-cookie';

// styled componets 설정은 함수 밖에서 해야 콘솔 창에 경고 메시지가 출력이 안된다.
const Nav = styled.nav`
  width: 100%;
  text-align: center;
  li {
    list-style: none;
    height: 80px;
  }
  p {
    color: '#b1bd96';
    margin-top: 30px;
  }
`;

export default function Header() {
  const imgStyle = { width: '128px', marginLeft: '10px', marginTop: '10px' };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cookies = new Cookies();
  const isUser = useSelector((state) => state.user.loginSuccess);

  const onClickHandler = () => {
    axios
      .get(`${process.env.REACT_APP_BACK}/api/users/logout`)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          //로그 아웃 되었을 때 어디 페이지로 갈 건지 정해야 함.
          //기본은 로그인 페이지..
          cookies.remove('x_auth');
          dispatch(logoutUser());
          navigate('/');
          alert('로그아웃 되었습니다.');
        } else {
          alert('로그아웃 실패.');
        }
      });
  };

  return (
    <>
      <Nav>
        <ul
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <li>
            {' '}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p
                style={{
                  fontSize: '27px',
                  fontWeight: '600',
                  color: '#b1bd96',
                }}
              >
                HOME
              </p>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src={logoImg} alt="로고" style={imgStyle}></img>
            </Link>
          </li>
          {/* 로그인 여부에 따라 나오는 버튼 구현 */}
          {cookies.get('x_auth') ? (
            <li className="Header_logout">
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <p
                  style={{
                    fontSize: '27px',
                    fontWeight: '600',
                    color: '#b1bd96',
                  }}
                  onClick={onClickHandler}
                >
                  LOGOUT
                </p>
              </Link>
            </li>
          ) : (
            <li className="Header_login">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <p
                  style={{
                    fontSize: '30px',
                    fontWeight: '700',
                    color: '#b1bd96',
                  }}
                >
                  LOGIN
                </p>
              </Link>
            </li>
          )}
        </ul>
      </Nav>
      <div
        style={{
          width: '100%',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <hr
          style={{
            width: '90%',
            borderTop: '3px double #abd4c9',
            marginTop: '25px',
          }}
        ></hr>
      </div>
    </>
  );
}
