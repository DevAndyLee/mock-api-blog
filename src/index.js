import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware  } from 'redux';

import App from './App';
import reducers from './reducers';

import './index.css';

let store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
