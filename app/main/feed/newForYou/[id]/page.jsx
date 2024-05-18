"use client";
import { API } from "../../../../../Essentials";
import { useAuthContext } from "../../../../utils/AuthWrapper";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  socketemitfunc,
  useSocketContext,
} from "../../../../utils/SocketWrapper";
import {
  setContent,
  setMessage,
  setType,
} from "../../../../redux/slice/comChatSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
  SuggestionBar, // an optional UI component that displays trending searches and channel / username results
} from "@giphy/react-components";
import Input from "../../../../component/Input";

const SearchExperienceComNewForYou = ({ params }) => (
  <SearchContextManager apiKey={"BhiAZ1DOyIHjZlGxrtP2NozVsmpJ27Kz"}>
    <Components params={params} />
  </SearchContextManager>
);

function Components({ params }) {
  const { data } = useAuthContext();
  const { socket } = useSocketContext();
  const [com, setCom] = useState([]);
  const [dp, setDp] = useState("");
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [tId, setTId] = useState("");
  const [messages, setMessages] = useState([]);
  const [isjoined, setIsjoined] = useState(false);
  const [currentState, setCurrentState] = useState("post");

  const dispatch = useDispatch();
  const type = useSelector((state) => state.comChat.type);
  const name = useSelector((state) => state.comChat.name);
  const content = useSelector((state) => state.comChat.content);
  const size = useSelector((state) => state.comChat.size);
  const msgs = useSelector((state) => state.comChat.message);

  const gf = new GiphyFetch("BhiAZ1DOyIHjZlGxrtP2NozVsmpJ27Kz");

  // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid
  const { fetchGifs, searchKey } = useContext(SearchContext);

  const fetchCommunity = async () => {
    try {
      const res = await axios.get(
        `${API}/compostfeed/${data?.id}/${params?.id}`
      );
      console.log(res.data, "community");
      if (res.data.success) {
        setTitle(res.data.community.title);
        setTopics(res.data.community.topics);
        setIsjoined(res.data.subs);
      }
      setDp(res.data?.dp);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchallPosts = async (topicid = "") => {
    try {
      const res = await axios.post(
        `${API}/fetchallposts/${data?.id}/${params?.id}`,
        { postId: "", topicId: topicid }
      );
      console.log(res.data, "posts");
      if (res.data.success) {
        setCom(res.data?.mergedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopics = async (topicId) => {
    try {
      const res = await axios.get(
        `${API}/gettopicmessages/${data?.id}/${topicId}`
      );
      console.log(res.data, "topicsFetched");
      if (res.data.success) {
        setMessages(res.data?.messages || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetch = async (topicId, nature) => {
    try {
      setTId(topicId);
      if (nature === "post") {
        setCurrentState("post");
        await fetchallPosts(topicId);
      } else {
        await fetchTopics(topicId);
        setCurrentState("chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinmembers = async (comId) => {
    try {
      const res = await axios.post(`${API}/joinmember/${data?.id}/${comId}`);
      if (res.data.success) {
        console.log(res.data, "chla");
        await fetchCommunity();
        await fetchallPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(topics, "commmunuvghcf")

  useEffect(() => {
    if (data?.id && params?.id) {
      fetchCommunity();
      fetchallPosts();
      // fetchTopics()
    }
  }, [params?.id, data]);

  // image video
  const handleSend = async () => {
    const rid = Math.floor(Math.random() * 90000000) + 10000000;
    const timer = moment(new Date()).format("HH:mm").toString();
    const timestamp = `${new Date()}`;
    try {
      let mess = {
        sender: { fullname: data?.fullname, _id: data?.id },
        sender_fullname: data?.fullname,
        sender_id: data?.id,
        text: msgs,
        createdAt: timestamp,
        timestamp: timer,
        mesId: rid,
        typ: type === "image" ? "image" : "video",
        comId: params?.id,
        sequence: messages?.length + 1,
        sendtopicId: tId,
        status: "active",
        content: { content, name },
        url: content,
        comtitle: title,
      };

      // dispatch(a(false));
      const form = new FormData();
      form.append(
        type === "image"
          ? "image"
          : type === "video"
          ? "video"
          : type === "doc"
          ? "doc"
          : "doc",
        {
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
        }
      );
      form.append("data", JSON.stringify(mess));
      form.append("media", content);

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
        let newmess = {
          sender: { fullname: data?.fullname, _id: data?.id },
          sender_fullname: data?.fullname,
          sender_id: data?.id,
          text: msgs,
          createdAt: timestamp,
          timestamp: timer,
          mesId: rid,
          typ: type === "image" ? "image" : "video",
          comId: params?.id,
          sequence: messages?.length + 1,
          sendtopicId: tId,
          status: "active",
          content: { content, name },
          url: res?.data?.link,
          comtitle: title,
        };

        socketemitfunc({
          event: "chatMessagecontent",
          data: { roomId: tId, userId: data?.id, data: newmess },
          socket,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // message send
  const sendMessage = async () => {
    const rid = Math.floor(Math.random() * 90000000) + 10000000;
    const timer = moment(new Date()).format("HH:mm").toString();
    const timestamp = `${new Date()}`;
    if (!msgs.trim()) {
      console.log("Type Something");
    } else {
      let mess = {
        sender: { fullname: data?.fullname, _id: data?.id },
        sender_fullname: data?.fullname,
        sender_id: data?.id,
        text: msgs,
        createdAt: timestamp,
        timestamp: timer,
        mesId: rid,
        // typ: reply ? 'reply' : 'message',
        typ: "message",
        comId: params?.id,
        sequence: messages?.length + 1,
        sendtopicId: tId,
        // postId,
        comtitle: title,
        // reply: reply,
        // replyId: replyId,
        status: "active",
      };

      socketemitfunc({
        event: "chatMessage",
        data: { roomId: tId, userId: data?.id, data: mess },
        socket,
      });

      return () => {};
    }
  };

  // gif send
  const sendgif = async (url) => {
    const rid = Math.floor(Math.random() * 90000000) + 10000000;
    const timer = moment(new Date()).format("HH:mm").toString();
    const timestamp = `${new Date()}`;

    let mess = {
      sender: { fullname: data?.fullname, _id: data?.id },
      sender_fullname: data?.fullname,
      sender_id: data?.id,
      // text: message,
      createdAt: timestamp,
      timestamp: timer,
      mesId: rid,
      typ: "gif",
      comId: params?.id,
      sequence: messages?.length + 1,
      sendtopicId: tId,
      // postId,
      comtitle: title,
      // reply: reply,
      // replyId: replyId,
      status: "active",
      url,
    };

    socketemitfunc({
      event: "chatMessage",
      data: { roomId: tId, userId: data?.id, data: mess },
      socket,
    });

    return () => {};
  };

  return (
    <div className="h-screen w-[60vw] px-2">
      {/* for Joined Community */}
      {isjoined ? (
        <div className="bg-red-300  overflow-auto">
          <div className="flex bg-slate-400 fixed w-full z-10 h-[55px] items-center px-2 gap-2">
            <div>
              <img
                src={dp}
                className="h-[40px] w-[40px] rounded-2xl bg-yellow-300 "
              />
            </div>
            <div>{title}</div>
          </div>

          <div
            className="flex justify-center w-full 
         items-center
         "
          >
            {topics.map((d, i) => (
              <div
                onClick={() => handleFetch(d?._id, d?.nature)}
                key={i}
                className="w-full mt-[55px]"
              >
                {d?.title}
              </div>
            ))}
          </div>
          {currentState === "post" && (
            <div>
              {com.map((d, i) => (
                <div
                  key={i}
                  className="bg-red-300 w-[30vw] flex flex-col relative pn:max-sm:p-3 p-4 pn:max-md:rounded-2xl dark:bg-[#242424]"
                >
                  {/* top */}
                  <div className="w-[100%] rounded-2xl flex flex-col items-center ">
                    <div className="h-[55px] px-2 w-[100%] flex flex-row items-center">
                      <div className=" flex object-scale-down  h-[100%] items-center">
                        {/* <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse "></div> */}
                        <img
                          src={d?.dpdata}
                          className="h-[40px] w-[40px] rounded-2xl bg-yellow-300 "
                        />
                      </div>
                      {/* Community name */}

                      <div className="flex flex-col px-2">
                        <div className="flex flex-col ">
                          <div className="text-[14px] font-medium">{title}</div>
                          <div className="text-[12px]">By {d?.posts?.sender?.fullname}</div>
                        </div>
                      </div>

                      {/* Animation of join nd bell */}
                    </div>
                  </div>

                  {/* POst */}

                  <div className="h-[300px] rounded-2xl bg-slate-200  w-full flex justify-center items-center ">
                    {d?.urls.map((f) => (
                      <div className="h-full">
                        {f?.type.startsWith("image") ? (
                          <img src={f?.content} className="max-h-full" />
                        ) : (
                          // <video src={f?.content} controls className="max-h-full" />
                          <MediaPlayer src={f?.content} onQualitiesChange={480}>
                            <MediaProvider />
                            <DefaultVideoLayout
                              thumbnails={f?.content}
                              icons={defaultLayoutIcons}
                            />
                          </MediaPlayer>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
                    <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg my-1">
                      {d?.posts.title}
                    </div>
                    <div>{d?.posts.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* {
          currentState === "chat" &&
          <div>
            {message?.map((d, i) => (
              <div key={i}>{d?.text}</div>
            ))}
          </div>
        } */}

          {currentState === "chat" && (
            <div className="">
              {messages?.map((d, i) => (
                <div
                  key={i}
                  className={`flex ${
                    data?.id === d?.sender?._id
                      ? "justify-end"
                      : "justify-start"
                  }  w-full items-center `}
                >
                  <div className="flex gap-1 py-2 pl-1"> <div className=" flex object-scale-down  h-[100%] items-center">
                        {/* <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse "></div> */}
                        <img
                          src={d?.dpdata}
                          className="h-[40px] w-[40px] rounded-2xl bg-yellow-300 "
                        />
                      </div>
                  <div className="flex flex-col items-start ">
                    <div className="">{d?.sender?.fullname}</div>
                    {d?.typ === "message" && <div className="bg-[#0075ff] p-2 rounded-bl-[10px] rounded-r-[10px]">{d?.text}</div>}
                    {d?.typ === "image" && (
                      <div className="bg-[#0075ff] p-2 rounded-bl-[10px] rounded-r-[10px]">
                        <img
                          src={d?.url}
                          className="h-[145px] w-[145px] rounded-2xl bg-yellow-300 "
                        />
                      </div>
                    )}
                    {d?.typ == "video" && (
                      <div className="flex justify-center items-center">
                        {/* <ReactPlayer url={d?.url} controls /> */}

                        <MediaPlayer src={d?.url} onQualitiesChange={480}>
                          <MediaProvider />
                          <DefaultVideoLayout
                            thumbnails={d?.url}
                            icons={defaultLayoutIcons}
                          />
                        </MediaPlayer>

                        {/* <video src={d?.url} className="h-[145px] w-[145px] rounded-2xl bg-yellow-300 " controls /> */}
                      </div>
                    )}
                    {d?.typ == "gif" && (
                      <div className=" p-2 rounded-bl-[10px] rounded-r-[10px]">
                        <img
                          src={d?.url}
                          className="h-[145px] w-[145px] bg-yellow-300 "
                          alt="gif"
                        />
                      </div>
                    )}
                  </div>
                  </div>
                </div>
              ))}
<div className="bg-pink-300 fixed w-full bottom-0">
              <Input
                sendMessages={sendMessage}
                sendgif={sendgif}
                handleSend={handleSend}
                setContent={setContent}
                setMessage={setMessage}
                setType={setType}
                type={type}
                name={name}
                content={content}
                size={size}
                message={msgs}
                dispatch={dispatch}
              />
</div>
<div className="hidden">
              <SearchBar />
              {/* <SuggestionBar /> */}

              <Grid
                width={800}
                columns={3}
                gutter={6}
                onGifClick={(item, e) => {
                  e.preventDefault();
                  console.log(item, "item");

                  dispatch(setType("gif"));
                  dispatch(setMessage(item?.images.downsized.url));
                }}
                fetchGifs={fetchGifs}
                key={searchKey}
              />
              </div>
            </div>
          )}
        </div>
      ) : (
        // for unjoined community
        <div className="max-h-screen bg-red-300 w-full relative overflow-y-scroll">
          <div className="absolute w-full z-30 h-full bottom-0 right-0 top-0 left-0">
            <div className="flex h-full  justify-center mb-10 w-full items-end">
              <div
                onClick={() => joinmembers(params?.id)}
                className="flex bg-blue-900 p-3 text-white justify-center w-full items-end"
              >
                Join Community
              </div>
            </div>
          </div>
          <div className=" z-40 w-full bg-red-300  h-full  bottom-0 right-0 top-0 left-0">
            <div>
              <img
                src={dp}
                className="h-[45px] w-[45px] rounded-2xl bg-yellow-300 "
              />
            </div>
            <div>{title}</div>

            <div
              className="flex justify-center  w-full 
         items-center
         "
            >
              {topics.map((d, i) => (
                <div
                  onClick={() => handleFetch(d?._id, d?.nature)}
                  key={i}
                  className="w-full"
                >
                  {d?.title}
                </div>
              ))}
            </div>
            {currentState === "post" && (
              <div>
                {com.map((d, i) => (
                  <div
                    key={i}
                    className="bg-slate-50  pn:max-sm:p-3 p-4 pn:max-md:rounded-2xl dark:bg-[#242424]"
                  >
                    <div className="w-[100%] rounded-2xl flex flex-col items-center ">
                      <div className="h-[55px] px-2 w-[100%] flex flex-row items-center ">
                        <div className="w-[15%] flex object-scale-down items-center h-[100%] ">
                          {/* <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse "></div> */}
                          <img
                            src={d?.dpdata}
                            className="h-[45px] w-[45px] rounded-2xl bg-yellow-300 "
                          />
                        </div>
                        {/* Community name */}

                        <div className="flex flex-col w-[60%] justify-center px-2 items-start">
                          <div className="flex flex-col space-y-1 items-center">
                            <div>{title}</div>
                            <div>By {d?.posts?.sender?.fullname}</div>
                          </div>
                        </div>

                        {/* Animation of join nd bell */}
                      </div>
                    </div>

                    {/* POst */}

                    <div className="h-[200px] rounded-2xl bg-slate-200  w-[360px] flex justify-center items-center ">
                      {d?.urls.map((f) => (
                        <div className="h-full">
                          {f?.type.startsWith("image") ? (
                            <img src={f?.content} className="max-h-full" />
                          ) : (
                            <video
                              src={f?.content}
                              controls
                              className="max-h-full"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="h-[55px] px-2 py-1 w-[100%] flex flex-col">
                      <div className="text-[14px] text-black w-[120px] h-[20px] bg-slate-200 rounded-lg my-1">
                        {d?.posts.title}
                      </div>
                      <div>{d?.posts.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentState === "chat" && (
              <div>
                {messages?.map((d, i) => (
                  <div key={i}>{d?.text}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchExperienceComNewForYou;
