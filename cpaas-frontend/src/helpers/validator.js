export const validateField = (fieldObj, value, formData = {}) => {

console.log("validation field obj",fieldObj,"value ",value,"formdata",formData)

  const field = fieldObj.name;
  const label = fieldObj.label || field;

  if (value === "" || value === null || value === undefined) {
    return { field, isValid: false, message: `${label} can't be empty` };
  }


 const parseYYYYMMDD = (str) => {
  if (!str) return null;
  const [yyyy, mm, dd] = str.split("-");
  const date = new Date(parseInt(yyyy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10));
  return isNaN(date.getTime()) ? null : date;
};




  switch (field) {
    case "name":
    case "username":
     if (value.trim().length < 4) {
    return {
      field,
      isValid: false,
      message: `${label} must be at least 4 characters`,
    };
  }
      break;

      case "contactNo":
  const contactRe = /^[0-9]{10}$/;
  if (!contactRe.test(value)) {
    return {
      field,
      isValid: false,
      message: "Please enter a valid contact number",
    };
  }
  break;


    case "email":
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(value)) {
        return {
          field,
          isValid: false,
          message: "Enter a valid email address",
        };
      }
      break;
case "phone":
  const phoneRe = /^[0-9]{10}$/;

  if (!phoneRe.test(value)) {
    return {
      field,
      isValid: false,
      message: "Please enter valid contact number",
    };
  }
  break;

  case "squadNo":
  const squadRe = /^[0-9]+$/;

  if (!squadRe.test(value)) {
    return {
      field,
      isValid: false,
      message: `${label} must contain only digits`,
    };
  }
  break;


    case "password":
      if (value.length < 6) {
        return {
          field,
          isValid: false,
          message: "Password must be at least 6 characters",
        };
      }
      break;

      case "confirmPassword":
  if (formData.password && value !== formData.password) {
    return {
      field,
      isValid: false,
      message: "Passwords do not match",
    };
  }
  break;


case "role":
case "trade":
  if (!value) {
    return { field, isValid: false, message: `${label} can't be empty` };
  }
  break;


  case "armyNo":
  if (value.trim().length < 4) {
    return {
      field,
      isValid: false,
      message: `${label} must be at least 4 characters`,
    };
  }
  break;



   
//       case "startDate":
// case "endDate":
//   const dateObj = parseDDMMYYYY(value);

//   if (!dateObj) {
//     return { field, isValid: false, message: "Invalid date format" };
//   }

//   // START DATE > END DATE
//   if (field === "startDate" && formData.endDate) {
//     const endDateObj = parseDDMMYYYY(formData.endDate);
//     if (endDateObj && dateObj > endDateObj) {
//       return {
//         field,
//         isValid: false,
//         message: "Start date cannot be after end date",
//       };
//     }
//   }

//   // END DATE < START DATE
//   if (field === "endDate" && formData.startDate) {
//     const startDateObj = parseDDMMYYYY(formData.startDate);
//     if (startDateObj && dateObj < startDateObj) {
//       return {
//         field,
//         isValid: false,
//         message: "End date cannot be before start date",
//       };
//     }
//   }
//   break;




case "startDate":
case "endDate":
  const dateObj = parseYYYYMMDD(value);

  if (!dateObj) {
    return { field, isValid: false, message: "Invalid date format" };
  }

  if (field === "startDate" && formData.endDate) {
    const endDateObj = parseYYYYMMDD(formData.endDate);
    if (endDateObj && dateObj > endDateObj) {
      return {
        field,
        isValid: false,
        message: "Start date cannot be after end date",
      };
    }
  }

  if (field === "endDate" && formData.startDate) {
    const startDateObj = parseYYYYMMDD(formData.startDate);
    if (startDateObj && dateObj < startDateObj) {
      return {
        field,
        isValid: false,
        message: "End date cannot be before start date",
      };
    }
  }
  break;

    default:
      break;
  }

  return { field, isValid: true, message: null };
};
export const validateAll = (formData, extra = {}) => {
  const errors = {};

  Object.keys(formData).forEach((key) => {
    const { field, isValid, message } = validateField(
      { name: key, label: key },
      formData[key]
    );
    if (!isValid) errors[field] = message;
  });

  if (
    formData.confirmPassword !== undefined &&
    formData.password !== undefined
  ) {
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  if (formData.startDate && formData.endDate) {
    const s = new Date(formData.startDate);
    const e = new Date(formData.endDate);

    if (s > e) {
      errors.endDate = "End date must be after start date";
    }
  }

  return errors;
};
