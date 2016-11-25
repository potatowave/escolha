import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import { connect } from 'react-redux';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const WizardFormFirstPage = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="caseName" type="text" component={renderField} label="Case" />
      <Field name="caseDescription" type="text" component="textarea" label="Case Description" />
      <div>
        <button type="submit" className="next">Next</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
})(WizardFormFirstPage);
