import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 text-white text-center relative bottom-0 left-0 w-full">
      <p>
        &copy; {new Date().getFullYear()} British Columbia Digital Identity and
        Trust Program. All rights reserved.
      </p>
    </footer>
  );
};

export { Footer };
