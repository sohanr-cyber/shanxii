import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        currentChat: null,
        // currentChat: "0275320",
        messages: [],
        fetchMessage: false,

    },

    reducers: {
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setFetchMessage: (state, action) => {
            state.fetchMessage = !state.fetchMessage
        }
    },
});

// Action creators are generated for each case reducer function
export const { setCurrentChat, setMessages, setFetchMessage } = chatSlice.actions;
export default chatSlice.reducer;
