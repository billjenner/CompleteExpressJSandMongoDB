const express = require('express')
const router = express.Router()

const UserModel = require('../models/User')

const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')

const jwt = reuiqre('jsonwebtoken')
const verifyToken = require('./verifyjwt')

// get, post, delete, patch

// localhost:3000/api/home

// 1. generate a salt -> random text
// 2. has a password -> hash(1231331, salt)

router.get('/token', (req, res) => {
    const token = jwt.sign({_id:'ds_123532523234'}, process.env.SECRET);
    res.send(token)
})

router.post('/add', async (req, res) => {

    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string.min(5).email.required(),
        password: Joi.string().min(6).required()
    }

    const {error} = Joi.ValidationError(req.body, schema);
    if (error) return res.send(error.details[0].message)

    const salt = await brycpt.genSalt(10)

    const hasPassword = await brycpt.hash(req.body.password, salt)

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
})

router.get('/all', verifyToken, async (req, res) => {
    const users = await UserModel.find()

    try {
        res.send(users)
    } catch (err) {
        res.send(err)
    }
})

// localhost:3000/api/user/123123
router.get('/user/:id', async (req, res) => {
    const id = req.params.id

    try {
        res.send(users)
    } catch (err) {
        res.send(err)
    }
})

router.delete('/user/:id', async (req, res) => {
    const id = req.params.id

    const deletedUser = UserModel.remove({
        _id:id
    })

    try {
        res.send(deletedUser)
    } catch (err) {
        res.send(err)
    }
})

router.patch('/user/:id', async (req, res) => {
    const id = req.params.id

    const update = await UserModel.update(
        {_id:id},
        {
            $set: req.body
        }
    )

    try {
        res.send(update)
    } catch (err) {
        res.send(err)
    }
})

// POST localhost:3000/api/token
// {
//  "name": "Valead",
//  "email":"asd123@gmail.com",
//  "password":"asdasd12341"
// }
// Body > Headers > Pretty