// import React from "react";
// import "./searchBarStyles.scss";
// import { FiSearch, FiX } from "react-icons/fi";

// const SearchBar = ({ value, onChange, placeholder = "Search", onClear, onEnter }) => {

//   const handleInput = (e) => {
//     const newValue = e.target.value;
//     onChange(newValue);          // update local state

//     // If user cleared text via backspace → call onClear
//     if (newValue === "") {
//       onClear?.();              // same as clicking X
//     }
//   };

//   return (
//     <div className="searchbar-wrapper">
//       <FiSearch className="search-icon" />

//       <input
//         type="text"
//         className="search-input"
//         placeholder={placeholder}
//         value={value}
//         onChange={handleInput}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             onEnter?.(value);  
//           }
//         }}
//       />

//       {value?.length > 0 && (
//         <FiX
//           className="clear-icon"
//           onClick={() => {
//             onClear?.();
//             onChange("");       
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default SearchBar;


import React from "react";
import "./searchBarStyles.scss";
import { FiSearch, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../store/alert/alertActions";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search",
  onClear,
  onEnter,
}) => {
  const dispatch = useDispatch();

  // Percent-escape (URL encode) helper
  const percentEncode = (text) => {
    return encodeURIComponent(text);
  };

  const handleInput = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (newValue === "") {
      onClear?.();
    }
  };

  const handleEnter = () => {
    if (value.trim().length < 4) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Warning",
          type: "Warning",
          msg: "Please enter at least 4 characters",
        })
      );
      return;
    }

    // Apply percent-escape encoding here
    const encodedValue = percentEncode(value.trim());

    onEnter?.(encodedValue);
  };

  return (
    <div className="searchbar-wrapper">
      <FiSearch className="search-icon" />

      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={decodeURIComponent(value)}
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEnter();
          }
        }}
      />

      {value?.length > 0 && (
        <FiX
          className="clear-icon"
          onClick={() => {
            onClear?.();
            onChange("");
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
