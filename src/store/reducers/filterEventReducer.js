import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    year: '',
    status: '',
    month:''
};

export const filterEventSlice = createSlice({
    name:"filterEvents",
    initialState,
    reducers:{
        setYear(state,action){
            state.year = action.payload
        },
        setMonth(state,action){
            state.month = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        }

    }
});

export const {setYear,setMonth,setStatus} = filterEventSlice.actions

export default filterEventSlice.reducer;