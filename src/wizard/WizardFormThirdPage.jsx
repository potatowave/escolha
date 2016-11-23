import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import AlternativesArray from './AlternativesArray'

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const WizardFormThirdPage = (props) => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>

        <AlternativesArray / >

      <div>
        <hr></hr>
        <button type="button" className="previous" onClick={previousPage}>Previous</button>
        <button type="submit" className="next">Next</button>
      </div>

    </form>

  );
};


export default reduxForm({
  form: 'wizard', // Form name is same
  destroyOnUnmount: false,
  validate,
})(WizardFormThirdPage);
