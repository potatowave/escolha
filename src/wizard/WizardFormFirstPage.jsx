import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './validate';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui'

const WizardFormFirstPage = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="caseName" component={TextField} hintText="Case"/>

      </div>
      <div>
        <Field name="caseDescription" component={TextField} hintText="Case Description" multiLine={true} rows={2}/>
      </div>
      <div>
        <RaisedButton label="Next" type="submit" className="next" />
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
})(WizardFormFirstPage);
