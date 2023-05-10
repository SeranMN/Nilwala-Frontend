import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    
};

export const memberReportSlice = createSlice({
    name:"memberReport",
    initialState,
    reducers:{
        setData(state,action){
            state.data = action.payload
        },

    }
});

export const {setData} = memberReportSlice.actions

export default memberReportSlice.reducer;