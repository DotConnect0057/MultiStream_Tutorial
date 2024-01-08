"use client"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "",
    chnId: "",
    clientId: "",
    tchannels: {data:[], platform: "twitch"},
    ychannels: {data:[],},
    platform: "",
    twitchSession: "",
    youtubeSession: "",
    loginSession: "",
    selectPlt: "twitch",
    search: {},
    view: "single",
    screen: "1",
}

export const Slice = createSlice ({
    name: "selector",
    initialState,
    reducers: {
        selected: (state, action) => {
            state.name = action.payload.name;
            state.chnId = action.payload.id;
            state.platform = action.payload.platform;
        },
        saveTwitchSession: (state, action) => {
            state.twitchSession = action.payload;
        },
        saveYoutubeSession: (state, action) => {
            state.youtubeSession = action.payload;
        },
        saveLoginSession: (state, action) => {
            state.loginSession = action.payload;
        },
        twitchChannels: (state, action) => {
            state.tchannels = action.payload;
        },
        youtubeChannels: (state, action) => {
            state.ychannels = action.payload;
        },
        selectPlatform: (state, action) => {
            state.selectPlt = action.payload;
        },
        saveSearchResult: (state, action) => {
            state.search = action.payload;
        },
        selectView: (state, action) => {
            state.view = action.payload;
        },
        selectScreen: (state, action) => {
            state.screen = action.payload;
        },
    }
})

export const { selected, saveTwitchSession, saveYoutubeSession, saveLoginSession,
                twitchChannels, youtubeChannels, selectPlatform, saveSearchResult,
                selectView, selectScreen
                } = Slice.actions

export default Slice.reducer
