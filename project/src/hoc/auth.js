import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user_action';
import { useNavigate } from 'react-router-dom';
import { socketPageRefresh } from '../actions/socket_action';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
  //option: null, true, false
  //null 아무나 출입 가능
  //true 로그인한 유저만 출입이 가능한 페이지
  //false 로그인한 유저는 출입 불가능한 페이지
  //adminRoute => admin 유저만 들어갈 수 있도록 하려면 true(기본값은 null)
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 페이지 새로고침 후 socket 데이터 업데이트용 (관리자의 본인 방 삭제)
    const socket = useSelector((state) => state.socket.socket);
    let tempRoomId = '';
    socket.on('pageRefreshRoomIdReceive', (data) => {
      tempRoomId = data;
    });

    useEffect(() => {
      //백엔드에서 처리한 정보가 response에 들어 있음.
      dispatch(auth()).then((response) => {
        // 페이지 새로고침 후 socket 데이터 업데이트용 (관리자의 본인 방 삭제)
        if (response.payload.permission === 'manager') {
          // console.log('tempRoomId', tempRoomId);
          // dispatch 순서가 먼저 실행이 되서, 문제가 발생
          // 나중으로 미루기 위해 setTimeout으로 지연
          setTimeout(() => {
            dispatch(socketPageRefresh(tempRoomId, response.payload));
          }, 5000);
        }

        if (!response.payload.isAuth) {
          //로그인 하지 않은 상태
          if (option) {
            navigate('/login');
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
