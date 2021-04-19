'use strict';

require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.HTTP_PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, port);
} else {
  require('./utils/localhost')(app, process.env.HTTPS_PORT || 8000, port);
}

const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute')

app.use(express.static('public')); // Define public folder
app.use(express.static('uploads')); // Define uploads folder
app.use('/thumbnails', express.static('thumbnails')); // Define thumbnails folder

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });