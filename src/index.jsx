// Render the top-level React component
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Middlewares
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';  // console logging
import { combineForms } from 'react-redux-form';
// Actions
import { fetchCase, saveCase, fetchUserCases } from './actions/api'
import rootReducer from './reducers';
import App from './App.jsx';
import WizardForm from './WizardForm.jsx';
import Onboard from './Onboard.jsx';

// Load up the application styles
require('../styles/application.scss');

// 'logger' middleware: this will console.log every action that is sent to the redux store.
const loggerMiddleware = createLogger()

// Configure the Redux Store: .
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    loggerMiddleware,
    thunkMiddleware
  )
);

export default store;

ReactDOM.render((
  <Provider store={store}>
  <Router history={hashHistory} store={store} >
    <Route path="/" component={App} />
    <Route path="/new" component={Onboard} />
    <Route path="/wizard" component={WizardForm} />
  </Router>
  </Provider>
), document.getElementById('react-root'));

// ----------------------------------------------------------------------------
// Index page

// Read all Cases from current user - for the dropdown
store.dispatch(fetchUserCases()).then();