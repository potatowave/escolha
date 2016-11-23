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
            { this.props.alternatives.map((item) => {

              var test = ""
              if (this.props.uistate_highlight && item.order === this.props.uistate_order) {
                test = "highlight";
              }

              // var stuff = <label onClick={ () => this.props.highlightFunction(item.id) } key={item.id} className={"header"+(item.id)+" "+test}> {item.name} </label>
              var stuff = <label onClick={ this.props.highlightFunction.bind(this, item) } key={item.id} className={"header"+(item.order)+" "+test}> {item.name} </label>              

              return stuff
              }
            )}
          </div>

          { this.props.objectives.map((item) => {

            var stuff = <Cells
              key={`r${item.id}`}
              row={item.order} // Pass the 'id' for the current objective
              objective_id={item.id}
              alt_order={this.props.uistate_order} // Selected alternative
              alt_id={this.props.uistate_alt_id}
              highlight={this.props.uistate_highlight}
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
    uistate_alt_id: state.uistate.alt_id,
    uistate_highlight: state.uistate.highlight
  }
}

function mapDispatchToProps(dispatch) {
  return {
    highlightFunction: function(item) {
      var action;

      if (this.props.uistate_highlight && this.props.uistate_alt_id === item.id) {
        action = { type: 'AlternativesSelected', uistate: {order: item.order, alt_id: item.id, highlight: false}};
      } else {
        action = { type: 'AlternativesSelected', uistate: {order: item.order, alt_id: item.id, highlight: true}};
      }

      // const action = { type: 'AlternativesSelected', uistate: {order: item.order, alt_id: item.id }};
      // alert('here');
      dispatch(action);

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alternatives);
