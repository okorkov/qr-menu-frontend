import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
require('dotenv').config()


// const store = createStore(
//   rootReducer,
//   compose(
//       applyMiddleware(thunk),
//       (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() || compose
//   )       
// );

let store;

if(process.env.NODE_ENV === 'development'){
  store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
    ,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
} else {
  store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
  ));
}

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);


