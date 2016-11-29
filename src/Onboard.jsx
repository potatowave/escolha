// ./components/my-form-component.js'
import React from 'react';
import { Control, Form, getFormValues, formValueSelector } from 'redux-form';
import Nav from './Nav.jsx';
import WizardForm from './WizardForm.jsx';
import { OverlayTrigger, Popover, FormGroup, FormControl, ControlLabel, Radio, ButtonGroup, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveCase } from './actions/api'


const popoverRight = (
  <Popover id="popover-positioned-right" title="Description">
    Include some <strong>information about your conundrum</strong>.
  </Popover>
);

function postForm(data_insert) {
  saveCase(data_insert);
  // console.log(JSON.stringify(data_insert));
}

class OnboardData extends React.Component {

  render() {

    return (

      <div className="wrapper main-container">

        <Nav />
        <main className="onboardform">

          <WizardForm onSubmit={postForm} values={this.props.values}  / >

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
    saveCase: (data) => {
      console.log('SAVECASE', data);

      // dispatch(saveCase(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps,
  state => ({
    values: getFormValues('wizard')(state),
  })
)(OnboardData);
