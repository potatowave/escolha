import React, {Component} from 'react';
import { connect } from 'react-redux';
import Alternative from './Alternative.jsx'

import Objective from './Objective.jsx'

class Table extends Component {

  render() {
    console.log("Rendering <Table />");

    return (

        <div className="main-container">

          <div className="table-container">
            <Objective />
            <Alternative />
          </div>

        </div>

    );
  }
}

export default Table;

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
