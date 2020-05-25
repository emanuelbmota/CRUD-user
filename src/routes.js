import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.create);

routes.get('/users', UserController.index);

routes.delete('/users/:id', UserController.delete);

routes.put('/users/:id', UserController.update);

export default routes;
