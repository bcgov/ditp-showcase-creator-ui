import React from "react";

const Overview = ({ showcaseJSON }) => {
  console.log(showcaseJSON.personas[0].credentials);
  return (
    <div>
      <pre className="p-10 m-5 border text-xs rounded dark:text-neutral-200 whitespace-pre-wrap break-words">
        {JSON.stringify(showcaseJSON.personas[0].credentials, null, 2)}
      </pre>
    </div>
  );
};

export { Overview };
