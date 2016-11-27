import React, {Component} from 'react';
import { connect } from 'react-redux';
import AlternativeHeading from './AlternativeHeading.jsx'
import ObjectiveRow from './ObjectiveRow.jsx'

class TableMainSection extends Component {

  render() {
    console.log("Rendering <TableMainSection />");

    return (

      // <div>
        <div className="table-area">

          <div className="header-alternatives-container">

            { this.props.showHorizontalHeadings && this.props.alternatives.map((alternative) => {
              return <AlternativeHeading
                key={alternative.id}
                uistate_order={this.props.uistate_order}
                uistate_highlight={this.props.uistate_highlight}
                uistate_alt_id={this.props.uistate_alt_id}
                alternative={alternative}
                highlightFunction={this.props.highlightFunction}
                enablePlaceholder={this.props.enablePlaceholder}

                objectivesOrder={this.props.objectivesOrder}
                objectives={this.props.objectives}
              />
            })}
          </div>

          { this.props.objectivesOrder.map((objectiveId) => {
    
              return (<ObjectiveRow
                key={objectiveId}
                objective_id={objectiveId}

                // low_is_better = {item.low_is_better}

                uistate_alt_id={this.props.uistate_alt_id}
                uistate_highlight={this.props.uistate_highlight}
                cells={this.props.cells}

                cellBeingEdited={this.props.cellBeingEdited}
                enablePlaceholder={this.props.enablePlaceholder}

                objectivesOrder={this.props.objectivesOrder}
                objective={this.props.objectives.find(objective => objective.id === objectiveId)}
                // objectives={this.props.objectives}
                 />);
          })}

          { //this.props.objectives.map((item) => {
            
            // if((this.props.enablePlaceholder || (!(this.props.enablePlaceholder) && item.id === this.props.ui.draggedObjectiveId))) {

            //   return (<ObjectiveRow
            //     key={`r${item.id}`}

            //     current_row={item.order} // Pass the 'id' for the current objective
            //     objective_id={item.id}
            //     low_is_better = {item.low_is_better}
            //     //uistate_order={this.props.uistate_order} // Selected alternative
            //     uistate_alt_id={this.props.uistate_alt_id}
            //     uistate_highlight={this.props.uistate_highlight}
            //     cells={this.props.cells}

            //     cellBeingEdited={this.props.cellBeingEdited}
            //     enablePlaceholder={this.props.enablePlaceholder}

            //     objectivesOrder={this.props.objectivesOrder}
            //     objectives={this.props.objectives}
            //      />);
            // }
          // })
          }




        </div>
      // </div>
    );
  }
}

TableMainSection.defaultProps = {
  showHorizontalHeadings: true,
  enablePlaceholder: true,
  // items: [],
  objectives: [],
  objectivesOrder: []
};


function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    alternatives: state.alternatives,
    cells: state.cells,
    uistate_order: state.uistate.order,
    uistate_alt_id: state.uistate.alt_id,
    uistate_highlight: state.uistate.highlight,
    ui: state.uistate,

    cellBeingEdited: state.cellBeingEdited
  }
}

function mapDispatchToProps(dispatch) {
  return {
    highlightFunction: function(alternative, uistate_highlight, uistate_alt_id) {

      var isHighlighted = ((uistate_highlight) && (uistate_alt_id === alternative.id)) ? true : false;

      // Dispatch a action to toggle the highlight in the table
      // It will be called into AlternativeHeading.jsx file
      dispatch(
        {
          type: 'ALTERNATIVES_SELECTED',
          uistate: {
            order: alternative.order,
            alt_id: alternative.id,
            highlight: !isHighlighted
          }
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableMainSection);
