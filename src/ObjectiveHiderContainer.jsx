import React, {Component} from 'react';
import { connect } from 'react-redux';
import ObjectiveHiderButton from './ObjectiveHiderButton.jsx'
import { hideAction } from './actions/hide'
//

class ObjectiveHiderContainer extends Component {

  render() {
    console.log('Rendering <ObjectiveHiderContainer/>');
    console.log("objectivesOrder", this.props.objectivesOrder)

    return (
      <div className="obj-hider-container">
      {
        this.props.objectivesOrder.map((objective_id, index) => {
        return <ObjectiveHiderButton
          key={objective_id}
          objective_id={objective_id}
          uistate_hide_obj_ids={this.props.uistate_hide_alt_ids}
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

ObjectiveHiderContainer.defaultProps = {
  uistate_hide_obj_ids: []
};

function mapStateToProps(state) {
  return {
    uistate_hide_obj_ids: state.uistate.hide_obj_ids
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideObjectiveFunction: function(objective_id, uistate_hide_obj_ids, case_id) {

      // check - if alternative_id is in uistate_hide_alt_id, then remove it
      // if NOT in the array, push to end

      // var isHighlighted = ((uistate_highlight) && (uistate_selected_alt_id === alternative.id)) ? true : false;
      const index_of_obj_id = uistate_hide_obj_ids.indexOf(objective_id);

      if ( index_of_obj_id === -1) {
        uistate_hide_obj_ids.push(objective_id)
        console.log("*** ADD IT TO UISTATE ***")
        console.log("uistate_hide_obj_ids", uistate_hide_obj_ids)
      } else {
        uistate_hide_obj_ids.splice(index_of_obj_id,1)
        console.log("*** SPLICE IT OUT. ***")
        console.log("uistate_hide_alt_ids", uistate_hide_obj_ids)
      }

      dispatch(hideAction('objectives', case_id, uistate_hide_obj_ids))

        console.log("DISPATCH TO PROPS - BUTTON CLICKED ******", objective_id)
      dispatch(
        {
          type: 'TOGGLE_HIDE_OBJECTIVE',
          uistate: {
            hide_obj_ids: uistate_hide_obj_ids
          }
        }
      );
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveHiderContainer);





