import React from "react";
import "./App.css";
import Login from "./components/Login";
import { useEffect,useState } from "react";
import {reducerCases} from './store/Constants'
import { useStateProvider } from "./store/StateProvider";
import Spotify from "./components/Spotify";
const App = () => {
  // const[Logged,setIsLogged]=useState(false)
  const[{token},dispatch]=useStateProvider()
  useEffect(() => {
    const hash = window.location.hash
    if(hash)
    {
      const token=hash.substring(1).split("&")[0].split("=")[1]
      // setIsLogged(true)
      dispatch({
        type:reducerCases.SET_TOKEN,token
      })
    }
 
  }, []);

  return (
    <div className="App">
      {token?<Spotify/>:<Login />}
    </div>
  );
};

export default App;
