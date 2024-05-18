import { createSlice } from "@reduxjs/toolkit";

export const comChatSlice = createSlice({
	name: "comChat",
	initialState: {
		message: "",
		type: "",
		content: "",
		name: "",
		size: ""
	},
	reducers: {
		setMessage: (state, action) => {
			state.message = action.payload
		},
		setType: (state, action) => {
			state.type = action.payload
		},
		setContent: (state, action) => {
			const { content, name, size } = action.payload
			state.content = content
			state.name = name
			state.size = size
		}
	}
})

export const { setMessage, setType, setContent } = comChatSlice.actions
export default comChatSlice.reducer
