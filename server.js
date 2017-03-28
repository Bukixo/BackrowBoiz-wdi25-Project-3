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




io.on('connection', function(socket){
  console.log('user connected');


  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  //socket.broadcast.emit('user connected');



  socket.on('disconnect', function () {
    socket.disconnect();
    console.log('disconnected');
  });
});

module.exports = app; // Exports the app to import in when we run our tests
