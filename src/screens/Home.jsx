import React from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <>
      <div>
        <Carousel />
      </div>
      <div className="m-3">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default Home;
