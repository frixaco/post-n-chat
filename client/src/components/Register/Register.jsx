import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { connect } from "react-redux";

import { validEmailRegex, validateForm } from "../validators-utils";

function Register({ loading }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    errors: {
      username: "",
      email: "",
      password: "",
    },
  });

  const fillForm = (e) => {
    const { name, value } = e.target;
    let errors = form.errors;
    switch (name) {
      case "username":
        errors.username = value.length < 5 ? "At least 5 characters!" : "";
        break;
      case "password":
        errors.password = value.length < 6 ? "At least 6 characters!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      default:
        break;
    }
    setForm({ ...form, errors, [name]: value });
  };

  const registerUser = async (e) => {
    try {
      if (
        validateForm(form.errors) &&
        (e.key === "Enter" || e.key === undefined)
      ) {
        toast.info("Registering...", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          transition: Slide,
        });
        await Axios.post("/auth/register", form);
        toast.success("Registration success!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          transition: Slide,
        });
        setForm({
          username: "",
          email: "",
          password: "",
          errors: {
            username: "",
            email: "",
            password: "",
          },
        });
      }
    } catch (err) {
      toast.error("User exists!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        transition: Slide,
      });
    }
  };
  return (
    <>
      <div name="registerForm" className="inner-container">
        <div className="title-section">
          <h4>Create an account</h4>
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
            {form.errors.email.length > 0 && <span>{form.errors.email}</span>}
            <input
              name="email"
              value={form.email}
              onChange={fillForm}
              type="email"
              placeholder="email"
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
              onKeyDown={registerUser}
              type="password"
              placeholder="password"
            />
          </div>
        </section>
        <section className="btn-section">
          <button onClick={registerUser} disabled={loading} className="btn">
            REGISTER
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

const mapStateToProps = ({ user: { loading } }) => ({ loading });

export default connect(mapStateToProps)(Register);
