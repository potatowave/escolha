import React from 'react';
import { Field, FieldArray, reduxForm, getFormValues, formValueSelector } from 'redux-form';
import validate from './validate';
import store from '../index.jsx';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton } from 'material-ui/RadioButton'
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

const renderAlternatives = ({ alternatives, objectives, fields, meta: { touched, error } }) =>
   (

     <div>
       {fields.map((alternative, index) =>
         <div key={index}>

           <h4>Option #{index + 1} {(!!alternatives[index].name ? ' - ' + alternatives[index].name : '')}{index > 0 &&
            <IconButton iconClassName="material-icons" style={iconStyles} onClick={() => fields.remove(index)} >delete</IconButton>
          }</h4>

           <div>
             <Field name={`${alternative}.name`} component={TextField} hintText="Option Name" />
           </div>
           {objectives.map((objective, i) =>
               (
                 <div>

                   {(objectives[i].scaletype === 'natural') &&
                   <div>
                     <Field
                       name={`${alternative}.naturalValue`}
                       component={TextField}
                       hintText={(!!alternatives[index].name ? `${objective.name} : ${objective.sub} ${objective.criterion}` : `${objective.name} : ${objective.sub} ${objective.criterion}`)}
                     />
                   </div>}

                   {objectives[i].scaletype === 'nominal' &&
                   <div>
                     <Field
                       name={`${alternative}.nominalName`}
                       component={TextField}
                       hintText={(`${objective.name} > ${objective.sub} `)}
                     />

                       <Field defaultValue={3} description="How important is this to you?" component={Slider} name={`${alternative}.nominalValue`} step={1} min={1} max={5} />
                       <div>Value: {alternatives[index].nominalValue}</div>

                     <hr />
                   </div>
                    }

                   {objectives[i].scaletype === 'ordinal' &&
                   <div>
                     <Field
                       name={`${alternative}.ordinalValue`}
                       type="text"
                       component={TextField}
                       hintText={(!!alternatives[index].name ? `${objective.name} : ${objective.sub} ${objective.criterion}` : `Alternative #${index + 1} : ${objective.name} : ${objective.sub} ${objective.criterion ? objective.criterion : ''}`)}
                     />
                   </div>}

                 </div>
                )
            )}
            <IconButton iconClassName="material-icons" style={iconStyles} onClick={() => fields.push({})} >add circle outline</IconButton>
           <hr />

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
