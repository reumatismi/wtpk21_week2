'use strict';

const express = require('express');
const app = express();
const port = 3000;
const catRouter = require('./routes/catRouter'); // loading and importing a local file

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/cat', catRouter);

app.listen(port, () => {
  console.log('Example app stuff listening att http://localhost:${port}')
});