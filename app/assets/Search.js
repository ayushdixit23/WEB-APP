import React from "react";

function Search({ color }) {
  return (
    <>
      <svg
        className="h-7 w-7 stroke-[1.2px]"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.531 17.4947L15.9395 15.9042M9.17586 16.6995C10.1686 16.6995 11.1516 16.504 12.0687 16.1244C12.9859 15.7447 13.8192 15.1883 14.5212 14.4868C15.2231 13.7853 15.7799 12.9525 16.1598 12.0359C16.5397 11.1193 16.7353 10.137 16.7353 9.14489C16.7353 8.15281 16.5397 7.17045 16.1598 6.25389C15.7799 5.33732 15.2231 4.50452 14.5212 3.80301C13.8192 3.10151 12.9859 2.54504 12.0687 2.16539C11.1516 1.78574 10.1686 1.59033 9.17586 1.59033C7.17098 1.59033 5.24822 2.38626 3.83055 3.80301C2.41289 5.21977 1.61646 7.1413 1.61646 9.14489C1.61646 11.1485 2.41289 13.07 3.83055 14.4868C5.24822 15.9035 7.17098 16.6995 9.17586 16.6995Z"
          className={`${color === 4
              ? " fill-[#d2e7ff] stroke-[#569FF5]"
              : "dark:stroke-white stroke-[#3e3e3e]"
            }`}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export default Search;
