import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate';
import renderField from './renderField';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const renderObjectives = ({ objectives, fields, meta: { touched, error } }) => {

  const values = {
  min: 2,
  max: 10
};

function onChange(component, values) {
  console.log(values);
}

  return (
  <div>
    {fields.map((objective, index) =>
      <div key={index}>
      {}
      <h4>Objective #{index + 1}</h4>

      <Field name={`${objective}.name`} type="text" component={renderField} label={`Objective #${index + 1}`} / >
      <Field name={`${objective}.sub`} type="text" component={renderField} label={`Sub objective #${index + 1}`} />
      <Field name={`${objective}.criterion`} type="text" component={renderField} label={`Evaluation Criterion #${index + 1}`} />

      <div>
        <label>Scale Type</label>
        <div>
          <Field name={`${objective}.scaletype`} component="select">
            <option value="natural">Natural (Number)</option>
            <option value="nominal">Nominal (Non-Number)</option>
            <option value="ordinal">Ordinal (Range)</option>
          </Field>

          {objectives[index].scaletype === "ordinal" &&

            <div>
              <Field
                name={`${objective}.rangemin`}
                type="text"
                component={renderField}
                label={`Min`} / >
              <Field
                name={`${objective}.rangemax`}
                type="text"
                component={renderField}
                label={`Max`} / >
            </div>}

          {objectives[index].scaletype === "nominal" &&
            <div>
              Sure, we will ask you about this on the next page.

            </div>}




          <Field name="scale_type" component={renderError} />

        </div>
      </div>

        <label>Target (most desirable)</label>
        <div>
          <label><Field name={`${objective}.low_is_better`} component="input" type="radio" value="true" /> Low</label>
          <label><Field name={`${objective}.low_is_better`} component="input" type="radio" value="false" /> High</label>
          <Field name="low_is_better" component={renderError} />
        </div>
        <hr></hr>
        {index > 0 &&
          <button type="button" title="Remove Objective" onClick={() => fields.remove(index)} >Remove Objective</button>
        }
        <button type="button" onClick={() => fields.push({})}>Add Objective</button>
      </div>
    )}
  </div>
)};


const ObjectivesArray = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="objectives" component={renderObjectives} objectives={props.objectives}/>
    </form>
  )
}

function mapStateToProps(state) {
  return {
    objectives: state.form.wizard.values.objectives,
  }
}


export const ObjectivesForm = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate,
})(ObjectivesArray);

export default connect(mapStateToProps)(ObjectivesForm);
