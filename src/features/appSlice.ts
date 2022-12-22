import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BoardState = {
    board: string[],
    player: string,
    winner: string | null
}

const initialState: BoardState = {
    board: Array(9).fill(""),
    player: "",
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
            if(state.player !== action.payload) {
                state.player = state.player === "X" ? "X" : "O";
            }
            state.player = action.payload;
        },
        setWinner: (state, action) => {
            state.winner = action.payload;
        },
        restartGame: () => initialState
    }
});

export default appSlice.reducer;
export const { setBoard, setPlayer, setWinner, restartGame } = appSlice.actions;