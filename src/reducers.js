import { combineReducers } from 'redux';
import * as Cellreducers from './reducers/cell'

function moveValueInArray(array, from, to) {
  const a = array.slice(0);
  a.splice(to, 0, a.splice(from, 1)[0]);
  return a;
}

// define reducer functions.
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
      return action.data.uistate;
      break;
    case 'ALTERNATIVES_SELECTED':
      return action.uistate; 
      break;
    // case 'saveSelectedVal':
    //   return action.value;
    //   break;
    case 'UPDATE_UI':
      return Object.assign({}, state, action.data);
      break;
    case 'REORDER_OBJECTIVES':
      // console.log("state.objectivesOrder", state.objectivesOrder)
      // console.log("state.draggedObjectiveId", state.draggedObjectiveId);

      const currentDraggedObjectiveIndex = state.objectivesOrder.indexOf(state.draggedObjectiveId);

      console.log("UPDATING STATE");
      // console.log("currentDraggedObjectiveIndex", currentDraggedObjectiveIndex)

      if (currentDraggedObjectiveIndex === -1) return state;
      state.objectivesOrder = moveValueInArray(state.objectivesOrder, currentDraggedObjectiveIndex, action.data.newDraggedObjectiveIndex);
      return state;
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
  uistate: uiStateReducer,

  cellBeingEdited: Cellreducers.cellReducer
});



export default rootReducer;