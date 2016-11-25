import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate';
import renderField from './renderField';
import { connect } from 'react-redux';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const renderObjectives = ({ objectives, fields, meta: { touched, error } }) => {
  return (
  <div>
    {fields.map((objective, index) =>
      <div key={index}>

      <h4>Objective #{index + 1}</h4>

      <Field name={`${objective}.name`} type="text" component={renderField} label={`Objective #${index + 1}`} / >
      <Field name={`${objective}.sub`} type="text" component={renderField} label={`Sub objective #${index + 1}`} />
      <Field name={`${objective}.criterion`} type="text" component={renderField} label={`Evaluation Criterion #${index + 1}`} />

      <div>
        <label>Scale Type</label>
        <div>
          <Field name={`${objective}.scaletype`} component="select">
            <option value="natural">Natural</option>
            <option value="nominal">Nominal</option>
            <option value="ordinal">Ordinal</option>
          </Field>

          {objectives[index].scaletype === "nominal" && <div>SCALE</div>}
          {objectives[index].scaletype === "ordinal" && <div>style score</div>}


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
        <button type="button" title="Remove Objective" onClick={() => fields.remove(index)} >Remove Objective</button>
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
