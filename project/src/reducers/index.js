import { combineReducers } from 'redux';
import user from './user_reducer';
import logdata from './logdata_reducer';
import socket from './socket_reducer';
import date from './date_reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [user],
};
const rootReducer = combineReducers({
  user,
  logdata,
  socket,
  date,
});

export default persistReducer(persistConfig, rootReducer);
