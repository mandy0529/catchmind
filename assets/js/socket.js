import {handleDisconnected, handleNewUser} from './notification';
import {handleNewMessage} from './chat';

let socket = null;

export const getSocket = () => socket;

export const initSocket = (newSocket) => {
  socket = newSocket;
  const {events} = window;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMsg, handleNewMessage);
};
