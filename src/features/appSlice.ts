import { createSlice } from "@reduxjs/toolkit";

export type StateType = {
    board: [],
    player: string,
    winner: string
}

const initialState: StateType = {
    board: [],
    player: "",
    winner: ""
} 

const appSlice = createSlice({
    name: "tictactoe",
    initialState,
    reducers: {}
});

export default appSlice.reducer;