
import { getTradeId } from "./masterLookup";

export const getCourseOptionsForTrade = (masterCourses = [], trades = [], activeTradeName) => {
  if (!activeTradeName || !Array.isArray(masterCourses) || !Array.isArray(trades)) {
    return [];
  }

  const activeTradeId = getTradeId(activeTradeName); 

  if (!activeTradeId) return [];

  return masterCourses
    .filter(course => 
      course.tradeId && 
      course.tradeId.includes(activeTradeId)
    )
    .map(course => ({
      label: course.courseName,
      value: course._id
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};