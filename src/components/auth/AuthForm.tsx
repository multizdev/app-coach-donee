// ./src/components/auth/AuthForm.tsx
import React, { ReactElement } from "react";
import Login from "@components/auth/Login";
import Register from "@components/auth/Register";
import useAppStore from "@stores/useAppStore";

const AuthForm = (): ReactElement => {
  const { authState } = useAppStore();

  if (authState === "login") return <Login />;

  return <Register />;
};

export default AuthForm;
