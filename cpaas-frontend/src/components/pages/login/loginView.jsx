import React, { useState, useEffect } from "react";
import InputControl from "../../controls/input/InputControl";
import ButtonControl from "../../controls/button/ButtonControl";
import Footer from "../../common/footer/footer";
import { history } from "../../../store/configure/configureStore";
import { ROUTES } from "../../../constants/routeConstants";
import RadioControl from "../../controls/radio/RadioControl";

import { validateField } from "../../../helpers/validator";

import "./loginStyles.scss";

export default function LoginView({
  rolesPending,
  roles,
  loginHandler,
  loginUser,
}) {
  const roleOptions = roles?.map((r) => ({
    value: r._id,
    label: r.name,
  }));

  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (roleOptions?.length > 0 && !role) {
      setRole(roleOptions[0]);
    }
  }, [role, roleOptions]);

  useEffect(() => {
    if (!loginUser?.data) return;

    const userRole = loginUser.data.roleIds?.[0]?.name;
    if (!userRole) return;

    if (window.location.pathname === "/login") {
      switch (userRole.toUpperCase()) {
        case "COMMANDER":
          history.push(ROUTES.COMMANDAR_HOME);
          break;
        case "INSTRUCTOR":
          history.push(ROUTES.INSTRUCTOR_HOME);
          break;
        default:
          history.push(ROUTES.DASHBOARD);
          break;
      }
    }
  }, [loginUser]);

  const submitLogin = () => {
    const usernameResult = validateField(
      { name: "username", label: "Username" },
      username,
    );

    const passwordResult = validateField(
      { name: "password", label: "Password" },
      pwd,
    );

    const newErrors = {};

    if (!usernameResult.isValid) newErrors.username = usernameResult.message;
    if (!passwordResult.isValid) newErrors.password = passwordResult.message;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    loginHandler({
      roleIds: [role?.value],
      userName: username,
      password: pwd,
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-left">
          <img
            src="/assets/icons/left side.png"
            alt="Left Banner"
            className="left-image"
          />
          <Footer styles={"login-footer"} />
        </div>

        <div className="login-right">
          <div className="login-card">
            <h2 className="login-heading">Login to your account</h2>

            <RadioControl
              label="Choose role"
              options={roleOptions}
              value={role}
              onChange={setRole}
              disabled={rolesPending}
            />

            <InputControl
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />

            <InputControl
              label="Password"
              name="password"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              error={errors.password}
            />

            <ButtonControl
              text="Login"
              styles="login-btn"
              onClick={submitLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
