import { createSlice } from "@reduxjs/toolkit";

const syllabusSlicer = createSlice({
  name: "syllabus",
  initialState: {
    loading: false,
  },
  reducers: {
    syllabusRequest(state) {
      return { loading: true };
    },
    syllabusSuccess(state, action) {
      return {
        loading: false,
        syllabus: action.payload.syllabus,
      };
    },
    syllabusFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    paidSyllabusRequest(state) {
      return { loading: true };
    },
    paidSyllabusSuccess(state, action) {
      return {
        loading: false,
        paidSyllabus: action.payload.syllabus,
      };
    },
    paidSyllabusFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    getSyllabusRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    getSyllabusSuccess(state, action) {
      return {
        ...state,
        loading: false,
        syllabusById: action.payload.syllabus,
      };
    },
    getSyllabusFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getSyllabusByCourseIdReq(state, action){
      return {
        ...state,
        loading: true
      };
    }
  },
});

const { actions, reducer } = syllabusSlicer;

export const {
  syllabusRequest,
  syllabusSuccess,
  syllabusFail,
  paidSyllabusRequest,
  paidSyllabusSuccess,
  paidSyllabusFail,
  getSyllabusRequest,
  getSyllabusSuccess,
  getSyllabusFail
} = actions;
export default reducer;
