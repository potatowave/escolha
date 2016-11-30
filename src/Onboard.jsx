// ./components/my-form-component.js'
import React from 'react';
import { Control, Form, getFormValues, formValueSelector } from 'redux-form';
import Nav from './Nav.jsx';
import WizardForm from './WizardForm.jsx';
import { OverlayTrigger, Popover, FormGroup, FormControl, ControlLabel, Radio, ButtonGroup, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveCase } from './actions/api';
import { saveCaseAction } from './actions/api'
import { router, hashHistory } from 'react-router';

const popoverRight = (
  <Popover id="popover-positioned-right" title="Description">
    Include some <strong>information about your conundrum</strong>.
  </Popover>
);

class OnboardData extends React.Component {

  render() {
    return (

      <div className="wrapper">

        <Nav />
        <main className="form-container">

          <WizardForm onSubmit={this.props.saveCase} values={this.props.values} / >

        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    values: getFormValues('wizard')(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveCase: (data) => {
      dispatch(saveCaseAction(data));
      hashHistory.push('/');  // React-Router redirect

    },
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardData);
