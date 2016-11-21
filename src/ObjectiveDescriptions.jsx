import React, {Component} from 'react';
import { connect } from 'react-redux';

class ObjectiveDescriptions extends Component {

  render() {
    console.log("Rendering <ObjectiveDescriptions />");

    return (

            <div className={"r" + (this.props.row + 1) }>
              <div className="objective-name-container">
                <label className="objective-name">{this.props.name}</label>
                <label className="sub-objective-name">{this.props.subname}</label>
              </div>
                <label className="units">{this.props.unit}</label>
            </div>
    );
  }
}

export default ObjectiveDescriptions;
