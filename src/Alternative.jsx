import React, {Component} from 'react';
import { connect } from 'react-redux';
import Value from './Value.jsx'

class Alternative extends Component {

  render() {
    console.log("Rendering <Alternative />");

    return (

      <div className="table-area">

        <div className="header">
          <label className="header1">Alternative 1</label>
          <label className="header2 highlight">Alternative 2</label>
          <label className="header3">Alternative 3</label>
          <label className="header4">Alternative 4</label>
          <label className="header5">Alternative 5</label>
          <label className="header6">Alternative 6</label>
        </div>

        <Value />

      </div>

    );
  }
}

export default Alternative;
