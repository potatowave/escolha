import React, {Component} from 'react';
import {connect} from 'react-redux';

class ObjectiveDescription extends Component {
  render() {
    console.log("Rendering <ObjectiveDescription />");

    return (

        <div 
          data-objective-id={this.props.objective.id}
          className={ `r${this.props.row} objective-description ` + (this.props.enablePlaceholder && this.props.ui.draggedObjectiveId === this.props.objective.id ? ' placeholder' : '') }
          onMouseDown={this.props.handleMouseDown.bind(this)}
          >
        
          <div className="objective-name-container">
              <label className="objective-name">{this.props.name}</label><br />
              <label className="sub-objective-name">*{this.props.subname}</label>
          </div>

          <label key={this.props.key} className="units">{this.props.prefix ? this.props.prefix : this.props.suffix}</label>

        </div>

      )
  }
}

ObjectiveDescription.defaultProps = {
  enablePlaceholder: true
};


function mapStateToProps(state) {
  return {
    ui: state.uistate
  };}

function mapDispatchToProps(dispatch) {
  return {
    handleMouseDown: function (event) {
      // const offsetY = event.pageY - event.target.offsetParent.offsetTop;
      // const offsetX = event.pageX - event.target.offsetParent.offsetLeft;     

      const offsetY = event.pageY - event.target.offsetTop;
      const offsetX = event.pageX - event.target.offsetLeft;

      dispatch({
        type: 'UPDATE_UI',
        data: {
          draggedObjectiveId: this.props.objective.id,
          offsetX: offsetX,
          offsetY: offsetY
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveDescription);
