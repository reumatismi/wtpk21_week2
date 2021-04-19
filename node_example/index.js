'use strict';
const express = require('express');
const app = express();
const port = 3000;
const catRouter = require('./routes/catRoute');
const userRouter = require('./routes/userRoute')
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute');

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// don't put validator here, use router

app.use('/cat', catRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
