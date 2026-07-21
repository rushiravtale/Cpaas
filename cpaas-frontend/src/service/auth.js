
export default class Auth {
static setTokens(accessToken, refreshToken, user = null) {
  try {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    if (user) localStorage.setItem("loginUser", JSON.stringify(user));

  } catch (e) {
    console.error("Error setting tokens:", e);
  }
}

  static getAccessToken() {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Date.now() / 1000;
      if (payload.exp && payload.exp < now) {
        return null;
      }

      return token;
    } catch (e) {
      console.error("Error reading accessToken:", e);
      return null;
    }
  }

  static getRefreshToken() {
    try {
      return localStorage.getItem("refreshToken");
    } catch (e) {
      console.error("Error reading refreshToken:", e);
      return null;
    }
  }

  static getLoginUser() {
    try {
      const user = localStorage.getItem("loginUser");
      return user ? JSON.parse(user) : null;
    } catch (e) {
      console.error("Error reading loginUser:", e);
      return null;
    }
  }

  static clear() {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("loginUser");
    } catch (e) {
      console.error("Error clearing auth info:", e);
    }
  }

static isAuthenticated() {
  return !!this.getAccessToken();
}
}
