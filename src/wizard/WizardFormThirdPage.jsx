import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, FieldArray, getFormValues } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import AlternativesArray from './AlternativesArray';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;


const WizardFormThirdPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>

      <AlternativesArray / >

      <div>
        <hr />

          <RaisedButton label="previous" type="submit" onClick={previousPage} className="previous" />

          <RaisedButton label="Escolha Me!" type="submit" disabled={pristine || submitting} />


      </div>

    </form>

  );
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate,
})(WizardFormThirdPage);
