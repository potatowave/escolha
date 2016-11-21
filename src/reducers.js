// reducers.js
// Define the reducer
import { combineReducers } from 'redux';

// define reducer functions.

function casesReducer(state = [], action) {
  if(action.type === 'LOAD_CASES') {
    return action.cases;
  } else {
    // return default state
    return state
  }
}

function objectivesReducer(state = [], action) {
  if(action.type === 'LOAD_OBJECTIVES') {
    return action.objectives;
  } else {
    // return default state
    return state
  }
}

function alternativesReducer(state = [], action) {
  if(action.type === 'LOAD_ALTERNATIVES') {
    return action.alternatives;
  } else {
    // return default state
    return state
  }
}

function valuesReducer(state = [], action) {
  if(action.type === 'LOAD_VALUES') {
    return action.values;
  } else {
    // return default state
    return state
  }
}

// the keys are the names of the store property
const rootReducer = combineReducers({
  cases: casesReducer,
  objectives: objectivesReducer,
  alternatives: alternativesReducer,
  values: valuesReducer,
});

export default rootReducer;
