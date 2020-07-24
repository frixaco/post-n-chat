import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import { loginUserAsync } from "../../redux/user/userActions";
import { validateForm } from "../validators-utils";

function Login({ loading, loginUserAsync, guest }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    errors: {
      username: "",
      password: "",
    },
  });

  const fillForm = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    let errors = form.errors;
    switch (name) {
      case "username":
        errors.username = value.length < 5 ? "At least 5 characters!" : "";
        break;
      case "password":
        errors.password = value.length < 6 ? "At least 6 characters!" : "";
        break;
      default:
        break;
    }
    setForm({ ...form, errors, [name]: value });
  };

  const handleLogin = (e) => {
    if (
      validateForm(form.errors) &&
      (e.key === "Enter" || e.key === undefined)
    ) {
      toast.info("Logging in...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        transition: Slide,
      });
      loginUserAsync(form);
      setForm({
        username: "",
        password: "",
        errors: { username: "", password: "" },
      });
    }
  };

  const handleGuestLogin = (e) => {
    toast.info("Logging in as GuestUser...", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      transition: Slide,
    });
    loginUserAsync({ ...guest });
  };

  return (
    <>
      <div name="loginForm" className="inner-container">
        <div className="title-section">
          <h4>Have an account?</h4>
        </div>
        <section className="inputs-section">
          <div>
            {form.errors.username.length > 0 && (
              <span>{form.errors.username}</span>
            )}
            <input
              name="username"
              value={form.username}
              onChange={fillForm}
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            {form.errors.password.length > 0 && (
              <span>{form.errors.password}</span>
            )}
            <input
              name="password"
              value={form.password}
              onChange={fillForm}
              onKeyDown={handleLogin}
              type="password"
              placeholder="password"
            />
          </div>
        </section>
        <section className="btn-section">
          <button onClick={handleLogin} disabled={loading} className="btn">
            LOGIN
          </button>
          or
          <button
            onClick={handleGuestLogin}
            disabled={loading}
            className="guest-btn"
          >
            Login as Guest
          </button>
        </section>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        transport={Slide}
      />
    </>
  );
}

const mapStateToProps = ({ user: { loading, guest } }) => ({ loading, guest });

export default connect(mapStateToProps, { loginUserAsync })(Login);
