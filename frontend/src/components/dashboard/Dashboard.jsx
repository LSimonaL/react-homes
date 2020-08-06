import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Dashboard = () => {
    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <div className="container">
            <div className="row">
                {isLoggedIn && (
                    <div>
                        <label style={{ paddingRight: "10px" }}>Name:</label>
                        <p style={{ display: "inline" }}>{user.name}</p>
                        {/* <p style={{ display: "inline" }}>Simona</p> */}
                        <br />
                        <label style={{ paddingRight: "10px" }}>Email</label>
                        <p style={{ display: "inline" }}>{user.email}</p>
                        {/* <p style={{ display: "inline" }}>email@email</p> */}

                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
