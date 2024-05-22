import { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const isValidForm = () => {
    return (
      firstName !== "" &&
      lastName !== "" &&
      username !== "" &&
      password.length >= 8 &&
      address !== ""
    );
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setAddress("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("address", address);

    axios({
      method: "post",
      url: "http://localhost:8080/register",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      if (response.status === 200) {
        clearForm();
        alert("Account created!");
      }
    });
  };

  return (
    <div className="container text-center mt-4">
      <h2 className="display-5">Create Account</h2>
      <form className="mt-4 mb-4" onSubmit={handleSubmit}>
        <fieldset>
          <div className="mb-3 row justify-content-md-center">
            <label className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-5">
              <input
                className="form-control"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First Name"
              ></input>
            </div>
          </div>
          <div className="mb-3 row justify-content-md-center">
            <label className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-5">
              <input
                className="form-control"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last Name"
              ></input>
            </div>
          </div>
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
          <div className="mb-3 row justify-content-md-center">
            <label className="col-sm-2 col-form-label">Address</label>
            <div className="col-sm-5">
              <input
                className="form-control"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Address"
              ></input>
            </div>
          </div>
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={!isValidForm()}
          >
            Sign In
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Registration;
