import {createContext, useEffect, useReducer} from "react";
import axios from "axios";
import {useRouter} from "next/router";

// initial state
const initialState = {
    user: null
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, user: action.payload};
        case "LOGOUT":
            return {...state, user: null};
        default:
            return state;
    }
}

// context provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user"))
        });
    }, []);

    axios.interceptors.response.use((response) => {
        // any status code that lie within the range of 2XX cause this function to trigger
        return response;
    }, (error) => {
        // any status codes that falls outside the range of 2XX cause this function to trigger
        let res = error.response;
        if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
            return new Promise((resolve, reject) => {
                axios.get("/api/logout").then(async (_) => {
                    dispatch({type: "LOGOUT"});
                    window.localStorage.removeItem("user");
                    await router.push("/login");
                }).catch(err => {
                    console.log("Axios interceptor error", err);
                    reject(err);
                });
            });
        }
        return Promise.reject(error);
    });

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export {Context, Provider};