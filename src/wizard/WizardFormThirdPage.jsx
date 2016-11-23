import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import ReactBootstrapSlider from 'react-bootstrap-slider';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const WizardFormThirdPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="alternativeName" type="text" component={renderField} label="Name:" />
        <Field name="alternativeValue" type="text" component={renderField} label="Cost:" />
      </div>

      <div>
        <Field name="appearance" type="text" component={renderField} label="Appearance:" />
      </div>

      <div>
        <button type="button" className="previous" onClick={previousPage}>Previous</button>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>

    </form>
  );
};
export default reduxForm({
  form: 'wizard', // Form name is same
  destroyOnUnmount: false,
  validate,
})(WizardFormThirdPage);
