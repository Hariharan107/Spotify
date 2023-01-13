import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../store/StateProvider";
import classes from './Navbar.module.css'
const Navbar = (props) => {
  const [{userInfo}] = useStateProvider();
  return (
    <Container className={props.navBackground ? classes['active'] :classes['inactive']} >
      <div className="search__bar">
        <FaSearch size={20} />
        <input
          type="text"
          placeholder="Search for Artists, Songs, or Podcasts"
        />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile size={30} />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 13.5vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
export default Navbar;
