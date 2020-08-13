import React from "react";
import Home from "./Home";


const Landing_Page = () => {


    return (
        <div>
            <div style={{
                height: "100vh", display: "block",
                position: "relative",
                paddingBottom: "100px"
            }} className="container h-100">
                <Home />
            </div>

        </div>
    );
};

export default Landing_Page;
