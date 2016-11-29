import React, {Component} from 'react';
import { connect } from 'react-redux';
import AlternativeHeading from './AlternativeHeading.jsx';
import ObjectiveRow from './ObjectiveRow.jsx';
import AlternativeHiderContainer from './AlternativeHiderContainer.jsx';

class TableMainSection extends Component {

  render() {
    console.log("Rendering <TableMainSection />");

    return (

        <div className="table-area">

          <div className="header-alternatives-container">

            { this.props.showHorizontalHeadings && this.props.alternatives.map((alternative) => {
              return <AlternativeHeading
                key={alternative.id}
                objectivesOrder={this.props.objectivesOrder}
                objectives={this.props.objectives}

                uistate_highlight={this.props.uistate_highlight}
                uistate_selected_alt_id={this.props.uistate_selected_alt_id}
                alternative={alternative}
                highlightFunction={this.props.highlightFunction}
                enablePlaceholder={this.props.enablePlaceholder}
                uistate_hide_alt_ids={this.props.uistate_hide_alt_ids}
              />
            })}
          </div>

          { this.props.objectivesOrder.map((objectiveId) => {
              return (<ObjectiveRow
                key={objectiveId}
                objective_id={objectiveId}
                objectivesOrder={this.props.objectivesOrder}
                objective={this.props.objectives.find(objective => objective.id === objectiveId)}

                uistate_selected_alt_id={this.props.uistate_selected_alt_id}
                uistate_highlight={this.props.uistate_highlight}
                cells={this.props.cells}

                cellBeingEdited={this.props.cellBeingEdited}
                enablePlaceholder={this.props.enablePlaceholder}
                 />);
            })}

        </div>
    );
  }
}

TableMainSection.defaultProps = {
  showHorizontalHeadings: true,
  enablePlaceholder: true,
  uistate_hide_alt_ids: [],
  // items: [],
  objectives: [],
  objectivesOrder: []
};


function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    alternatives: state.alternatives,
    cells: state.cells,
    uistate_selected_alt_id: state.uistate.selected_alt_id,
    uistate_highlight: state.uistate.highlight,
    uistate_hide_alt_ids: state.uistate.hide_alt_ids,
    ui: state.uistate,
    cellBeingEdited: state.cellBeingEdited
  }
}

function mapDispatchToProps(dispatch) {
  return {
    highlightFunction: function(alternative, uistate_highlight, uistate_selected_alt_id) {

      var isHighlighted = ((uistate_highlight) && (uistate_selected_alt_id === alternative.id)) ? true : false;

      dispatch(
        {
          type: 'ALTERNATIVES_SELECTED',
          uistate: {
            selected_alt_id: alternative.id,
            highlight: !isHighlighted
          }
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableMainSection);
