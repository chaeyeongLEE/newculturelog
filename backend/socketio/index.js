const uuid = require('uuid');
const dbChat = require('./chat');

// 소켓 임시 저장 변수
// const data = {};
// const rooms = [];
// let userId = '';

// 메시지 시간 저장 변수
const date = new Date();

module.exports = (socketIO) => {
  // 여기서는 io.on, io.emit 대신에 socketIO.on 으로 사용하면 된다.
  socketIO.on('connection', (socket) => {
    // socket.id 자동 발급
    // uuid.v4 수동 발급
    const roomUid = uuid.v4();

    // 본인 방에 강제 입장 시키기
    socket.join(roomUid);

    // 기본 userId 값은 roomUid와 동일하게 설정
    // userId = roomUid;

    // 방 리스트 임시 저장
    // const tempRoom = {
    //   roomId: roomUid,
    //   clientSocketId: socket.id,
    //   clientUserId: userId,
    //   msg: [
    //     {
    //       permission: 'server',
    //       content: '문의 사항이 있으시면 메시지 남겨주세요.',
    //       time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
    //       socketId: 'e9f1',
    //       userId: 'pasd123',
    //     },
    //     {
    //       permission: 'default',
    //       content: '문gggggggg',
    //       time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
    //       socketId: 'j2ygf8',
    //       userId: 'zxcv123',
    //     },
    //   ],
    // };
    // 방 리스트 저장
    // rooms.push(tempRoom);

    // console.log('roomSave roomId', roomUid);
    // console.log('roomSave roomId', socket.id);
    // console.log('roomSave roomId', userId);
    dbChat.roomSave(roomUid, socket.id).then((response) => {
      // console.log('dbChat.roomSave', response);
      const welcomeData = {
        ChatRoom_id: response._id,
        roomId: response.roomId,
        socketId: response.clientSocketId,
        permission: 'server',
        content:
          '문의 사항이 있으시면 메시지 남겨주세요.\n이용시간: 오전 10시 ~ 오후 5시',
        time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
        userId: '사용자' + response.clientSocketId.slice(2, 7),
      };
      dbChat.messageSave(welcomeData).then((response) => {
        // console.log('dbChat.messageSave response', response);
        socket.emit('welcome', {
          roomId: response.roomId,
          socketId: response.socketId,
          permission: response.permission,
          content: response.content,
          time: response.time,
          userId: response.userId,
        });
      });
    });

    // 기본 메시지 + 사용자 방ID, 소켓ID
    // socket.emit('welcome', {
    //   roomId: roomUid,
    //   socketId: socket.id,
    //   permission: 'server',
    //   content: '문의 사항이 있으시면 메시지 남겨주세요.',
    //   time: '',
    //   userId: '',
    //   // time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
    // });

    // 관리자 로그인 시 실행해주려고 했는데, 현재 Chatbot 컴포넌트가 따로 돌고 있어서 그런지,
    // 로그인 이후에도 실행이 안되서, 바로 데이터 보내주는 방식으로 변경
    // 단, 로그인 유저가 manager인 경우에만 데이터 볼 수 있게 함
    // socketIO.emit('getRooms', rooms);
    // 자동 뿌리기 말고, 새로고침 버튼으로 요청 할때 주는 걸로 변경
    socket.on('getRoomsList', (myRoomId) => {
      dbChat.roomListCall(myRoomId).then((response) => {
        // console.log('roomListCall End', response);
        // console.log('rooms', rooms);

        for (let i = 0; i < response.length; i++) {
          if (myRoomId === response[i].roomId) continue;
          socket.join(response[i].roomId);
        }

        socket.emit('getRooms', response);
      });
      // socket.emit('getRooms', rooms);
    });

    socket.on('message', (data) => {
      console.log('message', data);
      if (data.content === '') {
        data.content === ' ';
      }
      const messageData = {
        ChatRoom_id: '',
        roomId: data.roomId,
        socketId: data.socketId,
        permission: data.permission,
        content: data.content,
        time: data.time,
        userId: data.userId,
      };

      dbChat.messageSave(messageData).then((response) => {
        socketIO.emit('receiveMessage', {
          content: response.content,
          socketId: response.socketId,
          permission: response.permission,
          userId: response.userId,
          time: response.time,
          roomId: response.roomId,
        });
      });
    });

    // 사용자 로그인 시 정보 업데이트
    socket.on('userLogin', (roomData, userData) => {
      console.log('userLogin userData', userData);
      console.log('userLogin roomData', roomData);
      // 프론트로 업데이트 정보 전송, 이미 발송한 메시지는 유저 정보 업데이트 안됨
      socketIO.emit('userLoginUpdate', roomData, userData);
      // DB 데이터 업데이트
      dbChat.socketUserLogin(userData, roomData);
    });

    // 페이지 새로고침 시 roomId 요청 (관리자 전용)
    socket.emit('pageRefreshRoomIdReceive', roomUid);

    // 관리자 방 나가기 클릭
    socket.on('leaveRoom', (roomIdData) => {
      // console.log('roomIdData', roomIdData);
      socket.leave(roomIdData);
      dbChat.managerRoomLeave(roomIdData);
    });

    // 사용자 연결 종료
    socket.on('disconnect', () => {
      console.log(socket.id + ' Exit');

      socketIO.emit('userDisconnect', {
        content: '사용자가 접속을 종료하였습니다.',
        socketId: socket.id,
        permission: 'server',
        userId: '',
        time: date.toLocaleDateString() + ' ' + date.toString().slice(16, 24),
        roomId: roomUid,
      });
      dbChat.userDisconnection(roomUid);
      // delete data[socket.id];
    });
  });
};
