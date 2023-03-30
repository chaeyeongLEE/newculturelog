//login
export const LOGIN_USER = 'login_user';
export const REGISTER_USER = 'register_user';
export const LOGOUT_USER = 'logout_user';
export const AUTH_USER = 'auth_user';
export const COOKIE_USER = 'cookie_user';

//date
export const YEAR = 'year';
export const MONTH = 'month';
export const DATE = 'date';

// movie
export const MOVIE = 'movie';
export const BOOK = 'book';
export const PERFORMANCE = 'performance';

// socket
export const SOCKET_INIT = 'socket/init';
// 처음 접속 메시지
export const SOCKET_INIT_MESSAGE_ADD = 'socket/init/message/add';
// 메시지 보내기
export const SOCKET_MESSAGE_ADD = 'socket/message/add';
// 방 추가 메시지 (아직 사용 안함)
export const SOCKET_ROOM_ADD = 'socket/rooms/add';
// 방 목록 새로고침
export const SOCKET_ROOM_REFRESH = 'socket/rooms/refresh';
// 로그인 시 SOCKET쪽의 userID 업데이트
export const SOCKET_LOGIN_UPDATE = 'socket/user/login';
// 방 새로고침
export const SOCKET_ROOM_REFRESH_UPATE = 'socket/rooms/refresh/update';
// 페이지 새로고침 후 관리자 방 출력 안되게 설정
export const SOCKET_PAGE_REFRESH = 'socket/page/refresh';
// 관리자 방 나가기
export const SOCKET_ROOM_MANAGER_LEAVE = 'socket/room/manager/leave';
