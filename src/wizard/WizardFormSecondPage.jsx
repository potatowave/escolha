import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import ObjectivesArray from './ObjectivesArray';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const WizardFormSecondPage = (props) => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>

      <ObjectivesArray   / >

      <div>
        <hr />
        <button type="button" className="previous" onClick={previousPage}>Previous</button>
        <button type="submit" className="next">Next</button>
      </div>

    </form>

  );
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate,
})(WizardFormSecondPage);
