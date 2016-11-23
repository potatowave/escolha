import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate';
import renderField from './renderField';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const renderObjectives = ({ props, fields, meta: { touched, error } }) => (

  <div>
    <button type="button" onClick={() => fields.push({})}>Add Objective</button>
    {fields.map((objective, index) =>
      <div key={index}>

      <h4>Objective #{index + 1}</h4>

      <Field name={`${objective}.name`} type="text" component={renderField} label={`Objective #${index + 1}`} / >
      <Field name={`${objective}.sub`} type="text" component={renderField} label={`Sub objective #${index + 1}`} />
      <Field name={`${objective}.criterion`} type="text" component={renderField} label={`Evaluation Criterion #${index + 1}`} />

      <div>
        <label>Scale Type</label>
        <div>
          <label><Field name={`${objective}.scaletype`} component="input" type="radio" value="numeric" /> Numeric</label>
          <label><Field name={`${objective}.scaletype`} component="input" type="radio" value="ordinal" /> Ordinal</label>
          <label><Field name={`${objective}.scaletype`} component="input" type="radio" value="nominal" /> Nominal</label>
          <Field name="scale_type" component={renderError} />
        </div>
      </div>


        <label>Target (most desirable)</label>
        <div>
          <label><Field name={`${objective}.low_is_better`} component="input" type="radio" value="true" /> Low</label>
          <label><Field name={`${objective}.low_is_better`} component="input" type="radio" value="false" /> High</label>
          <Field name="low_is_better" component={renderError} />
        </div>

        <button type="button" title="Remove Objective" onClick={() => fields.remove(index)} >Remove Objective</button>
        <button type="button" onClick={() => fields.push({})}>Add Objective</button>
      </div>
    )}
  </div>
)


const FieldArraysForm = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="members" component={renderObjectives}/>
    </form>
  )
}


export default reduxForm({
  form: 'wizard',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(FieldArraysForm)