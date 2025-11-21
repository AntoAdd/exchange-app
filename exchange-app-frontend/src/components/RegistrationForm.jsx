import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

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
        navigate("/login");
      }
    });
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-6 col-xxl-4">
          <div className="d-flex flex-column align-items-center p-4 border border-2 border-light-subtle rounded-4">
            <h2 className="display-5 text-center mb-4">Create Account</h2>
            <form
              className="d-flex flex-column mt-4 mb-2 w-75"
              onSubmit={handleSubmit}
            >
              <fieldset className="d-flex flex-column mb-3">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    className="form-control"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    placeholder="First Name"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    className="form-control"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    placeholder="Last Name"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Username"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
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
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    className="form-control"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="Address"
                  ></input>
                </div>
              </fieldset>
              <button
                className="btn btn-primary btn-lg"
                type="submit"
                disabled={!isValidForm()}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
