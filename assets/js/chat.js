import {getSocket} from './socket';

const chatForm = document.getElementById('chatForm');

const createMsg = (text, nickname) => {
  const div = document.createElement('div');
  div.innerHTML = `<span class"author">${
    nickname ? nickname : 'You'
  }:</span> ${text}`;
  chatForm.appendChild(div);
};
const handleSubmit = (e) => {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const {value} = input;
  console.log(value);
  getSocket().emit(window.events.sendMsg, {message: value});
  input.value = '';
  input.focus();
  createMsg(value);
};

export const handleNewMessage = ({message, nickname}) => {
  createMsg(message, nickname);
};

if (chatForm) {
  chatForm.addEventListener('submit', handleSubmit);
}
