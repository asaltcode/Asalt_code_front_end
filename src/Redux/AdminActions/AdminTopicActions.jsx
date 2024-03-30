import AdminApi from "../../utils/ApiRouters/AdminApis"
import AxiosService from "../../utils/AxiosService"
import { getTopicFail, getTopicRequest, getTopicSuccess, topicFail, topicRequest, topicSuccess } from "../Slices/TopicsSlicer"

export const getTopicsBySyllabus = (id) => async (dispatch) =>{
    try {
        dispatch(topicRequest())
        const {data} = await AxiosService.get(`${AdminApi.TOPIC_BY_SYLLABUS_ID.path}/${id}`)
        dispatch(topicSuccess(data))
    } catch (error) {
        dispatch(topicFail(error.response.data.message))
    }
}

export const getTopicById = (id) => async (dispatch) => {
    try {
        dispatch(getTopicRequest())
        const {data} = await AxiosService.get(`${AdminApi.TOPIC_BY_ID.path}/${id}`)
        dispatch(getTopicSuccess(data))
    } catch (error) {
        dispatch(getTopicFail(error.response.data.message))
    }
}