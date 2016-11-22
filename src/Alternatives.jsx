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
              if (item.id === this.props.uistate) {
                test = "highlight";
              }

              var stuff = <label onClick={ () => this.props.highlightFunction(item.id) } key={item.id} className={"header"+(item.id)+" "+test}> {item.name} </label> 

              return stuff
              }
            )}
          </div>

          { this.props.objectives.map((item) => {

            var stuff = <Cells
              key={`r${item.id}`}
              row={item.id} // Pass the 'id' for the current objective
              alt={this.props.uistate} // Selected alternative
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
    uistate: state.uistate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    highlightFunction: function(id) {
      const action = { type: 'AlternativesSelected', cats: id };
      // alert('here');
      dispatch(action);

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alternatives);
