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
const http =require('http').Server(app);
const io = require('socket.io')(http,()=>{
  console.log('socket server');
});

mongoose.connect(dbURI);
app.use(bodyParser.json({limit: '5mb'}));
app.use(express.static(`${__dirname}/public`));




app.use(customResponses);
app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));

module.exports = app; // Exports the app to import in when we run our tests
