export const NavBarButton = ({
  src,
  title,
  page,
  changePage,
  currentPage,
}: {
  src: string;
  title: string;
  page: string;
  changePage: (page: string) => void;
  currentPage: string;
}) => {
  return (
    <li
      className={`flex flex-col  items-center justify-between p-3 ${
        currentPage === page ? "yellow-background" : ""
      } ${
        currentPage === page ? "text-light-text" : ""
      } rounded-b-lg bg-slate-900  hover:yellow cursor-pointer hover:text-black`}
      style={{
        width: "106px",
        height: "93px",
        padding: "13px, 0px, 13px, 0px",
      }}
      onClick={() => changePage(page)}
    >
      <div
        className="rounded-full flex justify-center items-center"
        style={{
          backgroundColor: "#D9D9D9",
          boxSizing: "border-box",
          width: "45px",
          height: "45px",
        }}
      >
        <img
          src={src}
          alt={title}
          className="w-45 h-45 text-xs text-gray-500"
        />
      </div>

      <p
        className={`font-bold text-xs text-center  ${
          currentPage === page ? "text-black" : "text-white"
        }`}
      >
        {title}
      </p>
    </li>
  );
};
