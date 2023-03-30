const { ChatRoom, Chat } = require('../models/Chat');

// 처음 접속 시 방 정보 저장
exports.roomSave = async (roomId, socketId) => {
  try {
    // console.log('roomSave roomId', roomId);
    // console.log('roomSave roomId', socketId);
    // console.log('roomSave roomId', userId);
    const data = {
      roomId: roomId,
      clientSocketId: socketId,
      clientUserId: '사용자' + socketId.slice(2, 7),
    };
    const chatRoom = new ChatRoom(data);
    // await chatRoom.save();
    const result = await chatRoom.save();
    // console.log('roomSave result', result);
    return result;
  } catch (err) {
    console.log('roomSave err', err);
  }
};

exports.messageSave = async (data) => {
  try {
    // console.log('messageSave data', data);

    if (data.ChatRoom_id === '' || data.ChatRoom_id === undefined) {
      const messageRoomFind = await ChatRoom.findOne(
        {
          roomId: data.roomId,
        },
        // 특정 컬럼 제외하는 방법 (0: 제외, 1: 선택)
        { createdAt: 0 }
      );
      // console.log('messageRoomFind', messageRoomFind);
      data.ChatRoom_id = messageRoomFind._id;
    }
    // console.log('data.ChatRoom_id', data.ChatRoom_id);

    // findById는 조건에 해당하는 id만 찾아준다.
    // const chatRoom = await ChatRoom.findById(data.socketId);
    const chat = new Chat(data);
    const result = await chat.save();
    // console.log('messageSave result', result);
    return result;
  } catch (err) {
    console.log('messageSave err', err);
  }
};

// 방 새로고침
exports.roomListCall = async (myRoomId) => {
  try {
    let resultRoomList = [];
    // 해당 데이터 제외하고 조회 (Not)
    // { roomId: { $ne: myRoomId } }
    const roomResult = await ChatRoom.find(
      { roomId: { $ne: myRoomId } },
      // 특정 컬럼 제외하는 방법 (0: 제외, 1: 선택)
      { createdAt: 0 }
    );
    // console.log('roomListCall result', roomResult);

    // forEach 함수는 async await 작동이 안된다.
    // 대체안으로 for of 함수를 사용하면 된다.
    // roomResult.forEach(async (el) => {
    for (const el of roomResult) {
      // console.log('roomResult el', el);
      const chatResult = await Chat.find(
        {
          ChatRoom_id: el._id,
        },
        // 특정 컬럼 제외하는 방법 (0: 제외, 1: 선택)
        { _id: 0, ChatRoom_id: 0, createdAt: 0 }
      );
      // "-컬럼" / 해당 컬럼 조회 결과에서 제외
      // _id는 몽고DB 특성상 자동 생성되기 때문에 해당 방법으로는 안된다고 함
      // .select('-_id, -ChatRoom_id');
      // console.log('chat Result', chatResult);
      // console.log('chat Result length', chatResult.length);

      // 메시지가 2개 이상인 경우에만 진행, 서버 메시지 기본 1개
      if (chatResult.length > 1) {
        const tempMsgData = [];
        for (let i = 0; i < chatResult.length; i++) {
          tempMsgData.push(chatResult[i]);
        }
        // console.log('tempMsgData', tempMsgData);
        resultRoomList.push({
          roomId: el.roomId,
          clientSocketId: el.clientSocketId,
          clientUserId: el.clientUserId,
          msg: tempMsgData,
        });
        // console.log('resultRoomList', resultRoomList);
      }
    }

    // console.log('resultRoomList', resultRoomList);
    // console.log('resultRoomList[1]', resultRoomList[1]);
    // console.log('resultRoomList[1].msg', resultRoomList[1].msg);

    return resultRoomList;
    // return roomResult;
  } catch (err) {
    console.log('roomListCall err', err);
  }
};

exports.userDisconnection = async (roomId) => {
  try {
    // 사용자 로그아웃 또는 브라우저 종료 시 실행
    // roomID 값을 기준으로 데이터 삭제
    // deleteMany 다수 데이터 삭제
    await ChatRoom.deleteMany({ roomId: roomId });
    await Chat.deleteMany({ roomId: roomId });
    return true;
  } catch (err) {
    console.log('userDisconnection Delete Err', err);
  }
};

// 사용자 로그인 시 DB 정보 업데이트
exports.socketUserLogin = async (userData, roomData) => {
  try {
    await ChatRoom.updateMany(
      { clientSocketId: roomData.clientSocketId },
      { clientUserId: userData.email }
    );
    await Chat.updateMany(
      { socketId: roomData.clientSocketId },
      { userId: userData.email }
    );
    return true;
  } catch (err) {
    console.log('socketUserLogin Update Err', err);
  }
};

exports.managerRoomLeave = async (roomId) => {
  try {
    // 관리자가 수동으로 방 나가기 클릭 시 실행
    // roomID 값을 기준으로 데이터 삭제
    // deleteMany 다수 데이터 삭제
    await ChatRoom.deleteMany({ roomId: roomId });
    await Chat.deleteMany({ roomId: roomId });
    return true;
  } catch (err) {
    console.log('managerRoomLeave Delete Err', err);
  }
};

exports.alarmRoomListCall = async (req, res) => {
  try {
    console.log('req.query', req.query);
    const resultRoomList = await ChatRoom.find(
      // { roomId: { $ne: myRoomId } },
      { roomId: { $ne: req.query.myRoomId } },
      // 특정 컬럼 제외하는 방법 (0: 제외, 1: 선택)
      { _id: 0, roomId: 1 }
    );
    console.log('resultRoomList', resultRoomList);
    res.send(resultRoomList);
    // return resultRoomList;
  } catch (err) {
    console.log('roomListCall err', err);
  }
};

// 특정 컬렉션의 데이터 전부 삭제
// db.chatrooms.deleteMany({});
// db.chats.deleteMany({});
