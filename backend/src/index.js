// importação do módulo express
const express = require('express');

// importação das rotas do routes.js
const routes = require('./routes');

const cors = require('cors');

// cria a aplicação
const app = express();

app.use(cors());

// informa ao express que vamos utilizar json no corpo das requisições
app.use(express.json());

app.use(routes);


// define que a aplicação estará ouvindo na porta 3333
app.listen(3333);


