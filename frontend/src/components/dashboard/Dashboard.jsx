import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import Axios from "axios";

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
            const res = await axios.get("http://localhost:5050/user/myhomes");
            setHomes(res.data);
        }

        ownHomes();
    }, []);


    return (
        <div className="container">
            <div className="row">
                {isLoggedIn && (
                    <div>
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
                                    <button>Submit</button>


                                </form>

                                :
                                <div>
                                    <label style={{ paddingRight: "10px" }}>Name:</label>
                                    <p style={{ display: "inline" }}>{user.name}</p>

                                    <br />
                                    <label style={{ paddingRight: "10px" }}>Email</label>
                                    <p style={{ display: "inline" }}>{user.email}</p>
                                    <br />
                                    <button onClick={editHandler}>Edit</button>


                                </div>

                        }
                        <div
                            className="d-flex align-items-center shadow-lg bg-light mb-3 "
                            key={home._id}
                        >
                            <div className="col-4">
                                <Link key={home._id} to={`/home/${home._id}`}>
                                    <img
                                        className="d-block h-30 w-100 m-4"
                                        src={home.images[0].imageLink}
                                        alt="img"
                                    />
                                </Link>
                            </div>
                            <div className="col-8 ml-5">
                                <h3>{home.name}</h3>
                                <p>Rent: {home.rent}</p>
                                <p>Address: {home.address}</p>
                                <Link to={`/home/${home._id}`}>
                                    <button className="btn btn-warning mt-2">See house</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Dashboard;
