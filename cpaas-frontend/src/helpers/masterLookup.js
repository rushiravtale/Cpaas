

// import {store} from '../store/configure/configureStore';


// let _tradeMap = null;
// let _roleMap = null;

// function _ensureMaps() {
//   const state = store.getState();

  
//   const { trades = [], roles = [] } = state.master || {};

//   if (_tradeMap?.src !== trades) {
//     const byId = {};
//     const byName = {};
//     trades.forEach((t) => {
//       byId[t._id] = t.name;          
//       byName[t.name] = t._id;      
//     });
//     _tradeMap = { src: trades, byId, byName };
//   }

//   if (_roleMap?.src !== roles) {
//     const byId = {};
//     const byName = {};
//     roles.forEach((r) => {
//       byId[r._id] = r.name;
//       byName[r.name] = r._id;
//     });
//     _roleMap = { src: roles, byId, byName };
//   }
// }


// export function getTradeName(tradeId) {
//   if (!tradeId) return undefined;
//   _ensureMaps();
//   return _tradeMap.byId[tradeId];
// }

// export function  getTradeId(tradeName) {
//   console.log("trade name ",tradeName)
//   if (!tradeName) return undefined;
//   _ensureMaps();
//   return _tradeMap.byName[tradeName];
// }

// export function getRoleName(roleId) {
//   if (!roleId) return undefined;
//   _ensureMaps();
//   return _roleMap.byId[roleId];
// }

// export function getRoleId(roleName) {
//   if (!roleName) return undefined;
//   _ensureMaps();
//   return _roleMap.byName[roleName];
// }


// export function getTradeOptionsByIds(ids, trades) {
//   if (!ids?.length || !trades?.length) return [];
//   return trades
//     .filter(t => ids.includes(t.id || t._id))
//     .map(t => ({ label: t.label || t.name, value: t.id || t._id }));
// }





// export const getCourseOptions = (courses = [], currentTradeId) => {
//   if (!Array.isArray(courses) || !currentTradeId) {
//     return [];
//   }

//   return courses
//     .filter((course) => {
//       return course.tradeId && course.tradeId.includes(currentTradeId);
//     })
//     .map((course) => ({
//       value: course._id,                    
//       label: `${course.courseName}`,       
//       courseData: course                     
//     }))
//     .sort((a, b) => a.label.localeCompare(b.label)); 
// };


import { store } from "../store/configure/configureStore";

let _tradeMap = null;
let _roleMap = null;
let _courseMap = null;   // NEW

function _ensureMaps() {
  const state = store.getState();

  const { trades = [], roles = [], courses = [] } = state.master || {};

  // --- TRADE MAP ---
  if (_tradeMap?.src !== trades) {
    const byId = {};
    const byName = {};
    trades.forEach((t) => {
      byId[t._id] = t.name;
      byName[t.name] = t._id;
    });
    _tradeMap = { src: trades, byId, byName };
  }

  // --- ROLE MAP ---
  if (_roleMap?.src !== roles) {
    const byId = {};
    const byName = {};
    roles.forEach((r) => {
      byId[r._id] = r.name;
      byName[r.name] = r._id;
    });
    _roleMap = { src: roles, byId, byName };
  }

  // --- COURSE MAP (NEW) ---
  if (_courseMap?.src !== courses) {
    const byId = {};
    const byName = {};
    courses.forEach((c) => {
      byId[c._id] = c;               // store entire object
      byName[c.courseName] = c._id;  // lookup by name → id
    });
    _courseMap = { src: courses, byId, byName };
  }
}

//
//  🔥 TRADE LOOKUP
//
export function getTradeName(tradeId) {
  if (!tradeId) return undefined;
  _ensureMaps();
  return _tradeMap.byId[tradeId];
}

export function getTradeId(tradeName) {
  if (!tradeName) return undefined;
  _ensureMaps();
  return _tradeMap.byName[tradeName];
}

//
// 🔥 ROLE LOOKUP
//
export function getRoleName(roleId) {
  if (!roleId) return undefined;
  _ensureMaps();
  return _roleMap.byId[roleId];
}

export function getRoleId(roleName) {
  if (!roleName) return undefined;
  _ensureMaps();
  return _roleMap.byName[roleName];
}

//
//  🔥 COURSE LOOKUP (NEW)
//
export function getCourseName(courseId) {
  if (!courseId) return undefined;
  _ensureMaps();
  const course = _courseMap.byId[courseId];
  return course ? course.courseName : undefined;
}

export function getCourseId(courseName) {
  if (!courseName) return undefined;
  _ensureMaps();
  return _courseMap.byName[courseName];
}

export function getCourseById(courseId) {
  if (!courseId) return null;
  _ensureMaps();
  return _courseMap.byId[courseId] || null;
}

export function getCoursesByTradeId(tradeId) {
  _ensureMaps();
  return _courseMap.src.filter((c) => c.tradeId?.includes(tradeId));
}

//
// 🔥 Existing helper (kept)
//
export function getTradeOptionsByIds(ids, trades) {
  if (!ids?.length || !trades?.length) return [];
  return trades
    .filter((t) => ids.includes(t.id || t._id))
    .map((t) => ({ label: t.label || t.name, value: t.id || t._id }));
}

//
// 🔥 Course dropdown helper (kept)
//
export const getCourseOptions = (courses = [], currentTradeId) => {
  if (!Array.isArray(courses) || !currentTradeId) {
    return [];
  }

  return courses
    .filter((course) => course.tradeId?.includes(currentTradeId))
    .map((course) => ({
      value: course._id,
      label: course.courseName,
      courseData: course,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};
