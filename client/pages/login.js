import React, {useContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {SyncOutlined} from "@ant-design/icons";
import Link from "next/link";
import {Context} from "../context"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // state
    const {state, dispatch} = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const {data} = await axios.post(`/api/login`, {
                email, password,
            });
            dispatch({
                type: "LOGIN",
                payload: data
            })
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast.error(err.response.data);
        }
    };
    return (<>
        <h1 className="py-5 text-white text-center header__cta">Login</h1>

        <div className="container col-md-4 offset-md-4 mt-5 pb-5">
            <div className="shadow p-3 rounded">
                <form onSubmit={handleSubmit}>
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
                            disabled={!email || !password || loading}
                        >
                            {loading ? <SyncOutlined spin/> : "Login"}
                        </button>
                    </div>
                </form>
                <p className="text-center p-3">
                    Not registered yet? {" "}
                    <Link href="/register"><a>Register</a></Link>
                </p>
            </div>
        </div>
    </>);
};

export default Login;
