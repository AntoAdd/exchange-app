import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidForm = () => {
    return username !== "" && password !== "";
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios({
      method: "post",
      url: `${API_URL}/authenticate`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", jwtDecode(token).sub);
          login();
          clearForm();
          navigate("/all-offers");
        }
      })
      .catch((err) => alert("Bad credentials!"));
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-6 col-xxl-4">
          <div className="d-flex flex-column align-items-center p-4 border border-2 border-light-subtle rounded-4">
            <h2 className="display-5 mb-4">Sign In</h2>
            <p className="text-secondary">Enter your credentials to continue</p>
            <form
              className="d-flex flex-column mt-4 mb-4 w-75"
              onSubmit={handleSubmit}
            >
              <fieldset className="d-flex flex-column mb-3">
                <div className="mb-3">
                  <label htmlFor="username-input" className="form-label">
                    Username
                  </label>
                  <input
                    id="username-input"
                    className="form-control"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Username"
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="password-input" className="form-label">
                    Password
                  </label>
                  <input
                    id="password-input"
                    className="form-control"
                    value={password}
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Password"
                  ></input>
                </div>
              </fieldset>
              <button
                className="btn btn-primary btn-lg"
                type="submit"
                disabled={!isValidForm()}
              >
                Sign In
              </button>
            </form>
            <div className="d-flex flex-row gap-2 mt-3">
              <p className="text-secondary">Don't have an account?</p>
              <Link className="nav-link link-primary active" to="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
