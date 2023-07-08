const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

var cors = require('cors');
var timesyncServer = require('timesync/server');

const port = 3000
app.use(cors({
  origin: 'http://127.0.0.1:5173'
}));

app.get('/start', (req, res) => {
  const d = new Date();
  d.getTime()
  res.send(`${1688748556998}`)
})
app.use('/timesync', timesyncServer.requestHandler);
app.use(express.static('public'))

io.on('connection', function (socket) {
  socket.on('timesync', function (data) {
    console.log('message', data);
    socket.emit('timesync', {
      id: data && 'id' in data ? data.id : null,
      result: Date.now()
    });
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})