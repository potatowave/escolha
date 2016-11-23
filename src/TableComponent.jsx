import React, {Component} from 'react';
import { connect } from 'react-redux';
import Alternatives from './Alternatives.jsx'

import ObjectiveDescriptions from './ObjectiveDescriptions.jsx'

class TableComponent extends Component {

  render() {
    console.log("Rendering <Table />");

    return (

      <div className="main-container">

        <div className="table-container">

          <div className="objective-description-area">

            <div className="header">
              <label className="header-objectives"></label>
              <label className="header-units"></label>
            </div>
            { this.props.objectives.map(function(item, index) {
              return <ObjectiveDescriptions
                key={item.id}
                row={item.order}
                name={item.name}
                subname={item.sub_name}
                prefix={item.unit_prefix}
                suffix={item.unit_suffix} /> })}
          </div>


          <Alternatives />

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
