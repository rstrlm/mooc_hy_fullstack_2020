const bcrypt = require('bcrypt')
const { response } = require('../app')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({}).populate('blogs', {title: 1, url: 1, author: 1})
    res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
    const body = req.body
    if(body.password.length < 3) {
        return res.status(400).json({error: 'password is too short'})
    } 
    if(body.username.length < 3) {
        return res.status(400).json({error: 'username is too short'})
    } 
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const saveUser = await user.save()
    res.json(saveUser)
})

module.exports = usersRouter