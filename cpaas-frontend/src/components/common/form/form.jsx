import React, { useState } from "react";
import "./formStyles.scss";
import InputControl from "../../controls/input/InputControl";
import SelectControl from "../../controls/select/SelectControl";
import TextareaControl from "../../controls/textarea/textareaControl";
import ButtonControl from "../../controls/button/ButtonControl";
import { IoIosArrowBack } from "react-icons/io";
import DateInput from "../../controls/date/DateInput";
import { validateField as validateFields } from "../../../helpers/validator";
import CheckboxControl from "../../controls/checkbox/CheckboxControl";
import BackNavigation from "../navigation/BackNavigation";

const Form = ({ title, fields, formData, onChange, onSubmit, styles }) => {
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = "";

    const errorResponse = validateFields(field, value, formData);

    if (!errorResponse.isValid) {
      error = `${errorResponse.message}`;
    }

    return error;
  };

  const validateAllFields = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];
      if (field.validate) {
        const err = validateField(field, value);
        if (err) newErrors[field.name] = err;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (name, value, field) => {
    onChange(name, value);

    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAllFields()) return;
    onSubmit();
  };

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <div className="form-header-wrapper">
          <BackNavigation />
        </div>
        <h2>{title}</h2>
      </div>

      <div className={`form-body ${styles}`}>
        <div className="form-grid">
          {fields.map((field, index) => {
            const fieldError = errors[field.name];

            if (
              field.type === "text" ||
              field.type === "number" ||
              field.type === "password"
            ) {
              return (
                <div key={index} className="form-item">
                  <label>{field.label}</label>
                  <InputControl
                    type={field.type}
                    styles={field.styles}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value, field)
                    }
                    error={fieldError}
                    disabled={field.disabled}
                    maxLength={field.maxLength} // ADD THIS
                    inputMode={field.inputMode} // ADD THIS
                  />
                </div>
              );
            }

            if (field.type === "date") {
              return (
                <div key={index} className="form-item">
                  <label>{field.label}</label>
                  <DateInput
                    value={formData[field.name] || ""}
                    onChange={(val) =>
                      handleFieldChange(field.name, val, field)
                    }
                    minDate={field.minDate}
                    maxDate={field.maxDate}
                    styles={field.styles}
                    error={fieldError}
                  />
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={index} className="form-item">
                  <label>{field.label}</label>
                  <SelectControl
                    styles={field.styles}
                    options={field.options}
                    value={formData[field.name] || null}
                    onChange={(val) =>
                      handleFieldChange(field.name, val, field)
                    }
                    isDisabled={field.isDisabled}
                    error={fieldError}
                  />
                </div>
              );
            }

            if (field.type === "checkbox-single") {
              return (
                <div key={index} className="form-item">
                  <CheckboxControl
                    label={field.label}
                    options={field.options}
                    value={formData[field.name]}
                    onChange={(val) =>
                      handleFieldChange(field.name, val, field)
                    }
                    disableAll={field.disableAll}
                    isDisabled={field.isDisabled}
                    error={fieldError}
                  />
                </div>
              );
            }

            if (field.type === "textarea") {
              return (
                <div key={index} className="form-item textarea-full">
                  <TextareaControl
                    label={field.label}
                    styles={field.styles}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value, field)
                    }
                    rows={field.rows || 5}
                    error={fieldError}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      <div className="form-submit">
        <ButtonControl
          text="Submit"
          styles={"submit-btn"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Form;
