const express = require('express');
const router = express.Router();

const User = require('../models/User');

const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyjwt');

// get, post, delete, patch

// localhost:3000/api/home

// 1. generate a salt -> random text
// 2. has a password -> hash(1231331, salt)

http: router.get('/test', async (req, res) => {
  console.log('test');
  res.send('caught test');
});

router.get('/token', (req, res) => {
  const token = jwt.sign({ _id: 'ds_123532523234' }, process.env.SECRET);
  res.send(token);
});

//localhost:3000/api/user/add
// Example: C:\dev\Udemy-Mern-Stack-Front-To-Back\src\routes\api\users.js
router.post('/add', async (req, res) => {
  const schema = {
    name: Joi.string().required().min(4).max(256),
    email: Joi.string().required().email().min(5),
    password: Joi.string().required().min(6),
  };

  const { error } = Joi.validate(req.body, schema);
  if (error) return res.send(error.details[0].message);

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 8640000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

//localhost:3000/api/user/all
http: router.get('/all', verifyToken, async (req, res) => {
  const users = await User.find();

  try {
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

// localhost:3000/api/user/123123
router.get('/user/:id', async (req, res) => {
  const id = req.params.id;

  let user = await User.findOne({ _id: id });

  try {
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.delete('/user/:id', async (req, res) => {
  const id = req.params.id;

  const deletedUser = User.remove({ _id: id });

  try {
    res.send(deletedUser);
  } catch (err) {
    res.send(err);
  }
});

router.patch('/user/:id', async (req, res) => {
  const id = req.params.id;

  const update = await User.update(
    { _id: id },
    {
      $set: req.body,
    }
  );

  try {
    res.send(update);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
