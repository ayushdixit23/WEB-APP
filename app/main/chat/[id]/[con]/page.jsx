"use client";
import { API } from "../../../../../Essentials";
import Input from "../../../../component/Input";
import { useAuthContext } from "../../../../utils/AuthWrapper";
import {
  socketemitfunc,
  useSocketContext,
} from "../../../../utils/SocketWrapper";
import axios from "axios";
import moment from "moment";
import { useParams, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager,
  SuggestionBar,
} from "@giphy/react-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setContent,
  setMessage,
  setMessages,
  setType,
} from "../../../../redux/slice/messageSlice";

// default
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import styles from "../../../../CustomScrollbarComponent.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { LuLoader2 } from "react-icons/lu";
import PrivateChats from "../../../../component/PrivateChats"
import Hidden from "../../../../component/Hidden"
import { IoReorderThreeOutline } from "react-icons/io5";
import Link from "next/link";

const SearchExperience = () => (
  <SearchContextManager apiKey={"BhiAZ1DOyIHjZlGxrtP2NozVsmpJ27Kz"}>
    <Components />
  </SearchContextManager>
);

const Components = () => {
  const { data } = useAuthContext();
  const { socket } = useSocketContext();
  const searchParams = useSearchParams()
  const [end, setEnd] = useState(true)
  const optionType = searchParams.get("type")
  const params = useParams();
  const [url, setUrl] = useState("");
  const [user, setUser] = useState();
  const messages = useSelector((state) => state.message.messages);
  const [options, setOptions] = useState(false)
  const dispatch = useDispatch();
  const type = useSelector((state) => state.message.type);
  const name = useSelector((state) => state.message.name);
  const content = useSelector((state) => state.message.content);
  const size = useSelector((state) => state.message.size);
  const msg = useSelector((state) => state.message.message);

  // use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
  const gf = new GiphyFetch("BhiAZ1DOyIHjZlGxrtP2NozVsmpJ27Kz");

  // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid
  const { fetchGifs, searchKey } = useContext(SearchContext);

  const fetchChats = async () => {
    try {
      const res = await axios.get(
        `${API}/fetchconvs/${data?.id}/${params?.id}/${params?.con}`
      );
      // console.log(res.data)
      setUser(res.data.otheruserdetails);
      dispatch(setMessages(res.data.messages));
    } catch (error) {
      console.log(error);
    }
  };

  const sendm = async () => {
    const rid = Math.floor(Math.random() * 90000000) + 10000000;
    const timer = moment(new Date()).format("HH:mm").toString();
    const timestamp = `${new Date()}`;

    if (!msg.trim()) {
      console.log("Type Something");
    } else {
      let mess = {
        sender_fullname: data?.fullname,
        sender_id: data?.id,
        text: msg,
        createdAt: timestamp,
        timestamp: timer,
        mesId: rid,
        typ: "message",
        // typ: reply ? 'reply' : 'message',
        convId: params?.con,
        reciever: params?.id,
        reciever_pic: user?.profilepic,
        isread: false,
        sequence: messages?.length + 1,
        sender: { _id: data?.id },
        // reply: reply,
        // replyId: replyId,
        readby: [],
        status: "active",
      };
      let ext = {
        convid: params?.con,
        fullname: data?.fullname,
        id: data?.id,
        isverified: data?.isverified,
        msgs: [
          {
            conversationId: params?.con,
            createdAt: timestamp,
            isread: false,
            mesId: rid,
            sender: data?.id,
            sequence: messages?.length + 1,
            text: msg,
            timestamp: timer,
            // typ: reply ? 'reply' : 'message',
            typ: "message",
            // reply: reply,
            // replyId: replyId,
            status: "active",
          },
        ],
        pic: data?.dp,
        username: data?.username,
        readby: [],
      };

      socketemitfunc({
        event: "singleChatMessage",
        data: { roomId: params?.id, userId: data?.id, data: mess, ext: ext },
        socket,
      });
      socketemitfunc({
        event: "typing",
        data: { userId: data?.id, roomId: params?.id, status: false },
        socket,
      });

      // setMessage([...messages, msg])

      dispatch(setMessage(""));
      dispatch(setType("text"));
    }
  };

  useEffect(() => {
    console.log("check", socket);
    if (!socket?.connected) {
      socket?.connect();

      setTimeout(() => {
        console.log("Reconnecting from useeffect...", socket?.connected);
      }, 1000);
    } else {
      console.log(socket, "c");
      socket?.on("ms", (dat) => {
        // dispatch(sendconvmessage(dat));
        console.log(dat, "data");
        socketemitfunc({
          event: "readnow",
          data: { userId: data?.id, roomId: params?.id, mesId: dat?.mesId },
          socket,
        });
      });

      //marking as read
      socket?.on("readconvs", (dat) => {
        socketemitfunc({
          event: "successreadnow",
          data: { userId: data?.id, roomId: params?.id, mesId: dat?.mesId },
          socket,
        });

        // dispatch(setseen(dat?.id));
      });

      //listening for blocking event
      socket?.on("afterblock", (dat) => {
        if (dat?.id === data?.id) {
          // dispatch(setisblock(dat?.action));
        }
      });

      //listening typing status
      socket?.on("istyping", (dat) => {
        const { id, status } = dat;
        // dispatch(settypingstatus({ status, id }));
      });

      //listening for delete for everyone
      socket?.on("deleted", (dat) => {
        // dispatch(removeselectedmsgseveryonewithsockets(dat));
      });
    }

    return () => {
      // dispatch(clearcurrentconvId());
      socket?.off("ms");
      // socket?.off("outer-private");
      socket?.off("readconvs");
      socket?.off("istyping");
      socket?.off("deleted");
    };
  }, [params?.con, data?.id, socket]);

  const loadmore = async () => {
    try {
      if (messages?.length >= 20) {
        // setLoad(true);
        const res = await axios.post(
          `${API}/loadmorechatmsg/${data?.id}`,
          {
            convId: params.con,
            sequence: parseInt(
              // loadedmessages[0]?.sequence
              // 	? loadedmessages[0]?.sequence:
              messages[0]?.sequence
            ),
          },
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );

        if (res.data.success) {
          const newMessages = res.data.messages;
          // console.log(newMessages, "message", res.data)
          // dispatch(sendmoreconvmessage(newMessages));

          // dispatch(setMessages([...newMessages, ...messages]));
          dispatch(setMessages([...newMessages, ...messages]));
          if (res.data.messages.length > 0) {
            // setEnd(true);
            setEnd(false)
          } else {
            setEnd(true)
          }
        }
      }
      // setLoad(false);
    } catch (e) {
      // detecterror({ e });
      console.log(e, "Error");
    }
    // setLoad(false);
  };

  //gif sending
  const sendgif = async (ur) => {
    // setLoad(true);
    const rid = Math.floor(Math.random() * 90000000) + 10000000;
    const timer = moment(new Date()).format("HH:mm").toString();
    const timestamp = `${new Date()}`;

    const mess = {
      sender_fullname: data?.fullname,
      sender_id: data?.id,
      createdAt: timestamp,
      timestamp: timer,
      mesId: rid,
      typ: "gif",
      convId: params?.con,
      reciever: params?.id,
      isread: false,
      sequence: messages.length + 1,
      sender: { _id: data?.id },
      //  content: {content, name: docname, size: size},
      url: ur,
      status: "active",
      readby: [],
    };

    // dispatch(setattachopen(false));
    const form = new FormData();
    form.append("gif", {
      uri: ur,
      type: "image/gif",
      name: "new.pdf",
    });
    form.append("data", JSON.stringify(mess));

    try {
      const res = await axios.post(`${API}/sendchatfile`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data?.success) {
        const newmess = {
          sender_fullname: data?.fullname,
          sender_id: data?.id,

          createdAt: timestamp,
          timestamp: timer,
          mesId: rid,
          typ: "gif",
          convId: params?.con,
          reciever: params?.id,
          isread: false,
          sequence: messages.length + 1,
          sender: { _id: data?.id },
          // content: {content:ur, name: docname, size: formattedSize},
          url: res?.data?.link,
          readby: [],
          status: "active",
        };
        let ext = {
          convid: params?.con,
          fullname: data?.fullname,
          id: data?.id,
          isverified: data?.isverified,
          msgs: [
            {
              conversationId: params?.con,
              createdAt: timestamp,
              isread: false,
              mesId: rid,
              sender: data?.id,
              sequence: messages.length + 1,
              timestamp: timer,
              status: "active",
              typ: "gif",
            },
          ],
          pic: data?.profilepic,
          username: data?.username,
          readby: [],
        };
        socketemitfunc({
          event: "singleChatContent",
          data: {
            roomId: params?.id,
            userId: data?.id,
            data: newmess,
            ext: ext,
          },
          socket,
        });

        dispatch(setMessage(""));
        dispatch(setType("text"));
      }
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  useEffect(() => {
    if (params?.id && params?.con && data?.id) {
      fetchChats();
    }
  }, [params?.id, params?.con, data?.id]);

  const handleSend = async () => {
    const rid = Math.floor(Math.random() * 90000000) + 10000000;
    const timer = moment(new Date()).format("HH:mm").toString();
    const timestamp = `${new Date()}`;

    const mess = {
      sender_fullname: data?.fullname,
      sender_id: data?.id,
      text: msg,
      createdAt: timestamp,
      timestamp: timer,
      mesId: rid,
      typ:
        type === "image"
          ? "image"
          : type === "video"
            ? "video"
            : type === "doc"
              ? "doc"
              : "message",
      convId: params?.con,
      reciever: params?.id,
      isread: false,
      sequence: messages.length + 1,
      sender: { _id: data?.id },
      content: { content, name, size },
      url: content,
      status: "active",
      readby: [],
    };

    const form = new FormData();
    form.append(
      type === "image"
        ? "image"
        : type === "video"
          ? "video"
          : type === "doc"
            ? "doc"
            : "doc",
      JSON.stringify({
        uri: content,
        type:
          type === "image"
            ? "image/jpg"
            : type === "video"
              ? "video/mp4"
              : type === "doc"
                ? content?.type
                : content?.type,
        name:
          type === "image"
            ? "image.jpg"
            : type === "video"
              ? "video.mp4"
              : type === "doc"
                ? "doc.pdf"
                : "doc.pdf",
      })
    );
    form.append("media", content);
    form.append("data", JSON.stringify(mess));

    try {
      //const res = await sendfile({data: form});
      //   console.log(res.data);
      // setLoad(true);

      const res = await axios.post(`${API}/sendchatfile`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (uploadEvent) => {
          const uploadProgress = Math.round(
            (100 * uploadEvent.loaded) / uploadEvent.total
          );
          // setProgress({ appear: true, progress: uploadProgress });
        },
      });
      if (res.data?.success) {
        const newmess = {
          sender_fullname: data?.fullname,
          sender_id: data?.id,
          text: msg,
          createdAt: timestamp,
          timestamp: timer,
          mesId: rid,
          typ:
            type === "image"
              ? "image"
              : type === "video"
                ? "video"
                : type === "doc"
                  ? "doc"
                  : "message",
          convId: params?.con,
          reciever: params?.id,
          isread: false,
          sequence: messages.length + 1,
          sender: { _id: data?.id },
          content: { content, name, size },
          url: res?.data?.link,
          readby: [],
          status: "active",
        };
        let ext = {
          convid: params?.con,
          fullname: data?.fullname,
          id: data?.id,
          isverified: data?.isverified,
          msgs: [
            {
              conversationId: params?.con,
              createdAt: timestamp,
              isread: false,
              mesId: rid,
              sender: data?.id,
              sequence: messages.length + 1,
              text: msg,
              timestamp: timer,
              status: "active",
              typ:
                type === "image"
                  ? "image"
                  : type === "video"
                    ? "video"
                    : type === "doc"
                      ? "doc"
                      : "message",
            },
          ],
          pic: data?.profilepic,
          username: data?.username,
          readby: [],
        };
        socketemitfunc({
          event: "singleChatContent",
          data: {
            roomId: params?.id,
            userId: data?.id,
            data: newmess,
            ext: ext,
          },
          socket,
        });

        // dispatch(sendconvmessage(mess));
        // dispatch(sendchats({ data: ext }));

        //   nav.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReport = async ({ type }) => {
    try {
      if (reports?.length > 0) {
        await axios.post(`${API}/v1/reporting/${data?.id}`,
          { data: reports, id: params?.con, type: type });
      } else { console.log('Something went wrong...'); }
    } catch (e) {
      console.log(e)
    }
  };

  const handleBlock = async () => {
    try {
      socketemitfunc({
        event: 'blockperson',
        data: { roomId: convId, userId: data?.id, action: canblock ? false : true },
        socket
      });
      const res = await axios.post(`${API}/blockpeople/${data?.id}`, {
        userid: data?.id,
        time: Date.now(),
      });
    } catch (e) {

      console.log(e);
    }
  };

  useEffect(() => {
    socket?.on('reads', dat => {
      //dispatch(sendconvmessage(dat));
      //console.log(id, myid, dat?.mesId);
      socketemitfunc({
        event: 'readnow',
        data: { userId: data?.id, roomId: data?.id, mesId: dat?.mesId },
        socket
      });
      console.log(dat, "smjh aa jaye")
    });



    //marking as read
    socket?.on('readconvs', dat => {
      console.log(dat, "niche wala smjh aa jaye")
      socketemitfunc({
        event: 'successreadnow',
        data: { userId: data?.id, roomId: data?.id, mesId: dat?.mesId },
        socket
      });
    });

    //listening typing status
    // socket?.on('istyping', dat => {
    //   const { id, status } = dat;
    //   dispatch(settypingstatus({ status, id }));
    // });

    //listening for delete for everyone
    // socket.on('deleted', dat => {
    //   dispatch(removeselectedmsgseveryonewithsockets(dat));
    // });

    // dispatch(setcurrentconvId(convId));
    // if (flatListRef?.current && data?.length > 0) {
    //   setTimeout(() => {
    //     flatListRef?.current?.scrollToEnd({
    //       animated: true,
    //     });
    //   }, 1000);
    // }

    return () => {

      socket?.off('reads');
      socket?.off('readconvs');
      socket?.off('istyping');
      socket?.off('deleted');
    };
  }, [data?.id, params?.con]);

  return (
    <>
      <div onClick={() => setOptions(false)} className={`fixed inset-0 ${options ? "z-40" : "-z-20"} w-screen h-screen`}></div>
      <div className="w-full h-[100vh] relative">
        {/* header  */}
        <div
          className="w-[100%] gap-2 bg-white justify-between absolute items-center h-[60px] border-[0.5px] border-b-gray-50 px-4 flex flex-row "
        >
          <a target="_blank" href={`https://grovyo.com/${user?.username}`} className="flex flex-row items-center w-full h-full gap-2">
            <div>
              <img
                src={user?.profilepic}
                className="h-[45px] w-[45px] rounded-[20px] ring-1 ring-white bg-yellow-300 "
              />
            </div>
            <div>
              <div className="text-[15px] font-medium">{user?.fullname}</div>
              <div className="text-[14px]">
                {socket?.connected ? "online" : "offline"}
              </div>
            </div>

          </a >
          {/* user.isverified */}
          < div onClick={() => setOptions(true)} className="flex justify-center relative items-center text-3xl" >
            <IoReorderThreeOutline />
            {
              options && <div className="absolute w-[200px] z-40 text-sm h-auto -left-[170px] p-3 top-7 text-white bg-black">
                <div className="flex flex-col gap-2 font-semibold h-full">
                  <Link href={`/main/chat/${params?.id}/${params?.con}?type=hiddenMsgs`}>Hidden Messages</Link>
                  <div onClick={handleReport}>Reports</div>
                  <div onClick={handleBlock}>Block</div>
                </div>
              </div>
            }
          </div >

        </div >
        {/* chats  */}
        < div className="h-[60px] " ></div >

        {optionType === "hiddenMsgs" && <Hidden id={data?.id} user={user} convId={params?.con} socket={socket} data={data} dispatch={dispatch} />}
        {
          !optionType &&
          <>
            <div
              id="scrollableDiv"
              style={{
                height: "81vh",
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
              className={` ${styles.customScrollbar} bg-[#f7f7f7]`}
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={messages.length}
                next={loadmore}
                style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={end}
                loader={
                  <div className="flex justify-center items-center p-3">
                    <div className="animate-spin ">
                      <LuLoader2 />
                    </div>
                  </div>
                }
                scrollableTarget="scrollableDiv"
              >
                <div>
                  {messages.map((d, i) => (
                    <PrivateChats
                      d={d}
                      messages={messages}
                      convId={params?.con}
                      socket={socket}
                      data={data}
                      dispatch={dispatch}
                      i={i}
                      user={user}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
            <div className="absolute bottom-0 bg-white w-full">
              {/* <div onClick={() => loadmore()}>Load More</div> */}

              <Input
                sendMessages={sendm}
                sendgif={sendgif}
                senderId={data?.id}
                sender_fullname={data?.fullname}
                convId={params?.con}
                recieverId={params?.id}
                handleSend={handleSend}
                setContent={setContent}
                setMessage={setMessage}
                setType={setType}
                type={type}
                name={name}
                content={content}
                size={size}
                message={msg}
                dispatch={dispatch}
              />
            </div>
          </>
        }

        {/*
			<SearchBar />
			{/* <SuggestionBar /> */}
        {/* 
			<Grid width={800} columns={3} gutter={6} onGifClick={(item, e) => {
				e.preventDefault(); console.log(item, "item");

				dispatch(setType("gif"))
				dispatch(setMessage(item?.images.downsized.url))
				setUrl(item?.images.downsized.url);
			}} fetchGifs={fetchGifs} key={searchKey} /> */}
      </div >
    </>
  );
};

// export default Components

export default SearchExperience;
