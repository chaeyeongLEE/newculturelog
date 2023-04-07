import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../logo.png';
import logo from '../culturelog.png'
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
    color: '#2e2e2e';
    margin-top: 17px;
  }
`;

export default function Header() {
  const imgStyle = { width: '160px', height:'40px', marginTop: '22px', marginRight:'700px'};
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
      justifyContent: 'flex-end', // 오른쪽 정렬
      alignItems: 'center', // 수직 정렬
      gap: '1rem', // 아이템 간의 간격
      marginRight:'15px'
    }}
  >
    <li style={{ marginRight: 'auto' }}>
      {/* 로고 이미지 */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <img
          src={logo}
          alt="로고"
          style={{ maxWidth: '200px', height: 'auto', marginBottom: '1rem', marginLeft:'30px', marginTop:'20px' }}
        />
      </Link>
    </li>
          {/* 로그인 여부에 따라 나오는 버튼 구현 */}
          {cookies.get('x_auth') ? (
            <li className="Header_logout">
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <p
                  style={{
                    fontSize: '25px',
                    fontWeight: '600',
                    color: '#2e2e2e',
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
                    fontSize: '25px',
                    fontWeight: '600',
                    color: '#2e2e2e',
                  }}
                >
                  LOG-IN
                </p>
              </Link>
            </li>
          )}
        </ul>
      </Nav>
    </>
  );
}
