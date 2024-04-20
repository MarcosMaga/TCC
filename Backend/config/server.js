const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
dotenv.config();

const app = express();
app.use(cors({origin: '*'}))
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['POST', 'GET']
  }
});

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
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Token não fornecido'));
  }

  // Verificar e decodificar o token JWT
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return next(new Error('Falha na autenticação'));
    }

    // Passar as informações do usuário para o próximo middleware
    socket.user = decoded;
    next();
  });
})

server.listen(process.env.PORT, '0.0.0.0', () => {
  console.log("Servidor iniciado na porta: ", process.env.PORT);
})

app.io = io;

module.exports = app;