import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Button } from "react-bootstrap";
import Home from "../layout/Home"

const Dashboard = () => {
    const { isLoggedIn, user, loadUser } = useContext(AuthContext);
    const { register, handleSubmit, errors } = useForm();
    const [homes, setHomes] = useState([]);
    const [editForm, setEditForm] = useState(false)

    const editHandler = () => {
        setEditForm(true)
    }


    const updateHandler = async (formData) => {
        const url = "http://localhost:5050/user/update";
        const config = {
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        };
        const body = JSON.stringify(formData);
        console.log(body);

        try {
            const res = await Axios.put(url, body, config);
            if (res.data) console.log("data:", res.data);
            await loadUser();
            setEditForm(false);
            console.log("new userdata", user)


        } catch (error) {
            console.log(error.response)
        }

    };

    useEffect(() => {
        async function ownHomes() {
            const res = await Axios.get("http://localhost:5050/user/myhomes");
            setHomes(res.data);
        }

        ownHomes();
    }, []);


    return (
        <div className="container">
            <div className="row">
                {isLoggedIn && (
                    <div className="d-flex">
                        <div className="col-5">
                            <div className="profile-container align-items-center shadow-lg bg-light p-4 mr-4 mb-4">
                                <h5 className="mt-1 text-uppercase text-center font-weight-bold mb-4">profile</h5>
                                {
                                    editForm ?
                                        <form onSubmit={handleSubmit(updateHandler)}>
                                            <label style={{ paddingRight: "10px" }}>Name:</label>
                                            <input className="form-control"
                                                type="text"
                                                placeholder={user.name}
                                                name="name"
                                                // value={user.name}
                                                // onChange={onChangeHandler}
                                                ref={register({
                                                    required: "* Name must be minimum 2 charecters",
                                                    minLength: 3,
                                                    pattern: { value: /^[a-zA-Z\s]+$/ },
                                                })}
                                            />
                                            {errors.name && (
                                                <small className="err-msg">{errors.name.message}</small>
                                            )}

                                            <label style={{ paddingRight: "10px" }}>Email:</label>
                                            <input className="form-control"
                                                type="text"
                                                placeholder={user.email}
                                                name="email"

                                                ref={register({
                                                    required: "* invalid email",
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                })}
                                            />
                                            {errors.email && (
                                                <small className="err-msg">{errors.email.message}</small>
                                            )}
                                            <button className="btn btn-warning btn-block mt-4">Submit</button>
                                        </form>
                                        :
                                        <div>
                                            <table class="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <td scope="col">Name:</td>
                                                        <td>{user.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="col"> Email:</td>
                                                        <td>{user.email}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button className="btn btn-secondary btn-block mt-4" onClick={editHandler}>Edit profile</button>

                                            {/* <Link className="link" to={"/createhome"}>
                                            <button className="btn btn-warning createHomeBtn"> + </button>
                                        </Link> */}
                                        </div>

                                }
                            </div>
                            <div class="text-center profile-container shadow-lg bg-light p-4 mr-4 ">
                                <h5 className="mt-1 text-uppercase text-center font-weight-bold mb-4">add new housing</h5>
                                <Link className="link" to={"/createhome"}>
                                    <Button variant="light" className="createHomeBtn"> + </Button>
                                </Link>
                            </div>

                        </div>
                        <div className="col-7"><Home /></div>
                        {/* <div class="col-4 text-center profile-container shadow-lg bg-light p-4 mr-4">
                            <Link className="link" to={"/createhome"}>
                                <button variant="light" className="createHomeBtn"> + </button>
                            </Link>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
