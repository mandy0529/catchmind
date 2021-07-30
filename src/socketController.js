import events from './events';
import {chooseWords} from './words';

let sockets = [];
let inProcess = false;
let word = undefined;
let leader = undefined;
let timeout = undefined;

export const socketController = (socket, io) => {
  const broadcast = (event, data) => {
    socket.broadcast.emit(event, data);
  };
  const superBroadcast = (event, data) => {
    io.emit(event, data);
  };
  const chooseLeader = () => {
    return sockets[Math.floor(Math.random() * sockets.length)];
  };
  const startGame = () => {
    if (sockets.length > 1) {
      if (inProcess === false) {
        inProcess = true;
        leader = chooseLeader();
        word = chooseWords();
        setTimeout(() => {
          superBroadcast(events.gameStarted);
          io.to(leader.id).emit(events.leaderNotification, {word});
          timeout = setTimeout(() => finishGame(), 10000);
        }, 3000);
        superBroadcast(events.readyGame);
      }
    }
  };
  const finishGame = () => {
    inProcess = false;
    superBroadcast(events.gameEnded, {word});
    clearTimeout(timeout);
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    setTimeout(() => startGame(), 3000);
  };

  const addPoint = (id) => {
    sockets.map((socket) => {
      if (socket.id === id) {
        socket.point += 10;
      }
      return sockets;
    });
    superBroadcast(events.playerUpdate, {sockets});
  };

  socket.on(events.setNickName, ({nickname}) => {
    socket.nickname = nickname;
    sockets.push({
      id: socket.id,
      point: 0,
      nickname: nickname,
    });
    broadcast(events.newUser, {nickname});
    superBroadcast(events.playerUpdate, {sockets});
    startGame();
  });
  socket.on(events.disconnect, () => {
    sockets = sockets.filter((leftSocket) => leftSocket.id !== socket.id);
    broadcast(events.disconnected, {nickname: socket.nickname});
    if (sockets.length === 1) {
      finishGame();
    } else if (leader) {
      if (socket.id === leader.id) {
        finishGame();
      }
    }
    superBroadcast(events.playerUpdate, {sockets});
  });
  socket.on(events.sendMsg, ({message}) => {
    if (word === message) {
      superBroadcast(events.newMsg, {
        message: `the answer was ${word}`,
        nickname: '🤖',
      });
      addPoint(socket.id);
      finishGame();
    } else {
      broadcast(events.newMsg, {message, nickname: socket.nickname});
    }
  });
  socket.on(events.beginPath, ({x, y}) => {
    broadcast(events.beganPath, {x, y});
  });
  socket.on(events.strokePath, ({x, y, color}) => {
    broadcast(events.strokedPath, {x, y, color});
  });
  socket.on(events.fill, ({color}) => {
    broadcast(events.filled, {color});
  });
};
