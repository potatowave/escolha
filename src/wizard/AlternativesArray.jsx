import React from 'react';
import { Field, FieldArray, reduxForm, getFormValues, formValueSelector } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import store from '../index.jsx';
import { connect } from 'react-redux';

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const renderAlternatives = ({ alternatives, objectives, fields, meta: { touched, error } }) => {
  return (

  <div>
    {fields.map((alternative, index) =>
      <div key={index}>

        <h4>Alternative #{index + 1} - {(!!alternatives[index].name ? alternatives[index].name : "")}</h4>

        <div>
          <Field name={`${alternative}.name`} type="text" component={renderField} label="Name:" />
        </div>

            {objectives.map(function(objective, i) {

                return (

                  <div>


                    {(objectives[i].scaletype === "natural") &&
                      <div>
                          <Field
                          name={`${alternative}.naturalValue`}
                          type="text"
                          component={renderField}
                          label={(!!alternatives[index].name ? alternatives[index].name + ' : ' + objective.name + ' : ' + objective.sub + ' ' + objective.criterion : "Alternative #" + (index + 1) + ' : ' + objective.name + ' : ' + objective.sub + ' ' + objective.criterion)} />
                      </div>}

                    {objectives[i].scaletype === "nominal" &&
                      <div>
                        <hr />
                        <Field
                        name={`${objective}.nominalName`}
                        type="text"
                        component={renderField}
                        label={( objective.name + ' > ' + objective.sub + ' ' )} />
                        <Field name={`${objective}.nominalValue`} component="select">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Field>
                        <hr />
                      </div>
                    }

                    {objectives[i].scaletype === "ordinal" &&
                      <div>
                          <Field
                          name={`${alternative}.ordinalValue`}
                          type="text"
                          component={renderField}
                          label={(!!alternatives[index].name ? alternatives[index].name + ' : ' + objective.name + ' : ' + objective.sub + ' ' + objective.criterion : "Alternative #" + (index + 1) + ' : ' + objective.name + ' : ' + objective.sub + ' ' + (objective.criterion ? objective.criterion : ''))} />
                      </div>}

                  </div>
                );
            })}

        <hr />
        {index > 0 &&
          <button type="button" title="Remove Alternative" onClick={() => fields.remove(index)} >Remove Alternative</button>
        }
        <button type="button" onClick={() => fields.push({})}>Add Alternative</button>
      </div>
    )}
  </div>
)};

const AlternativesArray = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="alternatives" component={renderAlternatives} objectives={props.objectives} alternatives={props.alternatives} />
    </form>
  );
};

function mapStateToProps(state) {
  return {
    objectives: state.form.wizard.values.objectives,
    alternatives: state.form.wizard.values.alternatives,
  }
}

export const AlternativesForm = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate,
})(AlternativesArray);

export default connect(mapStateToProps)(AlternativesForm);
