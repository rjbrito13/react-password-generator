import React from "react";
import "./Passwordpage.css";
import { Box, Fade } from "@mui/material";
import Gencontainer from "../Components/Generator/Gencontainer";
import Passlength from "../Components/Generator/Passlength";
import PasswordSlideContainer from "../Components/Generator/PasswordSlideContainer";

const Passwordpage = () => {
  return (
    <>
      <Fade in={true} timeout={1000}>
        <div className="passpage-container">
          <h1 className="passpage-title text-2xl sm:text-5xl font-semibold leading-none transition-all duration-500 text-blue-600">
            KingJames Password Generator
          </h1>
          <p className="text-gen-1 sm:text-2xl leading-none transition-all duration-500">
            Ready to fortify your digital defenses? With our password generator
            app, strong and secure passwords are just a blitz away. Say goodbye
            to weak links and hello to ironclad protection. Let's armor up your
            accounts, lightning-fast!
          </p>
        </div>
      </Fade>

      <Box
        className="bg-sky-200 rounded-3xl"
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          minWidth: "380px",
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
