import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../store/StateProvider";
import { reducerCases } from "../store/Constants";
import { FiRepeat } from "react-icons/fi";
const Playlist = () => {
  const [{ token, playlists}, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlayListData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return {
          name,
          id,
        };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlayListData();
  }, [token, dispatch]);

  const changeCurrentPlaylist=(selectedPlaylistId)=>{
    dispatch({type:reducerCases.SET_PLAYLIST_ID,selectedPlaylistId})
  }

  return (
    <Container>
      <h5>Your Playlists</h5>
     <ul>
     
      {
      
        playlists.map(({name,id})=>{
          return <li key={id} onClick={()=>changeCurrentPlaylist(id)}>{name}</li>
        })
      }
     </ul>
    </Container>
  );
};
const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  h5{
    color: green;
    padding-left: 1rem;
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding: 1rem;
    padding-left: 3rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;
export default Playlist;
