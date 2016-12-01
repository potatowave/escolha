import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, FieldArray, getFormValues } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import AlternativesArray from './AlternativesArray';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import { Link, hashHistory } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { red500, yellow500, green500 } from 'material-ui/styles/colors';

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
  const { handleSubmit, pristine, previousPage, submitting, reset } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="close-button">
        <IconButton type="button" disabled={submitting} onClick={reset}><FontIcon color={red500} className="material-icons" onClick={() => {hashHistory.push('/')}} >close</FontIcon></IconButton>
      </div>

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
