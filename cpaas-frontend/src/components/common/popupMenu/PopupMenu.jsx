// // import React, { useState, useRef, useEffect } from "react";
// // import { HiOutlineDotsVertical } from "react-icons/hi";
// // import { Link } from "react-router-dom";
// // import "./popupMenuStyles.scss";

// // const PopupMenu = ({ options = [] }) => {
// //   const [open, setOpen] = useState(false);
// //   const menuRef = useRef(null);

// //   const toggleMenu = (e) => {
// //     e.stopPropagation();
// //     setOpen((prev) => !prev);
// //   };

// //   const handleClickOutside = (e) => {
// //     if (menuRef.current && !menuRef.current.contains(e.target)) {
// //       setOpen(false);
// //     }
// //   };

// //   useEffect(() => {
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <div className="popup-menu-wrapper" ref={menuRef}>
// //       <HiOutlineDotsVertical
// //         size={20}
// //         className="popup-trigger"
// //         onClick={toggleMenu}
// //       />

// //       {open && (
// //         <div className="popup-menu">
// //           {options.map((item, idx) => (
// //             <Link
// //               key={idx}
// //               to={item.path}              
// //               className="popup-menu-item"
// //               onClick={() => setOpen(false)} 
// //             >
// //               <span className="popup-icon">{item.icon}</span>
// //               <span className="popup-label">{item.label}</span>
// //             </Link>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PopupMenu;


// import React, { useState, useRef, useEffect } from "react";
// import { createPortal } from "react-dom";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import { Link } from "react-router-dom";
// import "./popupMenuStyles.scss";

// const PopupMenu = ({ options = [] }) => {
//   const [open, setOpen] = useState(false);
//   const [position, setPosition] = useState({ top: 0, left: 0 });
//   const triggerRef = useRef(null);
//   const menuRef = useRef(null);

//   const toggleMenu = (e) => {
//     e.stopPropagation();
//     const rect = triggerRef.current.getBoundingClientRect();
//     setPosition({ top: rect.bottom + 4, left: rect.right - 250 }); // adjust for menu width
//     setOpen((prev) => !prev);
//   };

//   const handleClickOutside = (e) => {
//     if (
//       menuRef.current &&
//       !menuRef.current.contains(e.target) &&
//       !triggerRef.current.contains(e.target)
//     ) {
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const menu = (
//     <div
//       ref={menuRef}
//       className="popup-menu popup-menu-portal"
//       style={{
//         top: `${position.top}px`,
//         left: `${position.left}px`,
//         position: "absolute",
//       }}
//     >
//       {options.map((item, idx) => (
//         <Link
//           key={idx}
//           to={item.path || "#"}
//           className="popup-menu-item"
//           onClick={() => setOpen(false)}
//         >
//           <span className="popup-icon">{item.icon}</span>
//           <span className="popup-label">{item.label}</span>
//         </Link>
//       ))}
//     </div>
//   );

//   return (
//     <div className="popup-menu-wrapper">
//       <HiOutlineDotsVertical
//         size={20}
//         className="popup-trigger"
//         ref={triggerRef}
//         onClick={toggleMenu}
//       />
//       {open && createPortal(menu, document.body)}
//     </div>
//   );
// };

// export default PopupMenu;

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./popupMenuStyles.scss";

const PopupMenu = ({ options = [] }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 4, left: rect.right - 250 });
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !triggerRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (item, e) => {
    e.stopPropagation();
    setOpen(false);
    if (item.action) {
      item.action();
    }
  };

  const menu = (
    <div
      ref={menuRef}
      className="popup-menu popup-menu-portal"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: "absolute",
      }}
    >
      {options.map((item, idx) =>
        item.path ? (
          <Link
            key={idx}
            to={item.path}
            className="popup-menu-item"
            onClick={() => setOpen(false)}
          >
            <span className="popup-icon">{item.icon}</span>
            <span className="popup-label">{item.label}</span>
          </Link>
        ) : (
          <div
            key={idx}
            className="popup-menu-item"
            onClick={(e) => handleOptionClick(item, e)}
          >
            <span className="popup-icon">{item.icon}</span>
            <span className="popup-label">{item.label}</span>
          </div>
        )
      )}
    </div>
  );

  return (
    <div className="popup-menu-wrapper">
      <HiOutlineDotsVertical
        size={20}
        className="popup-trigger"
        ref={triggerRef}
        onClick={toggleMenu}
      />
      {open && createPortal(menu, document.body)}
    </div>
  );
};

export default PopupMenu;
