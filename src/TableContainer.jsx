import React, {Component} from 'react';
import { connect } from 'react-redux';
import TableMainSection from './TableMainSection.jsx'

import ObjectiveDescriptions from './ObjectiveDescriptions.jsx'

class TableContainer extends Component {

  render() {
    console.log("Rendering <Table />"); // Can put in logging middleware instead of this.


    return (

      <div className="main-container">

        <div className="table-container">

          <div className="objective-description-area">

            <div className="header">
              <label className="header-objectives"></label>
              <label className="header-units"></label>
            </div>
            { this.props.objectives.map((item, index) => {
              return <ObjectiveDescriptions
                key={item.id}
                objective_id={item.id}
                row={item.order}
                name={item.name}
                subname={item.sub_name}
                prefix={item.unit_prefix}
                suffix={item.unit_suffix}
                being_dragged={this.props.dragged_objective_id === item.id}
                clientX={this.props.clientX}
                clientY={this.props.clientY}
                />  

                })
            }

          </div>


          <TableMainSection />

        </div>

      </div>

    );
  }
}

// NOTE this should change - this.propos.handleMouseUp
// 
function componentDidMount() {
  // document.body.addEventListener('mouseup', function() {
  //   // code that invokes our dragstart
  //   // instead of setting to ID set to null

  // })
  document.body.addEventListener('mouseup', this.props.handleMouseUp)
  document.body.addEventListener('mouseleave', this.props.handleMouseUp) // this is in case the mouse leaves the body (OPTIONAL - see if I like it)
}

function componentDidUnmount() {
  // document.body.removeEventListener('mouseup', function() {
    
  // })
  document.body.removeEventListener('mouseup', this.props.handleMouseUp)
  document.body.removeEventListener('mouseleave', this.props.handleMouseUp) 
}

// function mapStateToProps(state) {
//   return {
//     objectives: state.objectives,
//     dragged_objective_id: state.uistate.dragged_objective_id,
//     clientX: state.uistate.clientX,
//     clientY: state.uistate.clientY
//   }
// }


export default TableContainer;

