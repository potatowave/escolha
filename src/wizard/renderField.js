import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
);

const renderError = ({ meta: { touched, error } }) => touched && error ?
  <span>{error}</span> : false;

export default renderField;
