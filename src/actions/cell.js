export const CELL_UPDATE_DATABASE = 'CELL_UPDATE_DATABASE'
export const CELL_TOGGLED = 'CELL_TOGGLED'
export const CELL_SAVE = 'CELL_SAVE'

export function cellBeingEdited(cell) {
  return {
    type: CELL_TOGGLED,
    cell
  }
}

// Normal redux action
export function cellSaveAction(value, cell) {
  return {
    type: CELL_SAVE,
    value: value,
    cell: cell
  }
}

// Thunk aSync Action
// Always inside the 'action' return a function(dispatch, state)
// In order to be able to dispatch new actions when the aSync request is done
export function cellUpdateDatabaseAction(value, cell) {
  return dispatch => {
    return fetch(`http://localhost:3001/api/cases/${cell.case_id}/values`, {
      method: 'post',
      body: JSON.stringify({cells: [cell]}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
  }
}