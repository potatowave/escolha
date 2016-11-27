import React, {Component} from 'react';
import ObjectiveDescription from './ObjectiveDescription.jsx';

class ObjectiveDescriptions extends Component {

  render() {
    console.log("Rendering <ObjectiveDescriptions />");

    return (
      
      <div className="objective-description-area">

        {
          this.props.showHorizontalHeadings &&
        <div className="header-objectives-container">
          <label className="header-objectives">Objectives</label>
          <label className="header-units">Units</label>
        </div>
        
        }

        { 
          this.props.objectivesOrder.map((objectiveId) => {
          return <ObjectiveDescription 
            key={objectiveId}
            objective={this.props.objectives.find(objective => objective.id === objectiveId)}
            enablePlaceholder={this.props.enablePlaceholder}
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

export default ObjectiveDescriptions;
