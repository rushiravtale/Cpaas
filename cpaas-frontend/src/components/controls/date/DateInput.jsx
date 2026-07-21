import React, { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.scss";

import calendarIcon from "../../../../public/assets/icons/callender.svg";

// pad single digit numbers
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

// Parse incoming value "YYYY-MM-DD" into Date object
const parseValueToDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;

  // Expected "YYYY-MM-DD"
  const parts = value.split("-");
  if (parts.length !== 3) return null;
  const [yyyy, mm, dd] = parts;
  const day = parseInt(dd, 10);
  const month = parseInt(mm, 10) - 1;
  const year = parseInt(yyyy, 10);
  const d = new Date(year, month, day);
  if (
    d &&
    d.getDate() === day &&
    d.getMonth() === month &&
    d.getFullYear() === year
  ) {
    return d;
  }
  return null;
};

const DateInput = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder,
  styles,
  error,
}) => {
  const selectedDate = useMemo(() => parseValueToDate(value), [value]);

  const handleChange = (date) => {
    if (!date) {
      onChange && onChange("");
      return;
    }
    // Convert back to "YYYY-MM-DD" when saving
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const formatted = `${yyyy}-${mm}-${dd}`;
    onChange && onChange(formatted);
  };

  return (
    <div className={`date-input-wrapper ${styles || ""}`}>
      <div className="input-with-icon">
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="dd-MM-yyyy" // display format
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={placeholder || "DD-MM-YYYY"}
          className="date-input"
          showPopperArrow={false}
        />
        <img src={calendarIcon} alt="calendar" className="calendar-icon" />
      </div>
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default DateInput;
