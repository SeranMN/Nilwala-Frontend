import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    
};

export const reportSlice = createSlice({
    name:"report",
    initialState,
    reducers:{
        setData(state,action){
            state.data = action.payload
        },

    }
});

export const {setData} = reportSlice.actions

export default reportSlice.reducer;