import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white py-6  shadow-inner text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} <strong>Delishify</strong> — Made with ❤️
        for food lovers
      </p>
    </footer>
  );
};

export default Footer;
