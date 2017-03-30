const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));
const routes = require('./config/routes');
const errorHandler = require('./lib/errorHandler');
const customResponses = require('./lib/customResponses');

//stripe set up
const stripe = require('stripe')('sk_test_RbXPNxb0rbgsI2mRZW113s7D');


const { port, env, dbURI } = require('./config/environment');
const app = express();



app.use(morgan('dev'));

mongoose.connect(dbURI);
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use(customResponses);
app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));



app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));


module.exports = app; // Exports the app to import in when we run our tests
