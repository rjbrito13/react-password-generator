import React from "react";
import "./Passlength.css";

const Passlength = () => {
  return (
    <div className="passlength-container">
      <div className="pass-customization">
        <h1 className="text-xl sm:text-3xl leading-none transition-all duration-500 mb-2">Password Customization</h1>
        {/* 
          The class "text-4xl" sets the font size to extra large.
          The class "sm:text-xl" sets the font size to large on small screens and larger.
          The class "text-blue-500" sets the text color to blue. You can change it to any other Tailwind CSS color class.
        */}
      </div>
      <div className="faded-border hidden sm:block"></div>
      <div className="pass-length text-1xl sm:text-3xl leading-none transition-all duration-500">Password Length</div>
    </div>
  );
};

export default Passlength;
