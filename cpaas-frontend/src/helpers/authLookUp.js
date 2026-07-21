import { store } from "../store/configure/configureStore";

let _authUser = null; 
let _cachedResult = null;
let _cachedPermissions = [];


// function _ensureAuthCache() {
//   const state = store.getState();
//   const loginUser = state?.auth?.loginUser?.data;

//   console.log("login user",loginUser)
//   if (_authUser !== loginUser) {
//     _authUser = loginUser;

//     if (!loginUser) {
//       _cachedResult = {
//         role: "",
//         roleLabel: "",
//         isCommander: false,
//         isInstructor: false,
//         tradeIds: [],
//         trades: [],
//         user: null,
//       };
//       return;
//     }

//     const roleObj = loginUser?.roleIds?.[0] || {};
//     const roleLabel = roleObj.label || roleObj.name || "";

//     const isCommander = roleLabel === "Commander";
//     const isInstructor = roleLabel === "Instructor";

//     const tradeIds = loginUser?.tradeId || [];


//     _cachedResult = {
//       user: loginUser,
//       role: roleObj.name || "",
//       roleLabel,
//       isCommander,
//       isInstructor,
//       tradeIds,
//       trades: tradeIds,
//     };
//   }
// }




function _ensureAuthCache() {
  const state = store.getState();
  const loginUser = state?.auth?.loginUser?.data;

  if (_authUser !== loginUser) {
    _authUser = loginUser;

    if (!loginUser) {
      _cachedResult = {
        role: "",
        roleLabel: "",
        isCommander: false,
        isInstructor: false,
        tradeIds: [],
        trades: [],
        user: null,
      };
      _cachedPermissions = [];
      return;
    }

    const roleObj = loginUser?.roleIds?.[0] || {};
    const roleLabel = roleObj.label || roleObj.name || "";

    const isCommander = roleLabel === "Commander";
    const isInstructor = roleLabel === "Instructor";

    const tradeIds = loginUser?.tradeId || [];

    const permissionBlock = loginUser?.permission?.[0]?.permission || [];

    _cachedResult = {
      user: loginUser,
      role: roleObj.name || "",
      roleLabel,
      isCommander,
      isInstructor,
      tradeIds,
      trades: tradeIds,
    };

    _cachedPermissions = permissionBlock.map((p) => p.toLowerCase());
  }
}



export function getLoggedInUser() {
  _ensureAuthCache();
  return _cachedResult.user;
}

export function getLoggedInUserRole() {
  _ensureAuthCache();
  return _cachedResult.roleLabel;
}

export function isLoggedInCommander() {
  _ensureAuthCache();
  return _cachedResult.isCommander;
}

export function isLoggedInInstructor() {
  _ensureAuthCache();
  return _cachedResult.isInstructor;
}

export function getLoggedInUserTrades() {
  _ensureAuthCache();
  return _cachedResult.tradeIds;
}


export function getLoggedInUserInfo() {
  _ensureAuthCache();
  return _cachedResult;
}




export function getUserPermissions() {
  _ensureAuthCache();
  return _cachedPermissions || [];
}

export function getAllowedSidebarTabs() {
  _ensureAuthCache();

  if (_cachedResult.isCommander) {
    return [
      "dashboard",
      "gunner",
      "driver",
      "operator",
      "ofc",
      "system users",
      "courses",
    ];
  }

  const perms = getUserPermissions();

  return [...perms];
}




export function getAllowedRoutes() {
  _ensureAuthCache();

  if (_cachedResult.isCommander) {
    return getUserPermissions();  
  }

  return getUserPermissions();
}
