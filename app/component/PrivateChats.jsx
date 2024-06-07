// import { MediaPlayer, MediaProvider } from '@vidstack/react'
// import {
// 	defaultLayoutIcons,
// 	DefaultVideoLayout,
// } from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import React, { useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from 'axios';
import { API } from '../../Essentials';
import { socketemitfunc } from '../utils/SocketWrapper';
import { setHiddenMsgs, setMessages } from '../redux/slice/messageSlice';
import { useSelector } from 'react-redux';
import { IoDocumentSharp } from 'react-icons/io5';
const PrivateChats = ({ data, d, i, user, convId, socket, dispatch, messages }) => {
	const [click, setClick] = useState(false)
	const [delopen, setDelopen] = useState(false)
	const [msgId, setMsgId] = useState(null)
	const hiddenMsg = useSelector((state) => state.message.hiddenMsg)

	const hideChats = async (msgid) => {
		try {
			const hidden = [data?.id]
			const updatedMessages = messages.filter(f => f?.mesId !== msgid);
			const messageObj = messages.find(f => f?.mesId === msgid);
			const updatedMessageObj = messageObj ? { ...messageObj, hidden } : null;
			dispatch(setMessages(updatedMessages))
			const updatedHiddenMsgs = updatedMessageObj ? [...hiddenMsg, updatedMessageObj] : hiddenMsg;
			dispatch(setHiddenMsgs(updatedHiddenMsgs));
			await axios.post(`${API}/hideconvmsg/${data?.id}`, { msgid })
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = async (action) => {
		try {
			if (action === 'everyone') {
				socketemitfunc({
					event: 'deleteforeveryone',
					data: { roomId: convId, data: msgId, userId: data?.id },
					socket
				});
				const updatedMessages = messages.map((f, h) => {
					if (f?.mesId === msgId) {
						return { ...f, status: 'deleted' };
					}
					return f;
				});
				dispatch(setMessages(updatedMessages))
			} else {

				const updatedMessages = messages.filter(f => f?.mesId !== msgId);

				dispatch(setMessages(updatedMessages))
			}

			setDelopen(false)
			const res = await axios.post(`${API}/deletemessages/${data?.id}`, {
				convId: convId,
				msgIds: msgId,
				action,
			});
		} catch (e) {

			console.log(e);
		}
	}

	const deletepopUp = (mesId) => {
		try {
			setMsgId(Number(mesId))
			setDelopen(true)
		} catch (error) {
			console.log(error)
		}
	}

	const UnhideChats = async (msgid) => {
		try {
			const res = await axios.post(`${API}/unhideconvmsg/${data?.id}`, { msgid })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>


			{delopen && <div className='fixed inset-0 z-40 flex justify-center items-center w-screen h-screen'>
				<div className='flex justify-center flex-col bg-red-700 items-center h-full w-[40%]'>
					<div className='text-xl'>
						Delete Message
					</div>
					<div>
						<div onClick={() => handleDelete("everyone")} className='p-2 px-5 rounded-xl bg-black text-white'>Delete for Everyone</div>
						<div onClick={() => handleDelete("me")} className='p-2 px-5 rounded-xl bg-black text-white'>Delete for me</div>
						<div onClick={() => { setDelopen(false); setMsgId("") }} className='p-2 px-5 rounded-xl bg-black text-white'>Cancel</div>
					</div>
				</div>
			</div>}
			<div onClick={() => setClick(false)} className={`fixed inset-0 w-screen h-screen ${click ? "z-40" : "-z-20"}`}></div>
			<div
				key={i}
				className={`flex  gap-2 my-2 ${data?.id === d?.sender?._id
					? "justify-end "
					: "justify-start "
					}  w-full items-start`}
			>

				{data?.id !== d?.sender?._id && <div className="flex flex-col items-center justify-center">
					{data?.id !== d?.sender?._id && <div className="h-[40px] w-[40px] overflow-hidden bg-[#fff] rounded-2xl">
						<img src={user?.profilepic} className="w-full h-full" />
					</div>}

					<div className="text-[14px] mt-1">{d?.timestamp}</div>
				</div>}
				<div className="flex items-centers ">

					{d?.typ === "message" && (
						<div
							className={`relative group h-auto  flex justify-center items-center mt-6 ${data?.id === d?.sender?._id
								? "bg-[#0075ff] text-white p-2  rounded-l-2xl pn:max-sm:text-[14px] max-w-[320px] rounded-br-2xl "
								: "bg-[#ffffff] p-2 rounded-r-2xl pn:max-sm:text-[14px] max-w-[320px] rounded-bl-2xl"
								}`}
						>
							<div className="group-hover:pr-2">{d.status === "deleted" ? <div className='italic'>This Message was Deleted!</div> :
								<>
									{d?.text?.match(/https:\/\/[^\s]+/g) ? (
										d?.text.split(/(https:\/\/[^\s]+)/g).map((part, index) => (
											part.match(/https:\/\/[^\s]+/g) ? (
												<a
													key={index}
													href={part}
													target="_blank"
													rel="noopener noreferrer"
													download={part.endsWith('.pdf') || part.endsWith('.zip') ? part : undefined}
													style={{ textDecoration: 'none', color: 'inherit' }}
													onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
													onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
												>
													{part}
												</a>
											) : (
												part
											)
										))
									) : (
										d?.text
									)}
								</>

							}</div>
							<div onClick={() => setClick(true)} className={` ${data?.id === d?.sender?._id ? "absolute  hidden bg-transparent group-hover:block bg-sky-950 top-3 right-0" : "hidden"}`}>
								<HiOutlineDotsVertical />
							</div>
							{click && <div className={` ${data?.id === d?.sender?._id ? "absolute z-40 bg-black top-8 rounded-md p-3 -left-[40px] w-[100px] h-auto" : "hidden"}`}>
								{
									d?.hidden?.includes(data?.id) ? <div onClick={() => UnhideChats(d?.mesId)}
										className="text-sm">Un Hide msg</div> : <div onClick={() => hideChats(d?.mesId)}
											className="text-sm">Hide msg</div>
								}
								<div onClick={() => deletepopUp(d?.mesId)} className='text-sm'>Delete msg</div>

								{/* <div></div>
				<div></div> */}
							</div>}
						</div>
					)}


					{d?.typ == "image" && (
						<div
							className={`relative group ${data?.id === d?.sender?._id
								? "bg-[#0075ff] text-white p-2 rounded-l-2xl mt-4 rounded-br-2xl "
								: "bg-[#ffffff] p-2 rounded-r-2xl mt-4 rounded-bl-2xl"
								}`}
						>
							<div className="group-hover:pr-2">{d.status === "deleted" ? <div className='italic'>This Message was Deleted!</div> :
								<img
									src={d?.url}
									className="h-[145px] sm:w-[240px] sm:h-[240px] w-[145px] rounded-2xl  bg-yellow-300 "
								/>

							}</div>
							<div onClick={() => setClick(true)} className={` ${data?.id === d?.sender?._id ? "absolute  hidden bg-transparent group-hover:block bg-sky-950 top-3 right-0" : "hidden"}`}>
								<HiOutlineDotsVertical />
							</div>
							{click && <div className={` ${data?.id === d?.sender?._id ? "absolute z-40 bg-black top-8 rounded-md p-3 -left-[40px] w-[100px] h-auto" : "hidden"}`}>
								{
									d?.hidden?.includes(data?.id) ? <div onClick={() => UnhideChats(d?.mesId)}
										className="text-sm">Un Hide msg</div> : <div onClick={() => hideChats(d?.mesId)}
											className="text-sm">Hide msg</div>
								}
								<div onClick={() => deletepopUp(d?.mesId)} className='text-sm'>Delete msg</div>

								{/* <div></div>
				<div></div> */}
							</div>}
						</div>
					)}

					{d?.typ == "doc" && (


						<div
							className={`relative group ${data?.id === d?.sender?._id
								? "bg-[#0075ff] text-white p-2 rounded-l-2xl mt-4 rounded-br-2xl "
								: "bg-[#ffffff] p-2 rounded-r-2xl mt-4 rounded-bl-2xl"
								}`}
						>
							<div className="group-hover:pr-2">{d.status === "deleted" ? <div className='italic'>This Message was Deleted!</div> :
								<a href={d.url} download={d.content.name} className=' flex justify-center bg-white p-3 rounded-xl text-black items-center gap-1 '>
									<div><IoDocumentSharp className="text-2xl" />
									</div>
									<div className='text-sm font-semibold'>{d?.content?.name}</div>
								</a>

							}</div>

							<div onClick={() => setClick(true)} className={` ${data?.id === d?.sender?._id ? "absolute  hidden bg-transparent group-hover:block bg-sky-950 top-3 right-0" : "hidden"}`}>
								<HiOutlineDotsVertical />
							</div>
							{click && <div className={` ${data?.id === d?.sender?._id ? "absolute z-40 bg-black top-8 rounded-md p-3 -left-[40px] w-[100px] h-auto" : "hidden"}`}>
								{
									d?.hidden?.includes(data?.id) ? <div onClick={() => UnhideChats(d?.mesId)}
										className="text-sm">Un Hide msg</div> : <div onClick={() => hideChats(d?.mesId)}
											className="text-sm">Hide msg</div>
								}
								<div onClick={() => deletepopUp(d?.mesId)} className='text-sm'>Delete msg</div>

								{/* <div></div>
				<div></div> */}
							</div>}
						</div>

					)}

					{d?.typ == "video" && (
						<div
							className={`relative group ${data?.id === d?.sender?._id
								? " bg-[#0075ff] text-white h-[145px] sm:w-[240px] mt-4 sm:h-[240px] w-[145px] flex justify-center items-center p-2 rounded-l-2xl rounded-br-2xl"
								: "bg-[#ffffff] h-[145px] sm:w-[240px] mt-4 sm:h-[240px] w-[145px] flex justify-center items-center p-2 rounded-r-2xl rounded-bl-2xl"
								}`}
						>
							{/* <ReactPlayer url={d?.url} controls /> */}

							{/* <MediaPlayer src={d?.url} onQualitiesChange={480}>
								<MediaProvider />
								<DefaultVideoLayout
									thumbnails={d?.url}
									icons={defaultLayoutIcons}
								/>
							</MediaPlayer> */}

							<div className="group-hover:pr-2">{d.status === "deleted" ? <div className='italic'>This Message was Deleted!</div> :
								<video src={d?.url} className="h-[145px] w-[145px] rounded-2xl bg-yellow-300 " controls />

							}</div>


							<div onClick={() => setClick(true)} className={` ${data?.id === d?.sender?._id ? "absolute  hidden bg-transparent group-hover:block bg-sky-950 top-3 right-0" : "hidden"}`}>
								<HiOutlineDotsVertical />
							</div>
							{click && <div className={` ${data?.id === d?.sender?._id ? "absolute z-40 bg-black top-8 rounded-md p-3 -left-[40px] w-[100px] h-auto" : "hidden"}`}>
								{
									d?.hidden?.includes(data?.id) ? <div onClick={() => UnhideChats(d?.mesId)}
										className="text-sm">Un Hide msg</div> : <div onClick={() => hideChats(d?.mesId)}
											className="text-sm">Hide msg</div>
								}
								<div onClick={() => deletepopUp(d?.mesId)} className='text-sm'>Delete msg</div>

								{/* <div></div>
				<div></div> */}
							</div>}
						</div>
					)}
					{d?.typ == "glimpse" && (
						<div className={`relative group  ${data?.id === d?.sender?._id
							? "bg-[#0075ff] text-white p-2 mt-4 rounded-l-2xl rounded-br-2xl"
							: "bg-[#ffffff] p-2 mt-4 rounded-r-2xl rounded-bl-2xl"
							}`}>

							<div className="group-hover:pr-2">{d.status === "deleted" ? <div className='italic'>This Message was Deleted!</div> :
								<video
									src={d?.url}
									className="h-[145px] sm:h-[240px] sm:w-[240px] w-[145px] rounded-2xl bg-yellow-300 "
									controls
								/>
							}</div>

							<div onClick={() => setClick(true)} className={` ${data?.id === d?.sender?._id ? "absolute  hidden bg-transparent group-hover:block bg-sky-950 top-3 right-0" : "hidden"}`}>
								<HiOutlineDotsVertical />
							</div>
							{click && <div className={` ${data?.id === d?.sender?._id ? "absolute z-40 bg-black top-8 rounded-md p-3 -left-[40px] w-[100px] h-auto" : "hidden"}`}>
								{
									d?.hidden?.includes(data?.id) ? <div onClick={() => UnhideChats(d?.mesId)}
										className="text-sm">Un Hide msg</div> : <div onClick={() => hideChats(d?.mesId)}
											className="text-sm">Hide msg</div>
								}
								<div onClick={() => deletepopUp(d?.mesId)} className='text-sm'>Delete msg</div>

								{/* <div></div>
				<div></div> */}
							</div>}
						</div>
					)}
					{d?.typ == "post" && (
						<div
							className={`relative group ${data?.id === d?.sender?._id
								? "bg-[#0075ff] text-white p-2 mt-4 rounded-l-2xl rounded-br-2xl"
								: "bg-[#ffffff] p-2 mt-4 rounded-r-2xl rounded-bl-2xl"
								}`}
						>
							<div className="">

								<div className="group-hover:pr-2">{d.status === "deleted" ? <div className='italic'>This Message was Deleted!</div> :
									<div>
										{d?.content.type.startsWith("image") ? (

											<img
												className={`${data?.id === d?.sender?._id
													? "h-[145px] sm:h-[240px] sm:w-[240px] w-[145px] rounded-2xl bg-yellow-300 "
													: "h-[145px] sm:h-[240px] sm:w-[240px] w-[145px] rounded-2xl bg-yellow-300"
													}`}
												src={d?.url}
												alt=""
											/>

										) : (
											<video
												src={d?.url}
												className={`${data?.id === d?.sender?._id
													? "h-[145px] sm:h-[240px] sm:w-[240px] w-[145px] rounded-2xl bg-yellow-300 "
													: "h-[145px] sm:h-[240px] sm:w-[240px] w-[145px] rounded-2xl bg-yellow-300"
													}`}
												controls
											/>
										)}

									</div>
								}</div>



								<div onClick={() => setClick(true)} className={` ${data?.id === d?.sender?._id ? "absolute  hidden bg-transparent group-hover:block bg-sky-950 top-3 right-0" : "hidden"}`}>
									<HiOutlineDotsVertical />
								</div>
								{click && <div className={` ${data?.id === d?.sender?._id ? "absolute z-40 bg-black top-8 rounded-md p-3 -left-[40px] w-[100px] h-auto" : "hidden"}`}>
									{
										d?.hidden?.includes(data?.id) ? <div onClick={() => UnhideChats(d?.mesId)}
											className="text-sm">Un Hide msg</div> : <div onClick={() => hideChats(d?.mesId)}
												className="text-sm">Hide msg</div>
									}
									<div onClick={() => deletepopUp(d?.mesId)} className='text-sm'>Delete msg</div>

									{/* <div></div>
				<div></div> */}
								</div>}
							</div>
							<div className="h-[45px] sm:h-[40px] sm:w-[240px] w-[145px] rounded-2xl ">
								{d?.text}
							</div>
							<div className="text-[14px] sm:w-[240px] flex justify-center items-center w-[145px] h-[40px] bg-[#f7f7f7] rounded-xl">
								Visit
							</div>
						</div>
					)}
					{d?.typ == "product" && (
						<div
							className={`relative group ${data?.id === d?.sender?._id
								? "bg-[#0075ff] text-white p-2 mt-4 rounded-l-2xl rounded-br-2xl"
								: "bg-[#ffffff] p-2 mt-4 rounded-r-2xl rounded-bl-2xl"
								}`}
						>
							<div>

								<div className="group-hover:pr-2">{d.status === "deleted" ? <div className='italic'>This Message was Deleted!</div> :

									<div>
										{d?.content.type.startsWith("image") ? (
											<img
												src={d?.url}
												alt=""
												className="h-[145px] sm:h-[240px] sm:w-[240px] w-[145px] rounded-2xl bg-yellow-300 "
											/>
										) : (
											<video
												src={d?.url}
												controls
												className="h-[145px] w-[145px] sm:h-[240px] sm:w-[240px] rounded-2xl bg-yellow-300 "
											/>
										)}
									</div>
								}</div>


								<div onClick={() => setClick(true)} className={` ${data?.id === d?.sender?._id ? "absolute  hidden bg-transparent group-hover:block bg-sky-950 top-3 right-0" : "hidden"}`}>
									<HiOutlineDotsVertical />
								</div>
								{click && <div className={` ${data?.id === d?.sender?._id ? "absolute z-40 bg-black top-8 rounded-md p-3 -left-[40px] w-[100px] h-auto" : "hidden"}`}>
									{
										d?.hidden?.includes(data?.id) ? <div onClick={() => UnhideChats(d?.mesId)}
											className="text-sm">Un Hide msg</div> : <div onClick={() => hideChats(d?.mesId)}
												className="text-sm">Hide msg</div>
									}
									<div onClick={() => deletepopUp(d?.mesId)} className='text-sm'>Delete msg</div>

									{/* <div></div>
				<div></div> */}
								</div>}
							</div>
							<div className="w-[145px] sm:w-[240px] overflow-hidden text-[14px] h-[80px]">
								{d?.text}
							</div>
							<div className="text-[14px] sm:w-[240px] flex justify-center items-center w-[145px] h-[40px] bg-white rounded-xl">
								View Product
							</div>
						</div>
					)}
					{d?.typ == "gif" && (
						<div>
							<div className={`relative group  ${data?.id === d?.sender?._id
								? "bg-[#0075ff] text-white p-2 mt-4 rounded-l-2xl rounded-br-2xl"
								: "bg-[#ffffff] p-2 mt-4 rounded-r-2xl rounded-bl-2xl"
								}`}>

								<div className="group-hover:pr-2">{d.status === "deleted" ? <div className='italic'>This Message was Deleted!</div> :
									<img
										className="h-full w-full object-contain"
										src={d?.url}
										alt="gif"
									/>
								}</div>
								<div onClick={() => setClick(true)} className={` ${data?.id === d?.sender?._id ? "absolute  hidden bg-transparent group-hover:block bg-sky-950 top-3 right-0" : "hidden"}`}>
									<HiOutlineDotsVertical />
								</div>
								{click && <div className={` ${data?.id === d?.sender?._id ? "absolute z-40 bg-black top-8 rounded-md p-3 -left-[40px] w-[100px] h-auto" : "hidden"}`}>
									{
										d?.hidden?.includes(data?.id) ? <div onClick={() => UnhideChats(d?.mesId)}
											className="text-sm">Un Hide msg</div> : <div onClick={() => hideChats(d?.mesId)}
												className="text-sm">Hide msg</div>
									}
									<div onClick={() => deletepopUp(d?.mesId)} className='text-sm'>Delete msg</div>

									{/* <div></div>
				<div></div> */}
								</div>}
							</div>
						</div>
					)}
				</div>
				{data?.id === d?.sender?._id && <div className="flex flex-col items-center justify-center">

					{data?.id === d?.sender?._id && <div className="h-[35px]  relative w-[35px]  overflow-hidden bg-[#fff] rounded-[14px]">
						<div className="absolute top-0 left-0 bg-black/40 w-full h-full"></div>
						<img src={data?.dp} className="w-full h-full" />
					</div>}

					<div className="text-[14px] mt-1">{d?.timestamp}</div>
				</div>}
			</div >

		</>
	)
}

export default PrivateChats