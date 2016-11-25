export const CELL_TOGGLED = 'CELL_TOGGLED'

export function cellBeingEdited(cell) {
  return {
    type: CELL_TOGGLED,
    alternative_id,
    objective_id
  }
}

export const CELL_SAVE = 'CELL_SAVE'

export function cellSave(cell) {
  return {
    type: CELL_SAVE,
    value
  }
}