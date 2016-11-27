import React, {Component} from 'react';
import { connect } from 'react-redux';
import TableContainer from './TableContainer.jsx'

class DAndDTable extends Component {
// This file will point to TableComponent 3 times:
// - once for the 'realTable'
// - once for the 'fake' table that will act as the draggable rows, and
// - once for the 'fake table that will act as the draggable columns'

  // STUFF GOES HERE

  componentDidMount() {
    document.body.addEventListener('mouseup', this.props.handleMouseUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseup', this.props.handleMouseUp);
  }


  render() {
    console.log("Rendering <DAndDTable />");

    return (
      <div className="d-and-d-table-component">
        <TableContainer 
          objectives={this.props.objectives}
          />
        {
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
          this.props.ui.draggedObjectiveId &&
          <TableContainer
            ref={component => this.floatingRow = component}
            movable={true}
            enablePlaceholder={false}
            // fieldOrder={[this.props.ui.draggedObjectiveId]}
            // itemOrder={this.props.ui.itemOrder}
            objectives={this.props.objectives.filter(objective => objective.id === this.props.ui.draggedObjectiveId)}
            // items={this.props.items}
            showHorizontalHeadings={false} 
          />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ui: state.uistate,
    objectives: state.objectives
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleMouseUp() {
      console.log("MOUSE UP!")
      dispatch({
        type: 'UPDATE_UI',
        data: {
          // draggedItemId: null,
          draggedObjectiveId: null
        }
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DAndDTable);

