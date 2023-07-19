import React from "react";

function NoSelection({ Text }) {
  return (
    <div className="border w-full h-full flex items-center justify-center no-selection">
      <p className="text-slate-100 text-center">{Text}</p>
    </div>
  );
}

export { NoSelection };
