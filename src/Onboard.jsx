// ./components/my-form-component.js'
import React from 'react';
import { Control, Form, getFormValues, formValueSelector } from 'redux-form';
import Nav from './Nav.jsx';
import WizardForm from './WizardForm.jsx';
import { OverlayTrigger, Popover, FormGroup, FormControl, ControlLabel, Radio, ButtonGroup, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

const popoverRight = (
  <Popover id="popover-positioned-right" title="Description">
    Include some <strong>information about your conundrum</strong>.
  </Popover>
);

function postForm(data_insert) {
  alert(data_insert);
}

class OnboardData extends React.Component {

  componentDidMount() {
    introJs().start();
  }

  render() {

    return (

      <div className="wrapper main-container">

        <Nav />
        <main className="onboardform">

          <WizardForm onSubmit={postForm} values={this.props.values}  / >

        </main>

        <a href='http://google.com/' data-intro='Hello step one!'></a>

        </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     values: state.values
//   }
// }

// export default connect(mapStateToProps)(OnboardData);

export default connect(
  state => ({
    values: getFormValues('wizard')(state),
  })
)(OnboardData);
