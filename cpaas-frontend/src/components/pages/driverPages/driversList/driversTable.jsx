// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { withRouter } from "react-router-dom";

// import { getAgniveers } from "../../../../store/tradeUsers/tradeUserActions";
// import TradeUsersTable from "../../commonPages/tradeUsersTable/TradeUsersTable";

// class DriversTable extends Component {

//   fetchPage = (page, limit = this.props.pagination?.limit || 10) => {
//     const params = new URLSearchParams(this.props.location.search);

//     this.props.getAgniveers(
//       page,
//       limit,
//        "all",
//       params.get("course"),
//       params.get("armyNo"),
//       params.get("tradeId")
//     );
//   };

//   componentDidMount() {
//     this.fetchPage(1);
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.location.search !== this.props.location.search) {
//       this.fetchPage(1);
//     }
//   }

//   render() {
//     const { agniveers, pagination, loadingAgniveers, history, location } =
//       this.props;

//     const params = new URLSearchParams(location.search);
//     const { grade } = this.props.match.params;

//     return (
//       <TradeUsersTable
//         title="Personal Details"
//         trade="driver"
//         grade={grade}
//         data={agniveers}
//         pagination={pagination}
//         loading={loadingAgniveers}
//         fetchPage={this.fetchPage}
//         addPathPrefix="/driver/drivers/basic-info"
//         viewPathPrefix="/driver/drivers"
//         history={history}
//         location={location}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   agniveers: state.tradeUsers?.agniveers || [],
//   pagination: state.tradeUsers?.pagination || {},
//   loadingAgniveers: state.tradeUsers?.loadingAgniveers || false,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ getAgniveers }, dispatch);

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(DriversTable)
// );

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import { getAgniveers } from "../../../../store/tradeUsers/tradeUserActions";
import TradeUsersTable from "../../commonPages/tradeUsersTable/TradeUsersTable";
import { getTradeId } from "../../../../helpers/masterLookup";

class DriversTable extends Component {
  getGradeFromUrl = () => {
    const { grade } = this.props.match.params;

    if (!grade) return undefined;

    if (grade.startsWith("grade")) {
      const g = grade.replace("grade", "");
      return ["A", "B", "C", "E"].includes(g) ? g : undefined;
    }

    if (grade === "improvement") {
      return "D";
    }

    return undefined;
  };

  fetchPage = (page, limit = this.props.pagination?.limit || 10) => {
    const params = new URLSearchParams(this.props.location.search);

    const gradeValue = this.getGradeFromUrl();

    this.props.getAgniveers(
      page,
      limit,
      "all",
      params.get("course"),
      params.get("armyNo"),
      params.get("tradeId") || getTradeId("Driver"),
      gradeValue,
      this.props.text,
    );
  };

  componentDidMount() {
    this.fetchPage(1);
  }

  componentDidUpdate(prevProps) {
    const searchChanged = prevProps.text !== this.props.text;
    const urlChanged =
      prevProps.location.search !== this.props.location.search ||
      prevProps.match.params.grade !== this.props.match.params.grade;

    if (urlChanged || searchChanged) {
      this.fetchPage(1);
    }
  }

  render() {
    const { agniveers, pagination, loadingAgniveers, history, location } =
      this.props;

    const { grade } = this.props.match.params;

    return (
      <TradeUsersTable
        title="Personal Details"
        trade="driver"
        tradeId={getTradeId("Driver")}
        grade={grade}
        data={agniveers}
        pagination={pagination}
        loading={loadingAgniveers}
        fetchPage={this.fetchPage}
        addPathPrefix="/driver/drivers/basic-info"
        viewPathPrefix="/driver/drivers"
        history={history}
        location={location}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  agniveers: state.tradeUsers?.agniveers || [],
  pagination: state.tradeUsers?.pagination || {},
  text: state.search?.searchValue || "",

  loadingAgniveers: state.tradeUsers?.loadingAgniveers || false,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAgniveers }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DriversTable),
);
