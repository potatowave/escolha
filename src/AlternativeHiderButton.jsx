import React, {Component} from 'react';
import { connect } from 'react-redux';

class AlternativeHiderButton extends Component {

  render() {
    console.log('Rendering ***** <AlternativeHiderButton/> *****');
    // add click listener - get the alt_id of the clicked element, then on render add 'clicked' to the circle that was clicked, and then hide the column with alt_id

    // var filledButton = ( uistate_hide_alt_ids !==null ) ? "alt-hide-button button-filled" : "alt-hide-button";
    // console.log("this.props.alternative_id", this.props.alternative_id)
    // console.log("* uistate_hide_alt_ids *", this.props.uistate_hide_alt_ids)
    // console.log("");

    var curr_alt_id = this.props.alternative_id;
    var hide_alt_ids_array = this.props.uistate_hide_alt_ids;

    // console.log("hide_alt_ids_array.indexOf(curr_alt_id)", hide_alt_ids_array.indexOf(curr_alt_id))

    var filledButton = ( (hide_alt_ids_array.indexOf(curr_alt_id) === -1) ? "alt-hide-button" : "alt-hide-button clicked")

    return (
      <div
        className={filledButton}
        onClick={ () => this.props.hideAlternativeFunction(curr_alt_id, hide_alt_ids_array, this.props.case_id) }
      >
        <div className="button-index">{this.props.index + 1}</div>
      </div>
      )
  }
}

AlternativeHiderButton.defaultProps = {
  uistate_hide_alt_ids: []
};

export default AlternativeHiderButton;


