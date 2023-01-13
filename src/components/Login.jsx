import React, { Fragment } from "react";
import styled from "styled-components";
import "./login.module.css";

const Login = () => {
  const LoginHandler = () => {
    const clientId = "d1ab262d91884ce3a942139113cb6cd3";
    const redirectUrl = "https://gilded-sherbet-0bf11c.netlify.app/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true `;
    // window.location.href = 'http://www.google.com';
  };
  return (
    <>
      <Container>
        <img
          className="img"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
          alt="spotify"
        />
        <button onClick={LoginHandler}>Connect Spotify</button>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #11d14b;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #26f46e;
    border: none;
    font-size: 25px;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #1c1c1c;
    }
  }
`;

export default Login;
