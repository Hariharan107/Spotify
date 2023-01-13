import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../store/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import classes from "./Body.module.css";
import axios from "axios";
import { reducerCases } from "../store/Constants";
const Body = (props) => {
  const Activeclasses = props.headerBackground
    ? classes["active"]
    : classes["inactive"];
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();
  useEffect(() => {
    const getinitialPlayList = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      // console.log(selectedPlaylist);
    };
    getinitialPlayList();
  }, [token, dispatch, selectedPlaylistId]);
  const milliSecondsToMinutesConvertor=(ms)=>
  {
    const minutes=Math.floor(ms/60000)
    const seconds=((ms%60000)/1000).toFixed(0)
    return `${minutes}:${seconds<10?'0':''}${seconds}`
  }
  const playTrack=async(id,name,artists,image,context_uri,track_number)=>
  {
    const response=await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset:{
          position:track_number-1
        },
        position_ms:0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if(response.status===204)
    {
      const currentlyPlaying={
        id,
        name,
        artists,
        image,
      }
      dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying})
      dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true})
    }
    else dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true})
         
  }
  return (
    <Container>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="Playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className={`header__row ${Activeclasses}`}>
              <div className="col">
                <span className="title">#</span>
              </div>
              <div className="col">
                <span className="title">TITLE</span>
              </div>
              <div className="col">
                <span className="title">ALBUM</span>
              </div>
              <div className="col">
                <span className="title">
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div className="row" key={id} onClick={()=>{playTrack(id,name,artists,image,context_uri,track_number)}}>
                      <div className="col">
                        <span>{index+1}</span>
                      </div>
                      <div className="col detail">
                        <img src={image} alt="" />
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{milliSecondsToMinutesConvertor(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      color: #e0dede;
      .title {
        color: #fff;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 13.5vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
export default Body;
