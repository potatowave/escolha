import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate';
import renderField from './renderField';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const renderAlternatives = ({ props, fields, meta: { touched, error } }) => (

  <div>
  <button type="button" onClick={() => fields.push({})}>Add Alternative</button>
    {fields.map((alternative, index) =>
      <div key={index}>

      <h4>Alternative #{index + 1}</h4>

      <div>
        <Field name={`${alternative}.name`} type="text" component={renderField} label="Name:" />
        <Field name={`${alternative}.value`} type="text" component={renderField} label="Cost:" />
      </div>

      <div>
        <Field name={`${alternative}.appearance`} type="text" component={renderField} label="Appearance:" />
      </div>

        <hr></hr>
        <button type="button" title="Remove Alternative" onClick={() => fields.remove(index)} >Remove Alternative</button>
        <button type="button" onClick={() => fields.push({})}>Add Alternative</button>
      </div>
    )}
  </div>
)


const AlternativesArray = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="alternatives" component={renderAlternatives}/>
    </form>
  )
}


export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate
})(AlternativesArray)