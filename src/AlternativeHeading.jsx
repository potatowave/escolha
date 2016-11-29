import React from 'react';

export default function AlternativeHeading({alternative, uistate_order, highlightFunction, uistate_highlight, uistate_selected_alt_id, uistate_hide_alt_ids}) {

  var highlightedClass = ( (uistate_highlight) && (alternative.id === uistate_selected_alt_id)) ? "header-alternatives highlight" : "header-alternatives";

  var curr_alt_id = alternative.id; 

  var hiddenAlternative = ( (uistate_hide_alt_ids.indexOf(curr_alt_id) === -1) ? "" : "hide-alternative")

  return (

    <label
      onClick={ () => highlightFunction(alternative, uistate_highlight, uistate_selected_alt_id) }
      key={alternative.id}
      className={'hvr-float hvr-icon-fade '+ highlightedClass + ' ' + hiddenAlternative}
    >

    {alternative.name}

    </label>
  )
}