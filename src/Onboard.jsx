// ./components/my-form-component.js'
import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import Nav from './Nav.jsx';
import WizardForm from './WizardForm.jsx';
import { OverlayTrigger, Popover, FormGroup, FormControl, ControlLabel, Radio, ButtonGroup, ButtonToolbar, Button, Modal } from 'react-bootstrap';

const popoverRight = (
  <Popover id="popover-positioned-right" title="Description">
    Include some <strong>information about your conundrum</strong>.
  </Popover>
);

function postForm(data) {
  console.log(data);
}

class OnboardData extends React.Component {

  render() {

    return (

      <div className="wrapper main-container">

        <Nav />
        <main className="onboardform">

          <WizardForm onSubmit={postForm}  / >

        </main>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardData);
