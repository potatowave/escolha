import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cell from './Cell.jsx'
import { cellBeingEdited, cellSaveAction, cellUpdateDatabaseAction } from './actions/api'

class ObjectiveRow extends Component {
  render() {
    console.log("Rendering <ObjectiveRow />");

    function findSelectedCells(item) {
      return item.alternative_id === this.props.uistate_selected_alt_id;
      // NOTE: item refers to the current cell - need to get 'order' from uistate_selected_alt_id, not from Cells
    }

    function matchingPropsRow(item) {
      return item.objective_id === this.props.objective_id;
    }

    // Grab all cells in the current row
    const selectedCells = this.props.cells.filter(findSelectedCells, this);

    // Grab the selected value for the current row
    var thisRowsSelectedValue = selectedCells.find(matchingPropsRow, this);

    var curr_obj_id = this.props.objective_id;

    var hiddenObjective = ( (this.props.uistate_hide_obj_ids.indexOf(curr_obj_id) === -1) ? "" : "hide-objective")

    return (
      <div className={"objective-row" + " " + hiddenObjective}>
        {
          this.props.cells.filter(matchingPropsRow, this).map((cell , index) => {
          return (<Cell
            key={`c${cell.alternative_id}-${cell.alternative_id}`}
            uistate_highlight={this.props.uistate_highlight}
            uistate_selected_alt_id={this.props.uistate_selected_alt_id}
            low_is_better={this.props.objective} //THIS MIGHT BE A PROBLEM??
            // low_is_better={false}
            cell={cell}
            cell_index={index}
            thisRowsSelectedValue={thisRowsSelectedValue}

            cellBeingEdited={this.props.cellBeingEdited}
            cellToggled={this.props.cellToggled}
            cellSave={this.props.cellSave}
            cellUpdateDatabase={this.props.cellUpdateDatabase}

            enablePlaceholder={this.props.enablePlaceholder}
            ui={this.props.ui}
            uistate_hide_alt_ids={this.props.uistate_hide_alt_ids}
          />)
        })}
      </div>
    );
  }
}

ObjectiveRow.defaultProps = {
  enablePlaceholder: false
};


function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    cells: state.cells,
    ui: state.uistate,
    uistate_hide_alt_ids: state.uistate.hide_alt_ids,
    uistate_hide_obj_ids: state.uistate.hide_obj_ids
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cellToggled: (cell) => {
      dispatch(cellBeingEdited(cell))
    },
    cellSave: (value, cell) => {
      dispatch(cellSaveAction(value, cell))
    },
    cellUpdateDatabase: (value, cell) => {
      dispatch(cellUpdateDatabaseAction(value, cell))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveRow);