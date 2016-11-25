import React, {Component} from 'react';
import { connect } from 'react-redux';
import Alternatives from './Alternatives.jsx'

import ObjectiveDescriptions from './ObjectiveDescriptions.jsx'

class TableComponent extends Component {

  render() {
    console.log("Rendering <Table />"); // Can put in logging middleware instead of this.


    return (

      <div className="main-container">

        <div className="table-container">

          <div className="objective-description-area">

            <div className="header">
              <label className="header-objectives">Objective</label>
              <label className="header-units">Unit</label>
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
                handle_mousedown={this.props.handle_mousedown}
                handle_mouseup={this.props.handle_mouseup}
                />  
                })
            }
                
          </div>


          <Alternatives />

        </div>

      </div>

    );
  }
}

function componentDidMount() {
  document.body.addEventListener('mouseup', function() {
    // code that invokes our dragstart
    // instead of setting to ID set to null
    
  })
}

function componentDidUnmount() {
  document.body.removeEventListener('mouseup', function() {
    
  })
}

function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    dragged_objective_id: state.uistate.dragged_objective_id
  }
}

function mapDispatchToProps(dispatch) {
  return {

    handle_mousedown: function(objectiveId) {            
      dispatch ({ type: 'OBJECTIVE_DRAGSTART', data: {dragged_objective_id: objectiveId }})
    },

    handle_mouseup: function(objectiveId) {
      dispatch ({ type: 'OBJECTIVE_DRAGEND', data: {dragged_objective_id: null}})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);

/*
  <div className="alt-image-container">
    <div className="alt-image-1"></div>
    <div className="alt-image-2"></div>
    <div className="alt-image-3"></div>
    <div className="alt-image-4"></div>
    <div className="alt-image-5"></div>
    <div className="alt-image-6"></div>
  </div>


  <div className="hide-buttons-rows">
    <div className="hide-button-spacer"></div>
    <div className="hide-button"></div>
    <div className="hide-button selected"></div>
    <div className="hide-button"></div>
    <div className="hide-button"></div>
    <div className="hide-button"></div>
    <div className="hide-button"></div>
    <div className="hide-button"></div>
    <div className="hide-button"></div>
  </div>
*/
