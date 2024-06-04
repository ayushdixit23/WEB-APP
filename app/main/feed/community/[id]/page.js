"use client";
import { API } from "../../../../../Essentials";
import Input from "../../../../component/Input";
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
import InfiniteScroll from "react-infinite-scroll-component";
import { PiHandsClapping } from "react-icons/pi";
import { VscSend } from "react-icons/vsc";

const SearchExperienceCom = ({ params }) => (
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
      console.log(res.data);
      setTitle(res.data.community.title);
      setTopics(res.data.community.topics);
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
      setCom(res.data?.mergedData);
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
      setMessages(res.data?.messages || []);
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
    <div className="h-screen relative">
      <div className="flex items-center h-[60px] absolute top-0 z-10 w-full  bg-[#f4f4f4]">
        <div>
          <img
            src={dp}
            className="h-[45px] w-[45px] rounded-[19px] bg-yellow-300 "
          />
        </div>
        <div className="pl-2">
          <div>{title}</div>
          <div className="text-[12px]">100 member</div>
        </div>
      </div>

      <div className="h-[100%] bg-[#f7f7f7] pt-[60px] w-full relative overflow-y-scroll">
        <div
          className="flex justify-center w-full py-2
         items-center
         "
        >
          {topics.map((d, i) => (
            <div
              onClick={() => handleFetch(d?._id, d?.nature)}
              key={i}
              className="w-full flex justify-center"
            >
              <div className="flex items-center bg-[#f2f2f2] px-4 rounded-lg ">
                {d?.title}
              </div>
            </div>
          ))}
        </div>
        {currentState === "post" && (
          <div>
            {com.map((d, i) => (
              <div
                key={i}
                className="pt-2 pn:max-sm:p-3 p-4 pn:max-md:rounded-2xl dark:bg-[#242424]"
              >
                <div className="bg-white p-2 max-w-[360px] rounded-xl">
                  {/* header */}
                  <div className="w-[100%] rounded-2xl flex flex-col items-center ">
                    <div className=" w-[100%] flex flex-row items-center ">
                      <div className=" flex object-scale-down items-center h-[100%] ">
                        {/* <div className="h-[45px] w-[45px] rounded-2xl bg-slate-200 animate-pulse "></div> */}
                        <img
                          src={d?.dpdata}
                          className="h-[40px] w-[40px] rounded-2xl bg-yellow-300 "
                        />
                      </div>
                      {/* Community name */}
                      <div className="flex flex-col justify-center px-2 items-start">
                        <div className="flex flex-col ">
                          <div className="text-[14px] font-semibold">
                            {title}
                          </div>
                          <div className="font-medium text-[#414141] text-[12px]">
                            By {d?.posts?.sender?.fullname}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* POst */}

                  <div className="h-[200px] mt-2 rounded-2xl bg-slate-200 flex justify-center items-center ">
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
                  <div className=" px-2 mt-2 py-1 w-[100%] rounded-lg flex flex-col">
                    <div className="text-[14px] truncate text-black w-full ">
                      {d?.posts.title}
                    </div>
                    <div className="text-[14px] truncate">{d?.posts.desc}</div>
                  </div>
                  <div className=" px-2 mt-1  py-1 w-[100%] rounded-lg flex items-center">
                    <div className="text-[14px] text-black w-full ">
                      liked by divyansh
                    </div>
                    <div className="flex gap-2">
                      <div className="flex justify-center rounded-xl items-center gap-1 p-2 bg-[#f4f4f4]">
                        <PiHandsClapping />
                        <div className="text-[12px]">12</div>
                      </div>
                      <div className="rounded-xl bg-[#f4f4f4] p-2">
                        <VscSend />
                      </div>
                    </div>
                  </div>
                  <div className=" px-2 mt-1  py-1 w-[100%] rounded-lg bg-slate-200  flex items-center">
                    <div className="text-[14px] text-black w-full ">
                      comment .... .... ...
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="w-full relative ">
          {currentState === "chat" && (
            <div
              id="scrollableDiv"
              style={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
              className="relative"
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={messages.length}
                // next={fetchTopics}
                style={{ display: "flex", flexDirection: "column-reverse",position:"relative" }} //To put endMessage and loader to the top.
                // inverse={true} //
                // hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"

              >
                <div className="relative w-full">
                  {messages?.map((d, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        data?.id === d?.sender?._id
                          ? "justify-end"
                          : "justify-start"
                      }  w-full items-center relative`}
                    >
                      {console.log(d.url, d?.typ)}
                      <div className="flex flex-col items-center gap-2">
                        <div>{d?.sender?.fullname}</div>
                        {d?.typ === "message" && <div>{d?.text}</div>}
                        {d?.typ == "image" && (
                          <div>
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
                          <div>
                            <img
                              src={d?.url}
                              className="h-[145px] w-[145px] rounded-2xl bg-yellow-300 "
                              alt="gif"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="w-full relative">
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
                  </div></div>
                  {/* <SearchBar /> */}
                  {/* <SuggestionBar /> */}

                  {/* <Grid width={800} columns={3} gutter={6} onGifClick={(item, e) => {
              e.preventDefault(); console.log(item, "item");

              dispatch(setType("gif"))
              dispatch(setMessage(item?.images.downsized.url))
            }} fetchGifs={fetchGifs} key={searchKey} /> */}
                </div>
              </InfiniteScroll>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchExperienceCom;
