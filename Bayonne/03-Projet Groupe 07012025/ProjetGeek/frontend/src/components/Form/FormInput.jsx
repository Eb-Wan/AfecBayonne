import React from "react";

const FormInput = (props) => {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">
        <input
          className="input"
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.function(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default FormInput;
