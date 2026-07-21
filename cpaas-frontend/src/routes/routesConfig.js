// src/routes/routesConfig.js


import Dashboard from "../components/pages/commonPages/dashboard/DashboardContainer";
import LoginContainer from "../components/pages/login/loginContainer";
import { ROUTES } from "../constants/routeConstants";
import BasicInfoContainer from "../components/pages/commonPages/basicInfo/BasicInfoContainer";


import PhysicalProficiencyContainer from "../components/pages/commonPages/physicalProficiency/PhysicalProficiencyContainer";
import SummaryContainer from "../components/pages/commonPages/summary/summaryContainer";
import GunnerHomeContainer from "../components/pages/gunnerPages/gunnerHome/gunnerHomeContainer";
import GunnersList from "../components/pages/gunnerPages/gunnersList/gunnersTable";
import GunnerTechPhaseContainer from "../components/pages/gunnerPages/gunnerTechPhase/gunnerTechPhaseContainer";
// import GunnerPhysicalPerformance from '../components/pages/gunnerPages/gunnerPhysicalProficiency/physicalProficiencyContainer';


//driver pages


import DriverHomeContainer from "../components/pages/driverPages/driverHome/driverHomeContainer";
import DriversList from "../components/pages/driverPages/driversList/driversTable";
import DriverTechPhaseContainer from "../components/pages/driverPages/driverTechPhase/driverTechPhaseContainer";
// import DriverPhysicalPerformance from '../components/pages/driverPages/driverPhysicalProficiency/physicalProficiencyContainer';
//operator pages


import OperatorHomeContainer from "../components/pages/operatorPages/operatorHome/operatorHomeContainer";
import OperatorsList from "../components/pages/operatorPages/operatorsList/operatorsTable";
import OperatorTechPhaseContainer from "../components/pages/operatorPages/operatorTechPhase/operatorTechPhaseContainer";
// import OperatorPhysicalPerformance from '../components/pages/operatorPages/operatorPhysicalProficiency/physicalProficiencyContainer';


//ofc pages




import OfcHomeContainer from "../components/pages/ofcPages/ofcHome/ofcHomeContainer";
import OfcsList from "../components/pages/ofcPages/ofcsList/ofcsTable";
import OfcTechPhaseContainer from "../components/pages/ofcPages/ofcTechPhase/ofcTechPhaseContainer";
// import OfcPhysicalPerformance from '../components/pages/ofcPages/ofcPhysicalProficiency/physicalProficiencyContainer';






import SystemUserContainer from "../components/pages/systemUsers/SystemUserContainer";
import AddAndEditSystemUser from "../components/pages/systemUsers/ManageSytemUsers/addAndEditSystemUserContainer";
import CourseContainer from "../components/pages/courses/courseContainer";
import AddAndEditCourseContainer from "../components/pages/courses/manageCourses/addAndEditCoursesContainer";
import FortnightlyPerformanceSheetContainer from "../components/pages/commonPages/fortnightlyPerformanceSheet/FortnightlyPerformanceSheetContainer";




