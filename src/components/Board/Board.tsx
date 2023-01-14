import { useAppDispatch, useAppSelector } from "../../store";
import Square from "../Square/Square";
import { makeMove } from "../../features/appSlice";

const Board = () => {

    const board = useAppSelector(state => state.game.board);

    const isFinished = useAppSelector(state => state.game.isFinished);
    const dispatch = useAppDispatch();

    const handleClick = (square: number) => {
        dispatch(makeMove(square));
    };

    return (
        <div className="board">
            {board.map((value, index) => (
                <Square key={index} isDisabled={isFinished} value={value} onClick={() => handleClick(index)} />
            ))}
        </div>
    )
}

export default Board;