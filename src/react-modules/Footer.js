import React from "react";

const Footer = () => {
  return (
    <footer
      class="py-6 text-white text-center relative bottom-0 left-0 w-full"
      style={{ backgroundColor: "#454545" }}
    >
      <p>
        &copy; {new Date().getFullYear()} British Columbia Digital Identity and
        Trust Program. All rights reserved.
      </p>
    </footer>
  );
};

export { Footer };
