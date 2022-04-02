const path = require('path');
const express = require('express');
const app = express();

// db
const { Card, Player } = require('./db').models;
const conn = require('./db').conn;

// middleware
app.use('/', require('./routes')); // router
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static('public'));
app.use(require('body-parser').json());

// ROUTES
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

module.exports = app;
