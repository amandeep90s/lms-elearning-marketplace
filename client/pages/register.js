import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

const Register = () => {
  const [name, setName] = useState("Aman");
  const [email, setEmail] = useState("aman@gmail.com");
  const [password, setPassword] = useState("Aman@1234");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:8000/api/register`, {
        name,
        email,
        password,
      });
      setLoading(false);
      toast.success("Registration successful. Please login.");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
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
              <button
                type="submit"
                className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
                disabled={!name || !email || !password || loading}
              >
                {loading ? <SyncOutlined spin /> : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
