import React, {Component} from 'react';
import { connect } from 'react-redux';

class ObjectiveDescriptions extends Component {


  render() {
    console.log("Rendering <ObjectiveDescriptions />");

    return (
      
      <div>
        
        <div 
          id="realtable"
          ref="REFNAME"
          className={ `r${this.props.row} draggable ` } >
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

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    objectives: state.objectives
  }
}

export default connect(mapStateToProps, null)(ObjectiveDescriptions);
