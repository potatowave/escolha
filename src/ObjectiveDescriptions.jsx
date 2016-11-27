import React, {Component} from 'react';
import { connect } from 'react-redux';
import ObjectiveDescription from './ObjectiveDescription.jsx';

class ObjectiveDescriptions extends Component {

  render() {
    console.log("Rendering <ObjectiveDescriptions />");

    return (
      
      <div className="objective-description-area">

        <div className="header-objectives-container">
          <label className="header-objectives">Objectives</label>
          <label className="header-units">Units</label>
        </div>
        
        { this.props.objectives.map((item) => {
          return <ObjectiveDescription 
            key={item.id}
            objective={item}
            row={item.order}
            name={item.name}
            subname={item.sub_name}
            prefix={item.unit_prefix}
            suffix={item.unit_suffix}
          />

          })
        }

      </div>
      
    );
  }
}


export default ObjectiveDescriptions;
