import viteLogo from "/vite.svg";
import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Hero from "./pages/hero/hero";
import Authentication from "./components/authentication/authentication";
import Navbar from "./components/navbar";
import StoreContextProvider from "./context/StoreContext";
import Footer from "./components/Footer/footer";
import Weather from "./pages/weather/weather";
function App() {
  const [showLogin,setShowLogin]=useState(false);
  return (
    
    <>
      <div>
        <BrowserRouter>
          <StoreContextProvider>
            <Navbar setShowLogin={setShowLogin}/>
            {showLogin && <Authentication setShowLogin={setShowLogin} />}
            <Routes>
              <Route path="/" element={<Hero />} />
              {/* <Route path="/weather" element={<Weather/>}/> */}
            </Routes>
            <Footer/>
          </StoreContextProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
