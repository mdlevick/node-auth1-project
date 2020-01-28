
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

// const router = require('express').Router();

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./user/user-router.js');


const server = express();

const sessionConfig = {

    name: "blueMonster",
    secret: "C is for cookie",
    cookie: {
        maxAge: 1000 * 60 *30,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,

};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});


module.exports = server;