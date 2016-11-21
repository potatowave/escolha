import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cells extends Component {

  render() {
    console.log("Rendering <Cells />");

    return (
        <div className={"r"+this.props.row}>
          { this.props.values.map((item) => {
              if(this.props.row === item.objective_id_frontend) {
                return <div classname={"c"+item.alternative_id_frontend }>{item.value}</div>

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
