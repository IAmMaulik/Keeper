import React from "react";

const currentDate = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; {currentDate}</p>
    </footer>
  );
};

export default Footer;
