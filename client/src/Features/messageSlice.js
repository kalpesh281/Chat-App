import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"message",
    initialState:{
        messages:null,
    },
    reducers:{
        setMessage:(state,action)=>{
            state.messages=action.payload;
        }
    }
});

export const {setMessage}=messageSlice.actions;
export default messageSlice.reducer