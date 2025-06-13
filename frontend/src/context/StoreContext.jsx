import { createContext } from "react";
import { useState } from "react";
export const StoreContext = createContext(null);
import { ToastContainer, toast } from "react-toastify";
const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  let [data,setData]=useState(null);
  const url = `http://localhost:8000/api/v1/users`;
  //const url = `https://ecotimebackend.onrender.com/api/v1/users`;
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });
  async function checkWeather(city) {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `&q=${city}` + `&appid=${import.meta.env.VITE_API_KEY}`
      );

      var res= await response.json();
      setData(res);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  const contextValue = {
    token,
    setToken,
    url,
    handleError,
    handleSuccess,
    checkWeather,
    data
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
