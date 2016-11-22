import React, {Component} from 'react';
import { connect } from 'react-redux';

class Heading extends Component {

  render() {
    console.log("Rendering <Heading />");

    return (

      <div className="heading-component">
        <div className="case-title">
          <h1>{this.props.name}</h1>
        </div>

        <div className="case-description">
            <p>{this.props.description}</p>
        </div>
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {

    cases: state.cases
  }
}

export default connect(mapStateToProps, null)(Heading)

  }
}

function mapDispatchToProps(dispatch) {
  return {
    somePropFunction: function() {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Heading);

// export default Heading;
