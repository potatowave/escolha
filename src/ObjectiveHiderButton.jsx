import React, {Component} from 'react';
import { connect } from 'react-redux';

class ObjectiveHiderButton extends Component {

  render() {
    console.log('Rendering ***** <ObjectiveHiderButton/> *****');
    // add click listener - get the alt_id of the clicked element, then on render add 'clicked' to the circle that was clicked, and then hide the column with alt_id

    var curr_obj_id = this.props.objective_id; 
    var hide_obj_ids_array = this.props.uistate_hide_obj_ids;

    // console.log("hide_alt_ids_array.indexOf(curr_alt_id)", hide_alt_ids_array.indexOf(curr_alt_id))

    var filledButton = ( (hide_obj_ids_array.indexOf(curr_obj_id) === -1) ? "obj-hide-button" : "obj-hide-button clicked")

    return (
      <div 
        className={filledButton}
        onClick={ () => this.props.hideObjectiveFunction(curr_obj_id, hide_obj_ids_array) }
      >
        <div className="button-index">{this.props.index + 1}</div>
      </div>
      )
  }
}

ObjectiveHiderButton.defaultProps = {
  uistate_hide_obj_ids: []
};

export default ObjectiveHiderButton;


