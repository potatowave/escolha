import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, FieldArray, getFormValues } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import AlternativesArray from './AlternativesArray';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const forwardStyles = {
  marginRight: 24,
  float: 'right',
};

const backStyles = {
  marginRight: '80%',

};

const WizardFormThirdPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>

      <AlternativesArray / >

      <div>

        <div>
          <IconButton type="submit" onClick={previousPage} className="previous"><FontIcon className="material-icons" style={backStyles} >arrow_back</FontIcon></IconButton>
          <IconButton type="submit" disabled={pristine || submitting}><FontIcon className="material-icons" style={forwardStyles} >save</FontIcon></IconButton>
        </div>

      </div>

    </form>

  );
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate,
})(WizardFormThirdPage);
