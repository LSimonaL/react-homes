import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import { FaChevronRight } from 'react-icons/fa';

const Home = () => {
    const [home, setHome] = useState(undefined);
    const { id } = useParams();

    useEffect(() => {
        async function fetchHome() {
            const url = `http://localhost:5050/home/${id}`;
            const res = await Axios.get(url);
            setHome(res.data);
        }
        fetchHome(); // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="masthead">
                <div className="container">
                    <div className="row align-items-center">
                        <div>
                            {home ? (
                                <div className="d-flex">
                                    {/* <h3 className="font-weight-light text-center">{home.name}</h3> */}
                                    <div className="carousel-wrapper col-7">
                                        <Carousel infiniteLoop useKeyboardArrows autoPlay>
                                            {home.images.map((image) => (
                                                <img
                                                    className="d-block w-100 mr-3"
                                                    src={image.imageLink}
                                                    alt="img"
                                                />
                                            ))}
                                        </Carousel>
                                    </div>
                                    <div className="col-5 ml-0 pt-3 house-info ">
                                        <label className="lead">Rent: </label>
                                        <p className="lead d-inline p-5">{home.rent} kr.</p>
                                        <br />
                                        <label className="lead">Address: </label>
                                        <p className="lead d-inline p-5"> {home.address}</p>
                                        {/* <button className="btn btn-secondary mr-2">Edit details</button>
                                        <button className="btn btn-danger">Delete housing</button> */}
                                        <br />
                                        <Link to={`/home/${home._id}`}>
                                            <button className="btn btn-success mt-2">Contact owner</button>
                                        </Link>
                                    </div>

                                </div>
                            ) : (
                                    <h2 className="text-center">Loading....</h2>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
