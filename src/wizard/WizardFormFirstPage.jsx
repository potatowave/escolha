import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './validate';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui'

const forwardStyles = {
  marginRight: 24,
  float: 'right',
};

const backStyles = {
  marginRight: '80%',

};

const WizardFormFirstPage = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="case.name" component={TextField} hintText="Case"/>

      </div>
      <div>
        <Field name="case.description" component={TextField} hintText="Case Description" multiLine={true} rows={2}/>
      </div>
      <div>
        <IconButton type="submit" className="next"><FontIcon className="material-icons" style={forwardStyles} >arrow_forward</FontIcon></IconButton>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
})(WizardFormFirstPage);
