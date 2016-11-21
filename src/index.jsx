import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';  // set up logging in the console so we can see how actions are fired
import rootReducer from './reducers';
import App from './App.jsx';

import $ from 'jquery';


// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component


// Configure the Redux Store

const store = createStore(
  rootReducer,
  {},
  // apply the 'logger' middleware. this will console.log every action that is sent to the redux store.
  applyMiddleware(createLogger())
);

// Wrap the component in a <Provider>
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
);

$.get("http://localhost:3001/api/cases/1")
.done(function(data) {
  console.log("Got data from API: ", data);
  // Dispatch an action to send the contacts to the redux store.
  store.dispatch({type: 'LOAD_CASES', cases: data})
});