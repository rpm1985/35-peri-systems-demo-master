/* 
  Shoutout to https://gist.github.com/baumandm/8665a34bc418574737847f7394f98bd9
  for the TSX version
*/

import React from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

const DatePicker = ({
    selectedDate,
    onChange,
    isClearable = false,
    showPopperArrow = false,
    ...props
}) => {
    return (
        <ReactDatePicker
            selected={selectedDate}
            onChange={onChange}
            isClearable={isClearable}
            showPopperArrow={showPopperArrow}
            {...props}
        />
    );
};

export default DatePicker;
