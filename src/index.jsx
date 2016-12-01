// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { combineForms } from 'react-redux-form';
import rootReducer from './reducers';
import App from './App.jsx';
import WizardForm from './WizardForm.jsx';
import Onboard from './Onboard.jsx';
import { fetchUserCases, fetchCase} from './actions/api'

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

// Read all Cases from current user and changing the router
store
.dispatch(fetchUserCases())
.then(() => {
  var currentState = store.getState();

  if (currentState.userCases.length === 0) {
    hashHistory.push('/new')
  } else {
    // Getting the last case to show
    var last = currentState.userCases.length - 1;
    store.dispatch(fetchCase(currentState.userCases[last].id));
    hashHistory.push('/');
  }
});