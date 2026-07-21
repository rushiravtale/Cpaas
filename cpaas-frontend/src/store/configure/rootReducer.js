import { combineReducers } from "redux";
import authReducer from "../auth/authReducer";
import masterReducer from "../master/masterReducer";
import { sidebarReducer } from "../sidebar/sidebarReducer";
import summaryReducer from "../summary/summaryReducer";
import weeklyPerformaceReducer from "../weeklyPerformace/weeklyPerformaceReducer";
import systemUserReducer from '../systemUsers/SystemUserReducer';
import courseReducer from "../course/courseReducer";
import { routerReducer } from "react-router-redux";
import alertReducer from "../alert/alertReducer";
import tradeUserReducer from "../tradeUsers/tradeUserReducer";
import loaderReducer from '../loader/loaderReducer';
import physicalProficiencyReducer from "../physicalProficiency/physicalProficiencyReducer";
import fortnightlyPerformanceReducer from "../fortnightlyPerformance/FortnightlyPerformanceReducer";
import techPhaseGunnerReducer from "../techPhase/TechPhaseGunner/techPhaseGunnerReducer";
import techPhaseDriverReducer from "../techPhase/TechPhaseDriver/techPhaseDriverReducer";
import techPhaseOperatorReducer from "../techPhase/TechPhaseOperator/techPhaseOperatorReducer";
import ofcTechPhaseReducer from "../techPhase/TechPhaseOfc/ofcTechPhaseReducer";
import { searchReducer } from "../search/searchReducer";
import courseSummaryReducer from "../courseSummary/courseSummaryReducer";
import dashboardReducer from "../dashboard/dashboardReducer";


const rootReducer = combineReducers({
    router: routerReducer,
  auth: authReducer,
  alert:alertReducer,
  master:masterReducer,
  sidebar:sidebarReducer,
  summary:summaryReducer,
  courseSummary: courseSummaryReducer,
  techPhaseGunner: techPhaseGunnerReducer,
  performance:weeklyPerformaceReducer,
  systemUsers:systemUserReducer,
  course:courseReducer,
  loader:loaderReducer,
  tradeUsers:tradeUserReducer,
  physicalProficiency: physicalProficiencyReducer,
  fortnightlyPerformance: fortnightlyPerformanceReducer,
  techPhaseDriver:techPhaseDriverReducer,
  techPhaseOperator:techPhaseOperatorReducer,
  ofcTechPhase:ofcTechPhaseReducer,
  search:searchReducer,
  dashboard:dashboardReducer
});


export default rootReducer;
