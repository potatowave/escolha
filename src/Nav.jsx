import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCase } from './actions/api';
import AlternativeHiderContainer from './AlternativeHiderContainer.jsx';

class Nav extends Component {

  render() {
    console.log("Rendering <Nav />");

    return (

        <nav className="navbar">

          <div className="nav-links">
            <div className="brand">Escolia</div>
            <div className="dropdown">
              <div className="dropbtn"><i className="fa fa-table" aria-hidden="true"></i></div>
                <div className="dropdown-content">
                {
                  this.props.userCases.map((item) => {
                      return <a key={item.id} onClick={ () => this.props.loadCase(item.id) }>{item.name}</a>
                    })
                }
                </div>
              </div>
            <div className="editor-button"><i className="fa fa-pencil" aria-hidden="true"></i></div>
            <div className="create-button"><i className="fa fa-plus" aria-hidden="true"></i></div>
          </div>
          <div className="nav-aside">
            <div className="search-area"><i className="fa fa-search"></i></div>
            <div className="login">Lighthouse-labs@gmail.com</div>
          </div>
        </nav>

    );
  }
}


function mapStateToProps(state) {
  return {
    userCases: state.userCases,
    alternatives: state.alternatives
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCase: function(id) {
      const action = { type: 'REQUEST_CASE', case_id: id };
      dispatch(fetchCase(id)).then()

    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);