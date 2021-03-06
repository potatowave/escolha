import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton } from 'material-ui/RadioButton';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import { red500, yellow500, green500 } from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};
import {
  AutoComplete,
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
} from 'redux-form-material-ui';

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
          <hr />
          <h4>Objective {index + 1}

            {index > 0 &&
            <IconButton><FontIcon className="material-icons" color={red500} style={iconStyles} onClick={() => fields.remove(index)} >remove_circle</FontIcon></IconButton>
            }</h4>

          <div>

            <Field
              name={`${objective}.name`}
              component={AutoComplete}
              floatingLabelText="Objective Type"
              openOnFocus
              filter={MUIAutoComplete.fuzzyFilter}
              dataSource={['Cost', 'Appearance']}
            />
          </div>
          <div>
            <Field
              name={`${objective}.sub_name`}
              component={AutoComplete}
              floatingLabelText="Sub Objective"
              openOnFocus
              filter={MUIAutoComplete.fuzzyFilter}
              dataSource={['Price', 'Color', 'Speed']}
            />

          </div>
          <div>
            <Field name={`${objective}.scale_type`} component={SelectField} floatingLabelText="Scale Type">
              <MenuItem value="natural" primaryText="Natural (Number)" />
              <MenuItem value="nominal" primaryText="Nominal (Non-Number)" />
              <MenuItem value="ordinal" primaryText="Ordinal (Range)" />
            </Field>
          </div>
          {objectives[index].scale_type === 'ordinal' &&
          <div>
            <div>
              <Field
                name={`${objective}.rangemin`}
                component={TextField}
                floatingLabelText={'Minimum'}
              />
            </div>
            <div>
              <Field
                name={`${objective}.rangemax`}
                component={TextField}
                floatingLabelText={'Maximum'}
              />
            </div>

          </div>}

          {objectives[index].scale_type === 'nominal' &&
          <div>

            <p>Sure, we will ask you about this on the next page.</p>

          </div>}
          {objectives[index].scale_type !== 'nominal' &&
          <div>
            <div>
              <Field name={`${objective}.unit_prefix`} component={TextField} floatingLabelText={'Prefix'} />
            </div>
            <div>
              <Field name={`${objective}.unit_suffix`} component={TextField} floatingLabelText={'Postfix'} />
            </div>
            <div>
              <div>

                <Field name="scale_type" component={renderError} />

              </div>
            </div>

            <Field name={`${objective}.low_is_better`} component={RadioButtonGroup}>
              <RadioButton value="true" label="Low is better" />
              <RadioButton value="false" label="High is better" />
            </Field>
          </div>}

          <RaisedButton
            label="add another"
            icon={<FontIcon className="material-icons" color={green500} style={iconStyles} >add_box</FontIcon>}
            fullWidth
            onClick={() => fields.push({})}
          />

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
