// // src/containers/course/CoursesContainer.jsx
// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { loadCourses, deleteCourse } from "../../../store/course/courseActions";
// import CoursesView from "./coursesView";
// const CoursesContainer = ({ courses, pagination, loadCourses, deleteCourse }) => {
//   useEffect(() => {
//     loadCourses(pagination.currentPage, pagination.limit);
//   }, []);
//   const handlePageChange = (page) => {
//     loadCourses(page, pagination.limit);
//   };
//   const handleRowsChange = (limit) => {
//     loadCourses(1, limit);
//   };
//   const handleDeleteCourse = (course) => {
//     console.log("handle delete course called",course.id)
//     deleteCourse(course.id);
//   };
//   return (
//     <CoursesView
//       courses={courses}
//       pagination={pagination}
//       onPageChange={handlePageChange}
//       onRowsPerPageChange={handleRowsChange}
//       onDeleteCourse={handleDeleteCourse}
//     />
//   );
// };
// const mapStateToProps = (state) => ({
//   courses: state.course.courses,
//   pagination: state.course.pagination,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       loadCourses,
//       deleteCourse,
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);



// src/containers/course/CoursesContainer.jsx


// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { loadCourses, deleteCourse,resetCoursesPagination } from "../../../store/course/courseActions";
// import CoursesView from "./coursesView";

// const CoursesContainer = ({ courses, pagination, loadCourses, deleteCourse }) => {
//   useEffect(() => {
//     loadCourses(pagination.currentPage, pagination.limit);
//   }, []);

//   const handlePageChange = (page) => {
//     loadCourses(page, pagination.limit);
//   };

//   const handleRowsChange = (limit) => {
//     loadCourses(1, limit);
//   };

//   const handleDeleteCourse = (course) => {
//     deleteCourse(course.id);
//   };

//   return (
//     <CoursesView
//       courses={courses}
//       pagination={pagination}
//       onPageChange={handlePageChange}
//       onRowsPerPageChange={handleRowsChange}
//       onDeleteCourse={handleDeleteCourse}
//     />
//   );
// };

// const mapStateToProps = (state) => ({
//   courses: state.course.courses,
//   pagination: state.course.pagination,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       loadCourses,
//       deleteCourse,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);


// src/containers/course/CoursesContainer.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { history } from "../../../store/configure/configureStore";
import {
  clearSearchValue,
  setSearchValue
} from "../../../store/search/searchActions";

import {
  loadCourses,
  deleteCourse,
  resetCoursesPagination,
} from "../../../store/course/courseActions";

import CoursesView from "./coursesView";

class CoursesContainer extends Component {
  componentDidMount() {

    this.props.clearSearchValue()
    const { pagination, loadCourses, location } = this.props;

    // Only load when on main /courses route
if (location.pathname === "/courses") {
  loadCourses(pagination.currentPage, pagination.limit, this.props.text);
}

  }

  // componentDidUpdate(prevProps) {
  //   const { pagination, loadCourses, location } = this.props;

  //   const routeChanged = prevProps.location.pathname !== location.pathname;
  //   const isMainRoute = location.pathname === "/courses";

  //   // If route changed AND now on /courses → load courses
  //   if (routeChanged && isMainRoute) {
  //     loadCourses(pagination.currentPage, pagination.limit);
  //     return;
  //   }

  //   // Pagination change → reload data (only on main route)
  //   if (
  //     isMainRoute &&
  //     (
  //       prevProps.pagination.currentPage !== pagination.currentPage ||
  //       prevProps.pagination.limit !== pagination.limit
  //     )
  //   ) {
  //     loadCourses(pagination.currentPage, pagination.limit);
  //   }
  // }


  componentDidUpdate(prevProps) {
  const { pagination, loadCourses, location, text } = this.props;

  const routeChanged = prevProps.location.pathname !== location.pathname;
  const searchChanged = prevProps.text !== text;
  const isMainRoute = location.pathname === "/courses";

  // If route changed and now on /courses → fetch
  if (routeChanged && isMainRoute) {
    loadCourses(pagination.currentPage, pagination.limit, text);
    return;
  }

  // Search value changed → restart from page 1
  if (isMainRoute && searchChanged) {
    loadCourses(1, pagination.limit, text);
    return;
  }

  // Pagination changed → reload with search included
  if (
    isMainRoute &&
    (
      prevProps.pagination.currentPage !== pagination.currentPage ||
      prevProps.pagination.limit !== pagination.limit
    )
  ) {
    loadCourses(pagination.currentPage, pagination.limit, text);
  }
}

  componentWillUnmount() {
    const nextPath = history.location.pathname;


    if (!nextPath.includes("courses")) {
      this.props.resetCoursesPagination();
    }
  }

handlePageChange = (page) => {
  this.props.loadCourses(page, this.props.pagination.limit, this.props.text);
};

handleRowsChange = (limit) => {
  this.props.loadCourses(1, limit, this.props.text);
};


  handleDeleteCourse = (course) => {
    this.props.deleteCourse(course.id);
  };

  render() {
    const { courses, pagination } = this.props;

    return (
      <CoursesView
        courses={courses}
        pagination={pagination}
        onPageChange={this.handlePageChange}
        onRowsPerPageChange={this.handleRowsChange}
        onDeleteCourse={this.handleDeleteCourse}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  pagination: state.course.pagination,
    text: state.search?.searchValue || "", 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadCourses,
      deleteCourse,
      resetCoursesPagination,
      clearSearchValue,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CoursesContainer)
);
