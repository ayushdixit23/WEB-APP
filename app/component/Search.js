"use client";
import React, { useEffect, useState } from "react";
// import bluesearch from "../assets/Images/bluesearch.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAuthContext } from "../utils/AuthWrapper";
import { API } from "../../Essentials";
import { MdVerified } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function page() {
  const [text, setText] = useState("");
  const [toast, setToast] = useState(false);
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [recentSearchPro, setRecentSearchPro] = useState([]);
  const [recentSearchCom, setRecentSearchCom] = useState([]);
  const [load, setLoad] = useState(false);
  const [timeout, setTimeout] = useState("");
  const [active, setActive] = useState("prosites");
  const key = process.env.NEXT_PUBLIC_KEY
  const { data: user } = useAuthContext()
  const [click, setClick] = useState(1);
  //const href = `/defprosite?dd=${data}`;
  // search

  // const encryptaes = (data) => {
  //   try {
  //     const textBytes = aesjs.utils.utf8.toBytes(data);
  //     const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  //     const encryptedBytes = aesCtr.encrypt(textBytes);
  //     const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  //     return encryptedHex;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const handSave = (id) => {
  //   const getids = localStorage.getItem("ids");
  //   let setids;
  //   if (getids) {
  //     const parseIds = JSON.parse(getids);
  //     if (parseIds.includes(encryptaes(id))) {
  //       const filterArr = parseIds.filter((d) => d !== encryptaes(id));
  //       const newArr = [encryptaes(id), ...filterArr];
  //       localStorage.setItem("ids", JSON.stringify(newArr));
  //       return;
  //     }
  //     if (parseIds.length <= 5) {
  //       setids = [encryptaes(id), ...parseIds];
  //     } else {
  //       parseIds.pop();
  //       setids = [encryptaes(id), ...parseIds];
  //     }
  //   } else {
  //     setids = [encryptaes(id)];
  //   }
  //   localStorage.setItem("ids", JSON.stringify(setids));
  // };

  // const changeOrder = (id) => {
  //   const getids = localStorage.getItem("ids");
  //   if (getids) {
  //     const parseIds = JSON.parse(getids);
  //     const filterArr = parseIds.filter((d) => d !== encryptaes(id));
  //     const newArr = [encryptaes(id), ...filterArr];
  //     localStorage.setItem("ids", JSON.stringify(newArr));
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (window !== undefined) {
  //       const getids = localStorage.getItem("ids");
  //       console.log(getids)
  //       if (getids.length > 0) {
  //         const parseIds = JSON.parse(getids) || [];
  //         const filteredIds = parseIds.filter(id => id !== null && id !== undefined);
  //         if (filteredIds.length > 0) {
  //           try {

  //             const res = await axios.post(
  //               `${API}/webapprecentsearchpro`,
  //               filteredIds
  //             );
  //             setRecentSearch(res.data.users);
  //           } catch (error) {
  //             console.error("Error fetching data:", error);
  //           }
  //         }
  //       }
  //     }
  //   };
  //   fetchData();
  // }, []);

  const recentSearchs = async () => {
    try {
      const res = await axios.get(`${API}/webmobileSearch/${user?.id}`)
      if (res.data.success) {
        setRecentSearchCom(res.data?.recentSearchesCommunity)
        setRecentSearchPro(res.data?.recentSearchesProsites)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleSearch = async () => {
    setActive("prosites"), setClick(1);
    const res = await axios.post(`${API}/searchpros?query=${text}`);
    if (res?.data?.data?.success) {
      const pros = res?.data?.data?.pros;
      const dp = res?.data?.data?.dps;
      const merge = pros?.map((p, i) => ({ p, dps: dp[i] }));
      setData(merge);
      setLoad(true);
      console.log(merge);
    }
  };

  const comm = async () => {
    setActive("communities"), setClick(2);
    const res = await axios.post(`${API}/searchcoms/${user?.id}?query=${text}`);
    if (res?.data?.success) {
      const pros = res?.data?.data?.coms;
      const dp = res?.data?.data?.dps;
      const c = res?.data?.data?.creatordps;
      const merge = pros?.map((p, i) => ({
        p,
        dps: dp[i],
        creatordps: c[i],
      }));
      setDataa(merge);
      setLoad(true);
    }
  };

  const addSearchCom = async (sId) => {
    try {
      const res = await axios.post(`${API}/addRecentCommunity/${user?.id}`, { sId })
      if (res.data.success) {
        recentSearchs()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addSearchPro = async (sId) => {
    try {
      const res = await axios.post(`${API}/addRecentProsite/${user?.id}`, { sId })
      if (res.data.success) {
        recentSearchs()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const removeSearchCom = async (sId) => {
    try {
      const res = await axios.post(`${API}/removeRecentSrcCommunity/${user?.id}`, { sId })
      if (res.data.success) {
        recentSearchs()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeSearchPro = async (sId) => {
    try {
      const res = await axios.post(`${API}/removeRecentSrcProsite/${user?.id}`, { sId })
      if (res.data.success) {
        recentSearchs()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (text && active === "prosites") {
      handleSearch()
    }

    if (text && active === "communities") {
      comm()
    }
  }, [text])

  useEffect(() => {
    if (user.id) {
      recentSearchs()
    }
  }, [user.id])

  return (
    <div className="md:min-w-[390px] md:[360px] h-screen dark:bg-[#000] bg-[#fff] flex flex-col">
      <div className="flex flex-row justify-around dark:bg-black bg-white items-center p-2 h-[6%] w-[100%]">
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          value={text}
          className="ring-1 ring-[#E2E8F0] dark:ring-[#000] dark:bg-[#3e3e3e] dark:text-[#fff] rounded-xl p-2 w-[85%] outline-none text-black"
          placeholder="Search"
          onChange={(t) => setText(t.target.value)}
        />
        {/* <Image
          // onClick={handleSearch}
          src={bluesearch}
          alt="icons"
          className="h-[40px] w-[40px] "
        /> */}
      </div>

      {/* Options */}
      <div className=" w-[100%] px-2 flex flex-row py-2 select-none ">
        <div
          // onClick={handleSearch}
          onClick={() => setActive("prosites")}
          className={`${active === "prosites"
            ? " text-[12px] text-white  font-medium bg-blue-500 rounded-lg mx-1 px-2 py-1 flex justify-center items-center"
            : "text-[12px] text-[#717171] font-medium dark:bg-[#171717] dark:text-white bg-[#f7f7f7] rounded-lg mx-1 px-2 py-1 flex justify-center items-center"
            }`}
        >
          Prosite
        </div>
        <div
          onClick={() => setActive("communities")}
          className={`${active === "communities"
            ? "text-[12px] text-white  font-medium bg-blue-500 rounded-lg mx-1 px-2 py-1 flex justify-center items-center"
            : "text-[12px] text-[#717171] font-medium dark:bg-[#171717] dark:text-white bg-[#f7f7f7] rounded-lg mx-1 px-2 py-1 flex justify-center items-center"
            }`}
        >
          Communities
        </div>
      </div>

      <div className=" w-[100%]  px-10">
        <div className="w-[100%] bg-[#f6f6f6] dark:bg-[#171717] h-[1px]"></div>
      </div>
      {/* People */}
      <div className="overflow-auto scrollbar-hide ">
        {active === "prosites" ? (
          <>
            {data?.length > 0 ? < div className="px-2">
              {data.map((d, i) => (
                <a
                  onClick={() => addSearchPro(d?.p?._id)}
                  target="_blank"
                  href={`https://grovyo.com/${d?.p?.username}`}
                  className="flex flex-row items-center dark:bg-[#171717] bg-[#f7f7f7] rounded-lg px-2 py-2 my-2"
                >
                  <img
                    src={d?.dps}
                    className="h-[35px] w-[35px] bg-[#f5f5f5] rounded-2xl"
                  />
                  <div className="px-2 py-2 dark:text-white text-black text-[14px] font-bold ">
                    <div className="flex items-center gap-1">
                      <div>{d?.p?.fullname}</div>
                      {d?.p?.isverified && <div><MdVerified className="text-blue-900" /></div>}

                    </div>
                    <div>{d?.p?.username}</div>

                  </div>

                </a>
              ))}
            </div>
              :
              <div>
                {recentSearchPro.map((d) => (
                  <a

                    target="_blank"
                    href={`https://grovyo.com/${d?.username}`}
                    className="flex flex-row items-center dark:bg-[#171717] bg-[#f7f7f7] rounded-lg px-2 py-2 my-2"
                  >
                    <img
                      src={d?.dp}
                      className="h-[35px] w-[35px] bg-[#f5f5f5] rounded-2xl"
                    />
                    <div className="px-2 py-2 dark:text-white text-black text-[14px] font-bold ">
                      <div className="flex items-center gap-1">
                        <div>{d?.fullname}</div>
                        {d?.isverified && <div><MdVerified className="text-blue-900" /></div>}

                      </div>
                      <div>{d?.username}</div>
                    </div>
                    <div><RxCross2 onClick={() => removeSearchPro(d?.id)} /></div>
                  </a>
                ))}
              </div>
            }
          </>
        ) : (
          <>

            {dataa.length > 0 ? < div className="px-2">
              {dataa.map((d, i) => (
                <Link
                  onClick={() => addSearchCom(d?.p?._id)}
                  href={`/main/feed/newForYou/${d?.p?._id}`}
                  className="flex flex-row dark:bg-[#171717] bg-[#f7f7f7] rounded-lg px-2 py-2 my-2"
                >
                  <img
                    src={d?.dps}
                    className="h-[35px] w-[35px] bg-slate-400  rounded-2xl"
                  />
                  <div className="px-2 dark:text-white py-2 text-black text-[14px] font-bold ">
                    {d?.p?.title}
                  </div>

                </Link>
              ))}
            </div>
              :
              < div className="px-2">
                {recentSearchCom.map((d, i) => (
                  <Link
                    href={`/main/feed/community/${d?.id}`}
                    className="flex flex-row dark:bg-[#171717] bg-[#f7f7f7] rounded-lg px-2 py-2 my-2"
                  >
                    <img
                      src={d?.dp}
                      className="h-[35px] w-[35px] bg-slate-400  rounded-2xl"
                    />
                    <div className="px-2 dark:text-white py-2 text-black text-[14px] font-bold ">
                      {d?.title}
                    </div>
                    <div ><RxCross2 onClick={() => removeSearchCom(d?.p?._id)} /></div>
                  </Link>
                ))}
              </div>
            }
          </>
        )}
      </div>
    </div >
  );
}

export default page;
