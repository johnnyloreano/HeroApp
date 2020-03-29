const express = require('express');
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/ongs/', ongController.index);
routes.post('/ongs/', ongController.create);

routes.get('/profile', profileController.index);

routes.post('/session', sessionController.validate);

routes.get('/incidents/', incidentController.index);
routes.post('/incidents/', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;
