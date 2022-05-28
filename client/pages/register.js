import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("Aman");
  const [email, setEmail] = useState("aman@gmail.com");
  const [password, setPassword] = useState("Aman@1234");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(`http://localhost:8000/api/register`, {
      name,
      email,
      password,
    });
    console.log("register api response", data);
  };
  return (
    <>
      <h1 className="py-5 text-white text-center header__cta">Register</h1>

      <div className="container col-md-4 offset-md-4 mt-5 pb-5">
        <div className="shadow p-3 rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="mb-1" htmlFor="name">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="email">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="password">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="off"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
