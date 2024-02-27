const express = require('express');
const http = require('http');
const expressSession = require('express-session');
const sessionStore = new expressSession.MemoryStore();
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

const app = express();
const server = http.createServer(app);

const helpers = {};

fs.readdirSync(__dirname + '/../app/helpers').forEach(file => {
  if (path.extname(file) === '.js') {
    const helperFile = require(path.join(__dirname, '/../app/helpers', file));

    if (typeof helperFile === 'object' && helperFile !== null) {
      for (const key in helperFile) {
        if (typeof helperFile[key] === 'function') {
          helpers[key] = helperFile[key];
        }
      }
    }
  }
});

app.locals.helpers = helpers;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionConfig = expressSession({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  store: sessionStore
});

app.use(sessionConfig);

server.listen(process.env.PORT, () => {
    console.log("Servidor iniciado na porta " + process.env.PORT);
})

module.exports = app;