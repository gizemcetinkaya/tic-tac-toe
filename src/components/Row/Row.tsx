import { useEffect, useState } from "react";
import { setBoard, setPlayer, setWinner } from "../../features/appSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import Square from "../Square/Square";

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

type RowProps = {
    board: string[],
    row: number
}
const Row = ({ board, row }: RowProps) => {

    const player = useAppSelector(state => state.game.player);

    const dispatch = useAppDispatch();

    const handleClick = (square: number) => {
        dispatch(setBoard(square));
    };

    useEffect(() => {
        checkWin();
        checkIfTie();
        
        dispatch(setPlayer(player === "X" ? "O" : "X"));
    }, [board]);

    const checkWin = () => {
        winningCombinations.forEach((current) => {
            const firstPlayer = board[current[0]];
            if (firstPlayer === "") return;
            let foundWinning = true;
            current.forEach((idx) => {
                if (board[idx] !== firstPlayer) {
                    foundWinning = false;
                }
            })

            if (foundWinning) {
                dispatch(setWinner(player));
            }
        })
    }

    const checkIfTie = () => {
        let filled = true;
        board.forEach((square) => {
            if(square === "") {
                filled = false;
            }
        })

        if(filled) {
            dispatch(setWinner("No one"));
        }
    }

    return (
        <div className="row">
            {board.map((value, index) => (
                Math.floor(index / 3) === row
                    ? <Square key={`${index}`} value={value} onClick={() => handleClick(index)} />
                    : null
            ))}
        </div>
    )
}

export default Row;