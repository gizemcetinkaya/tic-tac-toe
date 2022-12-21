import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BoardState = {
    board: string[],
    player: string,
    winner: null
}

const initialState: BoardState = {
    board: Array(9).fill(""),
    player: "O",
    winner: null
}

const appSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<number>) => {
            let payload = action.payload;
            state.board.map((val, index) => {
                if (index === payload && val === "") {
                    return state.board[index] = state.player;
                }
                return val;
            });
        },
        setPlayer: (state, action) => {
            state.player === "X" ? state.player = "O" : state.player = "X";
        }
    }
});

export default appSlice.reducer;
export const { setBoard, setPlayer } = appSlice.actions;