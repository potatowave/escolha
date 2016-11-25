import React, {Component} from 'react';
import { connect } from 'react-redux';

class ObjectiveDescriptions extends Component {


  render() {
    console.log("Rendering <ObjectiveDescriptions />");
    
    // var realTable = document.getElementById('real-table');

    // var realTable = this.refs.realtable

    // console.log("realTable", realTable)

    // const divStyle = {
    //     width: realTable.offsetWidth + 'px',
    //     left: realTable.offsetLeft + 'px',
    // }
    // const divStyle = {
    //     width: 300 + 'px',
    //     left: 100 + 'px',
    //   }

    // movingRow.style.width = realTable.offsetWidth + 'px';
    // movingRow.style.left = realTable.offsetLeft + 'px';


    return (
      
      <div>
        
        <div 
          id="realtable"
          ref="realtable"
          onMouseDown={this.props.handle_mousedown.bind(this, this.props.objective_id)} 
          onMouseUp={this.props.handle_mouseup.bind(this, this.props.objective_id)} 
          className={ `r${this.props.row} draggable ${this.props.being_dragged ? 'being-dragged' : '' } ` } >
          <div className="objective-name-container">
            <div className="table-area">
              <label className="objective-name">{this.props.name}</label><br />
              <label className="sub-objective-name">*{this.props.subname}</label>
            </div>
          </div>

          { this.props.objectives.map((item, index) => {
            // if(this.props.row === item.id) {
            // checks order of objectives to assign unit symbol
            if(this.props.row === item.order) {
              if(item.unit_suffix === null) {
                return <label key={item.id} className="units">{item.unit_suffix}</label>
              } else {
                return <label key={item.id} className="units">{item.unit_prefix}</label>
              }
            }
          })}
        </div>

        <div 
          id="moving-row" 
          onMouseDown={this.props.handle_mousedown.bind(this, this.props.objective_id)} 
          onMouseUp={this.props.handle_mouseup.bind(this, this.props.objective_id)} 
          className={`r${this.props.row} table-container-component movable ${this.props.being_dragged ? '' : 'hidden' }`} 
          // style={{width: this.refs.realtable.offsetWidth + 'px'}} >
          style={{width: 200 + 'px'}} >
          
          <div className="objective-name-container">
            <div className="table-area">
              <label className="objective-name">{this.props.name}</label><br />
              <label className="sub-objective-name">*{this.props.subname}</label>
            </div>
          </div>

          { this.props.objectives.map((item, index) => {
            if(this.props.row === item.order) {
              if(item.unit_suffix === null) {
                return <label key={item.id} className="units">{item.unit_suffix}</label>
              } else {
                return <label key={item.id} className="units">{item.unit_prefix}</label>
              }
            }
          })}
        </div>

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    objectives: state.objectives
  }
}

function mapDispatchToProps(dispatch) {
  return {
    somePropFunction: function() {
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveDescriptions);
