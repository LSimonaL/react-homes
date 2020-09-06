import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Button } from "react-bootstrap";
import Home from "../layout/Home";

const Dashboard = () => {
  const { user, loadUser } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  const [homes, setHomes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState(false);
  const [editHomeId, setEditHomeId] = useState(undefined);
  const [editHomeStatus, setEditHomeStatus] = useState(false);

  const editHandler = () => {
    setEditProfileForm(true);
  };

  const updateHandler = async (formData) => {
    const url = "http://localhost:5050/user/update";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const body = JSON.stringify(formData);

    try {
      const res = await Axios.put(url, body, config);
      if (res.data) console.log("data:", res.data);
      setEditProfileForm(false);
      loadUser();
      console.log("new userdata", user);
    } catch (error) {
      console.log(error.response);
    }
  };

  const loadOwnHomes = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const res = await Axios.get("/user/myhomes", config);
    setHomes(res.data.homes);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      //   loadUser();
    }
    loadOwnHomes();
  }, []);

  const editHomeIdHandler = (id) => {
    setEditHomeId(id);
  };

  const editHomeHandler = async (formData) => {
    const url = `/home/update/${editHomeId}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const body = JSON.stringify(formData);

    try {
      const res = await Axios.put(url, body, config);

      if (res.data) console.log("updadted home data:", res.data);
      setEditHomeStatus(false);
      setEditHomeId(undefined);
      loadOwnHomes();
    } catch (error) {
      console.log("Error: ", error.response);
    }
  };

  // const deleteHomeHandler = () => {
  //   console.log("deleteHomeHandler");
  // };

  return (
    <div className="container">
      <div className="row">
        {isLoggedIn && (
          <div className="d-flex">
            <div className="col-5">
              <div className="profile-container align-items-center shadow-lg bg-light p-4 mr-4 mb-4">
                <h5 className="mt-1 text-uppercase text-center font-weight-bold mb-4">
                  profile
                </h5>
                {editProfileForm ? (
                  <form onSubmit={handleSubmit(updateHandler)}>
                    <label style={{ paddingRight: "10px" }}>Name:</label>
                    <input
                      className="form-control"
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
                    <input
                      className="form-control"
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
                    <button className="btn btn-warning btn-block mt-4">
                      Submit
                    </button>
                  </form>
                ) : (
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
                      <button
                        className="btn btn-secondary btn-block mt-4"
                        onClick={editHandler}
                      >
                        Edit profile
                    </button>
                    </div>
                  )}
              </div>
              <div class="text-center profile-container shadow-lg bg-light p-4 mr-4 ">
                <h5 className="mt-1 text-uppercase text-center font-weight-bold mb-4">
                  add new housing
                </h5>
                <Link className="link" to={"/createhome"}>
                  <Button variant="light" className="createHomeBtn">
                    {" "}
                    +{" "}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="d-flex">
              {homes.map((home) => (
                <div className="col-5">
                  <Home
                    home={home}
                    editHomeId={editHomeId}
                    editHomeHandler={editHomeHandler}
                  />

                  {!editHomeStatus && (
                    <>
                      <button className="btn btn-secondary btn-block" onClick={() => editHomeIdHandler(home._id)}>
                        Edit
                      </button>
                      {/* <button onClick={deleteHomeHandler}>Delete</button> */}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
