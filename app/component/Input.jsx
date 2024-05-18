import React, { useState } from "react";
import { IoCloudUpload, IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { setContent, setMessage, setType, setincommsgs } from "../redux/slice/messageSlice";
import moment from "moment";

// interface InputProps {
//   sendMessages: (message: string | File) => void;
// }

const Input = ({ sendMessages, sendgif, handleSend, senderId, convId, recieverId, sender_fullname, type, name, content, size, message, setContent, setMessage, setType, dispatch }) => {
  // const [message, setMessage] = useState("");
  const [d, setD] = useState("");

  return (
    <div className="bg-grey-lighter px-4 py-4 flex items-center">
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
              // setMessage(selectedFile.name); // Or any other property of the file you want to set as the message
            }
          }}
          className="hidden"
        />
        <label htmlFor="image">
          <IoCloudUpload className="text-2xl" />
        </label>
      </div>
      <div className="flex-1 mx-4 border-2 border-[#f2f2f2]">
        {!d ? (
          <input
            value={message}
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
          // if (!message) {
          //   return;
          // }

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
        }}
      >
        <IoSend className="text-2xl" />
      </div>
    </div >
  );
};

export default Input;
