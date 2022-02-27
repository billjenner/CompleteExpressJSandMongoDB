const express = require('express');
const app = express();

const mongoose = require('mongoose');
const env = require('dotenv/config');

app.use(express.json());

const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const db = process.env.DB || 'mongodb://localhost/testdb';
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB Connected at ${db}`))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started and listening on ${port}`);
});
