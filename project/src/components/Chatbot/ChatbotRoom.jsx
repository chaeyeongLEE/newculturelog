import React, { useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './ChatbotRoom.css';

export default function ChatbotRoom({
  mySocketId,
  myRoomId,
  userInfo,
  message,
}) {
  const socket = useSelector((state) => state.socket.socket);

  // 관리자가 방을 나갈 때 messageRoom의 데이터가 초기화가 되서
  // 밑의 코드에서 Error가 발생한다.
  // 그래서 컴포넌트를 UnMount 실행했을 때,
  // props로 가져온 데이터가 Undefined이여도 기본 값 데이터를 넣어줌으로써 Error를 방지한다.
  const messageRoomDefaultData = {
    0: {
      permission: 'server',
      content: 'Error Prevention',
      time: '2023. 1. 01. 00:00:00',
      socketId: '00000000000000000000',
      userId: '',
    },
  };
  const messageRoom = message[0][myRoomId]
    ? message[0][myRoomId]
    : messageRoomDefaultData;
  const date = new Date();
  const chatInput = useRef();

  function messageSend() {
    // console.log('chatInput: ', chatInput.current.value);
    if (chatInput.current.value === '') {
      chatInput.current.placeholder = '내용을 입력해주세요';
      return false;
    }

    if (!userInfo.email) {
      userInfo.email = '사용자' + mySocketId.slice(2, 7);
    }

    socket.emit('message', {
      content: chatInput.current.value,
      socketId: mySocketId,
      roomId: myRoomId,
      permission: userInfo.permission,
      // userId: userInfo.userId,
      userId: userInfo.email,
      time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
    });

    const chatWindowAreaScroll = document.getElementById(
      'chatWindowAreaScroll'
    );

    // 클릭으로 메시지 전송 시 스크롤 이동, textArea 값 초기화
    setTimeout(() => {
      chatInput.current.value = '';
      chatInput.current.focus();
    }, 1);
    setTimeout(() => {
      chatWindowAreaScroll.scrollTop = chatWindowAreaScroll.scrollHeight + 39;
    }, 5);
  }

  useEffect(() => {
    // 처음 접속 시 채팅방 스크롤 아래로 내리기
    const chatWindowAreaScroll = document.getElementById(
      'chatWindowAreaScroll'
    );
    chatWindowAreaScroll.scrollTop = chatWindowAreaScroll.scrollHeight;
  }, [messageRoom]);

  // TextArea에서 Enter 누르면 메시지 전송
  // TextArea에서 Ctrl + Enter 누르면 다음줄로 이동
  const inputTextAreaEnter = (e) => {
    // console.log(chatInput.current.value);
    if (e.key === 'Enter' && e.ctrlKey) {
      const currentTextValue = chatInput.current.value;
      return (chatInput.current.value = currentTextValue + '\n');
    } else if (e.key === 'Enter' && !e.ctrlKey) {
      // document.getElementById('sendBtn').focus();
      if (chatInput.current.value === '') {
        setTimeout(() => {
          chatInput.current.value = '';
        }, 1);
        chatInput.current.placeholder = '내용을 입력해주세요';
        return false;
      }
      messageSend();
      setTimeout(() => {
        chatInput.current.value = '';
        const chatWindowAreaScroll = document.getElementById(
          'chatWindowAreaScroll'
        );
        setTimeout(() => {
          chatWindowAreaScroll.scrollTop =
            chatWindowAreaScroll.scrollHeight + 39;
        }, 1);
      }, 1);
      return;
    }
  };

  const messageRender = () => {
    const result = [];
    // console.log('message lee', Object.keys(messageRoom).length);
    for (let i = 0; i < Object.keys(messageRoom).length; i++) {
      let temp = '';
      let tempHour = '';
      if (Number(messageRoom[i].time.slice(-8, -6)) < 12) {
        temp = '오전 ' + messageRoom[i].time.slice(-7, -3);
      } else {
        if (Number(messageRoom[i].time.slice(-8, -6)) > 12) {
          tempHour = Number(messageRoom[i].time.slice(-8, -6)) - 12;
          temp = '오후 ' + tempHour + messageRoom[i].time.slice(-6, -3);
        } else {
          temp = '오후 ' + tempHour + messageRoom[i].time.slice(-8, -3);
        }
      }
      result.push(
        <Row
          key={i}
          className={
            messageRoom[i].permission === 'server'
              ? 'serverMessageWrap'
              : messageRoom[i].socketId === mySocketId
              ? 'myMessageWrap'
              : 'youMessageWrap'
          }
        >
          <Col xs={12}>
            {messageRoom[i].permission === 'server' ? (
              <></>
            ) : messageRoom[i].socketId !== mySocketId ? (
              <div>
                <span className="youMessageName">
                  {messageRoom[i].userId === ''
                    ? '사용자' + messageRoom[i].socketId.slice(2, 7)
                    : messageRoom[i].userId}
                </span>
              </div>
            ) : (
              <></>
            )}
            <div>
              {messageRoom[i].permission === 'server' ? (
                <pre className="serverMessageText">
                  {messageRoom[i].content}
                </pre>
              ) : messageRoom[i].socketId === mySocketId ? (
                <>
                  <span className="myMessageTime">{temp}</span>
                  <pre className="myMessageText">{messageRoom[i].content}</pre>
                </>
              ) : (
                <>
                  <pre className="youMessageText">{messageRoom[i].content}</pre>
                  <span className="youMessageTime">{temp}</span>
                </>
              )}
            </div>
          </Col>
        </Row>
      );
    }
    return result;
  };

  return (
    <>
      {/* 채팅창 */}
      <Row className="chatWindowAreaWrap">
        <Col xs={12} id="chatWindowAreaScroll">
          {messageRender()}
          {/* 테스트용 */}
          {/* <ChatbotTestComponent /> */}

          {/* <Row className="serverMessageWrap">
            <Col xs={12}>
              <div>
                <pre className="serverMessageText">
                  만들기. 만들기. 만들기.만들기 만들기 만들기 만들기.
                  갑습니다요. <br />
                  CSS 만들기 어려워요
                </pre>
              </div>
            </Col>
          </Row>
          <Row className="myMessageWrap">
            <Col xs={12}>
              <div>
                <span className="myMessageTime">오후 10:12</span>
                <pre className="myMessageText">
                  안녕하세요. 반갑습니다. 반갑습니다요.반갑습니다갑습니다요.
                  갑습니다요. <br />
                  CSS 만들기 어려워요
                </pre>
              </div>
            </Col>
          </Row>
          <Row className="youMessageWrap">
            <Col xs={12}>
              <div>
                <span className="youMessageName">관리자</span>
              </div>
              <div>
                <pre className="youMessageText">
                  저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염저두염
                </pre>
                <span className="youMessageTime">오후 1:49</span>
              </div>
            </Col>
          </Row> */}
        </Col>
      </Row>

      {/* 채팅 Footer */}
      <Row className="chatWindowFooter">
        {/* 입력 창 */}
        <Col xs={12}>
          <textarea
            ref={chatInput}
            rows="1"
            onKeyDown={(e) => inputTextAreaEnter(e)}
          ></textarea>
        </Col>
        {/* 전송 버튼 */}
        <Col xs={12}>
          <button id="sendBtn" type="button" onClick={() => messageSend()}>
            전송
          </button>
        </Col>
      </Row>
    </>
  );
}
