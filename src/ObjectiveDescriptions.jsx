import React, {Component} from 'react';
import { connect } from 'react-redux';

class ObjectiveDescriptions extends Component {

  render() {
    console.log("Rendering <ObjectiveDescriptions />");

    return (

            <div className={ "r" + this.props.row }>
              <div className="objective-name-container">
                <label className="objective-name">{this.props.name}</label>
                <label className="sub-objective-name">{this.props.subname}</label>
              </div>
              { this.props.objectives.map((item, index) => {

                  if(this.props.row === item.id) {
                    if(item.unit_suffix === null) {
                      return <label key={item.id} className="units">{this.props.prefix}</label>
                    } else {
                      return <label key={item.id} className="units">{this.props.suffix}</label>
                    }
                  }
                 })}

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
