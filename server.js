const express = require('express');



const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));
const routes = require('./config/routes');
const errorHandler = require('./lib/errorHandler');
const customResponses = require('./lib/customResponses');

const { port, env, dbURI } = require('./config/environment');

const app = express();
const http =require('http').createServer(app);
const io = require('socket.io')(4001);


app.use(morgan('dev'));

mongoose.connect(dbURI);
app.use(bodyParser.json({limit: '5mb'}));
app.use(express.static(`${__dirname}/public`));




app.use(customResponses);
app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));



app.use(errorHandler);

const server = app.listen(port, () => console.log(`Express is listening on port ${port}`));
app.io = io;



const users = {};
io.on('connection', function(socket){
  console.log(`User has Connected ${socket.id}`);
  socket.send(socket.id);

  // let numClients = 0;
  // numClients++;
  io.emit('stats', 'hello connected');
  //console.log(`Connected clients: ${socket.id}, ${numClients}`);

  socket.on('connected', (data)=>{
    socket.user = data.user;
    console.log('socket.user-->',socket.user);
    socket.emit('announcments', {data});
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  const users = [];
  socket.on('userConnect', (user)=>{
    //users.push(user);
    users.push(user);
    console.log(users);
    io.emit('activeUsers', users);
    //console.log(users);
  });

  socket.on('broadcast', (msg)=>{
    console.log('broadcast', msg);
    io.emit('broadcast', msg);
  });
  //socket.broadcast.emit('user connected');
//  socket.emit('announcements', { message: 'you are now connected!'});


  socket.on('disconnect', function () {
    socket.disconnect();
    console.log(`User has ${socket.id}disconnected`);
  });
});

module.exports = app; // Exports the app to import in when we run our tests
