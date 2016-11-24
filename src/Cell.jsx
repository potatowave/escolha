import React, {Component} from 'react';

export default function Cell({uistate_highlight, uistate_alt_id, low_is_better, cell, cell_index, thisRowsSelectedValue}) {

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

  return (
    <div
      className={"c"+(cell_index+1) +" "+highlightedClass+" "+compare_tag}
      >
      {cell.value}
      { cell.isEditVisible && <input type="text" value={cell.value}/> }
    </div>
  )
}