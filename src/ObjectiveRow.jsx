import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cell from './Cell.jsx'

class ObjectiveRow extends Component {
  render() {
    console.log("Rendering <Cells />");

    function findSelectedCells(item) {
      return item.alternative_id === this.props.uistate_alt_id;
      // NOTE: item refers to the current cell - need to get 'order' from uistate_alt_id, not from Cells
    }

    function matchingPropsRow(item) {
      return item.objective_id === this.props.objective_id;
    }

    // Grab all cells in the current row
    const selectedCells = this.props.cells.filter(findSelectedCells, this);

    // Grab the selected value for the current row
    var thisRowsSelectedValue = selectedCells.find(matchingPropsRow, this);

    return (
      <div className={"r"+this.props.current_row}>
        { this.props.cells.filter(matchingPropsRow, this).map((cell , index) => {
          return (<Cell
            key={`c${cell.alternative_id}-${cell.alternative_id}`}
            uistate_highlight={this.props.uistate_highlight}
            uistate_alt_id={this.props.uistate_alt_id}
            low_is_better={this.props.low_is_better}
            cell={cell}
            cell_index={index}
            thisRowsSelectedValue={thisRowsSelectedValue}

            cellBeingEdited={this.props.cellBeingEdited}
            cellToggled={this.props.cellToggled}
            cellSave={this.props.cellSave}
          />)
        })}
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    // NOTE: This is a 'dumb' component, so instead of grabbing values from the store,
    // we can pass these from the parent component down here

    objectives: state.objectives,
    cells: state.cells
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cellToggled: function(cell) {
      dispatch( { type: 'CELL_TOGGLED',  cell})
    },
    cellSave: function(value, cell) {
      dispatch( { type: 'CELL_SAVE', value: value, cell: cell})
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveRow);
