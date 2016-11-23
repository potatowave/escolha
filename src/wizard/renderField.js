import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>

    <label>{label}</label>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
);

export default renderField;
