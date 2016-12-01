import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './validate';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import { Link, hashHistory } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { red500, yellow500, green500 } from 'material-ui/styles/colors';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
} from 'redux-form-material-ui';

const WizardFormFirstPage = (props) => {
  const { handleSubmit, pristine, submitting, reset } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="close-button">
        <IconButton type="button" disabled={submitting} onClick={reset}><FontIcon color={red500} className="material-icons" onClick={() => {hashHistory.push('/')}} >close</FontIcon></IconButton>
      </div>
      <div>
        <Field name="casename" component={TextField} floatingLabelText="Case" />

      </div>
      <div>
        <Field name="case_description" component={TextField} floatingLabelText="Case Description" multiLine rows={2} />
      </div>
      <div>
        <IconButton type="submit" className="next"><FontIcon className="material-icons" >arrow_forward</FontIcon></IconButton>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
})(WizardFormFirstPage);
