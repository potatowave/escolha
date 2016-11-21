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

         { this.props.values.map(function(item, index) {
              return <Cells
                row={item.objective_id_frontend} /> })}
    </div>
</div>

    );
  }
}

function mapStateToProps(state) {
  return {
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
