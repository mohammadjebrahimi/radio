const express = require('express')
var cors = require('cors');
var timesyncServer = require('timesync/server');
const app = express()
const port = 3000
app.use(cors({
  origin: 'http://127.0.0.1:5173'
}));

app.get('/start', (req, res) => {
  const d = new Date();
  d.getTime()
  res.send(`${1688655861803}`)
})
app.use('/timesync', timesyncServer.requestHandler);
app.use(express.static('public'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})