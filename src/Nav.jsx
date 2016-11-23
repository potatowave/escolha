import React, {Component} from 'react';
import { connect } from 'react-redux';

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
              
              {// Paulo - put your loop here :) 

                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
                
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

export default Nav;
