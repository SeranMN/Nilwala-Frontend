import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    
};

export const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{
        setId(state,action){
            state.id = action.payload
        },

    }
});

export const {setId} = projectSlice.actions

export default projectSlice.reducer;