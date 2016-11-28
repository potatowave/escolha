// reducers.js
// Define the reducer
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import * as Cellreducers from './reducers/cell'


function moveValueInArray(array, from, to) {
  const a = array.slice(0);
  a.splice(to, 0, a.splice(from, 1)[0]);
  return a;
}


function userCases(state = [], action) {
  switch(action.type) {
    case 'USER_CASES':
      return action.data.cases;
      break;
    default:
      return state
  }
}

function casesReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.cases;
      break;
    default:
      return state
  }
}
function objectivesReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.objectives;
      break;
    default:
      return state
  }
}
function alternativesReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.alternatives;
      break;
    default:
      return state
  }
}
function cellsReducer(state = [], action) {
  switch(action.type) {
    case 'DATA_LOADED':
      return action.data.cells
      break;
    case 'CELL_SAVE':
      // update the cell
      var cellToUpdateIndex;
      state.forEach((cell, index) => {
        if(cell.alternative_id === action.cell.alternative_id &&
        cell.objective_id === action.cell.objective_id) {
          cellToUpdateIndex =  index;
        }
      })
      const newCell = {...state[cellToUpdateIndex], value: action.value}
      return [
        ...state.slice(0, cellToUpdateIndex),
        newCell,
        ...state.slice(cellToUpdateIndex + 1)
      ]
      break;
    default:
      return state
  }
}

function uiStateReducer(state = {}, action) {
  switch(action.type) {
    case 'DATA_LOADED':
        // if no 'uistate' in object from DB, set defaults
        // if no 'objectivesOrder' in object from DB, set order based on objective ids
        // else, load the 'uistate' from the DB object

        if (action.data.uistate === undefined) {

          var objectiveIds = [];

          for (var item of action.data.objectives) {
            console.log("*** No UISTATE data object ***")
            objectiveIds.push(item["id"]);
          };

          const initialUI = {
            selected_alt_id: null,
            highlight: false,
            draggedObjectiveId: null,
            objectivesOrder: objectiveIds,
            offsetX: 0,
            offsetY: 0
          }

          return Object.assign({}, state, initialUI);

        } else if (action.data.uistate.objectivesOrder === undefined) {

          var objectiveIds = [];

          for (var item of action.data.objectives) {
            console.log("*** No objectivesOrder in UISTATE data object ***")
            objectiveIds.push(item["id"]);
          };

          const initialUI = {
            objectivesOrder: objectiveIds
          }

          return Object.assign({}, state, initialUI);

        } else {
          console.log("****** DATA LOADED *****")
          return action.data.uistate;
        }
      break;
    case 'ALTERNATIVES_SELECTED':
      return Object.assign({}, state, action.uistate);
      break;
    case 'UPDATE_UI':
      return Object.assign({}, state, action.data);
      break;
    case 'REORDER_OBJECTIVES':
      const currentDraggedObjectiveIndex = state.objectivesOrder.indexOf(state.draggedObjectiveId);
      if (currentDraggedObjectiveIndex === -1) return state;
      state.objectivesOrder = moveValueInArray(state.objectivesOrder, currentDraggedObjectiveIndex, action.data.newDraggedObjectiveIndex);
      return state;
      break;
    case 'TOGGLE_HIDE_ALTERNATIVE':
      return Object.assign({}, state, action.uistate); 
      break;
    case 'TOGGLE_HIDE_OBJECTIVE':
      return Object.assign({}, state, action.uistate); 
      break;
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
  uistate: uiStateReducer,
  form: formReducer,
  cells: cellsReducer,
  uistate: uiStateReducer,

  cellBeingEdited: Cellreducers.cellReducer
});

export default rootReducer;