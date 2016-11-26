import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cells extends Component {

  render() {
    console.log("Rendering <Cells />");

    return (
        <div className={"r"+this.props.row}>


          { this.props.values.map((item) => {

              //var selected_value = 130000
            
              // this.props.values.find(alternative_id === this.props.alt)         

              if(this.props.row === item.objective_id) {
                
                var test = ""

                if (item.alternative_id === this.props.alt) {
                  test = "highlight";
                }
              
                var compare_tag = ""

                if (this.props.low_is_better) {
                  // put logic here 
            
                  // Put in uistate the alternative_id of the selected column
                  // Then get the value of the cell in that column for the current objective row
                  if (lessThanSelectedValue(item.value, this)) {
                    compare_tag = "better"
                  } else if (greaterThanSelectedValue(item.value, this)) {
                    compare_tag = "worse"
                  }
                  // Use that to compare against
                  // If value is lower that selected value, give it a tag called 'better' - add CSS to make 'better' GREEN
                  // If value is higher, give it a tag called 'worse' - add CSS to make 'worse' RED
                  // For the 'else' statement below, do the opposite colour code.
                  // STRETCH - test if the value is > or < 10% (or a user settable threshold) different - colour it WHITE if it is within that threshold

                // } else {
                //   if (item.value > selected_value) {
                //     compare_tag = "better"
                //   } else if (item.value < selected_value) {
                //     compare_tag = "worse"
                //   }
                }

                // var junk = this.props.low_is_better;

                // if (this.props.lower_is_better === false) {
                //   junk = "lower";
                // }

                var stuff = <div key={`c${item.alternative_id}`} className={"c"+item.alternative_id+" "+test+" "+compare_tag}>{item.value}</div>
                
                return stuff
              }
            })}
        </div>

    );
  }
}

function getSelectedValue() {
  return this.props.values.find((item) => {(item.alternative_id === this.props.alt)})
}

function lessThanSelectedValue(valueToCompare, that) {
  var selected_value = getSelectedValue.call(that);
  return selected_value < valueToCompare
}

function greaterThanSelectedValue(valueToCompare, that) {
  var selected_value = getSelectedValue.call(that);
  return selected_value > valueToCompare
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
    somePropFunction: function() {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cells);
