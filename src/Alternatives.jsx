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
        { this.props.alternatives.map(function(item) {
              return <label key={item.id} className={"header"+(item.id)}> {item.name} </label> })}
        </div>

         { this.props.objectives.map(function(item) {
              return <Cells
                key={`r${item.id}`}
                row={item.order} /> })}
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
