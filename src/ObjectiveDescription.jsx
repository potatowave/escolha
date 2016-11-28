import React, {Component} from 'react';
import {connect} from 'react-redux';

class ObjectiveDescription extends Component {
  render() {
    console.log("Rendering <ObjectiveDescription />");
    

    var curr_obj_id = this.props.objective.id; 
    var hide_obj_ids_array = this.props.hide_obj_ids_array;

    var hiddenClass = ( (hide_obj_ids_array.indexOf(curr_obj_id) === -1) ? "" : "hide-objective")


    return (

        <div 
          data-objective-id={this.props.objective.id}
          className={ "objective-description" + " " + hiddenClass + (this.props.enablePlaceholder && this.props.ui.draggedObjectiveId === this.props.objective.id ? ' placeholder' : '') }
          onMouseDown={this.props.handleMouseDown.bind(this)}
          >
        
          <div className="gripper" />
          
          <div className="objective-name-container">
              <label className="objective-name">{this.props.objective.name}</label><br />
              <label className="sub-objective-name">*{this.props.objective.sub_name}</label>
          </div>

          <label key={this.props.key} className="units">{this.props.objective.unit_prefix ? this.props.objective.unit_prefix : this.props.objective.unit_suffix}</label>

        </div>

      )
  }
}

ObjectiveDescription.defaultProps = {
  enablePlaceholder: true
};


function mapStateToProps(state) {
  return {
    ui: state.uistate,
  };}

function mapDispatchToProps(dispatch) {
  return {
    handleMouseDown: function (event) {
      // Will need these below if we put on 'grippers':
      // const offsetY = event.pageY - event.target.offsetParent.offsetTop;
      // const offsetX = event.pageX - event.target.offsetParent.offsetLeft;     

      console.log("*** MOUSE DOWN ***");
      console.log("this.props.objective.id", this.props.objective.id)
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
