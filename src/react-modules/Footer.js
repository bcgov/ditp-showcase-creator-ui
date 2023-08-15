import React from "react";

const Footer = () => {
  return (
    <footer class="py-6 bg-light-bg-secondary dark:bg-dark-bg-secondary  dark:text-dark-text text-center relative bottom-0 left-0 w-full">
      <p>
        &copy; {new Date().getFullYear()} British Columbia Digital Identity and
        Trust Program. All rights reserved.
      </p>
    </footer>
  );
};

export { Footer };
