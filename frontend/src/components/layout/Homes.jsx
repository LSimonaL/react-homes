import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Homes = () => {
    const [homes, setHomes] = useState([]);

    useEffect(() => {
        async function fetchAllHomes() {
            const res = await axios.get("http://localhost:5050/home/");
            setHomes(res.data);
        }

        fetchAllHomes();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {homes.map((home) => (
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
                ))}
            </div>
        </div>
    );
};

export default Homes;
