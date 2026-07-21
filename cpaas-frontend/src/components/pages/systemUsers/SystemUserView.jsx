// // SystemUserView.jsx
// import React from "react";
// import CustomDataTable from "../../common/dataTable/dataTable";
// import PopupMenu from "../../common/popupMenu/PopupMenu";
// import ButtonControl from "../../controls/button/ButtonControl";
// import "./systemUserStyles.scss";

// import EditIcon from "/assets/svg/edit.svg";
// import DeleteIcon from "/assets/svg/delete.svg";
// import AddIcon from "/assets/svg/AddIcon.svg";

// const SystemUserView = ({
//   users,
//   pagination,
//   onPageChange,
//   onRowsPerPageChange,
//   onDeleteUser,
// }) => {
//   const columns = [
//     { name: "Name", selector: (row) => row.name, sortable: false },
//     { name: "Username", selector: (row) => row.username, sortable: false },
//     { name: "Role", selector: (row) => row.role, sortable: false },
//     { name: "Trade", selector: (row) => row.trade, sortable: false },
//     {
//       name: "Actions",
//       width: "80px",
//       cell: (row) => (
//         <PopupMenu
//           options={[
//             {
//               label: "Edit User",
//               icon: <img src={EditIcon} alt="edit" className="menu-icon" />,
//               path: `/system-users/edit/${row.id}`,
//             },
//             {
//               label: "Delete User",
//               icon: <img src={DeleteIcon} alt="delete" className="menu-icon" />,
//               action: () => onDeleteUser(row),
//             },
//           ]}
//         />
//       ),
//     },
//   ];

//   const renderRowsPerPage = () => (
//     <select
//       value={pagination.limit}
//       onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
//     >
//       {[5, 10, 25, 50].map((n) => (
//         <option key={n} value={n}>
//           {n}
//         </option>
//       ))}
//     </select>
//   );

//   return (
//     <div className="system-user-wrapper">
//       <div className="su-header">
//         <ButtonControl
//           text="Add User"
//           icon={<img src={AddIcon} alt="add" className="btn-icon" />}
//           to="/system-users/add"
//           styles="su-add-btn"
//         />
//       </div>

//       <CustomDataTable
//         title=""
//         columns={columns}
//         data={users || []}
//         paginationPerPage={pagination.limit}
//         paginationTotalRows={pagination.totalDocs}
//         currentPage={pagination.currentPage}
//         onChangePage={onPageChange}
//         onChangeRowsPerPage={onRowsPerPageChange}
//         displayRowsPerPage={renderRowsPerPage()}
//       />
//     </div>
//   );
// };

// export default SystemUserView;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import CustomDataTable from "../../common/dataTable/dataTable";
// import PopupMenu from "../../common/popupMenu/PopupMenu";
// import ButtonControl from "../../controls/button/ButtonControl";
// import "./systemUserStyles.scss";

// import EditIcon from "/assets/svg/edit.svg";
// import DeleteIcon from "/assets/svg/delete.svg";
// import AddIcon from "/assets/svg/AddIcon.svg";

// import ConfirmationDialog from "../../common/Modal/modalView";

// const SystemUserView = ({
//   users,
//   pagination,
//   onPageChange,
//   onRowsPerPageChange,
//   onDeleteUser,
// }) => {
//   const searchValue = useSelector((state) => state.search.searchValue);

//   const [filteredUsers, setFilteredUsers] = useState(users);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modalMessage, setModalMessage] = useState("");

//   const handleConfirmDelete = () => {
//     if (selectedUser) {
//       onDeleteUser(selectedUser);
//     }
//     setShowConfirm(false);
//     setSelectedUser(null);
//   };

//   const handleCloseModal = () => {
//     setShowConfirm(false);
//     setSelectedUser(null);
//   };

//   useEffect(() => {
//     if (!searchValue) {
//       setFilteredUsers(users);
//       return;
//     }

//     const lower = searchValue.toLowerCase();

//     const result = users.filter((u) => {
//       return (
//         u.name?.toLowerCase().includes(lower) ||
//         u.username?.toLowerCase().includes(lower) ||
//         u.role?.toLowerCase().includes(lower) ||
//         u.trade?.toLowerCase().includes(lower)
//       );
//     });

//     setFilteredUsers(result);
//   }, [searchValue, users]);

