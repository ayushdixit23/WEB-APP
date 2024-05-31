import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: "",
    messages: [],
    type: "",
    content: "",
    name: "",
    size: "",
    hiddenMsg: []
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setContent: (state, action) => {
      const { content, name, size } = action.payload;
      state.content = content;
      state.name = name;
      state.size = size;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setincommsgs: (state, action) => {
      const old = state.messages
      return {
        ...state,
        messages: [...old, action.payload]
      }
    },
    setHiddenMsgs: (state, action) => {
      state.hiddenMsg = action.payload
    }
  },
});

export const { setMessage, setType, setContent, setMessages, setincommsgs, setHiddenMsgs } =
  messageSlice.actions;
export default messageSlice.reducer;
