import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Home = (props) => {
  const { handleSubmit, errors, register } = useForm();
  const { home, editHomeId, editHomeHandler } = props;

  return (
    <>

      <div className="">
        <Link key={home._id} to={`/home/${home._id}`}>
          <img
            className="d-block h-30 w-100"
            src={home.images[0].imageLink}
            alt="img"
          />
        </Link>
      </div>
      <div className="px-3 pt-3">
        <h3>{home.rooms}-room apartment</h3>
        {editHomeId == home._id ? (
          // <form onSubmit={handleSubmit(editHomeHandler)}>
          <form onSubmit={handleSubmit(editHomeHandler)}>
            <label style={{ paddingRight: "10px" }}>Rent:</label>
            <input
              className="form-control"
              type="text"
              placeholder={home.rent}
              name="rent"
              // value={user.name}
              // onChange={onChangeHandler}
              ref={register({
                required: "* Rent must be number",
                minLength: 1,
                //TODO : fix the regex
                // pattern: { value: /^[a-zA-Z\s]+$/ },
              })}
            />
            {errors.rent && (
              <small className="err-msg">{errors.rent.message}</small>
            )}

            <label style={{ paddingRight: "10px" }}>Rooms:</label>
            <input
              className="form-control"
              type="text"
              placeholder={home.rooms}
              name="rooms"
              ref={register({
                required: "* invalid rooms",
                //TODO : fix the regex
                // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
            />
            {errors.rooms && (
              <small className="err-msg">{errors.rooms.message}</small>
            )}

            <label style={{ paddingRight: "10px" }}>Address:</label>
            <input
              className="form-control"
              type="text"
              placeholder={home.address}
              name="address"
              ref={register({
                required: "* invalid address",
                //TODO : fix the regex
                // pattern: { value: /^[a-zA-Z\s]+$/ },
              })}
            />
            {errors.address && (
              <small className="err-msg">{errors.address.message}</small>
            )}
            {/* <input type="submit" value="Update" /> */}

            <button className="btn btn-warning btn-block mt-4">Update</button>
          </form>
        ) : (
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td scope="col">Rent:</td>
                  <td>{home.rent}</td>
                </tr>
                <tr>
                  <td scope="col"> Address:</td>
                  <td>{home.address}</td>
                </tr>
              </tbody>
            </table>
          )}
        <hr />
      </div>
    </>
  );
};

export default Home;
