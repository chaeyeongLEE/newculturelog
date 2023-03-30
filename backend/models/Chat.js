const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = mongoose.Schema({
  roomId: {
    type: String,
    unique: 1, // 중복 방지
    required: true,
  },
  clientSocketId: {
    type: String,
    required: true,
  },
  clientUserId: {
    type: String,
  },
  createdAt: {
    type: Date,
    expires: '1d',
    default: Date.now,
  },
  // socket 특성으로 바로 삭제 안되는 경우도 있기 때문에 만료 설정
  // 1일 후에 삭제되도록 설정
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

const chatSchema = mongoose.Schema({
  ChatRoom_id: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom',
  },
  roomId: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    default: ' ',
  },
  time: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    expires: '1d',
    default: Date.now,
  },
  // socket 특성으로 바로 삭제 안되는 경우도 있기 때문에 만료 설정
  // 1일 후에 삭제되도록 설정
});

const Chat = mongoose.model('Chats', chatSchema);

module.exports = { ChatRoom, Chat };
