import React, {Component} from 'react';
import { connect } from 'react-redux';
import Heading from './Heading.jsx';
import Nav from './Nav.jsx';
<<<<<<< HEAD
import Table from './Table.jsx';
import { Router, Route, Link } from 'react-router';
import Onboard from './Onboard.jsx';
=======
import TableComponent from './TableComponent.jsx';
>>>>>>> master



<<<<<<< HEAD
var App = React.createClass({
    showModal: function(){
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },
=======
        <Nav />
        <main>
          { this.props.case.map(function(item) {
              return <Heading key={item.id} name={item.name} description={item.description} /> })}
          <TableComponent />
        </main>
>>>>>>> master

    callback: function(event){
        console.log(event);
    },

    render: function() {
        return (
            <div className="wrapper">

              <Nav />
              <main>
                <Heading />
                <Table />

                  <Onboard / >

              </main>

            </div>
        );
    }
});


function mapStateToProps(state) {
  return {
    case: state.cases
  }
}

function mapDispatchToProps(dispatch) {
  return {
    somePropFunction: function() {
      const action = { type: 'ADD_CASE', case: { id: 1, name: "Bob" } };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
