"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthWrapper";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setincommsgs } from "../redux/slice/messageSlice";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

//emitting function
export const socketemitfunc = async ({ event, data, socket }) => {
  console.log("Socket Connection:", socket.connected);
  if (!socket.connected) {
    socket.connect();
    socket.emit(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  } else {
    console.log("Connecting...");
    socket.emit(event, data);
  }
};

//function for listening
export const socketonfunc = async ({ event, data }) => {
  if (!socket.connected) {
    socket.connect();
    socket.on(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  } else {
    socket.emit(event, data);
  }
};

export const disconnectSocket = () => {
  socket.disconnect();
  console.log("Socket disconnected manually");
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const { data, auth: AUTH } = useAuthContext();

  useEffect(() => {
    let newSocket;
    if (AUTH) {
      console.log("2");
      const url = "https://rooms.grovyo.xyz"
      // const url = "http://192.168.1.7:4400";
      newSocket = io(url, {
        // query: { userId: data.id },
        auth: { id: data?.id, type: "web" },
        reconnectionAttempts: 100,
        reconnectionDelay: 3000,
        reconnection: true,
        autoConnect: true,
        transports: ["websocket"],
      });

      newSocket.on("outer-private", (data) => {
       
      //  dispatch(setMessages([...messages, data.data]));
        dispatch(setincommsgs(data.data));
      });
      // const newSocket = io("https://rooms.grovyo.xyz", {
      //   query: { userId: data.id },
      //   transports: ["websocket"],
      // });
      // newSocket.auth={id:data?.id}
      setSocket(newSocket);

      console.log("Reconnecting...", newSocket.connected);

      // return () => {
      //   newSocket.close();
      // };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      newSocket?.off("outer-private");
    };
  }, [AUTH, data.id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
