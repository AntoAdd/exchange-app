import axios from "axios";
import { useState } from "react";
import React from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      url: "http://localhost:8080/authenticate",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
      console.log(response.status)  
      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        clearForm();
      }
    }).catch(err => alert("Bad credentials!"));
  };

  return (
    <div className="container text-center mt-4 p-4">
      <h2 className="display-5">Login</h2>
      <form className="mt-4 mb-4" onSubmit={handleSubmit}>
        <fieldset>
          <div className="mb-3 row justify-content-md-center">
            <label className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-5">
              <input
                className="form-control"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
              ></input>
            </div>
          </div>
          <div className="mb-3 row justify-content-md-center">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-5">
              <input
                className="form-control"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              ></input>
            </div>
          </div>
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={!isValidForm()}
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginForm;
