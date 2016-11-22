// ./components/my-form-component.js'
import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { OverlayTrigger, Popover, FormGroup, FormControl, ControlLabel, Radio, ButtonGroup, ButtonToolbar, Button, Modal } from 'react-bootstrap';

const popoverRight = (
  <Popover id="popover-positioned-right" title="Description">
    Include some <strong>information about your conundrum</strong>.
  </Popover>
);

class OnboardData extends React.Component {

  render() {
    return (
      <ButtonToolbar>

        <Modal
          // {...this.props}
          show
          // onHide={this.props.hideModal}
          dialogClassName="onboard-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Add Case</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="caseInfo">
              <Form model="case" onSubmit={val => this.handleSubmit(val)}>
                <ControlLabel>Case</ControlLabel>
                <FormControl />

                <ControlLabel>Description</ControlLabel>
                <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverRight}>
                <FormControl componentClass="textarea" />
                </OverlayTrigger>
              </Form>
            </FormGroup>

            <FormGroup controlId="objectivesInfo">
              <Form model="objectives" onSubmit={val => this.handleSubmit(val)}>
                <ControlLabel>Objective</ControlLabel>
                <FormControl />
                <ControlLabel>Sub-objective</ControlLabel>
                <FormControl />
                <ControlLabel>Evaluation Criterion</ControlLabel>
                <FormControl />
                <ControlLabel>Scale Type</ControlLabel>


                <FormControl componentClass="select" placeholder="select">
                  <option value="money">money</option>
                  <option value="kilometers">kilometres</option>
                </FormControl>

                <ControlLabel>Units</ControlLabel>
                <FormControl />

                <ControlLabel>Low is better</ControlLabel>
                <ButtonGroup justified data-toggle="buttons">
                  <input type="radio" name="true" value="yes" />

                  <input type="radio" name="false" value="no" />
                </ButtonGroup>
              </Form>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

    showModal: () => {
      const action = { show: true };
      dispatch(action);
    },

    hideModal: () => {
      const action = { show: false };
      dispatch(action);
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardData);
