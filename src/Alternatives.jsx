import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cells from './Cells.jsx'

class Alternatives extends Component {

  render() {
    console.log("Rendering <Alternatives />");

    return (


<div>
    <div className="table-area">

        <div className="header">
        { this.props.alternatives.map(function(item, index) {
              return <label className={"header"+(index + 1)}> {item.name} </label> })}
        </div>

         { this.props.objectives.map(function(item) {
              return <Cells
                row={item.id_frontend} /> })}
    </div>
</div>

    );
  }
}

function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    alternatives: state.alternatives,
    values: state.values
  }
}

function mapDispatchToProps(dispatch) {
  return {
    somePropFunction: function() {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alternatives);
