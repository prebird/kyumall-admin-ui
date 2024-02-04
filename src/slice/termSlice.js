import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTerm, searchTerm, updateTerm } from "../api/termApi";
//import { searchTerm } from "/api/termApi";

const initialState = {
    searchedTerms: []
};

export const termSlice = createSlice({
    name: 'termSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(requestSearchTerm.fulfilled, (state, action) => {
            console.log("payload", action.payload);
            state.searchedTerms = action.payload.result;
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



