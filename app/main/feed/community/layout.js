"use client";
import Image from "next/image";
// import Empty from "../../../assets/Images/community.png";
import { useAuthContext } from "../../../utils/AuthWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../Essentials";
import Link from "next/link";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

export default function CommunityLayout({ children }) {
  const { data } = useAuthContext();
  const [feed, setFeed] = useState([]);

  const comfetchfeed = async () => {
    try {
      const res = await axios.get(`${API}/joinedcomnews3/${data?.id}`);
      console.log(res.data, "com");
      setFeed(res.data?.mergedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.id) {
      comfetchfeed();
    }
  }, [data]);

  return (
    <>
      {/* <div className=" w-[100%] h-screen dark:bg-[#000] bg-white flex pn:max-md:justify-center"> */}
      {/* <div className="h-screen overflow-auto scrollbar-hide pt-24 select-none md:min-w-[390px] md:w-[360px] flex flex-col items-center pn:max-sm:pb-36 md:pt-14 md:border-r-2 border-[#f7f7f7] dark:border-[#171717] self-end "></div> */}
      {/* Header */}
      {/* <div className="pn:max-md:hidden w-[100%]">{children}</div> */}
      {/* // Empty */}
      {/* <div className="w-[100%] pn:max-md:hidden flex p-2 bg-white dark:bg-[#171717] text-[#3e3e3e] flex-col justify-center items-center">
        <div className="flex bg-[#f9f9f9] p-4 py-8 rounded-2xl justify-center flex-col items-center">
          <Image src={Empty} alt="empty" />
          <div className="text-[20px] font-bold">
            Open Community To see Posts
          </div>
          <div className="font-medium">No messages in your inbox</div>
        </div>
      </div> */}

      {/*      
    </div> */}
      {/*if no data*/}
      <div className="w-[100%] h-screen bg-white dark:bg-[#171717]  flex pn:max-md:justify-center ">
        <div className=" pn:max-md:h-[96vh] h-screen overflow-auto scrollbar-hide dark:bg-[#171717] py-12 pn:max-sm:pt-20 select-none md:min-w-[390px] md:w-[360px] flex flex-col items-center pb-20 md:pt-10 md:border-r-2 border-[#f7f7f7] dark:border-[#171717]  self-end ">
          {/* post 1*/}
          <div className="mt-10">
            <a
              target="_blank"
              href={`https://workspace.grovyo.com/aybdhw?zyxxpht=${data?.id}&path=/main/community/createCommunity`}
            >
              Create Community
            </a>
          </div>

          {feed.map((d, i) => (
            <Link
              href={`/main/feed/community/${d?.community?._id}`}
              key={i}
              className="bg-slate-50 pn:max-md:rounded-2xl dark:bg-[#242424]"
            >
              <div className="w-[100%] rounded-2xl flex flex-col items-center ">
                <div className="w-[100%] bg-white flex px-1 justify-between items-center ">
                  <div className="h-[55px]  flex flex-row items-center ">
                    <div className=" flex object-scale-down items-center h-[100%] ">
                      <img
                        src={d?.dps}
                        className="h-[45px] w-[45px] pn:max-sm:w-[35px] pn:max-sm:h-[35px] pn:max-sm:rounded-[15px] rounded-[20px] ring-1 ring-white bg-yellow-300 "
                      />
                    </div>
                    {/* Community name */}
                    <div className="flex flex-col justify-center px-2 items-start">
                      <div className="flex flex-col space-y-[0.5px] justify-start items-start">
                        <div className="text-[16px] pn:max-sm:text-[14px] font-medium">
                          {d?.community?.title}
                        </div>
                        <div className="flex">
                          <div className="text-[12px] pn:max-sm:text-[10px] font-medium text-[#5C5C5C]">
                            By {d?.community?.creator?.fullname}
                          </div>
                          {/* <div className="text-[12px] pn:max-sm:text-[10px] font-medium text-[#5C5C5C]">
                                . {formatDate(d?.posts?.createdAt)}
                              </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Animation of join nd bell */}
                  {/* {d?.subs === "unsubscribed" ? (
                        <div
                          onClick={() => joinmembers(d?.posts?.community._id)}
                          className="bg-[#f5f5f5] p-2 px-4 rounded-xl pn:max-sm:text-[12px] font-medium text-[14px] text-[#5c5c5c]"
                        >
                          Join
                        </div>
                      ) : (
                        <div
                          onClick={() => unjoinmembers(d?.posts?.community._id)}
                          className="  rounded-xl text-[14px] text-[#5c5c5c]"
                        ></div>
                      )} */}
                </div>
              </div>

              {/* POst */}

              <div className="h-[210px] rounded-xl w-[360px] flex justify-center items-center">
                {/* {d?.urls.map((f) => (
                  <div className="h-full w-full rounded-xl ">
                    {f?.type.startsWith("image") ? (
                      <img
                        src={f?.content}
                        className="h-full p-2 rounded-2xl w-full"
                      />
                    ) : (
                
                      <div className="p-2 h-full">
                        <div className=" rounded-2xl h-full overflow-hidden">
                          <MediaPlayer src={f?.content} onQualitiesChange={480}>
                            <MediaProvider />
                            <DefaultVideoLayout
                              thumbnails={f?.content}
                              icons={defaultLayoutIcons}
                            />
                          </MediaPlayer>
                        </div>
                      </div>
                    )}
                  </div>
                ))} */}

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
              </div>

              <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
                <div className="text-[16px] pn:max-sm:text-[14px] text-black w-[100%] font-medium text-ellipsis overflow-hidden px-1">
                  {d?.posts[0]?.title}
                </div>
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
                    {d?.posts?.community?.memberscount} <span> Member</span>
                  </div>
                </div>
              </div>
              <div className="w-full border-b-[0.5px] mt-2"></div>
            </Link>
          ))}

          {/* POst */}
        </div>
        {/* <div className="w-[100%] pn:max-md:hidden  flex p-2 bg-white dark:bg-[#171717] text-[#3e3e3e] bg-green-600 flex-col justify-center items-center">
          <div className="flex bg-[#f9f9f9]  dark:bg-[#1d1d1d] dark:text-[#fff] p-4 py-8 rounded-2xl justify-center flex-col items-center">
            <Image src={Empty} alt="empty" />
            <div className="text-[20px] font-bold">
              Open Community To see Posts
            </div>
            <div className="font-medium">No messages in your inbox</div>
          </div>
        </div> */}
        <div className="w-full pn:max-sm:hidden"> {children}</div>
      </div>
    </>
  );
}

