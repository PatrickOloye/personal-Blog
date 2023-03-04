const express = require('express');
const mongoose = require('mongoose');
const UserRoute = require('./routes/user');
const BlogRoute = require('./routes/blog');
const app = express();

const port = 3030;

app.use(express.json());

app.use('/api/socials', UserRoute);
app.use('/api/socials', BlogRoute);

mongoose
  .connect('mongodb://127.0.0.1:27017/socials', () => {
    console.log('database connected');
  })
  .then(() => app.listen(port, () => console.log('server is running on')))
  .then(() => console.log('database connected'))
  .catch((err) => console.log(err));
