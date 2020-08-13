import React, { createContext, useReducer } from "react";
import Axios from "axios";

export const AuthContext = createContext();

const initialState = { isLoggedIn: false, user: null };

function reducer(state, action) {
    switch (action.type) {
        case "SET_USER":
            // console.log("from reducer", action.payload)
            return { isLoggedIn: true, user: action.payload };
        case "CLEAR_USER":
            return { isLoggedIn: false, user: null };

        default:
            throw new Error();
    }
}

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isLoggedIn, user } = state;

    const setAuth = async ({ user, token }) => {
        localStorage.setItem("token", token);
        dispatch({ type: "SET_USER", payload: user });
    };
    const loadUser = async () => {
        const config = {
            headers: {
                "auth-token": localStorage.getItem("token"),
            }
        };
        const user = await Axios.get("http://localhost:5050/user/loaduser", config)
        dispatch({ type: "SET_USER", payload: user });
        console.log("loaduser:", user)
    };

    const clearAuth = async () => {
        localStorage.removeItem("token");
        dispatch({ type: "CLEAR_USER" });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, setAuth, clearAuth, loadUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};
