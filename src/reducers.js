// Define the reducer
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

function cellReducer (state = [], action) {
  switch(action.type) {
    case 'CELL_TOGGLED':
     return Object.assign({}, state, {
        alternative_id: action.cell.alternative_id,
        objective_id: action.cell.objective_id
      });

    case 'CELL_SAVE':
      return Object.assign({}, state, {
        value: action.value
      });

    default:
      return state
  }
}

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

function userInfomation(state = [], action) {
  switch(action.type) {
    case 'RECEIVE_USER_INFORMATION':
      return Object.assign({}, state, {
        name: action.data.name,
        email: action.data.email
      });
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

const defaultUiState = {
  selected_alt_id: 1,
  highlight: false,
  draggedObjectiveId: null,
  objectivesOrder: [],
  hide_obj_ids: [],
  hide_alt_ids: [],
  offsetX: 0,
  offsetY: 0
}

function uiStateReducer(state = defaultUiState, action) {

  switch(action.type) {
    case 'DATA_LOADED':

      let objectiveIds = [];
      let hide_obj_ids = [];
      let hide_alt_ids = [];

      // Update objectivesOrder from db
      // QUESTION - IS THE DB PUTTING THE OBJECTIVES IN THE PROPER ORDER SO THAT WHEN WE GRAB
      // THE IDS HERE THEY ARE IN THE RIGHT ORDER?
      for (let item of action.data.objectives) {
        objectiveIds.push(item["id"]);
      };

      // Update hidden objectives
      for (let item of action.data.objectives) {
        if(item.is_hidden) {
          hide_obj_ids.push(item.id);
        }
      };

      // Update hidden alternatives
      for (let item of action.data.alternatives) {
        if(item.is_hidden) {
          hide_alt_ids.push(item.id);
        }
      };

      const newUiSettings = {
        objectivesOrder: objectiveIds,
        hide_obj_ids: hide_obj_ids,
        hide_alt_ids: hide_alt_ids,
        selected_alt_id: null,
        highlight: false,
        draggedObjectiveId: null
      }

      // NOTE: if switching cases, users, MUST reset the following to null/false
        // const initialUI = {
        //   selected_alt_id: null,
        //   highlight: false,
        //   draggedObjectiveId: null,

        //   offsetX: 0,
        //   offsetY: 0
        // }

      return Object.assign({}, state, newUiSettings);
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
      // THIS MIGHT BE MUTATING STATE - CHECK IT AND REFACTOR IF NECESSARY
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
  cellBeingEdited: cellReducer,
  userInfomation: userInfomation
});

export default rootReducer;