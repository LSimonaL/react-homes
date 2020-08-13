import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="fixed-bottom mt-5">
            <p className="text-white py-3 container text-center font-weight-bold">
                <Link style={{ color: "white", fontSize: "24px" }} to={"/gallery"}>
                    Discover Copenhagen
                    </Link>
            </p>

            <div style={{ backgroundColor: "#14213d" }} className="text-center">
                <small style={{ color: "#636e72" }}>Copyright &copy; rentMe</small>
            </div>
        </footer>
    )
}

export default Footer;