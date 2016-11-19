import React, {Component} from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log('Rendering <App/>');
    return (
      <div><h1>Hello React :)</h1></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    someProp: state.someProp
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
