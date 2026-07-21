import { ROUTES } from "../constants/routeConstants";

export const FLOW_STEPS = {
  BASIC_INFO: "BASIC_INFO",
  PHYSICAL: "PHYSICAL",
  TECH_PHASE: "TECH_PHASE",
  FORTNIGHTLY: "FORTNIGHTLY",
};

export const getNextRoute = (currentStep, trade, id) => {
  if (!trade || !id) return null;

  const normalizedTrade = trade.toLowerCase().replace(/s$/, ""); // gunner, driver, operator...

  switch (currentStep) {
    case FLOW_STEPS.BASIC_INFO:
      // Basic Info -> Physical Proficiency
      switch (normalizedTrade) {
        case "gunner":
          return ROUTES.GUNNER_PHYSICAL_PERFORMANCE.replace(":id", id);
        case "driver":
          return ROUTES.DRIVER_PHYSICAL_PERFORMANCE.replace(":id", id);
        case "operator":
          return ROUTES.OPERATOR_PHYSICAL_PERFORMANCE.replace(":id", id);
        case "ofc":
          return ROUTES.OFC_PHYSICAL_PERFORMANCE.replace(":id", id);
        default:
          return null;
      }

    case FLOW_STEPS.PHYSICAL:
      // Physical Proficiency -> Tech Phase
      switch (normalizedTrade) {
        case "gunner":
          return ROUTES.GUNNER_TECH_PHASE.replace(":id", id);
        case "driver":
          return ROUTES.DRIVER_TECH_PHASE.replace(":id", id);
        case "operator":
          return ROUTES.OPERATOR_TECH_PHASE.replace(":id", id);
        case "ofc":
          return ROUTES.OFC_TECH_PHASE.replace(":id", id);
        default:
          return null;
      }

    case FLOW_STEPS.TECH_PHASE:
      // Tech Phase -> Fortnightly Performance Sheet
      switch (normalizedTrade) {
        case "gunner":
          return ROUTES.GUNNER_WEEKLY_PERFORMACE_SUMMARY.replace(":id", id);
        case "driver":
          return ROUTES.DRIVER_WEEKLY_PERFORMACE_SUMMARY.replace(":id", id);
        case "operator":
          return ROUTES.OPERATOR_WEEKLY_PERFORMACE_SUMMARY.replace(":id", id);
        case "ofc":
          return ROUTES.OFC_WEEKLY_PERFORMACE_SUMMARY.replace(":id", id);
        default:
          return null;
      }

    case FLOW_STEPS.FORTNIGHTLY:
      // End of flow -> List View (User handles this based on context usually, but we can return a default list)
      switch (normalizedTrade) {
        case "gunner":
          return ROUTES.GUNNERSLIST_ALL;
        case "driver":
          return ROUTES.DRIVER_LIST_ALL;
        case "operator":
          return ROUTES.OPERATOR_LIST_ALL;
        case "ofc":
          return ROUTES.OFC_LIST_ALL;
        default:
          return ROUTES.DASHBOARD;
      }

    default:
      return null;
  }
};

export const getListRoute = (trade) => {
  if (!trade) return ROUTES.DASHBOARD;
  const normalizedTrade = trade.toLowerCase().replace(/s$/, "");

  switch (normalizedTrade) {
    case "gunner":
      return ROUTES.GUNNERSLIST_ALL;
    case "driver":
      return ROUTES.DRIVER_LIST_ALL;
    case "operator":
      return ROUTES.OPERATOR_LIST_ALL;
    case "ofc":
      return ROUTES.OFC_LIST_ALL;
    default:
      return ROUTES.DASHBOARD;
  }
};
