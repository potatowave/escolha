// reducers.js
// Define the reducer
import { combineReducers } from 'redux';

// define reducer functions.


// the keys are the names of the store property
const rootReducer = combineReducers({
  // users: usersReducer,
  cases: casesReducer,
  // objectives: objectivesReducer,
  // uiState: uiStateReducer
  // alternatives: alternativesReducer
});


function casesReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.cases;
    default:
      return state
  }
}


export default rootReducer;