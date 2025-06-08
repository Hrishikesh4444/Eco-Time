import { createContext } from "react";
import { useState } from "react";
export const StoreContext=createContext(null);
import { ToastContainer, toast } from "react-toastify";
const StoreContextProvider=(props)=>{
    const [token,setToken]=useState("");

    const url="http://localhost:8000/api/v1/users";

    const handleError = (err) =>
        toast.error(err, {
          position: "bottom-left",
        });
      const handleSuccess = (msg) =>
        toast.success(msg, {
          position: "bottom-left",
        });
    const contextValue={
        token,
        setToken,
        url,
        handleError,
        handleSuccess
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

