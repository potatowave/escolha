import React, {Component} from 'react';
import { connect } from 'react-redux';

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

      { this.props.cells.filter(matchingPropsRow, this).map((item , index) => {

        var test = ""

        if (this.props.uistate_highlight && (item.alternative_id === this.props.uistate_alt_id)) {
          test = "highlight";
          console.log("HIGHLIGHT IS **TRUE**");
        } else {
          test = "";
          console.log("HIGHLIGHT IS **FALSE**");
        }

        console.log("HIGHLIGHT ACTUALLY IS:", this.props.uistate_highlight);


        var compare_tag = ""
        // if (this.props.uistate_order !== null) {
        if (this.props.uistate_highlight) {
          if (this.props.low_is_better) {
            if (item.value < thisRowsSelectedValue.value) {
              compare_tag = "better"
            } else if (item.value > thisRowsSelectedValue.value) {
              compare_tag = "worse"
            }

          } else {
            if (item.value > thisRowsSelectedValue.value) {
              compare_tag = "better"
            } else if (item.value < thisRowsSelectedValue.value) {
              compare_tag = "worse"
            }
          }
        }

        return (
          <div
            key={`c${item.alternative_id}-${item.alternative_id}`}
            className={"c"+(index+1) +" "+test+" "+compare_tag}
            >
            {item.value}
            { item.isEditVisible && <input type="text" value={item.value}/> }
          </div>
        )

      })}

      </div>
    );
  }


  toggleIsEditVisible(item) {
    var toog = (item.isEditVisible === true) ? false : true;
    this.props.isEditVisible = toog
    this.props.toggleEdit(cell)
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
    saveSelectedValue: function(value) {
      const action = { type: 'saveSelectedVal', value: value };
      dispatch(action);
    },
    toggleEdit: function(cell) {
      dispatch( { type: 'CELL_TOGGLED', cell: cell})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveRow);
