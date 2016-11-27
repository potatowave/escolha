import React, {Component} from 'react';
import { connect } from 'react-redux';
import TableContainer from './TableContainer.jsx'

class DAndDTable extends Component {
// This file will point to TableComponent 3 times:
// - once for the 'realTable'
// - once for the 'fake' table that will act as the draggable rows, and
// - once for the 'fake table that will act as the draggable columns'


  // WHAT IS THIS FOR??
  constructor() {
    super();
    this.handleDrag = this.handleDrag.bind(this);
  }

  resetFloatingTables() {
    if (this.floatingRow) {
      // Grab the Div within the mainTable element that has the className "objective-description" and the appropriate "data-objective-id"
      this.draggedHeading = this.mainTable.el.querySelector(`.objective-description[data-objective-id="${this.props.ui.draggedObjectiveId}"]`);

      // Set offsets relative to the page and container
      this.floatingRow.el.style.width = this.mainTable.el.offsetWidth + 'px';
      this.floatingRow.el.style.top = this.draggedHeading.offsetTop - document.body.scrollTop + 'px';
      this.floatingRow.el.style.left = this.draggedHeading.offsetLeft - document.body.scrollLeft + 'px';
    }

  }

  handleDrag(event) {
      if (this.floatingRow) {
        const headingTargets = Array.from(this.mainTable.el.querySelectorAll('.objective-description'));
        const target = headingTargets.find(target => target.offsetTop <= event.pageY && target.offsetTop + target.offsetHeight >= event.pageY);

        if (target && target.dataset.objectiveId != this.props.ui.draggedObjectiveId) {

          console.log("OVERLAPPED!!", headingTargets.indexOf(target))

          this.props.handleReorderObjectives(headingTargets.indexOf(target));
          this.forceUpdate();

        }
        
        this.floatingRow.el.style.top = event.clientY - this.props.ui.offsetY + 'px';
        this.floatingRow.el.style.left = this.draggedHeading.offsetLeft - document.body.scrollLeft + 'px';

        // console.log("event.clientY", event.clientY);
        // console.log("this.props.ui.offsetY", this.props.ui.offsetY)
        // console.log(event.clientY - this.props.ui.offsetY);

      }
    }


  componentDidMount() {
    this.resetFloatingTables();
    document.body.addEventListener('mouseup', this.props.handleMouseUp);
    document.body.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('scroll', this.handleDrag);
  }

  componentDidUpdate() {
    this.resetFloatingTables();
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseup', this.props.handleMouseUp);
    document.body.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('scroll', this.handleDrag);
  }



  render() {
    console.log("Rendering <DAndDTable />");


    return (
      <div className="d-and-d-table-component">
        <TableContainer 
          // This creates a ref to this object with the name "mainTable"
          ref={component => this.mainTable = component}
          objectivesOrder={this.props.ui.objectivesOrder}
          objectives={this.props.objectives}
          />
        {
          this.props.ui.draggedObjectiveId &&
          <TableContainer
            // This creates a ref to this object with the name "floatingRow"
            ref={component => this.floatingRow = component} 

            movable={true}
            enablePlaceholder={false}

            objectivesOrder={this.props.ui.objectivesOrder}
            objectives={this.props.objectives.filter(objective => objective.id === this.props.ui.draggedObjectiveId)}

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
    handleReorderObjectives(newDraggedObjectiveIndex) {
      dispatch({
        type: 'REORDER_OBJECTIVES',
        data: {
          newDraggedObjectiveIndex: newDraggedObjectiveIndex
        }
      });
    },
    handleMouseUp() {
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

