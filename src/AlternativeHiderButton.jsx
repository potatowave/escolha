import React, {Component} from 'react';
import { connect } from 'react-redux';

class AlternativeHiderButton extends Component {

  render() {
    console.log('Rendering <AlternativeHiderButton/>');
    // add click listener - get the alternative_id of the clicked element
    // then on render add 'clicked' to the circle that was clicked,
    // AlternativeDescription and TableRow will then hide the row with corresponding alternative_id

    var curr_alt_id = this.props.alternative_id;

    var filledButton = ( (this.props.uistate_hide_alt_ids.indexOf(curr_alt_id) === -1) ? "alt-hide-button" : "alt-hide-button clicked")

    return (
      <div
        className={filledButton}
        onClick={ () => this.props.hideAlternativeFunction(curr_alt_id, this.props.uistate_hide_alt_ids, this.props.case_id) }
      >
        <div className="button-index"></div>
      </div>
      )
  }
}

export default AlternativeHiderButton;


