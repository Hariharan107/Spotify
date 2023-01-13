import React from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import axios from "axios";
import { useStateProvider } from "../store/StateProvider";
import { reducerCases } from "../store/Constants";
const PlayerControls = () => {
  const [{ token, playerState }, dispatch] = useStateProvider();
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
   
    if (response.data !== "") {
      const { item } = response.data;
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
    }
  };
   const changeState = async() => {
        const state=playerState?"pause":"play";
         const response = await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:!playerState})
    }
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev
          onClick={() => {
            changeTrack("previous");
          }}
        />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} size={45} />
        ) : (
          <BsFillPlayCircleFill  onClick={changeState} size={45} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext
          onClick={() => {
            changeTrack("next");
          }}
        />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 10px;
  svg {
    color: #8f8c8c;
    transition: 0.3s ease-in-out;
    &:hover {
      color: #fff;
    }
  }
  .state {
    svg {
      color: #fff;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;

export default PlayerControls;
