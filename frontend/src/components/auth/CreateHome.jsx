import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateHome = () => {
    const { register, handleSubmit, errors } = useForm();
    const [images, setImages] = useState([]);
    const [feedback, setFeedback] = useState(undefined);

    const onChange = (e) => setImages(images.concat(e.target.files[0]));

    const submitHandler = async (data) => {
        const formData = new FormData();
        formData.append("rooms", data.rooms);
        // formData.append("name", data.name);
        formData.append("rent", data.rent);
        formData.append("address", data.address);
        images.map((image) => formData.append(`images`, image));

        const url = "http://localhost:5050/home/createhome";
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "auth-token": localStorage.getItem("token"),
            },
        };
        const res = await axios.post(url, formData, config);
        console.log(res.data);
        if (res.data.message) setFeedback(res.data.message);
    };

    const handleCreateHome = () => setFeedback(undefined);

    return (
        <div className="container mt-5">

            <div className="auth-wrapper auth-inner">

                {feedback ? (
                    <div>
                        <p>{feedback}</p>
                        <div className="d-inline-block">
                            <button className="btn btn-warning btn-block text-white mb-3" onClick={handleCreateHome}>Create new listing</button>
                            <Link className="link text-white" to={"/dashboard"}><button className="btn btn-secondary btn-block">Back to dashboard</button></Link>
                        </div>
                    </div>
                ) : (
                        <div>
                            <h2 className="text-center mb-3">Create Listing</h2>
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="form-group">
                                    <input
                                        className="form-control mb-2"
                                        type="text"
                                        name="rooms"
                                        placeholder="Rooms"
                                        ref={register({
                                            required: "* Please enter the number of rooms",
                                            minLength: 1,
                                            pattern: { value: /^[0-9]*$/ },
                                        })}
                                    />
                                    {errors.rooms && (
                                        <small className="err-msg">{errors.rooms.message}</small>
                                    )}

                                    <input
                                        className="form-control mb-2"
                                        type="text"
                                        name="rent"
                                        placeholder="Rent"
                                        ref={register({
                                            required: true,
                                            minLength: 1,
                                            pattern: { value: /^[0-9]*$/ },
                                        })}
                                    />
                                    {errors.rent && <small> </small>}

                                    <input
                                        className="form-control mb-2"
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        ref={register({
                                            required: true,
                                            minLength: 5,
                                            // pattern: { value: /^[a-zA-Z\s]+$/ },
                                        })}
                                    />
                                    {errors.address && <small className="err-msg">* Please enter the address </small>}

                                    <input
                                        type="file"
                                        name="image1"
                                        placeholder="browse image"
                                        onChange={onChange}
                                        ref={register({ required: true })}
                                    />
                                    {errors.image && <small className="err-msg">* Please choose an image </small>}

                                    <input
                                        type="file"
                                        name="image2"
                                        placeholder="browse image"
                                        onChange={onChange}
                                        ref={register({ required: true })}
                                    />
                                    {errors.image && <small className="err-msg">* Please choose an image </small>}

                                    <button className="btn btn-warning btn-block mt-2">Create</button>
                                </div>
                            </form>
                        </div>
                    )}
            </div>
        </div >
    );
};

export default CreateHome;
