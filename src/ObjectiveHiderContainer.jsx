import React, {Component} from 'react';
import { connect } from 'react-redux';
import ObjectiveHiderButton from './ObjectiveHiderButton.jsx'
// 

class ObjectiveHiderContainer extends Component {

  render() {
    return (
      <div className="obj-hider-container">
      { 
        this.props.objectivesOrder.map((objective_id, index) => {
        return <ObjectiveHiderButton 
          key={objective_id}
          objective_id={objective_id}
          hide_obj_ids_array={this.props.hide_obj_ids_array}
          hideObjectiveFunction={this.props.hideObjectiveFunction}
          index={index}
        />
        })
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    hide_obj_ids_array: state.uistate.hide_obj_ids
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideObjectiveFunction: function(objective_id, hide_obj_ids_array) {
      
      // Make a copy of what's in state, rather than a reference to it
      let hide_obj_ids_array_copy = [ ...hide_obj_ids_array ];  

      // Toggle hiding of objectives. 
      // Check if objective_id is in hide_obj_ids_array.
      // If it is, remove it. If it is not, add it to the array.    
      const index_of_obj_id = hide_obj_ids_array_copy.indexOf(objective_id);

      if ( index_of_obj_id === -1) {
        hide_obj_ids_array_copy.push(objective_id)
      } else {
        hide_obj_ids_array_copy.splice(index_of_obj_id,1)
      }
      dispatch(
        {
          type: 'TOGGLE_HIDE_OBJECTIVE',
          uistate: {
            hide_obj_ids: hide_obj_ids_array_copy 
          }
        }
      );
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveHiderContainer);





