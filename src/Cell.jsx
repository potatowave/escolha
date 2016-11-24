import React, {Component} from 'react';

export default function Cell({uistate_highlight, uistate_alt_id, low_is_better, cell, cell_index, thisRowsSelectedValue, toggleEditCell, cellEdit, onChangeEditCell, onKeyPressEditCell}) {

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

  var isEditVisible = ((cellEdit.alternative_id == cell.alternative_id) && (cellEdit.objective_id == cell.objective_id)) ? true : false;

  return (
    <div
      onDoubleClick={() => toggleEditCell(cell)}
      className={"c"+(cell_index+1) +" "+highlightedClass+" "+compare_tag}
      >
      { !isEditVisible && cell.value }

      { isEditVisible &&
        <input
        autoFocus
        type="text"
        value={cell.value}
        onBlur={() => toggleEditCell(false)}
        onChange={onChangeEditCell}
        onKeyPress= {onKeyPressEditCell}
        />
      }
    </div>
  )
}

