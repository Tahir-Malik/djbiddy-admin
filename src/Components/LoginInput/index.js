import React from "react";

const Input = props => {
    const { 
        labelFor, 
        id, 
        label, 
        placeholder, 
        type, 
        onChange, 
        name, 
        value, 
        disabled, 
        required, 
        errmsg, 
        errStatus, 
        maxLength,
        containerClass 
    } = props;

    return (
        <div className={`input-container ${containerClass}`}>
            <label className="label" htmlFor={labelFor}>
                {label}
            </label>
            <div className="input-group form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                </div>
                <input 
                    type={type} 
                    className="form-control" 
                    placeholder={placeholder}
                    id={id}
                    maxLength={maxLength}
                    onChange={onChange}
                    name={name}
                    value={value}
                    disabled={disabled}
                    required={required} />

            </div>
            {errStatus ?
                <div style={{ color: 'red' }}>
                    {errmsg}
                </div>
                : null
            }
        </div>
    );
};

Input.defaultProps = {
    labelFor: "",
    label: "",
    placeholder: "",
    type: "text",
    onChange: () => { },
    name: "",
    value: "",
    disabled: false,
    containerClass: ""
};

export default Input;
