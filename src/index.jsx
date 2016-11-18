// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'  // set up logging in the console so we can see how actions are fired
import rootReducer from './reducers.js'
import App from './App.jsx';


// Configure the Redux Store

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(createLogger()) // apply the 'logger' middleware. this will console.log every action that is sent to the redux store.
)

// Wrap the component in a <Provider>
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)