const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Rotas / Recursos
 */

// criação da sessão
routes.post('/sessions', SessionController.create);

// listagem de ongs
routes.get('/ongs', OngController.index);
// criação de uma ong 
routes.post('/ongs', OngController.create);

// listagem de casos por ong
routes.get('/profile', ProfileController.index);

// listagem dos casos
routes.get('/incidents', IncidentController.index);
// criação de um caso
routes.post('/incidents', IncidentController.create);
// deletar um caso
routes.delete('/incidents/:id', IncidentController.delete);

// exportar a variável para fora do arquivo
module.exports = routes;