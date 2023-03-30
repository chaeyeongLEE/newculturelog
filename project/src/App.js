import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { socketInit } from './actions/socket_action';
import Header from './components/Header';
import Start from './pages/Start';
import Home from './components/Home';
import Login from './components/Login/Login';
import Join from './components/Join/Join';
import Book from './components/Book';
import Movie from './components/Movie';
import Performance from './components/Performance';
import NotFound from './components/NotFound';
import Chatbot from './components/Chatbot/Chatbot';
import './App.css';

function App() {
  // axios 기본 url 설정
  // 이후 axios 요청 시 기본 url은 빼고 작성하면 된다.
  // axios.defaults.baseURL = 'http://127.0.0.1:5500';
  // true로 설정해야 Server와 Cookie를 주고 받을 수 있다.
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const socket = io.connect(`${process.env.REACT_APP_BACK_SOCKET}`);
  dispatch(socketInit(socket));

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Movie" element={<Movie />} />
        <Route path="/Performance" element={<Performance />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;
