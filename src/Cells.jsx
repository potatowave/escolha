import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cells extends Component {

  render() {
    console.log("Rendering <Cells />");

    return (
        <div className={"r"+this.props.row}>
          { this.props.values.map((item) => {
              if(this.props.row === item.objective_id) {
                return <div key={`c${item.alternative_id}`} className={"c"+item.alternative_id }>{item.value}</div>

              }
            })}
        </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    values: state.values
  }
}

function mapDispatchToProps(dispatch) {
  return {
    somePropFunction: function() {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cells);
