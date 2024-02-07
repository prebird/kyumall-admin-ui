import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTerm, createTermDetail, getTermDetailsByTermId, searchTerm, updateTerm } from "../api/termApi";
//import { searchTerm } from "/api/termApi";

const initialState = {
    searchedTerms: [],
    termDetails: []
};

export const termSlice = createSlice({
    name: 'termSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(requestSearchTerm.fulfilled, (state, action) => {
            console.log("payload", action.payload);
            state.searchedTerms = action.payload.result;
        });
        builder.addCase(requestGetTermDetailsByTermId.fulfilled, (state, action) => {
            console.log("payload", action.payload);
            state.termDetails = action.payload.result;
        })
    }
});

export const requestSearchTerm = createAsyncThunk('termSlice/requestSearchTerm',
    async (param) => {
        return (await searchTerm(param)).data;
    }
)

export const requestCreateTerm = createAsyncThunk('termSlice/requestCreateTerm',
    async (param, { rejectWithValue }) => {
        try {
            return (await createTerm(param)).data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)

export const requestUpdateTerm = createAsyncThunk('termSlice/requestCreateTerm',
    async (param) => {
        return (await updateTerm(param)).data;
    }
)

export const requestGetTermDetailsByTermId = createAsyncThunk('termSlice/requestGetTermDetailsByTermId',
    async (param) => {
        return (await getTermDetailsByTermId(param)).data;
    }
)

export const requestCreateTermDetail = createAsyncThunk('termSlice/requestCreateTermDetail',
    async (param, { termId, rejectWithValue }) => {
        try {
            console.log("param", param);
            return (await createTermDetail(param)).data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)



