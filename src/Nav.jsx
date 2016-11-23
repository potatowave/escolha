import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchCase } from './actions/api'

class Nav extends Component {

  render() {
    console.log("Rendering <Nav />");

    return (

        <nav className="navbar">
          <div className="brand">Escol.ia</div>

          <div className="nav-links">
            <div className="home-button">Home</div>
            <div className="editor-button">Edit</div>
            <div className="create-button">Create</div>

            <div className="dropdown">
              <div className="dropbtn">Cases</div>
              <div className="dropdown-content">
              {
                this.props.userCases.map((item) => {
                    return <a key={item.id} onClick={ () => this.props.loadCase(item.id) }>{item.name}</a>
                  })
              }
              </div>
            </div>


          </div>

          <div className="search-area">Search</div>
          <div className="login">Signed in as Christian</div>
        </nav>

    );
  }
}


function mapStateToProps(state) {
  return {
    userCases: state.userCases
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