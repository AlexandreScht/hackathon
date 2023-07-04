import React, { useContext } from "react";
import Login from "./Login";
import HomePage from "./Home"
import { AppContext } from "../hook/AppContext";

const Home = () => {

  return <Login />;
};

Home.isPublic = true;
export default Home;
