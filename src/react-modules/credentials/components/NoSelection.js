import React from "react";

function NoSelection({ Text }) {
  return (
    <>
      <div className="relative h-full">
        <div className="absolute inset-2 no-selection flex justify-center items-center rounded-md">
          <p className="text-slate-100 text-center">{Text}</p>
        </div>
      </div>
      ;
    </>
  );
}

export { NoSelection };