import Banner from "../components/common/banner/banner";
import CertificateContainer from "../components/pages/commonPages/certificate/certificateContainer";
import DashboardContainer from "../components/pages/commonPages/dashboard/DashboardContainer";
export const protectedRoutes = [
  {
    path: ROUTES.DASHBOARD,
    component: DashboardContainer,
    roles: ["COMMANDAR", "INSTRUCTOR"],
  },
  {
    path: ROUTES.GUNNER,
    component: GunnerHomeContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.GUNNERSLIST,
    component: GunnersList,
    roles: ["COMMANDAR", "GUNNER"],
  },
   {
    path: ROUTES.GUNNERSLIST_ALL,
    component: GunnersList,
    roles: ["COMMANDAR", "GUNNER"],
  },


  {
    path: ROUTES.GUNNER_CERTIFICATE,
    component: CertificateContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },




  {
    path: ROUTES.GUNNERSLIST_DASHBOARD,
    component: GunnersList,
    roles: ["COMMANDAR", "GUNNER"],
  },
   {
    path: ROUTES.GUNNERSLIST_ALL_DASHBOARD,
    component: GunnersList,
    roles: ["COMMANDAR", "GUNNER"],
  },


  {
    path: ROUTES.GUNNER_BASIC_INFO_EDIT,
    component: BasicInfoContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
   {
    path: ROUTES.GUNNER_BASIC_INFO_ADD,
    component: BasicInfoContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.GUNNERSUMMARY,
    component: SummaryContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.GUNNER_TECH_PHASE,
    component: GunnerTechPhaseContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.GUNNER_WEEKLY_PERFORMACE_SUMMARY,
    component: FortnightlyPerformanceSheetContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },


  {
    path: ROUTES.GUNNER_PHYSICAL_PERFORMANCE,
    component: PhysicalProficiencyContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
 




    {
    path: ROUTES.DRIVER,
    component: DriverHomeContainer,
    roles: ["COMMANDAR", "DRIVER"],
  },
  {
    path: ROUTES.DRIVER_LIST,
    component: DriversList,
    roles: ["COMMANDAR", "DRIVER"],
  },
   {
    path: ROUTES.DRIVER_LIST_ALL,
    component: DriversList,
    roles: ["COMMANDAR", "DRIVER"],
  },


   {
    path: ROUTES.DRIVER_LIST_DASHBOARD,
    component: DriversList,
    roles: ["COMMANDAR", "DRIVER"],
  },


    {
    path: ROUTES.DRIVER_CERTIFICATE,
    component: CertificateContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },

   {
    path: ROUTES.DRIVER_LIST_ALL_DASHBOARD,
    component: DriversList,
    roles: ["COMMANDAR", "DRIVER"],
  },
  {
    path: ROUTES.DRIVER_BASIC_INFO_ADD,
    component: BasicInfoContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
   {
    path: ROUTES.DRIVER_BASIC_INFO_EDIT,
    component: BasicInfoContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.DRIVER_SUMMARY,
    component: SummaryContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.DRIVER_TECH_PHASE,
    component: DriverTechPhaseContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.DRIVER_WEEKLY_PERFORMACE_SUMMARY,
    component: FortnightlyPerformanceSheetContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },




   {
    path: ROUTES.DRIVER_PHYSICAL_PERFORMANCE,
    component: PhysicalProficiencyContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
 






 
    {
    path: ROUTES.OPERATOR,
    component: OperatorHomeContainer,
    roles: ["COMMANDAR", "OPERATOR"],
  },
  {
    path: ROUTES.OPERATOR_LIST,
    component: OperatorsList,
    roles: ["COMMANDAR", "OPERATOR"],
  },


    {
    path: ROUTES.OPERATOR_LIST_ALL,
    component: OperatorsList,
    roles: ["COMMANDAR", "OPERATOR"],
  },


   {
    path: ROUTES.OPERATOR_LIST_DASHBOARD,
    component: OperatorsList,
    roles: ["COMMANDAR", "OPERATOR"],
  },


     {
    path: ROUTES.OPERATOR_CERTIFICATE,
    component: CertificateContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },

    {
    path: ROUTES.OPERATOR_LIST_ALL_DASHBOARD,
    component: OperatorsList,
    roles: ["COMMANDAR", "OPERATOR"],
  },
  {
    path: ROUTES.OPERATOR_BASIC_INFO_ADD,
    component: BasicInfoContainer,
    roles: ["COMMANDAR", "OPERATOR"],
  },
    {
    path: ROUTES.OPERATOR_BASIC_INFO_EDIT,
    component: BasicInfoContainer,
    roles: ["COMMANDAR", "OPERATOR"],
  },
  {
    path: ROUTES.OPERATOR_SUMMARY,
    component: SummaryContainer,
    roles: ["COMMANDAR", "OPERATOR"],
  },
  {
    path: ROUTES.OPERATOR_TECH_PHASE,
    component: OperatorTechPhaseContainer,
    roles: ["COMMANDAR", "OPERATOR"],
  },
  {
    path: ROUTES.OPERATOR_WEEKLY_PERFORMACE_SUMMARY,
    component: FortnightlyPerformanceSheetContainer,
    roles: ["COMMANDAR", "OPERATOR"],
  },


    {
    path: ROUTES.OPERATOR_PHYSICAL_PERFORMANCE,
    component: PhysicalProficiencyContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },






   
    {
    path: ROUTES.OFC,
    component: OfcHomeContainer,
    roles: ["COMMANDAR", "OFC"],
  },
  {
    path: ROUTES.OFC_LIST,
    component: OfcsList,
    roles: ["COMMANDAR", "OFC"],
  },
   {
    path: ROUTES.OFC_LIST_ALL,
    component: OfcsList,
    roles: ["COMMANDAR", "OFC"],
  },
    {
    path: ROUTES.OFC_LIST_DASHBOARD,
    component: OfcsList,
    roles: ["COMMANDAR", "OFC"],
  },

       {
    path: ROUTES.OFC_CERTIFICATE,
    component: CertificateContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },

   {
    path: ROUTES.OFC_LIST_ALL_DASHBOARD,
    component: OfcsList,
    roles: ["COMMANDAR", "OFC"],
  },
 {
    path: ROUTES.OFC_BASIC_INFO_ADD,
    component: BasicInfoContainer,
    roles: ["COMMANDAR", "OPERATOR"],
  },

  
    {
    path: ROUTES.OFC_BASIC_INFO_EDIT,
    component: BasicInfoContainer,
    roles: ["COMMANDAR", "OPERATOR"],
  },
  {
    path: ROUTES.OFC_SUMMARY,
    component: SummaryContainer,
    roles: ["COMMANDAR", "OFC"],
  },
  {
    path: ROUTES.OFC_TECH_PHASE,
    component: OfcTechPhaseContainer,
    roles: ["COMMANDAR", "OFC"],
  },
  {
    path: ROUTES.OFC_WEEKLY_PERFORMACE_SUMMARY,
    component: FortnightlyPerformanceSheetContainer,
    roles: ["COMMANDAR", "OFC"],
  },


    {
    path: ROUTES.OFC_PHYSICAL_PERFORMANCE,
    component: PhysicalProficiencyContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },




  {
    path: ROUTES.SYSTEM_USERS,
    component: SystemUserContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.EDIT_SYSTEM_USER,
    component: AddAndEditSystemUser,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.ADD_SYSTEM_USER,
    component: AddAndEditSystemUser,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.COURSES,
    component: CourseContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.ADD_COURSES,
    component: AddAndEditCourseContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
  {
    path: ROUTES.EDIT_COURSES,
    component: AddAndEditCourseContainer,
    roles: ["COMMANDAR", "GUNNER"],
  },
];


export const publicRoutes = [
  {
    path: ROUTES.LOGIN,
    component: LoginContainer,
  },
];
