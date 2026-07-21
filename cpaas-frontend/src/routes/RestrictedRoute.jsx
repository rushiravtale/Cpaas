// // src/routes/RestrictedRoute.jsx

// import React, { useEffect } from "react";
// import { Route, Redirect, withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import MainLayout from "../mainLayout/mainLayout";
// import Auth from "../service/auth"; // ← CORRECT ONE
// import { setActiveTab, setActivePage } from "../store/sidebar/sidebarActions";

// const RestrictedRoute = ({
//   component: Component,
//   roles,
//   location,
//   auth: authState,
//   setActiveTab,
//   setActivePage,
//   ...rest
// }) => {
//   useEffect(() => {
//     if (!location.pathname) return;

//     const pathname = location.pathname;
//     const root = pathname.split("/")[1];
//     const tab = root
//       ? root.charAt(0).toUpperCase() + root.slice(1)
//       : "Dashboard";

//     setActiveTab(tab);
//     setActivePage(pathname);
//   }, [location.pathname, setActiveTab, setActivePage]);

//   const currentUserRole = authState?.role;

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         // USE REAL TOKEN CHECK
//         if (!Auth.isAuthenticated()) {
//           return <Redirect to="/login" />;
//         }

      

//         return (
//           <MainLayout>
//             <Component {...props} />
//           </MainLayout>
//         );
//       }}
//     />
//   );
// };

// const mapState = (state) => ({
//   auth: state.auth.loginUser,
// });

// export default withRouter(
//   connect(mapState, { setActiveTab, setActivePage })(RestrictedRoute)
// );



import React, { useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MainLayout from "../mainLayout/mainLayout";
import Auth from "../service/auth";
import { setActiveTab, setActivePage } from "../store/sidebar/sidebarActions";
import { getAllowedRoutes } from "../helpers/authLookUp";

const RestrictedRoute = ({
  component: Component,
  location,
  setActiveTab,
  setActivePage,
  ...rest
}) => {

const allowedRoutes = (getAllowedRoutes() || [])
  .map(r => r.toLowerCase().replace(/\s+/g, "-")); 


  useEffect(() => {
    if (!location.pathname) return;

    const pathname = location.pathname;
    const root = pathname.split("/")[1]; 

    const tab = root
      ? root.charAt(0).toUpperCase() + root.slice(1)
      : "Dashboard";


    setActiveTab(tab);
    setActivePage(pathname);
  }, [location.pathname, setActiveTab, setActivePage]);

  return (
    <Route
      {...rest}
      render={(props) => {
        // if (!Auth.isAuthenticated()) {
        //   return <Redirect to="/login" />;
        // }

     const pathRoot = props.location.pathname.split("/")[1] ;
const tabLower = pathRoot.toLowerCase().replace(/\s+/g, "-");

        const hasAccess = allowedRoutes.includes(tabLower);

        if (!hasAccess) {
          return <Redirect to="/login" />;
        }

        return (
          <MainLayout>
            <Component {...props} />
          </MainLayout>
        );
      }}
    />
  );
};

const mapState = (state) => ({
  auth: state.auth.loginUser,
});

export default withRouter(
  connect(mapState, { setActiveTab, setActivePage })(RestrictedRoute)
);





