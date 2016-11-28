import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './validate';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import renderField from './renderField';
import ObjectivesArray from './ObjectivesArray';
import MenuItem from 'material-ui/MenuItem'

import { red500, yellow500, green500 } from 'material-ui/styles/colors';
import { RadioButton } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui'

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const iconStyles = {
  marginRight: 24,
};

const forwardStyles = {
  marginRight: 24,
  float: 'right',
};

const backStyles = {
  marginRight: '80%',

};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}/>
);

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup {...input} {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}/>
);

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}/>
)

const WizardFormSecondPage = (props) => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <ObjectivesArray / >

      <div>
        <IconButton type="submit" onClick={previousPage} className="previous"><FontIcon className="material-icons" style={backStyles} >arrow_back</FontIcon></IconButton>
        <IconButton type="submit" className="next"><FontIcon className="material-icons" style={forwardStyles} >arrow_forward</FontIcon></IconButton>
      </div>


    </form>
  );
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate,
})(WizardFormSecondPage);
