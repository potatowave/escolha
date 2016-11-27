import React, {Component} from 'react';
import { connect } from 'react-redux';
import TableMainSection from './TableMainSection.jsx'
import ObjectiveDescriptions from './ObjectiveDescriptions.jsx'

class TableContainer extends Component {

  render() {
    console.log("Rendering <Table />"); // Can put in logging middleware instead of this.

    return (

      <div className="main-container">

        <div
          ref={el => this.el = el}
          className={
            'table-container' +
            (this.props.movable ? ' movable' : '')
          }>
          {
            this.props.showVerticalHeadings &&
            <ObjectiveDescriptions
              objectivesOrder={this.props.objectivesOrder}
              objectives={this.props.objectives} 
              enablePlaceholder={this.props.enablePlaceholder}
              showHorizontalHeadings={this.props.showHorizontalHeadings}
            />
          }
          <TableMainSection 
            showHorizontalHeadings={this.props.showHorizontalHeadings}
            enablePlaceholder={this.props.enablePlaceholder}

            objectivesOrder={this.props.objectivesOrder}
            objectives={this.props.objectives}

          />

        </div>

      </div>

    );
  }
}

TableContainer.defaultProps = {
  movable: false,
  showHorizontalHeadings: true,
  showVerticalHeadings: true,
  enablePlaceholder: true,
  // items: [],
  objectives: []
};

export default TableContainer;

