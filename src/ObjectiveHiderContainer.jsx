import React, {Component} from 'react';
import { connect } from 'react-redux';
import ObjectiveHiderButton from './ObjectiveHiderButton.jsx'
import { hideAction } from './actions/api'
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
          uistate_hide_obj_ids={this.props.uistate_hide_obj_ids}
          hideObjectiveFunction={this.props.hideObjectiveFunction}
          index={index}
          case_id={this.props.cases.id}
        />
        })
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    uistate_hide_obj_ids: state.uistate.hide_obj_ids
  }
}

function mapDispatchToProps(dispatch) {
  return {

    hideObjectiveFunction: function(objective_id, uistate_hide_obj_ids, case_id) {

      // Make a copy of what's in state, rather than a reference to it
      let uistate_hide_obj_ids_copy = [ ...uistate_hide_obj_ids ];

      // Toggle hiding of objectives.
      // Check if objective_id is in uistate_hide_obj_ids.
      // If it is, remove it. If it is not, add it to the array.
      const index_of_obj_id = uistate_hide_obj_ids_copy.indexOf(objective_id);

      if ( index_of_obj_id === -1) {
        uistate_hide_obj_ids_copy.push(objective_id)
      } else {
        uistate_hide_obj_ids_copy.splice(index_of_obj_id,1)
      }

      dispatch(hideAction('objectives', case_id, uistate_hide_obj_ids_copy))

      dispatch(
        {
          type: 'TOGGLE_HIDE_OBJECTIVE',
          uistate: {
            hide_obj_ids: uistate_hide_obj_ids_copy
          }
        }
      );
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveHiderContainer);





