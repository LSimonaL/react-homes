import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { AuthContext } from "../../context/AuthContext";

// uncomment this...

const Signup = () => {
    const { register, handleSubmit, errors } = useForm();
    const [err, setErr] = useState(null);
    const history = useHistory();
    const { setAuth } = useContext(AuthContext);

    const signupHandler = async (formData) => {
        const url = "http://localhost:5050/user/register";
        const config = { headers: { "Content-Type": "application/json" } };
        const body = JSON.stringify(formData);
        const res = await Axios.post(url, body, config);
        if (res.data.error) setErr(res.data.error);
        else {
            setAuth(res.data);
            history.push("/createhome");
        }
    };

    return (
        <div className="container mt-5">
            <div className="auth-wrapper auth-inner">
                <h3>Signup</h3>
                {err && <div style={{ color: "#bb0000" }}>{err}</div>}

                <form onSubmit={handleSubmit(signupHandler)}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            ref={register({
                                required: "* Name must be minimum 2 charecters",
                                minLength: 3,
                                pattern: { value: /^[a-zA-Z\s]+$/ },
                            })}
                        />
                        {errors.name && (
                            <small className="err-msg">{errors.name.message}</small>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            name="email"
                            ref={register({
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                },
                            })}
                        />
                        {errors.email && <small>* Invalid email address </small>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            ref={register({
                                required: true,
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/,
                                },
                            })}
                        />
                        {errors.password && (
                            <small>* Minimum 5 alpha numberic charecters </small>
                        )}
                    </div>
                    <button className="btn btn-primary btn-form btn-block">Signup</button>
                </form>
            </div>
        </div>
    );
};
export default Signup;
