import React from "react";

import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

function AuthPage() {
  return (
    <div className="auth-page-container">
      <Login />
      <Register />
    </div>
  );
}

export default AuthPage;
