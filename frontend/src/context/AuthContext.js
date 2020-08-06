import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = { isLoggedIn: false, user: null };

function reducer(state, action) {
    switch (action.type) {
        case "SET_USER":
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
    const clearAuth = async () => {
        localStorage.removeItem("token");
        dispatch({ type: "CLEAR_USER" });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, setAuth, clearAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};
