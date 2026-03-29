import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

type FooterProps = {
  darkMode: boolean;
};

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer
      className={`${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"
        } border-t ${darkMode ? "border-gray-800" : "border-gray-200"} py-10`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">

        Footer

      </div>

    </footer>
  );
};

export default Footer;
