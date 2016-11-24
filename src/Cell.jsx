import React, {Component} from 'react';

function updateCell(e, cellSave, cell, cellToggled) {
  if (e.key == 'Enter') {
    cellSave(e.target.value, cell);
    cellToggled(false);
  }
}

export default function Cell({uistate_highlight, uistate_alt_id, low_is_better, cell, cell_index, thisRowsSelectedValue, cellBeingEdited, cellToggled, cellSave}) {

  var highlightedClass = (uistate_highlight && (cell.alternative_id === uistate_alt_id)) ? "highlight" : "";
  var compare_tag = "";

  if (uistate_highlight) {
    if (low_is_better) {
      if (cell.value < thisRowsSelectedValue.value) {
        compare_tag = "better"
      } else if (cell.value > thisRowsSelectedValue.value) {
        compare_tag = "worse"
      }
    } else {
      if (cell.value > thisRowsSelectedValue.value) {
        compare_tag = "better"
      } else if (cell.value < thisRowsSelectedValue.value) {
        compare_tag = "worse"
      }
    }
  }

  var isInputVisible = ((cellBeingEdited.alternative_id == cell.alternative_id) && (cellBeingEdited.objective_id == cell.objective_id)) ? true : false;

  return (
    <div
      onDoubleClick={() => cellToggled(cell)}
      className={"c"+(cell_index+1) +" "+highlightedClass+" "+compare_tag}
      >
      { !isInputVisible && cell.value }

      { isInputVisible &&
        <input
        autoFocus
        type="text"
        value={cell.value}
        onBlur={() => cellToggled(false)}
        onChange={(e) => { cellSave(e.target.value, cell) }}
        onKeyPress= {(e) => updateCell(e, cellSave, cell, cellToggled) }
        />
      }
    </div>
  )
}

