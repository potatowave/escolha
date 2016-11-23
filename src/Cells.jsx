import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cells extends Component {

  render() {
    console.log("Rendering <Cells />");


    function findSelectedValues(item) {
       return item.alternative_id === this.props.alt;
    }

    function matchingPropsRow(item) {
      return item.objective_id === this.props.row;
    }

    var thisRowsSelectedValue = this.props.cells.filter(findSelectedValues, this).find(matchingPropsRow, this);
    console.log("selected_value", thisRowsSelectedValue)
    // var selected_value = 130000


    return (
        <div className={"r"+this.props.row}>

          { this.props.cells.filter(matchingPropsRow, this).map((item) => {

            // grab selected_value from the store


              //var selected_value = 130000


              // if(this.props.row === item.objective_id) {


                var test = ""

                if (item.alternative_id === this.props.alt) {
                  test = "highlight";
                }

                var compare_tag = ""

                // var thisRowsSelectedValue = selectedValuesAcrossRows.find(matchingRow, this);

                  if (this.props.low_is_better) {
                  // put logic here

                  // Put in uistate the alternative_id of the selected column
                  // Then get the value of the cell in that column for the current objective row
                  if (item.value < thisRowsSelectedValue.value) {
                    compare_tag = "better"
                  } else if (item.value > thisRowsSelectedValue.value) {
                    compare_tag = "worse"
                  }
                  // Use that to compare against
                  // If value is lower that selected value, give it a tag called 'better' - add CSS to make 'better' GREEN
                  // If value is higher, give it a tag called 'worse' - add CSS to make 'worse' RED
                  // For the 'else' statement below, do the opposite colour code.
                  // STRETCH - test if the value is > or < 10% (or a user settable threshold) different - colour it WHITE if it is within that threshold

                } else {
                  if (item.value > thisRowsSelectedValue.value) {
                    compare_tag = "better"
                  } else if (item.value < thisRowsSelectedValue.value) {
                    compare_tag = "worse"
                  }
                }

                // }, this);

                // var junk = this.props.low_is_better;

                // if (this.props.lower_is_better === false) {
                //   junk = "lower";
                // }

                var stuff = <div key={`c${item.alternative_id}-${item.alternative_id}`} className={"c"+item.alternative_id+" "+test+" "+compare_tag}>{item.value}</div>

                // var stuff = <div key={`c-${item.objective_id}-${item.alternative_id}`} className={"c"+item.alternative_id+" "+test+" "+junk}>{item.value}</div>

                return stuff
              // }
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
      // alert('here');
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cells);
