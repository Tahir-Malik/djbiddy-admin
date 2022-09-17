import React, { useRef, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


const InputDate = (props) => {
    const { className, placeholder, handleChange, value, name, minDate, maxDate } = props;
    const refContainer = useRef(null);
    const openDatepicker = () => {
        refContainer.current.setOpen(true)
    };
    return (
        <div className="date-picker">
            <div className="input-group mr-3">
                <div className="input-group-prepend datepicker-trigger" onClick={openDatepicker}>
                    <div className="input-group-text">
                        <i className="fa fa-calendar-alt" />
                    </div>
                </div>
                <DatePicker
                    className={className}
                    selected={value}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => handleChange(name, date)}
                    placeholder={placeholder}
                    ref={refContainer}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </div>
        </div>
    );
};

export default InputDate;