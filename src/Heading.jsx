import React, {Component} from 'react';
import { connect } from 'react-redux';

class Heading extends Component {

  render() {
    console.log("Rendering <Heading />");

    return (

      <div className="heading-component">
      </div>

    );
  }
}

export default Heading;

// <div className="case-title">
//   <h1>{this.props.name}</h1>
// </div>
// <div className="case-description">
//   <p>{this.props.description}</p>
// </div>