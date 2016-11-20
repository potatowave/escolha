import React, {Component} from 'react';
import { connect } from 'react-redux';

class Heading extends Component {

  render() {
    console.log("Rendering <Heading />");

    return (

      <div className="heading-component">
        <div className="case-title">
          <h1>Case Title</h1>
        </div>

        <div className="case-description">
          <p>Activated charcoal wolf locavore yuccie. Paleo pork belly
          readymade, chia direct trade ethical narwhal man braid post-ironic
          pickled iceland. Cardigan twee swag VHS.</p>
        </div>
      </div>

    );
  }
}

export default Heading;
