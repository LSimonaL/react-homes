import React, { useState, useEffect } from "react";
import Home from "./Home";
import axios from "axios";
import { FaChevronRight } from 'react-icons/fa';
import { Link } from "react-router-dom";


const Landing_Page = () => {
    const [homes, setHomes] = useState([]);

    useEffect(() => {
        async function fetchAllHomes() {
            const res = await axios.get("http://localhost:5050/home/");
            setHomes(res.data);
        }

        fetchAllHomes();
    }, []);


    return (
        <div>
            <div style={{
                height: "100vh", display: "block",
                position: "relative",
                paddingBottom: "100px"
            }} className="container h-100">
                <div class="row">
                    {homes.map((home) => (
                        <div
                            className="d-inline p-0 col-md-4 col-sm-12 align-items-center shadow-lg bg-light mb-4 mr-3"
                            key={home._id}
                        >
                            <Home home={home} />
                            <Link className="link" to={`/home/${home._id}`}>
                                <h6 className="pl-3 pb-2 text-uppercase font-weight-bold"><FaChevronRight />  Read more</h6>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Landing_Page;
