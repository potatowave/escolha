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

          <div className="objective-description-area">

            <div className="header">
              <label className="header-objectives"></label>
              <label className="header-units"></label>
            </div>
            { this.props.objectives.map((item, index) => {
              return <ObjectiveDescriptions
                key={item.id}
                objective_id={item.id}
                row={item.order}
                name={item.name}
                subname={item.sub_name}
                prefix={item.unit_prefix}
                suffix={item.unit_suffix}
                />  

                })
            }

          </div>


          <TableMainSection />

        </div>

      </div>

    );
  }
}

export default TableContainer;

