import React, {Component} from 'react';
import { connect } from 'react-redux';
import TableMainSection from './TableMainSection.jsx';
import ObjectiveDescriptions from './ObjectiveDescriptions.jsx';
import ObjectiveHiderContainer from './ObjectiveHiderContainer.jsx';

class TableContainer extends Component {

  render() {
    console.log("Rendering <TableContainer />"); // Can put in logging middleware instead of this.

    return (


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
              hide_obj_ids_array={this.props.hide_obj_ids_array}
            />
          }
          <TableMainSection
            showHorizontalHeadings={this.props.showHorizontalHeadings}
            enablePlaceholder={this.props.enablePlaceholder}
            objectivesOrder={this.props.objectivesOrder}
            objectives={this.props.objectives}
          />
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
  objectives: [],
  hide_obj_ids_array: []
};

export default TableContainer;

