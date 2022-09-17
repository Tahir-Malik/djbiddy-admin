import React from "react";

const Button = props => {
    const { name, strongName, className, onClick,id } = props;
    return (
        <button className={`altTagBtn  ${className}`} onClick={onClick} id={id}>
            {name} <b>{strongName}</b>
        </button>
    );
};

Button.defaultProps = {
    name: '',
    strongName: '',
    className: '',
    onClick: () => {},
};

export default Button;
