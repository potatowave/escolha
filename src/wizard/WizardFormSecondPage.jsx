import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const WizardFormSecondPage = (props) => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="objective" type="text" component={renderField} label="Objective #:" />
      <Field name="subobjective" type="text" component={renderField} label="Sub-objective #:" />
      <Field name="criterion" type="text" component={renderField} label="Evaluation Criterion:" />

      <div>
        <label>Scale Type</label>
        <div>
          <label><Field name="scale_type" component="input" type="radio" value="numeric" /> Numeric</label>
          <label><Field name="scale_type" component="input" type="radio" value="ordinal" /> Ordinal</label>
          <label><Field name="scale_type" component="input" type="radio" value="nominal" /> Nominal</label>
          <Field name="scale_type" component={renderError} />
        </div>
      </div>


      <div>
        <label>Target (most desirable)</label>
        <div>
          <label><Field name="low_is_better" component="input" type="radio" value="true" /> Low</label>
          <label><Field name="low_is_better" component="input" type="radio" value="false" /> High</label>
          <Field name="low_is_better" component={renderError} />
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>Previous</button>
        <button type="submit" className="next">Next</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'wizard',  // Form name is same
  destroyOnUnmount: false,
  validate,
})(WizardFormSecondPage);
