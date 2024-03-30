import { createSlice } from "@reduxjs/toolkit";

const TopicSlicer = createSlice({
    name: "topics",
    initialState : {
        loading: false,
    },
    reducers: {
        topicRequest(state, action) {
            return {loading: true}
        }, 
        topicSuccess(state, action) {
            return {
                loading: false,
                topics: action.payload.topics
            }
        }, 
        topicFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }, 
        getTopicRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        }, 
        getTopicSuccess(state, action) {
            return {
                ...state,
                loading: false,
                topic: action.payload.topic
            }
        }, 
        getTopicFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }, 
    }
})
const {actions, reducer} = TopicSlicer
export const {topicRequest, topicSuccess, topicFail, getTopicRequest, getTopicSuccess, getTopicFail} = actions
export default reducer