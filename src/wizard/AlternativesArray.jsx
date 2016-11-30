import React from 'react';
import { Field, FieldArray, reduxForm, getFormValues, formValueSelector } from 'redux-form';
import validate from './validate';
import store from '../index.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton } from 'material-ui/RadioButton'
import { red500, yellow500, green500 } from 'material-ui/styles/colors';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Slider,
  Toggle
} from 'redux-form-material-ui'

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

const iconStyles = {
  marginRight: 24,
};

const deleteStyles = {
  marginRight: 24,
  color: red500
};

const renderAlternatives = ({ alternatives, objectives, fields, meta: { touched, error } }) =>
   (

     <div>
       {fields.map((alternative, index) =>
         <div key={index}>

           <h4>Option {index + 1} {(!!alternatives[index].name ? ' - ' + alternatives[index].name : '')}{index > 0 &&
            <IconButton><FontIcon className="material-icons" color={red500} style={iconStyles} onClick={() => fields.remove(index)} >remove_circle</FontIcon></IconButton>

          }</h4>

           <div>
             <Field name={`${alternative}.name`} component={TextField} floatingLabelText="Option Name " />
           </div>

           <div>
             <Field name={`${alternative}.image_url`} component={TextField} floatingLabelText="URL" />
           </div>

           {objectives.map((objective, i) =>
               (
                 <div>

                   {(objectives[i].scale_type === 'natural') &&
                   <div>
                     <Field
                       name={`values.${i}.${index}.value`}
                       component={TextField}
                       floatingLabelText={(!!alternatives[index].name ? `${objective.name} > ${objective.sub_name}` : `${objective.name} : ${objective.sub_name}`)}
                     />
                   </div>}

                   {objectives[i].scale_type === 'nominal' &&
                   <div>
                     <Field
                       name={`values.${i}.${index}.nominal_name`}
                       component={TextField}
                       floatingLabelText={(`${objective.name} > ${objective.sub_name} `)}
                     />

                     {!!alternatives[index].name &&
                     <div>
                       <Field defaultValue={3} description="How important is this to you?" component={Slider} name={`values.${i}.${index}.value`} step={1} min={1} max={5} />
                    </div>}
                   </div>

                  }

                   {objectives[i].scale_type === 'ordinal' &&
                   <div>
                     <Field
                       name={`values.${i}.${index}.value`}
                       type="text"
                       component={TextField}
                       floatingLabelText={`${objectives[i].name} value between ${objectives[i].rangemin} and ${objectives[i].rangemax}`}
                     />
                   </div>}

                 </div>
                )
            )}
          <RaisedButton
            label="add another"
            icon={<FontIcon className="material-icons" color={green500} style={iconStyles} >add_box</FontIcon>}
            fullWidth={true}
            onClick={() => fields.push({})}
          />

         </div>
    )}
     </div>
);

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
  };
}

export const AlternativesForm = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  validate,
})(AlternativesArray);

export default connect(mapStateToProps)(AlternativesForm);
