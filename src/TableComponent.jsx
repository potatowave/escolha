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
                handle_mousedown={this.props.handle_mousedown}
                handle_mouseup={this.props.handle_mouseup}
                handle_mousemove={this.props.handle_mousemove}
                clientX={this.props.clientX}
                clientY={this.props.clientY}
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
  document.body.removeEventListener('mouseup', this.props.handleMouseUp)
  document.body.removeEventListener('mouseleave', this.props.handleMouseUp)
}

function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    dragged_objective_id: state.uistate.dragged_objective_id,
    clientX: state.uistate.clientX,
    clientY: state.uistate.clientY
  }
}

function mapDispatchToProps(dispatch) {
  return {

    handle_mousedown: function(objectiveId) {
      // offsetX = event.offsetX;
      // offsetY = event.offsetY;

          // only left mouse button
      // if (e.button !== 0) return
      // var pos = $(this.getDOMNode()).offset()
      // this.setState({
      //   dragging: true,
      //   rel: {
      //     x: e.pageX - pos.left,
      //     y: e.pageY - pos.top
      //   }
      // })
      // e.stopPropagation()
      // e.preventDefault()

      dispatch ({ type: 'OBJECTIVE_DRAGSTART', data: {dragged_objective_id: objectiveId }})
    },

    //
    handle_mouseup: function(objectiveId) {
      dispatch ({ type: 'OBJECTIVE_DRAGEND', data: {dragged_objective_id: null, clientX: null, clientY: null}})
    },

    handle_mousemove: function(objectiveId, e) {
      console.log("e.pageX", e.pageX)
      console.log("e.pageY", e.pageY)

      console.log("e.left", e.left)
      console.log("e.top", e.top)

      console.log("e.offsetX", e.offsetX)
      console.log("e.offsetY", e.offsetY)

      console.log("e.clientX", e.clientX)
      console.log("e.clientY", e.clientY)

      // e.stopPropagation()
      // e.preventDefault()

      dispatch ({ type: 'OBJECTIVE_DRAGGING', data: {dragged_objective_id: objectiveId, clientX: e.clientX, clientY: e.clientY}})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);

