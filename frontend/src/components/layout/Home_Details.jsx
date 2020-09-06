import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FaLongArrowAltLeft } from 'react-icons/fa';

const Home = () => {
    const [home, setHome] = useState(undefined);
    const { id } = useParams();

    useEffect(() => {
        async function fetchHome() {
            const url = `/home/${id}`;
            const res = await Axios.get(url);
            setHome(res.data);
        }
        fetchHome(); // eslint-disable-next-line
    }, []);

    const contactOwnerHandler = () => {
        console.log("contactOwnerHandler")
    };

    return (
        <>
            <div className="masthead h-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div>
                            <Link className="link" to={`/`}><FaLongArrowAltLeft style={{ fontSize: "40px", marginBottom: "10px", color: "#14213d" }} /></Link>
                            {home ? (
                                <div className="d-flex ">
                                    <div className="carousel-wrapper col-8">
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
                                    <div className="col-4 ml-0 house-info">
                                        <h3>{home.rooms}-room apartment</h3>
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td scope="col">Rent:</td>
                                                    <td>{home.rent}</td>
                                                </tr>
                                                <tr>
                                                    <td scope="col"> Rooms:</td>
                                                    <td>{home.rooms}</td>
                                                </tr>
                                                <tr>
                                                    <td scope="col"> Address:</td>
                                                    <td>{home.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <br />
                                        <Link to={`/home/${home._id}`}>
                                            <button onClick={contactOwnerHandler} className="btn btn-success btn-block mt-2">Contact owner</button>
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
