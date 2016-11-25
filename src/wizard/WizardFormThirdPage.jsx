import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, FieldArray, getFormValues } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import AlternativesArray from './AlternativesArray'
import { connect } from 'react-redux';


  const renderError = ({ meta: { touched, error } }) => touched && error ?
    <span>{error}</span> : false;


  const WizardFormThirdPage = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props;

    return (
      <form onSubmit={handleSubmit}>

        <AlternativesArray / >

        <div>
          <hr></hr>
          <button type="button" className="previous" onClick={previousPage}>Previous</button>
          <button type="submit" disabled={pristine || submitting}>Escolha Me!</button>
        </div>

      </form>

    );
  };

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate,
})(WizardFormThirdPage);
