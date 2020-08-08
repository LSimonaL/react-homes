import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaChevronRight } from 'react-icons/fa';

const Home = () => {
    const [homes, setHomes] = useState([]);

    useEffect(() => {
        async function fetchAllHomes() {
            const res = await axios.get("http://localhost:5050/home/");
            setHomes(res.data);
        }

        fetchAllHomes();
    }, []);

    return (
        <div class="row">
            {homes.map((home) => (
                <div
                    className="d-inline p-0 col-md-4 col-sm-12 align-items-center shadow-lg bg-light mr-3"
                    key={home._id}
                >
                    <div className="">
                        <Link key={home._id} to={`/home/${home._id}`}>
                            <img
                                className="d-block h-30 w-100"
                                src={home.images[0].imageLink}
                                alt="img"
                            />
                        </Link>
                    </div>
                    <div className="p-3">
                        <h3>{home.name}</h3>

                        {/* <p>Rent: {home.rent}</p>
                        <p>Address: {home.address}</p> */}
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
                        <hr />
                        <Link className="link" to={`/home/${home._id}`}>
                            <h6 className="mt-2 text-uppercase font-weight-bold"><FaChevronRight />  Read more</h6>
                        </Link>

                    </div>
                </div>
            ))}

        </div>
    );
};

export default Home;
