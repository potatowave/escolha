import React, {Component} from 'react';
import { connect } from 'react-redux';

class Cells extends Component {

  render() {
    console.log("Rendering <Cells />");

    function findSelectedCells(item) {
      // return item.alternative_id === this.props.alt;
      // console.log("** in findSelectedCells **");
      // console.log("item.order", item.order)
      // console.log("this.props.alt", this.props.alt_id);

      return item.alternative_id === this.props.alt_id;
      // NOTE: item refers to the current cell - need to get 'order' from Alt_id, not from Cells
    }

    function matchingPropsRow(item) {
      return item.objective_id === this.props.objective_id;
    }

    // Grab all cells in the current row
    // console.log("this.props.cells", this.props.cells)
    // console.log("this.props.alt_order", this.props.alt_order)

    const selectedCells = this.props.cells.filter(findSelectedCells, this);
    // console.log("selectedCells: ", selectedCells)

    // Grab the selected value for the current row
    var thisRowsSelectedValue = selectedCells.find(matchingPropsRow, this);

    // console.log("thisRowsSelectedValue: ", thisRowsSelectedValue)

    // var thisRowsSelectedValue = this.props.cells.filter(findSelectedCells, this).find(matchingPropsRow, this);
    // console.log("selected_value", thisRowsSelectedValue)

    return (
      <div className={"r"+this.props.row}>

      { this.props.cells.filter(matchingPropsRow, this).map((item , index) => {

        var test = ""

        // if (item.alternative_id === this.props.alt) {

        // console.log("*************");
        // console.log("this.props.alt_order", this.props.alt_order);
        // console.log("this.props.alt_order === null", this.props.alt_order === null);



        // if (this.props.alt_order !== null && (item.alternative_id === this.props.alt_id)) {
        //   test = "highlight";
        //   console.log("HIGHLIGHT IS TRUE");
        // }


        if (this.props.highlight && (item.alternative_id === this.props.alt_id)) {
          test = "highlight";
          console.log("HIGHLIGHT IS **TRUE**");
        } else {
          test = "";
          console.log("HIGHLIGHT IS **FALSE**");
        }

        console.log("HIGHLIGHT ACTUALLY IS:", this.props.highlight);


        // if(this.props.isHilight) {
        //   var makeClassString= '+" "+test+" "+compare_tag';
        // } else {  
        //     var makeClassString= "c"+(index+1);
        // }
        
        // var stuff = <div key={`c${item.alternative_id}-${item.alternative_id}`}
        // // className={"c"+item.alternative_id+" "+test+" "+compare_tag}>{item.value}
        // className={makeClassString}>{item.value}</div>



        var compare_tag = ""
        // if (this.props.alt_order !== null) {
        if (this.props.highlight) {
          if (this.props.low_is_better) {
            // console.log("item.value", item.value)
            // console.log("thisRowsSelectedValue.value", thisRowsSelectedValue.value)

            if (item.value < thisRowsSelectedValue.value) {
              compare_tag = "better"
            } else if (item.value > thisRowsSelectedValue.value) {
              compare_tag = "worse"
            }

          } else {
            if (item.value > thisRowsSelectedValue.value) {
              compare_tag = "better"
            } else if (item.value < thisRowsSelectedValue.value) {
              compare_tag = "worse"
            }
          }
        }

        // var stuff = <div key={`c${item.alternative_id}-${item.alternative_id}`} className={"c"+item.alternative_id+" "+test+" "+compare_tag}>{item.value}</div>
        // var stuff = <div key={`c${item.alternative_id}-${item.alternative_id}`} className={"c"+item.order+" "+test+" "+compare_tag}>{item.value}</div>
        // var stuff = <div key={`c${item.alternative_id}-${item.alternative_id}`} className={"c"+this.props.alt_order+" "+test+" "+compare_tag}>{item.value}</div>

        // Working
        // var stuff = <div key={`c${item.alternative_id}-${item.alternative_id}`}
        // // className={"c"+item.alternative_id+" "+test+" "+compare_tag}>{item.value}
        // className={"c"+(index+1) +" "+test+" "+compare_tag}>{item.value}</div>

        return (
          <div
            key={`c${item.alternative_id}-${item.alternative_id}`}
            className={"c"+(index+1) +" "+test+" "+compare_tag}
            >
            {item.value}
            { item.isEditVisible && <input type="text" value={item.value}/> }
          </div>
        )

      })}

      </div>
    );
  }


  toggleIsEditVisible(item) {
    var toog = (item.isEditVisible === true) ? false : true;
    this.props.isEditVisible = toog
    this.props.toggleEdit(cell)
  }






}

function mapStateToProps(state) {
  return {
    // NOTE: This is a 'dumb' component, so instead of grabbing values from the store,
    // we can pass these from the parent component down here

    objectives: state.objectives,
    cells: state.cells
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveSelectedValue: function(value) {
      const action = { type: 'saveSelectedVal', value: value };
      dispatch(action);
    },
    toggleEdit: function(cell) {
      dispatch( { type: 'CELL_TOGGLED', cell: cell})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cells);
