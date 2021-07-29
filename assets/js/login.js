import {initSocket} from './socket';

const body = document.querySelector('body');
const loginForm = document.getElementById('loginForm');
const nickname = localStorage.getItem('nickname');

const NICK_NAME = 'nickname';
const LOGGED_IN = 'loggedIn';
const LOGGED_OUT = 'loggedOut';

const userLogin = (nickname) => {
  const socket = io('/');
  socket.emit(window.events.setNickName, {nickname});
  initSocket(socket);
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  userLogin(nickname);
}

const handleSubmit = (e) => {
  e.preventDefault();
  const input = document.getElementById('input');
  const {value} = input;
  console.log(value);
  input.value = '';
  input.focus();
  localStorage.setItem(NICK_NAME, value);
  body.className = LOGGED_IN;
  userLogin(value);
};

if (loginForm) {
  loginForm.addEventListener('submit', handleSubmit);
}
