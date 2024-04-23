import React from "react";
import "./Cardpassinfo.css";
import Carddetail from "./Carddetail";
import { Fade } from "@mui/material";

const Cardpassinfo = ({ infos }) => {
  return (
    <div className="notes-list">
      {infos.map((info, index) => (
        <Fade
          in={true}
          timeout={1000}
          key={index}
          style={{ transitionDelay: `${index * 600}ms` }}
        >
          <div>
            <Carddetail
              title={info.title}
              content={info.content}
              className="note-list"
            />
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default Cardpassinfo;
