import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cells extends Component {

  render() {
    console.log("Rendering <Cells />");

    function findSelectedCells(item) {
      return item.alternative_id === this.props.alt;
    }

    function matchingPropsRow(item) {
      return item.objective_id === this.props.row;
    }

    // Grab all cells in the current row
    const selectedCells = this.props.cells.filter(findSelectedCells, this);
    console.log("selectedCells: ", selectedCells)

    // Grab the selected value for the current row
    var thisRowsSelectedValue = selectedCells.find(matchingPropsRow, this);

    console.log("thisRowsSelectedValue: ", thisRowsSelectedValue)

    // var thisRowsSelectedValue = this.props.cells.filter(findSelectedCells, this).find(matchingPropsRow, this);
    // console.log("selected_value", thisRowsSelectedValue)

    return (
      <div className={"r"+this.props.row}>

      { this.props.cells.filter(matchingPropsRow, this).map((item) => {

        var test = ""

        if (item.alternative_id === this.props.alt) {
          test = "highlight";
        }

        var compare_tag = ""

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

        var stuff = <div key={`c${item.alternative_id}-${item.alternative_id}`} className={"c"+item.alternative_id+" "+test+" "+compare_tag}>{item.value}</div>

        return stuff

      })}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // NOTE: This is a 'dumb' component, so instead of grabbing values from the store,
    // we can pass these from the parent component down here

    objectives: state.objectives
    // values: state.values

  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveSelectedValue: function(value) {
      const action = { type: 'saveSelectedVal', value: value };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cells);
