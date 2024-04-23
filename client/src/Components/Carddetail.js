import React from "react";
import Card from "@mui/material/Card";
import "./Carddetail.css";

const Carddetail = ({ title, content }) => {
  return (
    <div>
      <Card variant="outlined" className="card-style">
        <h1 className="card-title">{title}</h1>
        <p className="card-content">{content}</p>
      </Card>
    </div>
  );
};

export default Carddetail;
