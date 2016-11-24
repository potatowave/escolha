import { cellBeingEdited, CELL_TOGGLED, CELL_SAVE } from '../actions/cell'

export function cellReducer (state = [], action) {
  switch(action.type) {
  case CELL_TOGGLED:
     return Object.assign({}, state, {
        alternative_id: action.cell.alternative_id,
        objective_id: action.cell.objective_id
      });

    case CELL_SAVE:
      return Object.assign({}, state, {
        value: action.value
      });

      // ->> change the value for THIS cell in the store.cells

    default:
      return state
  }
}