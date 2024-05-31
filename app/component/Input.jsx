import React, { useContext, useState } from "react";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { setincommsgs } from "../redux/slice/messageSlice";
import moment from "moment";
import { MdOutlineGif, MdOutlineOndemandVideo, MdPermMedia } from "react-icons/md";
import { TfiImage } from "react-icons/tfi";
import { Grid, SearchBar, SearchContext, SearchContextManager, SuggestionBar } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";


const Input = ({ sendMessages, sendgif, handleSend, senderId, convId, recieverId, sender_fullname, type, name, content, size, message, setContent, setMessage, setType, dispatch }) => (
  <SearchContextManager apiKey={"BhiAZ1DOyIHjZlGxrtP2NozVsmpJ27Kz"}>
    <Component sendMessage={sendMessages} sendgif={sendgif} handleSend={handleSend} senderId={senderId} convId={convId} recieverId={recieverId} sender_fullname={sender_fullname} type={type} name={name} content={content} size={size} message={message} setContent={setContent} setMessage={setMessage} setType={setType} dispatch={dispatch} />
  </SearchContextManager>
);


const Component = ({ sendMessages, sendgif, handleSend, senderId, convId, recieverId, sender_fullname, type, name, content, size, message, setContent, setMessage, setType, dispatch }) => {
  // const [message, setMessage] = useState("");
  const [d, setD] = useState("");
  const [showgif, setShowgif] = useState(false)
  const [show, setShow] = useState(false)
  const gf = new GiphyFetch("BhiAZ1DOyIHjZlGxrtP2NozVsmpJ27Kz");

  const { fetchGifs, searchKey } = useContext(SearchContext);

  const mainSendingFunction = () => {
    try {
      const rid = Math.floor(Math.random() * 90000000) + 10000000;
      const timer = moment(new Date()).format("HH:mm").toString();
      const timestamp = `${new Date()}`;
      const mess = {
        sender_fullname: sender_fullname,
        sender_id: senderId,
        text: message,
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
        convId: convId,
        reciever: recieverId,
        isread: false,
        //      sequence: data.length + 1,
        sender: { _id: senderId },

        status: "active",
        readby: [],
      };

      if (type == "text") {
        console.log(mess, "mera msg")
        sendMessages();
        dispatch(setincommsgs(mess))
      } else if (type == "gif") {
        sendgif(message)
      } if ((type == "image" || type == "video")) {
        console.log("runde")
        handleSend()
      }
      setMessage("");
      setD("");
    } catch (error) {
      console.log(error)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      mainSendingFunction()
    }
  };

  return (
    <>
      {showgif && <div className="w-full h-[50vh] flex flex-col">
        <div className="w-full">
          <SearchBar />
        </div>

        <div className="w-full h-[50px] overflow-x-scroll no-scrollbar">
          <SuggestionBar />
        </div>

        <div className=" w-full bg-red-400 flex flex-grow overflow-y-scroll no-scrollbar">
          <Grid
            width="100%"
            height="100%"
            gutter={6}
            columns={3}
            columnOffsets={3}
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
      </div>}
      <div className="bg-grey-lighter px-4 py-4 flex items-center">
        <div className="relative">
          <MdPermMedia className="text-xl" onClick={() => setShow(true)} />
          <div className={` ${show ? "absolute w-[230px] h-[60px] left-0 bottom-5 rounded-[12px] border-2 border-black bg-white" : "hidden"} `}>
            <div className="flex gap-4 items-center h-full">
              <div>
                <MdOutlineGif onClick={() => { setShow(false); setShowgif(true) }} className="w-[50px] h-[50px]" />
              </div>
              <div>
                <input
                  id="image"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    const selectedFile = e.target.files && e.target.files[0];
                    if (selectedFile) {
                      if (selectedFile.type.startsWith("image")) {
                        dispatch(setType("image"))
                      } else if (selectedFile.type.startsWith("video")) {
                        dispatch(setType("video"))
                      }
                      dispatch(setContent({ content: e.target.files[0], name: selectedFile.name, size: selectedFile.size }))

                    }
                  }}
                  className="hidden"
                />
                <label htmlFor="image">
                  <TfiImage className="w-[25px] h-[25px]" />
                </label>
              </div>
              <div>
                <input
                  id="image"
                  type="file"
                  name="image"
                  onChange={(e) => {
                    const selectedFile = e.target.files && e.target.files[0];
                    if (selectedFile) {
                      if (selectedFile.type.startsWith("image")) {
                        dispatch(setType("image"))
                      } else if (selectedFile.type.startsWith("video")) {
                        dispatch(setType("video"))
                      }
                      dispatch(setContent({ content: e.target.files[0], name: selectedFile.name, size: selectedFile.size }))

                    }
                  }}
                  className="hidden"
                />
                <label htmlFor="image">
                  <MdOutlineOndemandVideo className="w-[25px] h-[25px]" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 mx-4 border-2 border-[#f2f2f2]">
          {!d ? (
            <input
              value={message}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                dispatch(setMessage(e.target.value));
                dispatch(setType("text"))
              }}
              className="w-full border outline-none rounded px-2 py-2"
              type="text"
            />
          ) : (
            <div className="flex justify-between items-center w-full">
              <div>{d}</div>
              <div
                onClick={() => {
                  setD("");
                  setMessage("");
                }}
                className="text-xl"
              >
                <RxCross2 />
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            mainSendingFunction()
          }
          }
        >
          <IoSend className="text-2xl" />
        </div>
      </div >

    </>
  );
};

export default Input;
