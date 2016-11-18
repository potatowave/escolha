// reducers.js
// Define the reducer
import { combineReducers } from 'redux';

// define reducer functions.


// the keys are the names of the store property
const rootReducer = combineReducers({
  contacts: contactsReducer,
  uiState: uiStateReducer
})

export default rootReducer