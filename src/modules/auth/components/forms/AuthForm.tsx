// ./src/components/auth/AuthForm.tsx
import React, { ReactElement } from "react";
import Login from "@src/modules/auth/components/sections/Login";
import Register from "@src/modules/auth/components/sections/Register";
import useAppStore from "@src/modules/common/stores/useAppStore";

const AuthForm = (): ReactElement => {
  const { authState } = useAppStore();

  if (authState === "login") return <Login />;

  return <Register />;
};

export default AuthForm;
