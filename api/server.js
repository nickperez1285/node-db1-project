const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const accounts  = require('./accounts')

server.use("/accounts", accounts)




module.exports = server;
