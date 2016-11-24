import { cellEdit, CELL_TOGGLED } from '../actions/cell'

export function cellReducer (state = [], action) {
  switch(action.type) {
  case CELL_TOGGLED:
     return Object.assign({}, state, {
        alternative_id: action.cell.alternative_id,
        objective_id: action.cell.objective_id
      })
    default:
      return state
  }
}