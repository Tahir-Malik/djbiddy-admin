import React from "react";

const Input = props => {
    const { labelFor, id, label, placeholder, type, onChange, name, value, disabled, required, errmsg, errStatus, maxLength } = props;

    return (
        <div className="inputGroup">
            <label className="inputLabel" htmlFor={labelFor}>
                {label}
            </label>
            <input type={type}
                placeholder={placeholder}
                id={id}
                maxLength={maxLength}
                onChange={onChange}
                name={name}
                value={value}
                disabled={disabled}
                required={required}
            />
            {errStatus ?
                <p style={{ color: 'red' }}>
                    {errmsg}
                </p>
                : null}

        </div>
    );
};

Input.defaultProps = {
    labelFor: "",
    label: "Label",
    placeholder: "",
    type: "text",
    onChange: () => { },
    name: "",
    value: "",
    disabled: false,
};

export default Input;
