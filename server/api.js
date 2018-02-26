import express from 'express';

import * as operators from './routes/operators';
import * as domaths from './routes/do-maths';
const routes = [operators, domaths];

export const globalApi = {
  router: null
}

export class Api {
  constructor() {
    this.router = express.Router();
    globalApi.router = this.router;
  }

  get(...args) {
    this.router.get(...args);
    return this;
  }

  put(...args) {
    this.router.put(...args);
    return this;
  }

  post(...args) {
    this.router.post(...args);
    return this;
  }

  delete(...args) {
    this.router.delete(...args);
    return this;
  }

  start() {
    // Add the default routes after any route overrides
    routes.map(route => {
      this.router.use(route.path, route.router);
    });

    this.router.use('/*', (req, res) => {
      res.status(404).send('Not Found');
    });
  }
}
