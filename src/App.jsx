import React, {Component} from 'react';
import { connect } from 'react-redux';
import Heading from './Heading.jsx';
import Nav from './Nav.jsx';
import DAndDTable from './DAndDTable.jsx';

class App extends Component {
  render() {
    console.log('Rendering <App/>');
    return (

      <div className="wrapper">

        <Nav />
        <main>

          { this.props.case.map(function(item) {
              return <Heading key={item.id} name={item.name} description={item.description} /> })}

          <DAndDTable />
          
        </main>

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    case: state.cases
  }
}

export default connect(mapStateToProps, null)(App);
