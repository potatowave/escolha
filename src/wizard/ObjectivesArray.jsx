import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton } from 'material-ui/RadioButton'
import {red500, yellow500, green500} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle
} from 'redux-form-material-ui'


const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const renderObjectives = ({ objectives, fields, meta: { touched, error } }) => {
  const values = {
    min: 2,
    max: 10,
  };

  function onChange(component, values) {
    console.log(values);
  }

  return (
    <div>
      {fields.map((objective, index) =>
        <div key={index}>
          <h4>Objective #{index + 1}

          {index > 0 &&
            <IconButton iconClassName="material-icons" style={iconStyles} onClick={() => fields.remove(index)} color={red500} >delete</IconButton>
          }</h4>

          <div>

            <Field name={`${objective}.name`} component={SelectField} hintText="Name" value={0} >
               <MenuItem value={"Cost"} primaryText="Cost" />
               <MenuItem value={"Appearance"} primaryText="Appearance" />
               <MenuItem value={"Speed"} primaryText="Speed" />
               <MenuItem value={"toggle"} primaryText="Custom" />
             </Field>
            {objectives[index].toggle === 'toggle' &&
              <Field name={`${objective}.name`} component={TextField} />
            }
           </div>
          <div>
            <Field name={`${objective}.sub`} component={TextField} hintText={`Sub objective #${index + 1}`} />
          </div>
          <div>
            <Field name={`${objective}.criterion`} component={TextField} hintText={`Evaluation Criterion #${index + 1}`} />
          </div>
          <div>
            <div>
              <Field name={`${objective}.scaletype`} component={SelectField} hintText="Scale Type">
                <MenuItem value="natural" primaryText="Natural (Number)"/>
                <MenuItem value="nominal" primaryText="Nominal (Non-Number)"/>
                <MenuItem value="ordinal" primaryText="Ordinal (Range)"/>
              </Field>

              {objectives[index].scaletype === 'ordinal' &&

              <div>
                <Field
                  name={`${objective}.rangemin`}
                  component={TextField}
                  label={'Min'}
                />
                <Field
                  name={`${objective}.rangemax`}
                  component={TextField}
                  label={'Max'}
                />
              </div>}

              {objectives[index].scaletype === 'nominal' &&
              <div>
              Sure, we will ask you about this on the next page.

            </div>}
              <Field name="scale_type" component={renderError} />

            </div>
          </div>

        <Field name="low_is_better" component={RadioButtonGroup}>
          <RadioButton value="true" label="Low"/>
          <RadioButton value="false" label="High"/>
        </Field>

          <hr />

          <IconButton iconClassName="material-icons" style={iconStyles} onClick={() => fields.push({})} color={green500} >add circle outline</IconButton>

        </div>
    )}
    </div>
  ); };


const ObjectivesArray = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="objectives" component={renderObjectives} objectives={props.objectives} />
    </form>
  );
};

function mapStateToProps(state) {
  return {
    objectives: state.form.wizard.values.objectives,
  };
}


export const ObjectivesForm = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate,
})(ObjectivesArray);

export default connect(mapStateToProps)(ObjectivesForm);
