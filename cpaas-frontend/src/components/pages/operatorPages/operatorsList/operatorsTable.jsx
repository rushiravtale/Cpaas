// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { withRouter } from "react-router-dom";
// import { getAgniveers } from "../../../../store/tradeUsers/tradeUserActions";

// import TradeUsersTable from "../../commonPages/tradeUsersTable/TradeUsersTable";

// class OperatorsTable extends Component {
//   fetchPage = (page, limit = this.props.pagination.limit) => {
//     const params = new URLSearchParams(this.props.location.search);

//     this.props.getAgniveers(
//       page,
//       limit,
//       "all",
//       params.get("course"),
//       params.get("armyNo"),
//       params.get("tradeId")
//     );
//   };

//   componentDidMount() {
//     this.fetchPage(1);
//   }

//   render() {
//     return (
//       <TradeUsersTable
//         title="Personal Details"
//         trade="operators"
//         grade={this.props.match.params.grade}
//         data={this.props.agniveers}
//         pagination={this.props.pagination}
//         loading={this.props.loadingOperators}
//         fetchPage={this.fetchPage}
//        addPathPrefix="/operator/operators/basic-info"
// viewPathPrefix="/operator/operators"

//         history={this.props.history}
//         location={this.props.location}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
// agniveers: state.tradeUsers?.agniveers || [],
//   pagination: state.tradeUsers?.pagination || {},
//   loadingAgniveers: state.tradeUsers?.loadingAgniveers || false,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ getAgniveers }, dispatch);

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(OperatorsTable)
// );

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { getAgniveers } from "../../../../store/tradeUsers/tradeUserActions";

import TradeUsersTable from "../../commonPages/tradeUsersTable/TradeUsersTable";
import { getTradeId } from "../../../../helpers/masterLookup";

class OperatorsTable extends Component {
  // Same grade extraction logic used in DriversTable & GunnersTable
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

    return undefined; // anything else ignored
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
      params.get("tradeId") || getTradeId("Operator"),
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
        trade="operators"
        tradeId={getTradeId("Operator")}
        grade={grade}
        data={agniveers}
        pagination={pagination}
        loading={loadingAgniveers}
        fetchPage={this.fetchPage}
        addPathPrefix="/operator/operators/basic-info"
        viewPathPrefix="/operator/operators"
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
  connect(mapStateToProps, mapDispatchToProps)(OperatorsTable),
);
