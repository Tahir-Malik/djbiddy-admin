import React from "react";
import Select, { components } from 'react-select';
const Option = props => {
    return (
        <div> <components.Option {...props}>
            <label className="custm-checkbox">{props.label}
                <input type="checkbox" className="checkmark" checked={props.isSelected} onChange={() => null} />
                <span className="checkmark"></span>
            </label>
        </components.Option>
        </div>);
};

export default Option;