"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { API } from "../../../Essentials";
import { useAuthContext } from "../../utils/AuthWrapper";
import { CiMenuKebab } from "react-icons/ci";
import Chats from "./../../component/Chats";
import { useDispatch } from "react-redux";
import { setVisible } from "../../redux/slice/anotherSlice";
import { useSearchParams } from "next/navigation";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export default function ChatLayout({ children }) {
	const [data, setData] = useState([]);
	const [checkRequest, setCheckRequest] = useState(false)
	const [request, setRequest] = useState([])
	const { data: user } = useAuthContext();
	const [load, setLoad] = useState(false);
	const [click, setClick] = useState(false);
	const dispatch = useDispatch();
	const params = useSearchParams();
	const id = params.get("id");
	const con = params.get("con");
	// chats outer
	//   const fetchConv = useCallback(async () => {
	//     setLoad(false);
	//     const id = sessionStorage.getItem("id");
	//     try {
	//       const res = await axios.get(`${API}/getconv/${id}`);
	//       const conv = res.data.data.conv;
	//       const r = res.data.data.receiver;
	//       const rdp = res.data.data.receiverdp;
	//       const m = res.data.data.message;
	//       if (conv.length > 0) {
	//         setNo(true);
	//       } else {
	//         setNo(false);
	//       }
	//       const merge = conv.map((c, i) => ({
	//         c,
	//         rec: r[i],
	//         dp: rdp[i],
	//         msg: m[i],
	//         a: i,
	//       }));
	//       setData(merge);
	//       console.log(merge, "fum");
	//       setCid(merge?.c?._id);
	//       setLoad(true);
	//     } catch (e) {
	//       setLoad(false);

	//       console.log(e.message);
	//     }
	//   }, []);

	//   useEffect(() => {
	//     fetchConv();
	//   }, [fetchConv]);

	useEffect(() => {
		dispatch(setVisible(false));
	}, []);

	const fetchallChats = async () => {
		try {
			const res = await axios.get(`${API}/fetchallchatsnew/${user?.id}`);
			// setRequest(res.data.conv);
			setData(res.data.conv)
		} catch (error) {
			console.log(error);
		}
	};

	// accept or reject
	const handleStatus = async (index, status, d) => {
		try {
			const res = await axios.post(`${API}/acceptorrejectmesgreq`, {
				reciever: user.id,
				sender: d?.req?.id?._id,
				status: status,
			});
			// nav.goBack();
			if (res?.data?.success) {
				if (status === 'accept') {
					const updatedData = request.filter((_, i) => i !== index);
					setRequest(updatedData);
				} else {
					const updatedData = request.filter((_, i) => i !== index);
					setRequest(updatedData);
				}
			}
		} catch (e) {
			console.log(e)
		}
	};

	// fetch Requests
	const fetchreqs = async () => {
		try {
			const res = await axios.get(`${API}/fetchallmsgreqs/${user.id}`);

			if (res?.data?.success) {
				const d = res?.data?.dps;
				const r = res?.data?.reqs;
				const merg = d?.map((dp, i) => ({
					dp,
					req: r[i],
				}));
				setRequest(merg || []);
			}
		} catch (e) {
			console.log(e)
		}
	};

	useEffect(() => {
		if (user.id) {
			fetchreqs()
			fetchallChats();
		}
	}, [user]);

	if (load) {
		return (
			<div className="h-[100vh] w-[100%] bg-white dark:bg-[#171717] flex pn:max-md:justify-center ">
				{/* chats */}
				{/* Chat header */}
				<div className="h-[100vh] select-none pn:max-md:w-[100%] md:min-w-[390px] md:[360px] flex flex-col items-center pb-20  md:border-r-2 border-[#f9f9f9] overflow-auto scrollbar-hide ">
					<div className="w-[100%] h-[100px] flex flex-row px-5 justify-between items-center pn:max-md:h-[50px]">
						<div className="text-[24px] text-black font-sans font-semibold">
							Chats
						</div>
						<div className="text-[14px] text-black font-sans font-medium">
							Request
						</div>
					</div>
					{/* messages */}
					<div className="w-[100%]  overflow-auto pn:max-md:h-[92%] h-[100vh] flex flex-col ">
						{/* one chat */}

						{data.map((d, i) => (
							<React.Fragment key={i}>
								<Link
									href={{
										pathname: "../../main/chat/inner",
										query: {
											convId: d?.rec?._id,
											pro: d?.dp,
											name: d?.rec?.fullname,
										}, // Corrected the object property assignments
									}}
									onClick={() => {
										setClick(true);
									}}
									className={`pn:max-md:hidden justify-center items-center ${click
										? "w-[100%] rounded-xl hover:bg-[#f9f9f9]   h-[70px] px-4 flex flex-row "
										: "w-[100%] rounded-xl bg-[#fff]  h-[70px] px-4 flex flex-row "
										}`}
								>
									{/* profile */}

									<div className=" h-[45px] w-[45px] rounded-2xl flex justify-end items-center ">
										<img
											alt="dp"
											src={d?.dp}
											className="h-[45px] w-[45px] rounded-2xl bg-[#f9f9f9] ring-1 ring-white shadow-sm"
										/>
									</div>
									{/* Name and message */}

									<div className=" h-[100%] w-[300px]  flex flex-row">
										<div className="h-[100%] w-[100%] px-3 py-4 justify-between overflow-hidden  flex flex-col ">
											<p className="text-[16px] text-black font-sans font-medium max-w-[100%] ">
												{d?.rec?.fullname}
											</p>
											<p className="text-[12px] text-black font-medium truncate max-w-[100%] ">
												{d?.msg?.text}
											</p>
										</div>
										<div className=" h-[100%] w-[30%] flex flex-col py-3 justify-center items-center">
											{/* <div className="bg-[#0075FF] text-white text-[10px] flex px-2 pn:max-md:justify-center pn:max-md:items-center py-1 h-[20px] w-[20px] rounded-full">
                        1
                      </div> */}
											<div className="text-black text-[12px] font-semibold">
												{moment(d?.msg?.updatedAt).fromNow()}
											</div>
										</div>
									</div>
								</Link>
								<Link
									href={{
										pathname: "../../phone/ChatInner",
										query: {
											convId: d?.msg?.conversationId,
											pro: d?.dp,
											name: d?.rec?.fullname,
											status: d?.msg?.status,
										}, // Corrected the object property assignments
									}}
									className="w-[100%] md:hidden  rounded-xl hover:bg-[#f9f9f9] bg-white h-[70px] px-4 flex flex-row "
								>
									{/* profile */}

									<div className=" h-[100%] flex justify-end items-center ">
										<img
											alt="dp"
											src={d?.dp}
											className="h-[45px] w-[50px] ring-1 ring-white rounded-2xl bg-[#f9f9f9] shadow-sm"
										/>
									</div>
									{/* Name and message */}

									<div className=" h-[100%] w-[100%]  flex flex-row">
										<div className="h-[100%] w-[100%] px-3 py-4 justify-between  flex flex-col ">
											<p className="text-[16px] text-black font-sans font-medium max-w-[100%] ">
												{d?.rec?.fullname}
											</p>
											<p className="text-[12px] text-black font-medium  max-w-[100%] ">
												{d?.msg?.text}
											</p>
										</div>
										<div className=" h-[100%] w-[30%] flex flex-col py-3 justify-center items-center">
											{/* <div className="bg-[#0075FF] text-white text-[10px] flex px-2 pn:max-md:justify-center pn:max-md:items-center py-1 h-[20px] w-[20px] rounded-full">
                        1
                      </div> */}
											<div className="text-black text-[12px] font-semibold">
												{moment(d?.msg?.updatedAt).fromNow()}
											</div>
										</div>
									</div>
								</Link>
								<div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
							</React.Fragment>
						))}
					</div>
				</div>

				{/* Chat */}
				{click === false ? (
					<div className="w-[100%] pn:max-md:hidden flex p-2 bg-white dark:bg-[#171717] text-[#3e3e3e] flex-col justify-center items-center">
						<div className="flex bg-[#f9f9f9] p-4 py-8 rounded-2xl justify-center flex-col items-center">
							<Image src={Empty} alt="empty" />
							<div className="text-[20px] font-bold">You've got message</div>
							<div className="font-medium">No messages in your inbox</div>
						</div>
					</div>
				) : (
					<>{children}</>
				)}
			</div>
		);
	} else {
		return (
			// if no data
			<div className="h-[100vh] w-[100%] bg-red-300 dark:bg-[#171717] flex sm:flex-row flex-col pn:max-md:justify-center ">
				{/* chats */}

				{/* mobile */}
				{!id && !con && (
					<div className="h-[100vh] sm:hidden select-none pn:max-md:w-[100%] bg-white md:min-w-[390px] relative md:[360px] flex flex-col items-center pb-20 pn:max-sm:pt-16 md:border-r-2 border-[#f7f7f7] dark:border-[#2b2b2b]  overflow-auto scrollbar-hide ">
						{/* Chat header */}
						<div className="w-[100%] h-[60px]  flex justify-between absolute bg-slate-50 items-center px-2">
							<div className="text-[24px] text-black font-semibold dark:text-[#fff]">
								Chats
							</div>
							<div onClick={() => setCheckRequest(true)} className="text-[14px] text-black font-medium hover:bg-slate-100 rounded-2xl  w-20 flex justify-center items-center hover:animate-pulse">
								Request(1)
							</div>
						</div>
						{/* messages */}
						<div className="w-[100%] pt-[60px] flex flex-col ">
							{/* one chat */}
							{data.map((d, i) => (
								<>
									<Link
										href={`/main/chat?id=${d?.id}&con=${d?.convid}`}
										onClick={() => {
											dispatch(setVisible(false));
										}}
										className="w-[100%] gap-2 sm:hidden py-2 px-2 duration-200A hover:bg-slate-100 h-[55px]  flex flex-row justify-between items-center "
									>
										<div className=" gap-2 py-2 flex flex-row justify-start items-center ">
											<div>
												<img
													src={d?.pic}
													className="h-[40px] w-[40px] rounded-[17px] ring-1 ring-white bg-yellow-300 "
												/>
											</div>
											<div>
												<div className="text-[15px] font-semibold">
													{d?.fullname}
												</div>
												<div className="text-[14px]">{d?.fullname}</div>
											</div>
										</div>
										<div>
											<CiMenuKebab />
										</div>
									</Link>
									<div className="w-[99%] border-b-[0.5px] "></div>
								</>
							))}

							{/* <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div> */}
						</div>
					</div>
				)}

				{/* web */}
				{checkRequest === false && < div className="h-[100vh] pn:max-sm:hidden select-none pn:max-md:w-[100%] bg-white md:min-w-[390px] relative md:[360px] flex flex-col items-center pb-20 pn:max-sm:pt-16 md:border-r-2 border-[#f7f7f7] dark:border-[#2b2b2b]  overflow-auto scrollbar-hide ">
					{/* Chat header */}
					<div className="w-[100%] h-[60px]  flex justify-between absolute bg-slate-50 items-center px-2">
						<div className="text-[24px] text-black font-semibold dark:text-[#fff]">
							Chats
						</div>
						<div onClick={() => setCheckRequest(true)} className="text-[14px] text-black font-medium hover:bg-slate-100 rounded-2xl  w-20 flex justify-center items-center hover:animate-pulse">
							Request({request.length})
						</div>
					</div>
					{/* messages */}
					<div className="w-[100%] pt-[60px] flex flex-col ">
						{/* one chat */}
						{data.map((d, i) => (
							<>
								<Link
									href={`/main/chat/${d?.id}/${d?.convid}`}
									className="w-[100%] gap-2 py-2 px-2 pn:max-sm:hidden duration-200A hover:bg-slate-100 h-[55px]  flex flex-row justify-between items-center "
								>
									<div className=" gap-2 py-2 flex flex-row justify-start items-center ">
										<div>
											<img
												src={d?.pic}
												className="h-[40px] w-[40px] rounded-[17px] ring-1 ring-white bg-yellow-300 "
											/>
										</div>
										<div>
											<div className="text-[15px] font-semibold">
												{d?.fullname}
											</div>
											<div className="text-[14px]">{d?.fullname}</div>
										</div>
									</div>
									<div>
										<CiMenuKebab />
									</div>
								</Link>

								<div className="w-[99%] border-b-[0.5px] "></div>
							</>
						))}

						{/* <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div> */}
					</div>
				</div>
				}

				{checkRequest && < div className="h-[100vh] pn:max-sm:hidden select-none pn:max-md:w-[100%] bg-white md:min-w-[390px] relative md:[360px] flex flex-col items-center  md:border-r-2 border-[#f7f7f7] dark:border-[#2b2b2b]  overflow-auto scrollbar-hide ">
					{/* Chat header */}


					{/* messages */}
					<div className="w-[100%] h-full flex flex-col ">
						<div className="text-xl p-3 font-semibold border-b mb-2">Requests</div>
						{/* one chat */}
						{request.length > 0 && request.map((d, i) => (
							<>
								<div

									className="w-[100%] gap-2 py-2 px-2 pn:max-sm:hidden duration-200A hover:bg-slate-100 h-[55px]  flex flex-row justify-between items-center "
								>
									<div className=" gap-2 py-2 flex flex-row justify-start items-center ">
										<div>
											<img
												src={d?.dp}
												className="h-[40px] w-[40px] rounded-[17px] ring-1 ring-white bg-yellow-300 "
											/>
										</div>
										<div>
											<div className="text-[15px] font-semibold">
												{d?.req?.id?.fullname}
											</div>
											<div className="text-[14px]">{d?.req?.id?.username}</div>
										</div>
									</div>
									<div className="flex justify-center items-center gap-2">
										<div onClick={() => handleStatus(i, "reject", d)}><RxCross2 className="text-red-600 font-semibold" /></div>
										<div onClick={() => handleStatus(i, "accept", d)}><IoCheckmark className="text-green-600 font-semibold" /></div>
									</div>
								</div >

								<div className="w-[99%] border-b-[0.5px] "></div>
							</>
						))}

						{
							request.length <= 0 && <div className="flex justify-center h-full items-center ">
								Empty Hai
							</div>
						}

						{/* <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div>
            <div className="w-[100%] rounded-xl my-1 bg-slate-100 animate-pulse h-[70px] px-4 flex flex-row "></div>
            <div className="h-[1px] w-[80%] rounded-full flex self-center bg-[#f9f9f9]"></div> */}
					</div>
				</div>
				}


				{/* Chat */}
				<div className="w-full h-full pn:max-sm:hidden"> {children}</div>

				{
					id && con && (
						<div className="w-full h-full sm:hidden">
							<Chats con={con} id={id} setVisible={setVisible} />
						</div>
					)
				}
			</div >
		);
	}
}
