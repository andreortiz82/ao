import React from "react";

const ImageMarquee = ({ children, speed = 10 }) => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {children}
        {children}
      </div>
    </div>
  );
};

export default ImageMarquee;
