import React, {Component} from 'react';
import {connect} from 'react-redux';

class ObjectiveDescription extends Component {
  render() {
    console.log("Rendering <ObjectiveDescription ******** />");

    return (
      
      <div>
        
        <div 
          id="realtable"
          ref="REFNAME"
          className={ `r${this.props.row} draggable ` } >
          <div className="objective-name-container">
            <div className="table-area">
              <label className="objective-name">{this.props.name}</label><br />
              <label className="sub-objective-name">*{this.props.subname}</label>
            </div>
          </div>

          <label key={this.props.key} className="units">{this.props.prefix ? this.props.prefix : this.props.suffix}</label>

        </div>

      </div>

      )
  }
}

function mapStateToProps(state) {
  // objectives: state.objectives

}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveDescription);
