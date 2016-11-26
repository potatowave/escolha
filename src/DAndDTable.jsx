import React, {Component} from 'react';
import { connect } from 'react-redux';
import TableContainer from './TableContainer.jsx'

class DAndDTable extends Component {
// This file will point to TableComponent 3 times:
// - once for the 'realTable'
// - once for the 'fake' table that will act as the draggable rows, and
// - once for the 'fake table that will act as the draggable columns'

  // STUFF GOES HERE

  render() {
    return (
      <div className="d-and-d-table-component">
        <TableContainer 
          objectives={this.props.objectives}
          dragged_objective_id={this.props.dragged_objective_id}
          clientX={this.props.clientX}
          clientY={this.props.clientY}
          />
        
        
        {
          //     objectives: state.objectives,
          //     dragged_objective_id: state.uistate.dragged_objective_id,
          //     clientX: state.uistate.clientX,
          //     clientY: state.uistate.clientY
          // 
          // 
          // this.props.ui.draggedItemId &&
          // <TableContainer
          //   ref={component => this.floatingColumn = component}
          //   movable={true}
          //   enablePlaceholder={false}
          //   itemOrder={[this.props.ui.draggedItemId]}
          //   fieldOrder={this.props.ui.fieldOrder}
          //   items={this.props.items.filter(item => item.id === this.props.ui.draggedItemId)}
          //   fields={this.props.fields}
          //   showVerticalHeadings={false} />
        }
        {
          // this.props.ui.draggedFieldId &&
          // <TableContainer
          //   ref={component => this.floatingRow = component}
          //   movable={true}
          //   enablePlaceholder={false}
          //   fieldOrder={[this.props.ui.draggedFieldId]}
          //   itemOrder={this.props.ui.itemOrder}
          //   fields={this.props.fields.filter(field => field.id === this.props.ui.draggedFieldId)}
          //   items={this.props.items}
          //   showHorizontalHeadings={false} />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    dragged_objective_id: state.uistate.dragged_objective_id,
    clientX: state.uistate.clientX,
    clientY: state.uistate.clientY
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DAndDTable);

