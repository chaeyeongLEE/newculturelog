import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  AUTH_USER,
  COOKIE_USER,
} from '../actions/types';

const initState = {
  loginSuccess: {
    loginSuccess: false,
    userId: '',
    userEmail: '',
    permission: 'default',
  },
};

export default function user_reducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGOUT_USER:
      return {
        ...state,
        loginSuccess: {
          loginSuccess: false,
          userId: '',
          userEmail: '',
          permission: 'default',
        },
      };
    case COOKIE_USER:
      return { ...state, cookie: action.payload };
    case AUTH_USER:
      const returnState = { ...state, userData: action.payload };
      if (action.payload.isAuth) {
        const authLogin = {
          loginSuccess: true,
          userId: action.payload._id,
          email: action.payload.email,
          permission: action.payload.permission,
        };
        returnState['loginSuccess'] = authLogin;
      }
      return returnState;
    default:
      return state;
  }
}
