import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import ReactBootstrapSlider from 'react-bootstrap-slider';

const WizardFormThirdPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  debugger;
  return (

    <form onSubmit={handleSubmit}>
      <div>
        <Field name="alternativeName" type="text" component={renderField} label="Name:" />
        <Field name="alternativeValue" type="text" component={renderField} label="Cost:" />
      </div>

      <div>
        <Field name="appearance" type="text" component={renderField} label="Appearance:" />
      </div>

      <p><label>Slider</label></p>
      <ReactBootstrapSlider
        name="slidervalue"
        value={sliderDefault}
        slideStop={this.changeValue}
        ticks={[1, 2, 3, 4, 5]}
        step={1}
        max={5}
        min={1}
        orientation="horizontal"
        reverse={true} />

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
