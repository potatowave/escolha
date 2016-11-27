import React, {Component} from 'react';
import {connect} from 'react-redux';

class ObjectiveDescription extends Component {
  render() {
    console.log("Rendering <ObjectiveDescription ******** />");

    return (

        <div 
          id="realtable"
          ref="REFNAME"
          className={ `r${this.props.row} objective` }
          onMouseDown={this.props.handleMouseDown.bind(this)}
          >

          <div className="objective-name-container">
            <div className="table-area">
              <label className="objective-name">{this.props.name}</label><br />
              <label className="sub-objective-name">*{this.props.subname}</label>
            </div>
          </div>

          <label key={this.props.key} className="units">{this.props.prefix ? this.props.prefix : this.props.suffix}</label>

        </div>

      )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    handleMouseDown: function (event) {
      const offsetY = event.pageY - event.target.offsetParent.offsetTop;
      const offsetX = event.pageX - event.target.offsetParent.offsetLeft;
      console.log("MOUSE DOWN!");
      dispatch({
        type: 'UPDATE_UI',
        data: {
          draggedObjectiveId: this.props.objective.id,
          offsetX: offsetX,
          offsetY: offsetY
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveDescription);
