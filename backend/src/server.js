const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

// Controle de acessos na aplicação
const cors = require('cors');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection',  socket => {
    console.log(' conectado', socket.id);
    console.log(socket.handshake.query);

    const { user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

    socket.emit('hello', 'World');
    socket.on('omni', data => {
        console.log(data);
    })
});

// Adicionar uma funcionalidade em toda aa rotas
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

mongoose.connect('mongodb://localhost:27017/Test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para editcao, delete)
// req.body = Acessar corpo da requisição (para criacao, edicao)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);