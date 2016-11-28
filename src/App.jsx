const injectTouchTapEvent = require('react-tap-event-plugin');
injectTouchTapEvent();
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import Heading from './Heading.jsx';
import Nav from './Nav.jsx';

import DAndDTable from './DAndDTable.jsx';
import AlternativeHiderContainer from './AlternativeHiderContainer.jsx';


import { Router, Route, Link } from 'react-router';
import Onboard from './Onboard.jsx';

class App extends Component {
  render() {
    console.log('Rendering <App/>');

    return (
      <div className="wrapper">


        <Nav />
        <main>
          { this.props.case.map(function(item) {
              return <Heading key={item.id} name={item.name} description={item.description} /> })}

          <ReactCSSTransitionGroup
            transitionName='fade'
            transitionAppear={true}
            transitionAppearTimeout={3000}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            <DAndDTable />
            <AlternativeHiderContainer 
              alternatives={this.props.alternatives} 
            />
          </ReactCSSTransitionGroup>
        </main>

      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    case: state.cases,
    alternatives: state.alternatives
  }
}

export default connect(mapStateToProps, null)(App);

