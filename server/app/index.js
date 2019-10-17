const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const db = require('./db')
const jwt = require('jsonwebtoken');

require('./authenticate')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', (req, res, next) => {
    console.log('***', req.originalUrl, req.params, req.query, req.headers)
    next()
})

app.get('/authenticate', function (req, res, next) {
    passport.authenticate('basic', { session: false }, (err, user) => {
        if (err || !user) {
        return res.status(400).json({
            message: 'Bad login or password',
            user   : user
        });
    }
    const token = jwt.sign(user, require('./config').secret)
    return res.json({user, token })
    })(req, res, next)
})

app.get('/departaments', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    res.json({
        departaments: await db.DepartamentsModel.fetchAll()
    })
})
app.get('/restore', function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
        return res.status(400).json({
            message: 'Bad login or password',
            user   : user
        });
    }
    return res.json({user})
    })(req, res, next)
})

app.get('/users', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    res.json({
        users: await db.UserModel.fetchAll()
    })
})


module.exports = app