import React from "react";
import Card from "@mui/material/Card";
import "./Carddetail.css";

const Carddetail = ({ title, content }) => {
  return (
    <div>
      <Card variant="outlined" className="card-style">
        <h1 className="text-xl sm:text-2xl ml-3 font-semibold">{title}</h1>
        <p className="text-sm sm:text-sm-con-1 ml-4 mr-4">{content}</p>
      </Card>
    </div>
  );
};

export default Carddetail;
