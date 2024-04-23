import React from "react";
import "./Footer.css";

const Footer = () => {
  // Define an array of attribution objects
  const attributions = [
    {
      name: "Aldo Cervantes",
      iconLink: "https://www.flaticon.com/free-icons/correct",
      iconTitle: "Correct Icons by Aldo Cervantes - Flaticon",
      siteLink: "https://www.flaticon.com/",
      siteTitle: "Flaticon",
    },
    {
      name: "Vector Squad",
      iconLink: "https://www.flaticon.com/free-icons/login",
      iconTitle: "Login icons created by Vector Squad - Flaticon",
      siteLink: "https://www.flaticon.com/",
      siteTitle: "Flaticon",
    },
    // Add more attribution objects as needed
  ];

  return (
    <footer>
      <div className="attribution">
        {/* Map over the attributions array to render each attribution */}
        {attributions.map((attribution, index) => (
          <span key={index}>
            Icons made by{" "}
            <a
              href={attribution.iconLink}
              title={attribution.iconTitle}
              target="_blank"
              rel="noopener noreferrer"
            >
              {attribution.name}
            </a>{" "}
            from{" "}
            <a
              href={attribution.siteLink}
              title={attribution.siteTitle}
              target="_blank"
              rel="noopener noreferrer"
            >
              {attribution.siteTitle}
            </a>
            {index !== attributions.length - 1 && ", "}{" "}
            {/* Add comma if not the last attribution */}
          </span>
        ))}
      </div>
      {/* Other footer content */}
    </footer>
  );
};

export default Footer;
