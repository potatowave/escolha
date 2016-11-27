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

          <ObjectiveDescriptions
            objectives={this.props.objectives}
          />

          <TableMainSection />

        </div>

      </div>

    );
  }
}

export default TableContainer;

