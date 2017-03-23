const express = require('express');
const { port } = require('./config/environment');

const app = express();

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express is listening on port ${port}`));