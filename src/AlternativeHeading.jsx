import React from 'react';

export default function AlternativeHeading({alternative, uistate_order, highlightFunction, uistate_highlight, uistate_selected_alt_id}) {

  var highlightedClass = ( (uistate_highlight) && (alternative.id === uistate_selected_alt_id)) ? "header-alternatives highlight" : "header-alternatives";

  return (

    <label
      onClick={ () => highlightFunction(alternative, uistate_highlight, uistate_selected_alt_id) }
      key={alternative.id}
      className={'hvr-float hvr-icon-fade '+ highlightedClass}
    >

    {alternative.name}

    </label>
  )
}