import React, {Component} from 'react';
import { connect } from 'react-redux';

class Heading extends Component {

  render() {
    console.log("Rendering <Heading />");

    return (

      <div className="heading-component">
        <div className="case-title">
          <h1>Case Example</h1>
        </div>

        <div className="case-description">
          <p>Activated charcoal wolf locavore yuccie. Paleo pork belly
          readymade, chia direct trade ethical narwhal man braid post-ironic
          pickled iceland. Cardigan twee swag VHS.</p>
          <div>
            {this.props.someProp.map(function(item) {
              return <p> {item.description} </p>
            })}
          </div>
        </div>
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    someProp: state.cases
  }
}

function mapDispatchToProps(dispatch) {
  return {
    somePropFunction: function() {
      const action = { type: 'ADD_CONTACT', contact: { id: 1, name: "Bob" } };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Heading);

// export default Heading;