import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// uncomment this...

const Navbar = () => {
    const { isLoggedIn, user, clearAuth } = useContext(AuthContext);

    useEffect(() => {
        if (!localStorage.getItem("token")) clearAuth(); // eslint-disable-next-line
    }, [isLoggedIn]);

    const logoutHandler = () => clearAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mb-4">
            <div className="container">
                <div className="d-flex align-items-center">
                    <Link className="nav-link" to={"/"}>
                        <h4 className="logo">rentMe</h4>
                    </Link>
                    {isLoggedIn && (
                        <li className="nav-link">
                            <p style={{ margin: "auto" }} className="logo">
                                Welcome back, {user.name}!
              </p>
                        </li>
                    )}
                </div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}>
                            Home
            </Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/createhome"}>
                                    Add new home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/dashboard"}>
                                    My profile
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={"/"} onClick={logoutHandler}>
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>
                                        Login
                </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/signup"}>
                                        Sign up
                </Link>
                                </li>
                            </>
                        )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
