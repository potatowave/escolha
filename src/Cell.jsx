import React, {Component} from 'react';

function onblurCell(e, cell, cellToggled, cellUpdateDatabase){
  cellToggled(false)
  cellUpdateDatabase(e.target.value, cell)
}

function updateCell(e, cellSave, cell, cellToggled, cellUpdateDatabase) {
  if (e.key == 'Enter') {
    cellSave(e.target.value, cell);
    cellToggled(false);
    onblurCell(e, cell, cellToggled, cellUpdateDatabase)
  }
}

export default function Cell({uistate_highlight, uistate_selected_alt_id, low_is_better, cell, cell_index, thisRowsSelectedValue, cellBeingEdited, cellToggled, cellSave, cellUpdateDatabase, enablePlaceholder, ui, uistate_hide_alt_ids}) {

  console.log("Rendering <Cell />");

  var highlightedClass = (uistate_highlight && (cell.alternative_id === uistate_selected_alt_id)) ? "highlight" : "";

  var curr_alt_id = cell.alternative_id; 
  var hide_alt_ids_array = uistate_hide_alt_ids;

  var hiddenAlternative = ( (hide_alt_ids_array.indexOf(curr_alt_id) === -1) ? "" : "hide-alternative")
  
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
        className={"cell c"+(cell_index+1) +" "+(enablePlaceholder && (
              cell.alternative_id === ui.draggedAlternativeId ||
              cell.objective_id === ui.draggedObjectiveId
            ) ? ' placeholder' : '')+" "+highlightedClass+" "+compare_tag+" "+hiddenAlternative}
        >
        { !isInputVisible && (cell.nominal_name ? cell.nominal_name : cell.value)}

        { isInputVisible &&
          <input
          autoFocus
          type="text"
          value={cell.value}
          onBlur={(e) => onblurCell(e, cell, cellToggled, cellUpdateDatabase)}
          onChange={(e) => { cellSave(e.target.value, cell) }}
          onKeyPress= {(e) => updateCell(e, cellSave, cell, cellToggled, cellUpdateDatabase) }
          />
        }
      </div> 
    )

}

