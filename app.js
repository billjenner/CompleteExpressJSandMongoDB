const express = require('express');
const app = express();

const mongoose = require('mongoose');
const env = require('dotenv/config');

app.use(express.json());

const userRoutes = require('./routes/user');
app.use('/api/', userRoutes);

app.listen('3000', () => {
  console.log('Server is running!!!');
});

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));
