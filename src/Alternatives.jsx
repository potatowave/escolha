import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cells from './Cells.jsx'
import AlternativeHeading from './AlternativeHeading.jsx'

class Alternatives extends Component {

  render() {
    console.log("Rendering <Alternatives />");

    return (

      <div>
        <div className="table-area">

          <div className="header">
            { this.props.alternatives.map((alternative) => {
              return <AlternativeHeading
                key={alternative.id}
                uistate_order={this.props.uistate_order}
                alternative={alternative}
                highlightFunction={this.props.highlightFunction}
              />
            })}
          </div>

          { this.props.objectives.map((item) => {

            var stuff = <Cells
              key={`r${item.id}`}
              row={item.order} // Pass the 'id' for the current objective
              objective_id={item.id}
              alt_order={this.props.uistate_order} // Selected alternative
              alt_id={this.props.uistate_alt_id}
              cells={this.props.cells}
              low_is_better = {item.low_is_better} />;

            return stuff })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    alternatives: state.alternatives,
    cells: state.cells,
    uistate_order: state.uistate.order,
    uistate_alt_id: state.uistate.alt_id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    highlightFunction: function(item) {
      const action = { type: 'AlternativesSelected', uistate: {order: item.order, alt_id: item.id}};

      // const action = { type: 'AlternativesSelected', uistate: {order: item.order, alt_id: item.id }};
      // alert('here');
      dispatch(action);

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alternatives);
