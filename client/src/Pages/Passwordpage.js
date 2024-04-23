import React from "react";
import "./Passwordpage.css";
import { Typography, Box, Fade } from "@mui/material";
import Gencontainer from "../Components/Generator/Gencontainer";
import Passlength from "../Components/Generator/Passlength";
import PasswordSlideContainer from "../Components/Generator/PasswordSlideContainer";

const Passwordpage = () => {
  return (
    <>
      <Fade in={true} timeout={1000}>
        <div className="passgen-container">
          <h1 className="passgen-title">KingJames Password Generator</h1>
          <p className="passgen-description">
            Ready to fortify your digital defenses? With our password generator
            app, strong and secure passwords are just a blitz away. Say goodbye
            to weak links and hello to ironclad protection. Let's armor up your
            accounts, lightning-fast!
          </p>
        </div>
      </Fade>

      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",

          minHeight: "45vh",
          maxWidth: "50%",
          margin: "0 auto",
          marginTop: "-30px",
          p: 2,
          border: "2px solid #e74c3c",
        }}
      >
        <Gencontainer />
        <Passlength />
        <PasswordSlideContainer />
      </Box>
    </>
  );
};

export default Passwordpage;
