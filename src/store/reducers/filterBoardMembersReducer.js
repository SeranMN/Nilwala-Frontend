import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    year: '',
    designation: ''
};

export const filterBoardMembersSlice = createSlice({
    name:"filterBoards",
    initialState,
    reducers:{
        setYear(state,action){
            state.year = action.payload
        },
        setDesignation(state,action){
            state.designation = action.payload
        }

    }
});

export const {setYear,setDesignation} = filterBoardMembersSlice.actions

export default filterBoardMembersSlice.reducer;