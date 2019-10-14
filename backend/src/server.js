const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');

// Controle de acessos na aplicação
const cors = require('cors');

const app = express();

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

app.listen(3333);