//   const columns = [
//     { name: "Name", selector: (row) => row.name, sortable: false },
//     { name: "Username", selector: (row) => row.username, sortable: false },
//     { name: "Role", selector: (row) => row.role, sortable: false },
//     { name: "Trade", selector: (row) => row.trade, sortable: false },
//     {
//       name: "Actions",
//       width: "80px",
//       cell: (row) => (
//         <PopupMenu
//           options={[
//             {
//               label: "Edit User",
//               icon: <img src={EditIcon} alt="edit" className="menu-icon" />,
//               path: `/system-users/edit/${row.id}`,
//             },
//             {
//               label: "Delete User",
//               icon: <img src={DeleteIcon} alt="delete" className="menu-icon" />,
//               action: () => {
//                 setSelectedUser(row);
//                 setModalMessage(`Are you sure you want to delete this user?`);
//                 setShowConfirm(true);
//               },
//             },
//           ]}
//         />
//       ),
//     },
//   ];

//   const renderRowsPerPage = () => (
//     <select
//       value={pagination.limit}
//       onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
//     >
//       {[5, 10, 25, 50].map((n) => (
//         <option key={n} value={n}>
//           {n}
//         </option>
//       ))}
//     </select>
//   );

//   return (
//     <div className="system-user-wrapper">
//       <ConfirmationDialog
//         show={showConfirm}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirmDelete}
//         title="Delete User"
//         message={modalMessage}
//         confirmLabel="Delete"
//         cancelLabel="Cancel"
//         size="sm"
//       />

//       <div className="su-header">
//         <ButtonControl
//           text="Add User"
//           icon={<img src={AddIcon} alt="add" className="btn-icon" />}
//           to="/system-users/add"
//           styles="su-add-btn"
//         />
//       </div>

//       <CustomDataTable
//         title=""
//         columns={columns}
//         data={filteredUsers || []}
//         paginationPerPage={pagination.limit}
//         paginationTotalRows={pagination.totalDocs}
//         currentPage={pagination.currentPage}
//         onChangePage={onPageChange}
//         onChangeRowsPerPage={onRowsPerPageChange}
//         displayRowsPerPage={renderRowsPerPage()}
//       />
//     </div>
//   );
// };

// export default SystemUserView;

import React, { useState } from "react";
import CustomDataTable from "../../common/dataTable/dataTable";
import PopupMenu from "../../common/popupMenu/PopupMenu";
import ButtonControl from "../../controls/button/ButtonControl";
import "./systemUserStyles.scss";

import EditIcon from "/assets/svg/edit.svg";
import DeleteIcon from "/assets/svg/delete.svg";
import AddIcon from "/assets/svg/AddIcon.svg";

import ConfirmationDialog from "../../common/Modal/modalView";

const SystemUserView = ({
  users,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  onDeleteUser,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  const handleConfirmDelete = () => {
    if (selectedUser) {
      onDeleteUser(selectedUser);
    }
    setShowConfirm(false);
    setSelectedUser(null);
  };

  const handleCloseModal = () => {
    setShowConfirm(false);
    setSelectedUser(null);
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: false },
    { name: "Username", selector: (row) => row.username, sortable: false },
    { name: "Role", selector: (row) => row.role, sortable: false },
    {
      name: "Trade",
      selector: (row) => row.trade.toUpperCase(),
      sortable: false,
    },
    {
      name: "Actions",
      width: "80px",
      cell: (row) => (
        <PopupMenu
          options={[
            {
              label: "Edit User",
              icon: <img src={EditIcon} alt="edit" className="menu-icon" />,
              path: `/system-users/edit/${row.id}`,
            },
            {
              label: "Delete User",
              icon: <img src={DeleteIcon} alt="delete" className="menu-icon" />,
              action: () => {
                setSelectedUser(row);
                setModalMessage("Are you sure you want to delete this user?");
                setShowConfirm(true);
              },
            },
          ]}
        />
      ),
    },
  ];

  const renderRowsPerPage = () => (
    <select
      value={pagination.limit}
      onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
    >
      {[5, 10, 25, 50].map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  );

  return (
    <div className="system-user-wrapper">
      <ConfirmationDialog
        show={showConfirm}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={modalMessage}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        size="sm"
      />

      <div className="su-header">
        <ButtonControl
          text="Add User"
          icon={<img src={AddIcon} alt="add" className="btn-icon" />}
          to="/system-users/add"
          styles="su-add-btn"
        />
      </div>

      <CustomDataTable
        title=""
        columns={columns}
        data={users || []}
        paginationPerPage={pagination.limit}
        paginationTotalRows={pagination.totalDocs}
        currentPage={pagination.currentPage}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onRowsPerPageChange}
        displayRowsPerPage={renderRowsPerPage()}
      />
    </div>
  );
};

export default SystemUserView;
