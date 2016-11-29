import React, {Component} from 'react';
import { connect } from 'react-redux';
import AlternativeHiderButton from './AlternativeHiderButton.jsx'
import { hideAction } from './actions/hide'

class AlternativeHiderContainer extends Component {

  render() {
    console.log('Rendering <AlternativeHiderContainer/>');

    return (
      <div className="alt-hider-container">
      {
        this.props.alternatives.map((alternative, index) => {
        return <AlternativeHiderButton
          key={alternative.id}
          alternative_id={alternative.id}
          uistate_hide_alt_ids={this.props.uistate_hide_alt_ids}
          hideAlternativeFunction={this.props.hideAlternativeFunction}
          index={index}
          case_id={alternative.case_id}
        />
        })
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    uistate_hide_alt_ids: state.uistate.hide_alt_ids
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideAlternativeFunction: function(alternative_id, uistate_hide_alt_ids, case_id) {
      console.log("***** CASE ID: *****", case_id)
      // Make a copy of what's in state, rather than a reference to it
      let uistate_hide_alt_ids_copy = [ ...uistate_hide_alt_ids ];  

      // Toggle hiding of alternatives. 
      // Check if alternative_id is in uistate_hide_alt_ids.
      // If it is, remove it. If it is not, add it to the array. 
      const index_of_alt_id = uistate_hide_alt_ids_copy.indexOf(alternative_id);

      if ( index_of_alt_id === -1) {
        uistate_hide_alt_ids_copy.push(alternative_id)
        // console.log("*** ADD IT TO UISTATE ***")
        // console.log("uistate_hide_alt_ids_copy", uistate_hide_alt_ids_copy)
      } else {
        uistate_hide_alt_ids_copy.splice(index_of_alt_id,1)
        // console.log("*** SPLICE IT OUT. ***")
        // console.log("uistate_hide_alt_ids_copy", uistate_hide_alt_ids_copy)
      }


      dispatch(hideAction('alternatives',case_id, uistate_hide_alt_ids_copy))

      dispatch(
        {
          type: 'TOGGLE_HIDE_ALTERNATIVE',
          uistate: {
            hide_alt_ids: uistate_hide_alt_ids_copy
          }
        }
      );
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlternativeHiderContainer);





