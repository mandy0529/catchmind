import {handleDisconnected, handleNewUser} from './notification';
import {handleNewMessage} from './chat';
import {handleBeginPath, handleFilled, handleStrokePath} from './paint';
import {
  handleGameEnded,
  handleGameStarted,
  handleLeaderNotification,
  handlePlayerUpdate,
  handleReadyGame,
} from './players';

let socket = null;

export const getSocket = () => socket;

export const initSocket = (newSocket) => {
  socket = newSocket;
  const {events} = window;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMsg, handleNewMessage);
  socket.on(events.beganPath, handleBeginPath);
  socket.on(events.strokedPath, handleStrokePath);
  socket.on(events.filled, handleFilled);
  socket.on(events.playerUpdate, handlePlayerUpdate);
  socket.on(events.gameStarted, handleGameStarted);
  socket.on(events.leaderNotification, handleLeaderNotification);
  socket.on(events.readyGame, handleReadyGame);
  socket.on(events.gameEnded, handleGameEnded);
};
