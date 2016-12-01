import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactTooltip from 'react-tooltip';
import AlternativeHiderContainer from './AlternativeHiderContainer.jsx';
import { deleteCaseAction, fetchCase } from './actions/api'

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
                    return <a key={item.id} onClick={ () => this.props.loadCase(item.id) }>{item.name}<i className="fa fa-trash-o" aria-hidden="true" onClick={(e)=>this.props.deleteCase(e, item.id)}></i></a>
                  })
              }

              </div>
            </div>

            <div className="dropdown">
              <div className="editor-button"><i className="fa fa-pencil" aria-hidden="true"></i></div>
              <div className="dropdown-content">
                <a>Edit coming soon!</a>
              </div>
            </div>

            <div className="dropdown">
              <div className="create-button"><Link to="/new"><i className="fa fa-plus" aria-hidden="true"></i></Link></div>
              <div className="dropdown-content">
                <Link to="/new">Create a new case</Link>
              </div>
            </div>

          </div>
          <div className="nav-aside">
            <div className="search-area"><i className="fa fa-search"></i></div>
            <div className="login">{this.props.userInfomation.name}</div>
            <div className="logout">
              <a href="/logout"><i className="fa fa-sign-out" data-tip="Logout" aria-hidden="true"></i></a>
            </div>
              <ReactTooltip />
          </div>
        </nav>

    );
  }
}


function mapStateToProps(state) {
  return {
    userCases: state.userCases,
    alternatives: state.alternatives,
    userInfomation: state.userInfomation
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCase: function(id) {
      const action = { type: 'REQUEST_CASE', case_id: id };
      dispatch(fetchCase(id));

    },
    deleteCase: function(e, caseId) {
      e.stopPropagation();
      if (confirm("Are you sure?")) {
        dispatch(deleteCaseAction(caseId))
      }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);