// import React from "react";
// import { useImmer } from "use-immer";

// function FormHeader({
//   setEditButtonClicked,
//   formTitle,
//   formCategory,
//   setComponentToMount,
//   credentialSelected,
//   setShowcaseJSON,
//   selectedIndex,
//   setSelectedIndex,
//   showcaseJSON,
// }) {
//   // const handleClick = () => {
//   //   setEditButtonClicked((prevEditButtonSelected) => !prevEditButtonSelected);
//   //   setComponentToMount("edit");
//   // };

//   // const handleCredentialRemoval = (i) => {
//   //   // if (showcaseJSON.personas[0].onboarding[4].credentials.length == 1) return;
//   //   setShowcaseJSON((json) => {
//   //     json.personas[0].onboarding[4].credentials.splice(selectedIndex, 1);
//   //   });
//   //   console.log(selectedIndex);
//   //   // console.log(i);
//   //   // console.log(showcaseJSON);
//   // };

//   return (
//     <>
//       <div className="flex justify-between mt-3">
//         <div>
//           <p className="text-slate-100 text-sm">{formCategory}</p>
//           <h3 className="text-4xl font-bold text-slate-50">{formTitle}</h3>
//         </div>
//         {
//           <div>
//             <button
//               onClick={() => handleClick()}
//               className=" py-1 px-3 text-sm rounded bg-neutral-700 hover:bg-neutral-600 text-slate-100"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleCredentialRemoval(selectedIndex)}
//               className=" text-sm py-1 px-3 mx-1 rounded bg-neutral-700 hover:bg-neutral-600 text-slate-100"
//             >
//               Delete
//             </button>
//           </div>
//         }
//       </div>
//       <hr></hr>
//     </>
//   );
// }

// export { FormHeader };
