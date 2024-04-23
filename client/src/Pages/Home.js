import { Fade } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Cardpassinfo from "../Components/Cardpassinfo";

const Home = () => {
  const [items, setItems] = useState([
    {
      title: "Prevention of Unauthorized Access",
      content:
        " Strong passwords act as a barrier against hacking attempts, reducing the risk of unauthorized entry into accounts or systems.",
    },
    {
      title: "Protection of Personal Information",
      content:
        "Robust passwords safeguard sensitive data from theft or exploitation, preserving the confidentiality of personal and financial details.",
    },
    {
      title: "Maintenance of Online Reputation",
      content:
        "By preventing unauthorized access, strong passwords help uphold the integrity of online identities and safeguard against potential damage to one's reputation or credibility.",
    },
  ]); // Initialize state with sample multi-level list items

  return (
    <>
      <Fade in={true} timeout={1000}>
        <div className="home-container">
          <h1 className="home-title">
            Shield Your Identity: Strong Passwords, Stronger Security!
          </h1>
        </div>
      </Fade>

      <Fade in={true} timeout={1000}>
        <div className="cardcontainer">
          <Cardpassinfo infos={items} />
        </div>
      </Fade>
    </>
  );
};

export default Home;
