import React, { useEffect,useRef,useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import axios from "axios";
import { useStateProvider } from "../store/StateProvider";
import { reducerCases } from "../store/Constants";

const Spotify = () => {
  const [{token}, dispatch] = useStateProvider();
  const bodyRef=useRef()
  const [navBackground,setnavBackground]=useState(false)
  const [headerBackground,setHeaderBackground]=useState(false)
  const bodyScrolled=()=>
  {
    bodyRef.current.scrollTop>=30?setnavBackground(true):setnavBackground(false)
    bodyRef.current.scrollTop>=268?setHeaderBackground(true):setHeaderBackground(false)

  }
  useEffect(()=>{
    const getUserInfo=async()=>
    {
      const response=await axios.get("https://api.spotify.com/v1/me",
      {
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"application/json"
        },
      })
      const userInfo={
        userId:response.data.id,
        userName:response.data.display_name,       
      }
      dispatch({type:reducerCases.SET_USERS,userInfo})
    }
    getUserInfo()
  },[dispatch,token])
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground}/>
          <div className="body__contents">
            <Body headerBackground={headerBackground}/>
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
};
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
export default Spotify;
