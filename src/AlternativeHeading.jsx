import React from 'react';

export default function AlternativeHeading({alternative, uistate_order, highlightFunction, uistate_highlight, uistate_alt_id}) {

  var highlightedClass = ( (uistate_highlight) && (alternative.order === uistate_order)) ? "header-alternatives highlight" : "header-alternatives";

  return (
    <label
      onClick={ () => highlightFunction(alternative, uistate_highlight, uistate_alt_id) }
      key={alternative.id}
      className={highlightedClass}
    >
    {alternative.name}
    </label>
  )
}
// export default function AlternativeHeading(props) {
//   var highlightedClass = "";
//   if (props.alternative.order === props.uistate_order) {
//     highlightedClass = "highlight";
//   }
//   return (
//     <label onClick={ () => props.highlightFunction(props.alternative) } key={props.alternative.id} className={"header " + highlightedClass}> {props.alternative.name} </label>
//   )
// }

// export default function AlternativeHeading(props) {
//   var alternative = props.alternative;

//   var highlightedClass = (alternative.order === props.uistate_order) ? "header highlight" : "header"

//   return (
//     <label
//       onClick={ () => props.highlightFunction(alternative) }
//       key={alternative.id}
//       className={highlightedClass}
//     >
//     {alternative.name}
//     </label>
//   )
// }
