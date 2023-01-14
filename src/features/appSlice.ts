import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BoardState = {
    board: string[],
    player: string,
    winner: string | null,
    isFinished: boolean
}

export const initialState: BoardState = {
    board: Array(9).fill(""),
    player: "X",
    winner: null,
    isFinished: false
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const getWinner = (board: string[]) => {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

const appSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<number>) => {
            let payload = action.payload;
            state.board.map((val, index) => {
                if (index === payload && val === "") {
                    state.board[index] = state.player;
                    state.player = state.player === "X" ? "O" : "X";
                }
            });
            state.winner = getWinner(state.board);
            state.isFinished = state.board.every(x => x !== "") || state.winner !== null;
        },
        restartGame: () => initialState
    }
});

export default appSlice.reducer;
export const { makeMove, restartGame } = appSlice.actions;