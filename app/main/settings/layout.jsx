"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";
import LogoutModal from "../../component/LogOut";
// import MobileNav from "../component/MobileNav";
import Image from "next/image";
// import { getData } from "../utils/useful";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../utils/AuthWrapper";
import Cookies from "js-cookie";
import { MdVerified } from "react-icons/md";

export default function SettingLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChildrenHidden, setIsChildrenHidden] = useState(false);
  // const { image, firstname, data?.lastname, advertiserid } = getData()
  const { data, setAuth, setData } = useAuthContext()

  const router = useRouter()

  const handleToggleChildren = () => {
    setIsChildrenHidden(!isChildrenHidden);
  };

  const handleLogout = () => {
    setIsModalOpen(false);

    // Add your logout logic here
  };


  const deleteCookies = () => {
    Cookies.remove(`access_token`)
    Cookies.remove(`refresh_token`)
    setAuth(false)
    setTimeout(() => {
      setData("")
    }, 3000)
    router.push("/login")
  }

  (() => {
    if (
      typeof window !== "undefined" &&
      window.history &&
      window.history.pushState
    ) {
      window.addEventListener("popstate", function () {
        // Check if 'setIsChildrenHidden' is defined and is a function before calling it
        if (typeof setIsChildrenHidden === "function") {
          setIsChildrenHidden(false);
        }
      });
    } else {
      console.warn("History API is not supported by this browser");
    }
  })();

  return (
    <>
      <div className="flex w-screen h-screen">
        {/* <div>
          {data?.type === "Individual" ? <Sidebar /> : <OSidebar />}
        </div>
        <div>
          <MobileNav />
        </div> */}
        <div
          className={`w-full max-h-screen overflow-y-scroll no-scrollbar`}
        >
          <div className="py-4 w-full px-5 h-[12%] shadow-md bg-maincolor">
            <div className="text-2xl py-2 font-semibold">Settings</div>
          </div>
          <div className="bg-[#f8f8f8] max-h-screen dark:bg-[#181a20] grid grid-cols-1 w-full h-[88%] overflow-y-scroll no-scrollbar p-[2%]">
            <div className="grid md:grid-cols-3 sm:grid-cols-5 grid-cols-1 sm:gap-4 md:gap-8">
              <div
                className={`md:col-span-1  sm:col-span-2 h-[90%] rounded-2xl bg-maincolor max-h-screen sm:max-md:p-[2%] p-[3%] ${isChildrenHidden
                  ? "pn:max-sm:hidden"
                  : " pn:max-sm:w-full"
                  }`}
              >
                <div className="flex flex-col ">
                  <div className="flex items-center gap-3 bg-[#f9f9f9] dark:bg-maincolor dark:border dark:border-border sm:max-md:p-2 p-4 rounded-xl">
                    <div>
                      {data?.dp && <img
                        src={data?.dp}
                        width={60}
                        height={60}
                        className="min-w-[50px] max-w-[60px] w-full h-full object-cover rounded-xl"
                        alt="profile"
                      />}
                    </div>
                    <div>
                      <div className="text-lg sm:max-md:text-base font-semibold">
                        {" "}
                        <div className="flex items-center gap-2">
                          <div>  {data?.fullname}</div>
                          {data?.isverified && <div><MdVerified className="text-blue-900" /></div>}
                        </div>

                      </div>
                      <div className="font-medium ">{data?.username}</div>
                    </div>
                  </div>
                  <a
                    target="_blank"
                    href={`https://prosite.grovyo.com/lwozxip?id=${encodeURIComponent(data?.id)}&temp=1`}
                    className="text-base rounded-xl focus:bg-[#f9f9f9] dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] hover:bg-[#f9f9f9] my-2 p-2 py-3  font-semibold"
                  >
                    Customize Your Prosite
                  </a>
                  <a
                    target="_blank"
                    href={`https://workspace.grovyo.com/aybdhw?zyxxpht=${data?.id}&path=/main/dashboard`}
                    className="text-base rounded-xl focus:bg-[#f9f9f9] dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] hover:bg-[#f9f9f9] my-2 p-2 py-3  font-semibold"
                  >
                    View Community Analytics
                  </a>
                  {/* <div className="text-base p-2 py-3  py-4 font-semibold">
  											Help And Support
  										</div> */}
                  <a
                    target="_blank"
                    href={`https://ads.grovyo.com/alginsf?zray=${data?.id}`}
                    className="text-base rounded-xl focus:bg-[#f9f9f9] dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] hover:bg-[#f9f9f9] my-2 p-2 py-3  font-semibold"
                  >
                    Create Your Ad
                  </a>
                  <a
                    target="_blank"
                    href={`https://workspace.grovyo.com/aybdhw?zyxxpht=${data?.id}&path=/main/settings`}
                    className="text-base rounded-xl focus:bg-[#f9f9f9] dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] hover:bg-[#f9f9f9] my-2 p-2 py-3  font-semibold"
                  >
                    Edit Profile
                  </a>
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className=" text-base p-2 py-3 dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] my-1 rounded-xl focus:bg-[#f9f9f9] hover:bg-[#f9f9f9] font-semibold"
                  >
                    Log Out
                  </div>
                  <LogoutModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    // onLogout={handleLogout}
                    onLogout={deleteCookies}
                  />
                </div>
              </div>
              <div
                className={`bg-maincolor overflow-y-scroll no-scrollbar max-h-screen md:col-span-2 sm:col-span-3 rounded-xl ${isChildrenHidden ? "" : "pn:max-sm:hidden"
                  }`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>

      </div >
    </>



  );
}
