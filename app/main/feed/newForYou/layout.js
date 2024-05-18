"use client";
import Image from "next/image";
import Empty from "../../../assets/Images/community.png";
import { useAuthContext } from "../../../utils/AuthWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../Essentials";
import Link from "next/link";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import styles from "../../../CustomScrollbarComponent.module.css";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDate, formatDateToString } from "../../../utils/useful";
import { VscSend } from "react-icons/vsc";
import { PiHandsClapping } from "react-icons/pi";

export default function NewforyouLayout({ children }) {
  const { data } = useAuthContext();
  const [feed, setFeed] = useState([]);

  const fetchfeed = async () => {
    try {
      const res = await axios.get(`${API}/newfetchfeeds3/${data?.id}`);
      console.log(res.data);
      if (res.data.success) {
        setFeed(res.data?.mergedData);
        // setFeed(res.data?.mergedData.slice(0, 1));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinmembers = async (comId) => {
    try {
      const res = await axios.post(`${API}/joinmember/${data?.id}/${comId}`);
      if (res.data.success) {
        await fetchfeed();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const unjoinmembers = async (comId) => {
    try {
      const res = await axios.post(`${API}/unjoinmember/${data?.id}/${comId}`);
      if (res.data.success) {
        await fetchfeed();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadmoreData = async () => {
    try {
      const res = await axios.get(`${API}/fetchmorefeeddata/${data?.id}`);
      console.log(res.data);
      if (res.data.success) {
        setFeed([...feed, ...res.data.mergedData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.id) {
      fetchfeed();
    }
  }, [data]);

  return (
    <>
      <div className="w-[100%] h-screen bg-white dark:bg-[#171717]  flex pn:max-md:justify-center ">
        <div className=" pn:max-md:h-[96vh] h-screen  overflow-auto scrollbar-hide  dark:bg-[#171717]  pn:max-sm:pt-16 pt-14 select-none md:min-w-[390px] lg:w-[360px] flex flex-col items-center md:border-r-2 border-[#f7f7f7] dark:border-[#171717] self-end ">
          {/* post 1*/}

          <div
            id="scrollableDiv"
            style={{
              height: "100vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
            className={`pn:max-sm:w-[100vw] ${styles.customScrollbar}`}
          >
            {/*Put the scroll bar always on the bottom*/}
            <InfiniteScroll
              dataLength={feed.length}
              next={loadmoreData}
              loader={
                <>
                  <div className="bg-slate-50 pn:max-sm:p-3 w-[100%] pn:max-sm:w-[100vw] p-4 pn:max-md:rounded-2xl dark:bg-[#242424]">
                    <div className="w-[100%] rounded-2xl flex flex-col items-center ">
                      <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
                        <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
                          <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse "></div>
                        </div>

                        <div className="flex flex-col w-[100%] justify-center px-2 items-start">
                          <div className="flex flex-col space-y-1 items-center">
                            <div className="text-black text-[13px] w-[100px] h-[20px] bg-slate-200 rounded-lg animate-pulse"></div>
                            <div className="text-black text-[13px] w-[100px] h-[10px] bg-slate-200 rounded-lg animate-pulse"></div>
                          </div>
                        </div>

                        <div className="cursor-pointer bg-slate-200 rounded-2xl animate-pulse flex h-[35px] w-[25%]  justify-center items-center "></div>
                      </div>
                    </div>

                    <div className="h-[300px] sm:h-[250px] rounded-2xl bg-slate-200 animate-pulse w-full flex justify-center items-center "></div>
                    <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
                      <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg animate-pulse my-1"></div>
                      <div className="flex flex-row justify-start w-[100%]">
                        <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 animate-pulse"></div>
                        <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 animate-pulse"></div>
                        <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 animate-pulse"></div>
                        <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-b-[0.5px] "></div>
                  <div className="bg-slate-50 pn:max-sm:p-3 w-[100%] pn:max-sm:w-[100vw] p-4 pn:max-md:rounded-2xl dark:bg-[#242424]">
                    <div className="w-[100%] rounded-2xl flex flex-col items-center ">
                      <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
                        <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
                          <div className="h-[35px] w-[35px] rounded-2xl bg-slate-200 animate-pulse "></div>
                        </div>

                        <div className="flex flex-col w-[100%] justify-center px-2 items-start">
                          <div className="flex flex-col space-y-1 items-center">
                            <div className="text-black text-[13px] w-[100px] h-[20px] bg-slate-200 rounded-lg animate-pulse"></div>
                            <div className="text-black text-[13px] w-[100px] h-[10px] bg-slate-200 rounded-lg animate-pulse"></div>
                          </div>
                        </div>

                        <div className="cursor-pointer bg-slate-200 rounded-2xl animate-pulse flex h-[35px] w-[25%]  justify-center items-center "></div>
                      </div>
                    </div>

                    <div className="h-[300px] sm:h-[250px] rounded-2xl bg-slate-200 animate-pulse w-full flex justify-center items-center "></div>
                    <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
                      <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg animate-pulse my-1"></div>
                      <div className="flex flex-row justify-start w-[100%]">
                        <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 animate-pulse"></div>
                        <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 animate-pulse"></div>
                        <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 animate-pulse"></div>
                        <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-b-[0.5px] "></div>
                  <div className="bg-slate-50 pn:max-sm:p-3 w-[100%] pn:max-sm:w-[100vw] p-4 pn:max-md:rounded-2xl dark:bg-[#242424]">
                    <div className="w-[100%] rounded-2xl flex flex-col items-center ">
                      <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
                        <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
                          <div className="h-[25px] w-[25px] rounded-2xl bg-slate-200 animate-pulse "></div>
                        </div>

                        <div className="flex flex-col w-[100%] justify-center px-2 items-start">
                          <div className="flex flex-col space-y-1 items-center">
                            <div className="text-black text-[13px] w-[100px] h-[20px] bg-slate-200 rounded-lg animate-pulse"></div>
                            <div className="text-black text-[13px] w-[100px] h-[10px] bg-slate-200 rounded-lg animate-pulse"></div>
                          </div>
                        </div>

                        <div className="cursor-pointer bg-slate-200 rounded-2xl animate-pulse flex h-[35px] w-[25%]  justify-center items-center "></div>
                      </div>
                    </div>

                    <div className="h-[300px]  sm:h-[250px] rounded-2xl bg-slate-200 animate-pulse w-full flex justify-center items-center "></div>
                    <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
                      <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg animate-pulse my-1"></div>
                      <div className="flex flex-row justify-start w-[100%]">
                        <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 animate-pulse"></div>
                        <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 animate-pulse"></div>
                        <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 animate-pulse"></div>
                        <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-b-[0.5px] "></div>
                </>
              }
              hasMore={true}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              inverse={false} //
              scrollableTarget="scrollableDiv"
            >
              <div className="my-1 bg-white">
                {feed.map((d, i) => (
                  <Link
                    href={`/main/feed/newForYou/${d?.posts?.community._id}`}
                    key={i}
                    className="bg-slate-50 pn:max-md:rounded-2xl dark:bg-[#242424]"
                  >
                    {/* top */}

                    {console.log(d)}
                    <div className="w-[100%] bg-white flex px-1 justify-between items-center ">
                      <div className="h-[55px] pn:max-sm:h-[50px] flex flex-row items-center ">
                        <div className=" flex object-scale-down items-center h-[100%] ">
                          <img
                            src={d?.dps}
                            className="h-[35px] w-[35px] pn:max-sm:w-[30px] pn:max-sm:h-[30px] pn:max-sm:rounded-[13px] rounded-[15px] ring-1 ring-white bg-yellow-300 "
                          />
                        </div>
                        {/* Community name */}
                        <div className="flex flex-col justify-center px-2 items-start">
                          <div className="flex flex-col space-y-[0.5px] justify-start items-start">
                            <div className="text-[14px] pn:max-sm:text-[12px] font-semibold">
                              {d?.posts?.community?.title}
                            </div>
                            <div className="flex">
                              <div className="text-[10px] pn:max-sm:text-[10px] font-medium text-[#5C5C5C]">
                                By {d?.posts?.sender?.fullname}
                              </div>
                              <div className="text-[10px] font-medium text-[#5C5C5C]">
                                . {formatDate(d?.posts?.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Animation of join nd bell */}
                      {d?.subs === "unsubscribed" ? (
                        <div
                          onClick={() => joinmembers(d?.posts?.community._id)}
                          className="bg-[#f5f5f5] p-2 px-4 rounded-xl text-[12px] font-medium text-[#5c5c5c]"
                        >
                          Join
                        </div>
                      ) : (
                        <div
                          onClick={() => unjoinmembers(d?.posts?.community._id)}
                          className="  rounded-xl text-[14px] text-[#5c5c5c]"
                        ></div>
                      )}
                    </div>

                    {/* POst */}
                    <div className="px-1">
                      <div className="bg-[#f4f4f4] rounded-xl w-full flex flex-col justify-center items-center ">
                        <>
                          {d?.urls.length > 1 ? (
                            <>
                              {d?.urls.map((f) => (
                                <div className="sm:h-[260px] h-[300px] w-full rounded-xl ">
                                  {
                                    f?.type.startsWith("image") ? (
                                      <div className="h-full w-full p-1">
                                        <img
                                          src={f?.content}
                                          className="h-full object-contain bg-black rounded-2xl w-full"
                                        />
                                      </div>
                                    ) : (
                                      <div className="p-1 h-full">
                                        <div className=" rounded-2xl h-full overflow-hidden">
                                          <MediaPlayer
                                            src={f?.content}
                                            onQualitiesChange={480}
                                            className="h-[300px] sm:h-[260px]"
                                          >
                                            <MediaProvider />
                                            <DefaultVideoLayout
                                              thumbnails={f?.content}
                                              icons={defaultLayoutIcons}
                                            />
                                          </MediaPlayer>
                                        </div>
                                      </div>
                                    )
                                    // <video src={f?.content} controls className="max-h-full" />
                                  }
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              <div className="sm:h-[260px] h-[300px] w-full rounded-xl ">
                                {
                                  d?.urls[0]?.type.startsWith("image") ? (
                                    <div className="h-full w-full p-1">
                                      <img
                                        src={d?.urls[0]?.content}
                                        className="h-full object-contain bg-black rounded-2xl w-full"
                                      />
                                    </div>
                                  ) : (
                                    <div className="p-1 h-full">
                                      <div className=" rounded-2xl h-full overflow-hidden">
                                        <MediaPlayer
                                          src={d?.urls[0]?.content}
                                          onQualitiesChange={480}
                                          className="h-[300px] sm:h-[260px]"
                                        >
                                          <MediaProvider />
                                          <DefaultVideoLayout
                                            thumbnails={d?.urls[0]?.content}
                                            icons={defaultLayoutIcons}
                                          />
                                        </MediaPlayer>
                                      </div>
                                    </div>
                                  )
                                  // <video src={f?.content} controls className="max-h-full" />
                                }
                              </div>
                            </>
                          )}
                        </>

                        <div className="h-[20px] sm:h-[25px] px-2 w-[100%] flex flex-col">
                          <div className="text-[14px] pn:max-sm:text-[12px] text-black w-[100%] font-medium text-ellipsis overflow-hidden px-1">
                            {d?.posts.title}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* end */}
                    <div className="px-2 py-1 w-full h-[40px] flex justify-between items-center">
                      <div className="flex flex-row gap-2 items-center  w-[100%]">
                        <div className="flex flex-row justify-start mt-1 ">
                          <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 ">
                            <img
                              src={d?.memdps[0]}
                              className="h-[20px] w-[20px] rounded-2xl bg-yellow-300 "
                            />
                          </div>
                          <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 ">
                            {" "}
                            <img
                              src={d?.memdps[1]}
                              className="h-[20px] w-[20px] rounded-2xl bg-yellow-300 "
                            />
                          </div>
                          <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 ">
                            {" "}
                            <img
                              src={d?.memdps[2]}
                              className="h-[20px] w-[20px] rounded-2xl bg-yellow-300 "
                            />
                          </div>
                          <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 ">
                            {" "}
                            <img
                              src={d?.memdps[3]}
                              className="h-[20px] w-[20px] rounded-2xl bg-yellow-300 "
                            />
                          </div>
                        </div>
                        <div className="text-[12px] self-center mt-1 font-medium">
                          {d?.posts?.community?.memberscount}{" "}
                          <span> Memder</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div
                          className={`flex justify-center rounded-xl items-center gap-1 ${d?.liked ? "bg-[#bc7e36] text-white" : "bg-[#f4f4f4]"
                            }  p-2`}
                        >
                          <PiHandsClapping />
                          <div className="text-[12px]">{d?.posts?.likes}</div>
                        </div>
                        <div className="rounded-xl bg-[#f4f4f4] p-2">
                          <VscSend />
                        </div>
                      </div>
                    </div>
                    <div className="w-full border-b-[0.5px] "></div>
                  </Link>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>

        <div className="w-full pn:max-sm:hidden"> {children}</div>
      </div>
    </>
  );
}
