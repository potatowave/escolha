// reducers.js
// Define the reducer
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// define reducer functions.

function casesReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.cases;
    default:
      return state
  }
}
function objectivesReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.objectives;
    default:
      return state
  }
}
function alternativesReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.alternatives;
    default:
      return state
  }
}
function valuesReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.values;
    default:
      return state
  }
}

function uiStateReducer(state = [], action) {
  switch(action.type) {
    // case 'AlternativesSelected':
    case 'DATA_LOADED':
      return action.data.uistate;
    case 'AlternativesSelected':
      return action.cats; // How to set state from a reducer?
    default:
      return state
  }
}

// the keys are the names of the store property
const rootReducer = combineReducers({
  // users: usersReducer,
  cases: casesReducer,
  objectives: objectivesReducer,
  alternatives: alternativesReducer,
  values: valuesReducer,
  uistate: uiStateReducer,
  form: formReducer
});

export default rootReducer;