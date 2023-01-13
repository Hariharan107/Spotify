import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../store/StateProvider";
import axios from "axios";
import { reducerCases } from "../store/Constants";
const CurrentTrack = () => {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
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
      }
      // console.log(response.data.item);
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currentlyPlayingImage" />
          </div>
          <div className="track__info">
            <h4 className="h7">{currentlyPlaying.name}</h4>
            <h6 className="h9">{currentlyPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
};
const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    &__image{
        padding-bottom:5px;
    }
    gap: 1rem;
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.12rem;
     

      .h7{
        color: #fff;
        font-size: 1.3rem;
      }
      .h9{
        color: #b3b3b3;
        font-size: 0.9rem;
        padding-bottom:5px;
      }
    }
  }
`;
export default CurrentTrack;
