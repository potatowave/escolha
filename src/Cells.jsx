import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cells extends Component {

  render() {
    console.log("Rendering <Cells />");

    return (
        <div className={"r"+this.props.row}>
          { this.props.values.map((item) => {
              if(this.props.row === item.objective_id) {
                
                var test = ""

                if (item.alternative_id === this.props.alt) {
                  test = "highlight";

                }

                const selected_value = "xxxxxx";
              
                if (this.props.low_is_better) {
                  

                } else {

                }

                var junk = this.props.low_is_better;

                // if (this.props.lower_is_better === false) {
                //   junk = "lower";
                // }

                var stuff = <div key={`c${item.alternative_id}`} className={"c"+item.alternative_id+" "+test+" "+junk}>{item.value}</div>
                
                return stuff
              }
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
    somePropFunction: function() {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cells);
