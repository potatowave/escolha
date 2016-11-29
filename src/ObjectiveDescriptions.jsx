import React, {Component} from 'react';
import {connect} from 'react-redux';
import ObjectiveDescription from './ObjectiveDescription.jsx';
import AlternativeHiderContainer from './AlternativeHiderContainer.jsx';

class ObjectiveDescriptions extends Component {

  render() {
    console.log("Rendering <ObjectiveDescriptions />");

    return (

      <div className="objective-description-area">

        {
          this.props.showHorizontalHeadings &&
        <div className="header-objectives-container">

        </div>

        }

        {
          this.props.objectivesOrder.map((objectiveId) => {
          return <ObjectiveDescription
            key={objectiveId}
            objective={this.props.objectives.find(objective => objective.id === objectiveId)}
            enablePlaceholder={this.props.enablePlaceholder}
            uistate_hide_alt_ids={this.props.uistate_hide_alt_ids}
          />


          })
        }

      </div>

    );
  }
}

ObjectiveDescriptions.defaultProps = {
  enablePlaceholder: true,
  showHorizontalHeadings: true,
  objectivesOrder: [],
  objectives: []
};

function mapStateToProps (state) {
  return {
    alternatives: state.alternatives
  }
}

export default connect (mapStateToProps)(ObjectiveDescriptions);

// <label className="header-objectives">Objectives</label>
// <label className="header-units">Units</label>