{
  /* post 1*/
}
<div className="bg-slate-50 pn:max-sm:p-3 p-4 pn:max-md:rounded-2xl dark:bg-[#242424]">
  <div className="w-[100%] rounded-2xl flex flex-col items-center ">
    <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
      <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
        <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse "></div>
      </div>
      {/* Community name */}
      <div className="flex flex-col w-[60%] justify-center px-2 items-start">
        <div className="flex flex-col space-y-1 items-center">
          <div className="text-black text-[13px] w-[100px] h-[20px] bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="text-black text-[13px] w-[100px] h-[10px] bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Animation of join nd bell */}

      <div className="cursor-pointer bg-slate-200 rounded-2xl animate-pulse flex h-[35px] w-[25%]  justify-center items-center "></div>
    </div>
  </div>

  {/* POst */}

  <div className="h-[200px] rounded-2xl bg-slate-200 animate-pulse w-[360px] flex justify-center items-center "></div>
  <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
    <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg animate-pulse my-1"></div>
    <div className="flex flex-row justify-start w-[100%]">
      <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 animate-pulse"></div>
      <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 animate-pulse"></div>
      <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 animate-pulse"></div>
      <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 animate-pulse"></div>
    </div>
  </div>
</div>;
{
  /* post 2*/
}
<div className="bg-slate-50 pn:max-sm:p-3 p-4 pn:max-md:rounded-2xl dark:bg-[#242424]">
  <div className="w-[100%] rounded-2xl flex flex-col items-center ">
    <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
      <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
        <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse "></div>
      </div>
      {/* Community name */}
      <div className="flex flex-col w-[60%] justify-center px-2 items-start">
        <div className="flex flex-col space-y-1 items-center">
          <div className="text-black text-[13px] w-[100px] h-[20px] bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="text-black text-[13px] w-[100px] h-[10px] bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Animation of join nd bell */}

      <div className="cursor-pointer bg-slate-200 rounded-2xl animate-pulse flex h-[35px] w-[25%]  justify-center items-center "></div>
    </div>
  </div>

  {/* POst */}

  <div className="h-[200px] rounded-2xl bg-slate-200 animate-pulse w-[360px] flex justify-center items-center "></div>
  <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
    <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg animate-pulse my-1"></div>
    <div className="flex flex-row justify-start w-[100%]">
      <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 animate-pulse"></div>
      <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 animate-pulse"></div>
      <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 animate-pulse"></div>
      <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 animate-pulse"></div>
    </div>
  </div>
</div>;
{
  /* post 3*/
}
<div className="bg-slate-50 pn:max-sm:p-3 p-4 pn:max-md:rounded-2xl dark:bg-[#242424]">
  <div className="w-[100%] rounded-2xl flex flex-col items-center ">
    <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
      <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
        <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse "></div>
      </div>
      {/* Community name */}
      <div className="flex flex-col w-[60%] justify-center px-2 items-start">
        <div className="flex flex-col space-y-1 items-center">
          <div className="text-black text-[13px] w-[100px] h-[20px] bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="text-black text-[13px] w-[100px] h-[10px] bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Animation of join nd bell */}

      <div className="cursor-pointer bg-slate-200 rounded-2xl animate-pulse flex h-[35px] w-[25%]  justify-center items-center "></div>
    </div>
  </div>

  {/* POst */}

  <div className="h-[200px] rounded-2xl bg-slate-200 animate-pulse w-[360px] flex justify-center items-center "></div>
  <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
    <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg animate-pulse my-1"></div>
    <div className="flex flex-row justify-start w-[100%]">
      <div className="h-[20px] w-[20px] rounded-lg z-30 bg-slate-200 animate-pulse"></div>
      <div className="h-[20px] w-[20px] rounded-lg z-20 -ml-[10px] bg-slate-300 animate-pulse"></div>
      <div className="h-[20px] w-[20px] rounded-lg z-10 -ml-[10px] bg-slate-400 animate-pulse"></div>
      <div className="h-[20px] w-[20px] rounded-lg z-0 -ml-[10px] bg-slate-500 animate-pulse"></div>
    </div>
  </div>
</div>;
