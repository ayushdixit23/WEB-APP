"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DarkModeToggle from "./darkMode";
import Search from "../component/Search";
import Home from "../assets/Home";
import Chat from "../assets/Chat";
import Library from "../assets/Lib";
import Sarch from "../assets/Search";
import Setting from "../assets/Setting";
import { useAuthContext } from "../utils/AuthWrapper";

function Sidebar() {
  const { data } = useAuthContext()
  const [sear, setSear] = useState(false);
  const [color, setColor] = useState(1);

  const Map = [
    {
      name: "Home",
      id: 0,
      img: <Home color={color} />,
      path: "/main/feed/newForYou",
      change: 1,
    },
    {
      name: "Chats",
      id: 1,
      img: <Chat color={color} />,
      path: "/main/chat",
      change: 2,
    },
    {
      name: "Library",
      id: 2,
      img: <Library color={color} />,
      path: "/main/library",
      change: 3,
    },
  ];

  useEffect(() => {
    // Wrap the sessionStorage code in a client-side useEffect hook.
    const storedColor =
      JSON.parse(sessionStorage.getItem("selectedColor")) || 1;
    setColor(storedColor);

  }, []); // This should run only in the browser.

  const handleColor = (i) => {
    setColor(i);
    sessionStorage.setItem("selectedColor", JSON.stringify(i));
  };

  return (
    <div className="h-screen w-[70px] bg-[#f9f9f9] dark:bg-[#171717] flex flex-col justify-center items-center">
      {/* Image */}
      <div className="h-screen w-[70px] ring-[#f5f5f5] z-10 dark:bg-[#171717] bg-[#f5f5f5] absolute flex flex-col justify-evenly items-center">
        {data?.dp !== null ? (
          <Link href="/prosite">
            <img
              className="h-[45px] w-[45px] rounded-[20px] ring-1 ring-white bg-yellow-300 "
              src={data?.dp}
              alt="pix"
            />
          </Link>
        ) : (
          <div className="h-[45px] w-[45px] rounded-2xl bg-[#f5f5f5] ring-1 ring-white shadow-sm animate-pulse "></div>
        )}

        <div className="flex flex-col py-20 w-[100%] h-[70%] justify-between items-center md:max-sm:hidden">
          {Map.map((d) => (
            <Link
              key={d.id}
              onClick={() => {
                setSear(false);
                handleColor(d.change);
              }}
              href={d.path}
              className="flex justify-center items-center flex-col"
            >
              <div className="my-1">{d.img}</div>
              <div
                className={`font-medium ${color === d.change
                  ? "text-[14px] text-[#569FF5]"
                  : "text-[14px] dark:text-white  text-[#333]"
                  }`}
              >
                {d.name}
              </div>
            </Link>
          ))}
          <div
            onClick={() => {
              setSear(!sear);
              handleColor(4);
            }}
            className="flex justify-center items-center flex-col"
          >
            <div className="my-1">
              <Sarch color={color} setColor={setColor} />
            </div>
            <div
              className={`font-medium ${color === 4
                ? "text-[14px] text-[#569FF5]"
                : "text-[14px] text-[#333]  dark:text-[#fff]"
                }`}
            >
              Search
            </div>
          </div>
          <Link
            onClick={() => {
              setSear(false);
              handleColor(5);
            }}
            href="/main/settings"
            className="flex  justify-center items-center flex-col"
          >
            <Setting color={color} />
            <div
              className={`font-medium ${color === 5
                ? "text-[14px] text-blue-300 "
                : "text-[14px] text-[#333]  dark:text-[#fff]"
                }`}
            >
              Settings
            </div>
          </Link>
        </div>
        <div className="">
          <DarkModeToggle />
        </div>
      </div>
      <div
        className={`bg-blue-700 border-r-2 border-[#f9f9f9] dark:border-[#171717] md:min-w-[390px] md:[360px] duration-1000 h-screen  ${sear ? "absolute z-0 left-[7.7vh]" : "absolute z-0 -left-[100vh]"
          }`}
      >
        <Search />
      </div>
    </div>
  );
}

export default Sidebar;
