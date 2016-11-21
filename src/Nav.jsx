import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

class Nav extends Component {

  render() {
    console.log("Rendering <Nav />");

    return (

        <nav className="navbar">
          <div className="brand">Escol.ia</div>

          <div className="nav-links">
            <div className="home-button"><Link to="/new">Home</Link></div>
            <div className="editor-button">Edit</div>
            <div className="create-button">Create</div>
          </div>

          <div className="search-area">Search</div>
          <div className="login">Signed in as Christian</div>
        </nav>



    );
  }
}

export default Nav;
