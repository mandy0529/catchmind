import express from 'express';
import {join} from 'path';
import socketIO from 'socket.io';
import {socketController} from './socketController';
import events from './events';

const app = express();
const PORT = 5000;

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'static')));
app.use('/', (req, res) => {
  return res.render('home', {events: JSON.stringify(events)});
});
const server = app.listen(PORT, () =>
  console.log(`✅ listening for your server http://localhost:${PORT}`)
);

const io = socketIO(server);

io.on('connection', (socket, io) => socketController(socket, io));
