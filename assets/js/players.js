const gameNoti = document.getElementById('gameNoti');

import {disableChat, enableChat} from './chat';
import {
  enableCanvas,
  disableCanvas,
  hideControllers,
  showControllers,
  resetCanvas,
} from './paint';

const addUsers = (players) => {
  const userBoard = document.getElementById('userBoard');
  userBoard.innerText = '';
  players.forEach((player) => {
    const eachPlayer = document.createElement('div');
    eachPlayer.innerText = `${player.nickname} : ${player.point}`;
    userBoard.appendChild(eachPlayer);
  });
};
const setNotification = (text) => {
  gameNoti.innerText = '';
  gameNoti.innerText = text;
};
export const handlePlayerUpdate = ({sockets}) => {
  addUsers(sockets);
};
export const handleReadyGame = () => {
  setNotification(`game will be started in 3 secs. plz ready for it`);
};
export const handleGameStarted = () => {
  setNotification('game is playing. plz write your answer');
  disableCanvas();
  enableChat();
  hideControllers();
};
export const handleLeaderNotification = ({word}) => {
  disableChat();
  enableCanvas();
  showControllers();
  setNotification(`you are leader. the word is ${word}`);
};
export const handleGameEnded = () => {
  setNotification(`game is finished.`);
  resetCanvas();
  disableCanvas();
  hideControllers();
};
