// reducers.js
// Define the reducer
import { combineReducers } from 'redux';

// define reducer functions.
function userCases(state = [], action) {
  switch(action.type) {
    case 'USER_CASES':
      return action.data.cases;
    default:
      return state
  }
}

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
function cellsReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.cells;
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
      return action.uistate; // How to set state from a reducer?
    case 'saveSelectedVal':
      return action.value;
    default:
      return state
  }
}



// the keys are the names of the store property
const rootReducer = combineReducers({
  // users: usersReducer,
  userCases: userCases,
  cases: casesReducer,
  objectives: objectivesReducer,
  alternatives: alternativesReducer,
  cells: cellsReducer,
  uistate: uiStateReducer
});




export default rootReducer;