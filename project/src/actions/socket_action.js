import {
  SOCKET_INIT,
  SOCKET_ROOM_ADD,
  SOCKET_INIT_MESSAGE_ADD,
  SOCKET_MESSAGE_ADD,
  SOCKET_ROOM_REFRESH,
  SOCKET_LOGIN_UPDATE,
  SOCKET_ROOM_REFRESH_UPATE,
  SOCKET_PAGE_REFRESH,
  SOCKET_ROOM_MANAGER_LEAVE,
} from './types';

export function socketInit(socket) {
  return {
    type: SOCKET_INIT,
    payload: socket,
  };
}

export function socketRoomsRefreshUpdate(roomData) {
  const tempMsg = [];
  for (let i = 0; i < roomData.msg.length; i++) {
    tempMsg.push(roomData.msg[i]);
  }
  return {
    type: SOCKET_ROOM_REFRESH_UPATE,
    payload: { room: roomData, roomMsg: tempMsg },
  };
}

export function socketInitMessageAdd(msg) {
  return {
    type: SOCKET_INIT_MESSAGE_ADD,
    payload: msg,
  };
}

export function socketRoomsAdd(roomData) {
  return {
    type: SOCKET_ROOM_ADD,
    payload: roomData,
  };
}

export function socketMessageAdd(msg) {
  return {
    type: SOCKET_MESSAGE_ADD,
    payload: msg,
  };
}

export function socketRoomsRefresh() {
  return {
    type: SOCKET_ROOM_REFRESH,
  };
}

export function socketUserLogin(roomData, userData) {
  return {
    type: SOCKET_LOGIN_UPDATE,
    payload: { roomData, userData },
  };
}

export function socketPageRefresh(roomData, userData) {
  return {
    type: SOCKET_PAGE_REFRESH,
    payload: { roomData, userData },
  };
}

export function socketManagerRoomLeave(roomId) {
  return {
    type: SOCKET_ROOM_MANAGER_LEAVE,
    payload: roomId,
  };
}
