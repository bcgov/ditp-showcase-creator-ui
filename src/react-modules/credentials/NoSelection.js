import React from "react";

function NoSelection({ Text }) {
  return (
    <div className="border border-light dark:border-dark w-full h-full flex items-center justify-center no-selection">
      <p className="text-center">{Text}</p>
    </div>
  );
}

export { NoSelection };
