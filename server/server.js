import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { globalApi, Api } from './api';

// Setup the server
const app = express();
app.use(bodyParser.json());

// Setup the API mocks
app.use('/api', (...args) => {
  // This allows us to easily reset the /api routes without restarting
  if (globalApi.router) {
    globalApi.router(...args);
  }
});

// Support for serving the static UI elements (index/images/css)
const buildFolder = path.join(__dirname, '../build');
app.use(express.static(buildFolder));
app.get('/*', (req, res) => {
  res.sendFile(path.join(buildFolder, 'index.html'));
});

// Start the server
const server = app.listen(3001, () => {
  console.log('mock server is listening on port 3001');
});

// Start the default API router
new Api().start();

export default server;
