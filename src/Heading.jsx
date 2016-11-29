import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux';

class Heading extends Component {

  render() {
    console.log("Rendering <Heading />");

    return (

      <div className="heading-component">
        <div className="case-title">
          <h1 data-tip={this.props.description}>{this.props.name}</h1>
            <ReactTooltip />
        </div>
      </div>

    );
  }
}

export default Heading;



//